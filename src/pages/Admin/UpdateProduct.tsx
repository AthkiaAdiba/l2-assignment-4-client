import UpdateProductModal from "@/components/layout/UpdateProductModal";
import { useGetSingleProductQuery } from "@/redux/features/admin/product.api";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const { data: gotProduct, isLoading } = useGetSingleProductQuery(productId);
  const product = gotProduct?.data;

  return (
    <div className="px-0 lg:px-[10%] xl:px-[25%] pt-4 lg:pt-5 pb-6">
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

      <div className="card bg-base-100 p-2 md:p-4 shadow-xl">
        <figure>
          <img
            className="w-full h-[250px] lg:h-[400px]"
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
            <UpdateProductModal productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
