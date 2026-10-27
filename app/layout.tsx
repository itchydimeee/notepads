import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./fonts/gaegu.css";
import Preloader from "./components/preloader";
import Nav from "./components/nav";
import "./preloader.css";
import "./nav.css";

// Fredoka is SELF-HOSTED (next/font/local, complete latin variable file).
// Gaegu is self-hosted too but as **multi-slice @font-face** (app/fonts/gaegu.css):
// Google shards Gaegu's Latin across several woff2 files per weight — the
// "latin" slice alone is MISSING the glyphs H, I, M, N, 9 and ’ (they live in
// slices 117/118/99). Referencing one slice left the nav "Menu" M falling back
// to another font (different weight/size). gaegu.css ships the needed slices
// with their unicode-ranges so the browser reassembles the face exactly like
// Google's hosted CSS. --font-gaegu is defined in globals.css.
const fredoka = localFont({
  src: "./fonts/fredoka-latin-var.woff2",
  variable: "--font-fredoka",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NotePads Study Hub Cafe · Iloilo City",
  description:
    "NotePads Study Hub Cafe in Mandurriao, Iloilo City — where learning meets comfort. Coffee, hearty meals, study spaces with free Wi-Fi & charging, and Saturday kids workshops.",
};

export const viewport: Viewport = {
  themeColor: "#1c3aae",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fredoka.variable}>
        <Preloader />
        <Nav />
        {children}
      </body>
    </html>
  );
}
