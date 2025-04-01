import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden gap-10">
      <h1 className="text-2xl font-bold">404 Not Found</h1>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </div>
  );
};

export default NotFoundPage;
