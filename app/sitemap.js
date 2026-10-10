export default function sitemap() {
  return [
    {
      url: "https://remonkosyou.2re.fun",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://remonkosyou.2re.fun/recipe",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
