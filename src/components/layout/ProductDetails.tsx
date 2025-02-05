import { useGetSingleProductQuery } from "@/redux/features/admin/product.api";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();
  const product = productData?.data;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        productsTotalPrice: product.price,
        category: product.category,
        quantity: 1,
        stock: product.quantity,
        image: product.image as string,
      })
    );
  };

  return (
    <div>
      {/* Display the loader when loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-5">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#111827"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      <div className="md:w-3/5 lg:w-3/5 xl:w-2/5 mx-auto card bg-base-100 p-2 md:p-4 shadow-xl">
        <figure>
          <img
            className="mx-auto bg-[#f2eadd]"
            src={product?.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body space-y-2">
          <h2 className="card-title text-2xl lg:text-4xl">
            <span className="font-semibold">Product Name:</span> {product?.name}
          </h2>
          <p className="text-2xl">
            <span className="font-semibold">Title:</span> {product?.title}
          </p>
          <p className="text-xl lg:text-2xl dark:text-white">
            <span className="font-semibold">Description:</span>
            {product?.description}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Category:</span> {product?.category}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Price:</span> ${product?.price}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Quantity:</span> {product?.quantity}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Brand:</span> {product?.brand}
          </p>
          <div className="flex justify-end">
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
