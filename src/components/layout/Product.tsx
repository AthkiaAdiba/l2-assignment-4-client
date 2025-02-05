import { TProduct } from "@/types/product.type";

const Product = ({ product }: { product: TProduct }) => {
  return (
    <div className="pb-14">
      <img src={product?.image} alt="" className="bg-[#f5eede] w-full" />
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold mt-3">{product?.name}</h3>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default Product;
