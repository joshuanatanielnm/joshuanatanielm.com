export function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/$/, "") || "/";
}
