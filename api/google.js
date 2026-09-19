module.exports = async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const target = url.searchParams.get("u") || "";
  if (!target.startsWith("https://calendar.google.com/")) {
    res.statusCode = 400;
    res.end("bad u");
    return;
  }
  const wrapped = "https://www.google.com/url?q=" + encodeURIComponent(target);
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Google Calendar</title>
<style>body{font:16px/1.4 -apple-system,sans-serif;padding:24px;max-width:420px;margin:auto}a{display:block;margin:12px 0;padding:14px;border-radius:12px;text-align:center;text-decoration:none;font-weight:600}.a{background:#3d8bfd;color:#fff}.b{background:#eee;color:#111}.h{color:#666;font-size:14px}</style></head><body>
<h1>Add to Google Calendar</h1>
<p class="h">On iPhone, tap Open (Safari). If the Google Calendar app opens empty, use the Apple path from the previous screen instead.</p>
<p><a class="a" href="${target.replace(/"/g, "&quot;")}">Open Google Calendar</a></p>
<p><a class="b" href="${wrapped.replace(/"/g, "&quot;")}">Open via Google redirect</a></p>
</body></html>`;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
};
