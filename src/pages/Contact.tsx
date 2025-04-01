import Title from "@/components/Title";
import contactUsImage from "../assets/contact-us.jpg";
import { Button } from "@/components/ui/button";
import NewsletterBox from "@/components/NewsletterBox";
import { toast } from "react-toastify";

const Contact = () => {
  return (
    <>
      <div className="text-center text-2xl pt-10">
        <Title text1="CONTACT" text2="US" />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:w-1/2 md:max-x-[480px]"
          src={contactUsImage}
          alt="Contact us image"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Joao Machado</p>
          <p className="text-gray-500">
            Carrer Mallorca 587
            <br />
            Principal 1
          </p>
          <p className="text-gray-500">
            Phone: +34 615 055 703
            <br />
            Email: jpsm83@hotmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at our store
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <Button onClick={() => toast.info("Explore new jobs page under development")}>Explore Jobs</Button>
        </div>
      </div>
      <NewsletterBox />
    </>
  );
};

export default Contact;
