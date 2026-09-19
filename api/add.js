module.exports = async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const slug = (url.searchParams.get("slug") || "").replace(/[^a-zA-Z0-9._-]/g, "");
  if (!slug) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("missing slug");
    return;
  }
  // Proven iOS workaround (SO 69631672): non-.ics URL → 303 → final .ics.
  // Direct https://…/file.ics opens Subscribe; the redirect hop can open Add Event.
  const target = `https://gaia-cal.vercel.app/e/${encodeURIComponent(slug)}.ics`;
  res.statusCode = 303;
  res.setHeader("Location", target);
  res.setHeader("Cache-Control", "no-store");
  res.end();
};
