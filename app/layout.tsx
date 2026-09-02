
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gallery Edge | Handcrafted Premium Frames",
  description: "Gallery-quality custom frames, handcrafted from the world's finest materials.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
        style={
          {
            "--font-serif": "var(--font-poppins)",
            "--font-sans": "var(--font-poppins)",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}