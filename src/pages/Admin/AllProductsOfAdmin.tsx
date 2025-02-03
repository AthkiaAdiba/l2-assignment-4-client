/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteSingleProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/admin/product.api";
import { TProduct } from "@/types/product.type";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AllProductsOfAdmin = () => {
  const { data: allProducts } = useGetAllProductsQuery(undefined);
  const [deleteProduct] = useDeleteSingleProductMutation();
  const products = allProducts?.data;

  const handleProductDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Product...", { duration: 2000 });

    try {
      const res = await deleteProduct(id);
      //   console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold pb-10 text-center">All Products</h1>
      <div className="mr-2 lg:mr-5 overflow-x-auto">
        <Table className="border-2 mb-5 lg:mb-10">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: TProduct) => (
              <TableRow key={product._id}>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {product.name}
                </TableCell>
                <TableCell>
                  <img src={product.image} alt="" className="w-14 h-14" />
                </TableCell>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {product.brand}
                </TableCell>
                <TableCell className="text-2xl md:text-xs lg:text-base">
                  {product.price}
                </TableCell>
                <TableCell className="uppercase text-2xl md:text-xs lg:text-base">
                  {product.category}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/allProducts/${product._id}`}>
                    <Button>Update</Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleProductDelete(product._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllProductsOfAdmin;
