import heroImage from "../assets/present.jpg";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Hero = () => {
  return (
    <div className=" relative flex flex-col sm:flex-row border border-gray-400 mt-10 md:mt-20">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Products
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <img
        loading="lazy"
        className="w-full sm:w-1/2"
        src={heroImage}
        alt="hero"
      />
      <div className="absolute bottom-1 left-1 flex items-center gap-2">
        <a href="https://www.linkedin.com/in/joaopsmachado/" target="_blank">
          <FaLinkedin className="size-8 text-gray-400 hover:scale-110" />
        </a>
        <a href="https://github.com/jpsm83/2025-ecommerce-frontend" target="_blank">
          <FaGithub className="size-8 text-gray-400 hover:scale-110" />
        </a>
        <p>
          ecommerce by <span className="font-extrabold">Joao Machado</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
