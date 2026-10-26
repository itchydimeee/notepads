import type { Metadata, Viewport } from "next";
import { Fraunces, Gaegu } from "next/font/google";
import "./globals.css";
import Preloader from "./components/preloader";
import Nav from "./components/nav";
import "./preloader.css";
import "./nav.css";

// Next 16 type defs allow only ('SOFT' | 'WONK' | 'opsz') for Fraunces axes;
// italics come via style: ["normal", "italic"] instead of an "ital" axis.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  subsets: ["latin"],
});

const gaegu = Gaegu({
  variable: "--font-gaegu",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NotePads Study Hub Cafe · Iloilo City",
  description:
    "NotePads Study Hub Cafe in Mandurriao, Iloilo City — where learning meets comfort. Coffee, hearty meals, study spaces with free Wi-Fi & charging, and Saturday kids workshops.",
};

export const viewport: Viewport = {
  themeColor: "#b85433",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${gaegu.variable}`}>
        <Preloader />
        <Nav />
        {children}
      </body>
    </html>
  );
}
