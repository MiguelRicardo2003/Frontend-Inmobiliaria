import FormSignUp from "../components/FormSignUp";
import HomeButton from "../../../components/ui/HomeButton";

const Register = () => {
  return (
    <main className="relative min-h-screen w-full bg-brand-dark md:bg-transparent">
      <div className="absolute top-6 left-6 z-20">
        {/* <img src="/img/logo_justhome.png" alt="JustHome Logo" className="h-10 w-auto" /> */}
        <HomeButton />
      </div>
      <div className="hidden md:flex items-center justify-start absolute top-0 left-0 w-full h-1/2 bg-brand-dark p-12">
        <img
          src="/img/rocket.png"
          alt="Rocket Launch"
          className="hidden xl:block h-4/5 w-auto object-contain"
        />
      </div>
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-1/2 bg-gray-100" />
      <div className="relative z-10 flex items-center justify-center xl:justify-end min-h-screen px-4 pt-24 pb-10  xl:pr-32">
        <FormSignUp />
      </div>
    </main>
  );
};

export default Register;
