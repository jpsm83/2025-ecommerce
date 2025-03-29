import getAllProducts from "@/api/getAllProducts";
import { useParams } from "react-router-dom";

function Product() {
  const { productId } = useParams();

  const getProductById = getAllProducts(Number(productId), "", 0, 0, "")

  console.log(getProductById);

  return (
    <div>Product</div>
  )
}

export default Product