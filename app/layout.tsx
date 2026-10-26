import type { Metadata, Viewport } from "next";
import { Fredoka, Gaegu } from "next/font/google";
import "./globals.css";
import Preloader from "./components/preloader";
import Nav from "./components/nav";
import "./preloader.css";
import "./nav.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
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
  themeColor: "#3d4bb8",
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
