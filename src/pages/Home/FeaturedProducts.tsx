import Product from "@/components/layout/Product";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/admin/product.api";
import { TProduct } from "@/types/product.type";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { data: allProducts } = useGetAllProductsQuery(undefined);
  const products = allProducts?.data.slice(0, 6);

  console.log(allProducts?.data.slice(0, 6));
  return (
    <div className="px-2 md:px-6 xl:px-28 pt-40">
      <h1 className="text-4xl font-semibold text-center pb-10">
        DESIGNED by us, PERSONALIZED by you.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
        {products?.map((product: TProduct) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      <div className="mx-auto flex justify-center">
        <Link to="/allProducts">
          <Button>All Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
