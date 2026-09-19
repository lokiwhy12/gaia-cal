module.exports = async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const slug = (url.searchParams.get("slug") || "").replace(/[^a-zA-Z0-9._-]/g, "");
  if (!slug) {
    res.statusCode = 400;
    res.end("missing slug");
    return;
  }
  const target = `https://cdn.jsdelivr.net/gh/lokiwhy12/gaia-cal@main/e/${encodeURIComponent(slug)}.ics`;
  res.statusCode = 303;
  res.setHeader("Location", target);
  res.setHeader("Cache-Control", "no-store");
  res.end();
};
