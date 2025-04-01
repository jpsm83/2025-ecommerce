import { toast } from "react-toastify";
import { Button } from "./ui/button";

const NewsletterBox = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info("You been subscribed")
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>
      <form
        action=""
        onSubmit={submitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none"
        />
        <Button type="submit">SUBSCRIBE</Button>
      </form>
    </div>
  );
};

export default NewsletterBox;
