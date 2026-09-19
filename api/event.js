const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

function bad(res, code, msg) {
  res.statusCode = code;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(msg);
}

module.exports = async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const slug = (url.searchParams.get("slug") || "").replace(/[^a-zA-Z0-9._-]/g, "");
  if (!slug) return bad(res, 400, "missing slug");

  // Prefer repo file e/<slug>.ics from the deployment bundle
  const candidates = [
    join(process.cwd(), "e", `${slug}.ics`),
    join(__dirname, "..", "e", `${slug}.ics`),
  ];
  let body = null;
  for (const p of candidates) {
    if (existsSync(p)) {
      body = readFileSync(p);
      break;
    }
  }
  if (!body) {
    // Fallback: fetch from jsDelivr (same repo)
    const upstream = `https://cdn.jsdelivr.net/gh/lokiwhy12/gaia-cal@main/e/${slug}.ics`;
    const r = await fetch(upstream);
    if (!r.ok) return bad(res, 404, "unknown event");
    body = Buffer.from(await r.arrayBuffer());
  }

  // 200 with calendar MIME, filename .ics, but request path is /api/event (not *.ics)
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Content-Disposition", `inline; filename="${slug}.ics"`);
  res.setHeader("Cache-Control", "public, max-age=300");
  res.end(body);
};
