import Hero from "./components/hero";
import Section3 from "./components/section-3";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500">
      <Hero />
      <Section3 />
    </div>
  );
}

export default Home; 