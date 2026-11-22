
/** The public origin the visitor used (e.g. https://console.kelzstudio.com), even behind rewrites and proxies. */
export function publicOrigin(req: Request) {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? new URL(req.url).host;
  const local = /^(localhost|127\.|\[::1\])/.test(host);
  const proto = req.headers.get("x-forwarded-proto")?.split(",")[0] ?? (local ? "http" : "https");
  return `${proto}://${host}`;
}