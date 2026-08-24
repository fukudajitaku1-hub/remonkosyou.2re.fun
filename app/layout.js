import "./globals.css";

export const metadata = {
  title: "えっちゃんのレモン胡椒",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
