export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: "https://remonkosyou.2re.fun/sitemap.xml",
  };
}
