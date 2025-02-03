import { useGetAllProductsQuery } from "@/redux/features/admin/product.api";

const AllProducts = () => {
  const { data: products } = useGetAllProductsQuery(undefined);
  console.log(products);
  return (
    <div>
      <h1>All Products Page</h1>
    </div>
  );
};

export default AllProducts;
