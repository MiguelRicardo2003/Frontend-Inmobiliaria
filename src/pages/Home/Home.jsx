import Hero from "./components/hero"
import Section3 from "./components/section-3"
import Section4 from "./components/section-4"
import Categories from "./components/Categories"
import Section7 from "./components/section-7"
import Section5 from "./components/section-5"
import Testimonios from "./components/testimonios"
const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Section3 />
      <Section4 />
      <Section5/>
      <Testimonios/>
      <Section7 />
    </>
  );
}

export default Home; 