import Title from "@/components/Title";
import presentImage from "../assets/present.jpg";
import NewsletterBox from "@/components/NewsletterBox";

const About = () => {
  return (
    <>
      <div className="text-2xl text-center pt-8">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={presentImage}
          alt="About image"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
            assumenda recusandae labore necessitatibus culpa cumque sequi.
          </p>
          <p>
            Provident magnam laudantium quo tenetur magni. Vero iste quas
            expedita numquam necessitatibus nihil ullam harum.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius
            dolore maiores consequuntur adipisci molestias fuga dicta optio
            similique rem ratione neque, porro tempora quidem, sunt, expedita
            impedit illo ex tenetur.
          </p>
        </div>
      </div>
      <div className="text-4xl">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurence:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            dolorum ut odio, cum voluptatibus fuga, eveniet aspernatur
            voluptates consequatur numquam.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Quaerat dolorum ut odio, cum voluptatibus fuga, eveniet aspernatur
            voluptates consequatur numquam, dolor tempora sequi sapiente.
            Aliquid, repellat natus? Quam, cumque odio.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            dolorum ut odio, cum voluptatibus fuga, eveniet aspernatur
            voluptates consequatur numquam.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </>
  );
};

export default About;
