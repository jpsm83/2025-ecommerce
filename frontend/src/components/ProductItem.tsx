import { IProduct } from "@/lib/interfaces/IProduct";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image.jpg";

const ProductItem = (props: Partial<IProduct>) => {
  const { id, images, price, title } = props;

  const selectImage: string =
    images?.[0] && !images[0].includes("any")
      ? images[0]
      : noImage;

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img loading="lazy"
          src={selectImage}
          alt={title}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-2 pb-1 text-sm">{title}</p>
      <p className="text-sm font-bold">€{price}</p>
    </Link>
  );
};

export default ProductItem;
