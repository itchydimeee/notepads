import Hero from "./components/hero";
import About from "./components/about";
import Menu from "./components/menu";
import Place from "./components/place";
import Saturdays from "./components/saturdays";
import Reviews from "./components/reviews";
import Visit from "./components/visit";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Place />
      <Saturdays />
      <Reviews />
      <Visit />
    </>
  );
}
