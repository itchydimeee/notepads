import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Preloader from "./components/preloader";
import Nav from "./components/nav";
import "./preloader.css";
import "./nav.css";

// Fonts are SELF-HOSTED latin subsets (next/font/local) — the intermittent
// "Failed to download Gaegu from Google Fonts" build/proxy warning made
// every build depend on fonts.googleapis.com. Same files Google serves for
// subsets: ["latin"] (OFL license), same --font-fredoka / --font-gaegu vars.
const fredoka = localFont({
  src: "./fonts/fredoka-latin-var.woff2",
  variable: "--font-fredoka",
  weight: "300 700",
  display: "swap",
});

const gaegu = localFont({
  src: [
    { path: "./fonts/gaegu-400-latin.woff2", weight: "400" },
    { path: "./fonts/gaegu-700-latin.woff2", weight: "700" },
  ],
  variable: "--font-gaegu",
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
      <body className={`${fredoka.variable} ${gaegu.variable}`}>
        <Preloader />
        <Nav />
        {children}
      </body>
    </html>
  );
}
