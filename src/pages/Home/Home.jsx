import Hero from "./components/hero";
import Section3 from "./components/section-3";
import Section4 from "./components/section-4";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500">
      <Hero />
      <Section3 />
      <Section4 />
    </div>
  );
}

export default Home; 