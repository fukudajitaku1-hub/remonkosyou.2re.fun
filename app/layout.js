import "./globals.css";

const siteUrl = "https://remonkosyou.2re.fun";
const title = "えっちゃんのレモン胡椒";
const description =
  "えっちゃんのレモン胡椒の紹介ページ。レシピ例は準備中です。公開までしばらくお待ちください。";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    images: [{ url: "/images/lemon-kosho.jpg", width: 772, height: 909 }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/lemon-kosho.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
