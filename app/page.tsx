import Hero from "./components/hero";
import About from "./components/about";
import Menu from "./components/menu";
import Place from "./components/place";
import Saturdays from "./components/saturdays";
import Reviews from "./components/reviews";
import Visit from "./components/visit";
import Footer from "./components/footer";
import Chatbot from "./components/chatbot";

export default function Home() {
  return (
    <>
      {/* T13 — skip-to-content: the FIRST focusable element on the page.
          Styles in globals.css (`.skip-link`); target = the one <main> below. */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* T13 — main landmark wraps ONLY the content chain; Nav (header) and
          the Notey chatbot (dialog/complementary stack) stay outside it. */}
      <main id="main">
        <Hero />
        <About />
        <Menu />
        <Place />
        <Saturdays />
        <Reviews />
        <Visit />
        <Footer />
      </main>
      <Chatbot />
    </>
  );
}
