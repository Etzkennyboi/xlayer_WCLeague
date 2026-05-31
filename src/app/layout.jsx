import { Inter, Teko } from "next/font/google";
import "../index.css"; // Our global Tailwind CSS

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: '--font-inter' });
const teko = Teko({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: '--font-teko' });

export const metadata = {
  title: "X Cup Manager | Web3 Football",
  description: "X Cup Manager — The world's first AAA Web3 Football Manager on X Layer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body suppressHydrationWarning={true} className={`${inter.variable} ${teko.variable} font-sans antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
