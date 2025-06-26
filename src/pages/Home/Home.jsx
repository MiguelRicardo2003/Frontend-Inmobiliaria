import Hero from "./components/hero";
import Categories from "./components/categories";
import Section3 from "./components/section-3";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500">
      <Hero />
      <Categories />
      <Section3 />
    </div>
  );
}

export default Home; 