import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/admin/product.api";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const { data: product } = useGetSingleProductQuery(productId);
  const [updateProduct] = useUpdateProductMutation();

  console.log(product?.data);

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center pb-5">Add Product</h1>
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="bg-white mx-auto p-6 rounded-lg shadow-md w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Field 1 */}
            <div>
              <Label htmlFor="name">Product Name:</Label>
              <Input
                type="text"
                id="name"
                placeholder="Product Name"
                // {...register("name")}
              />
            </div>

            {/* Field 2 */}
            <div>
              <Label htmlFor="category">Category:</Label>
              <Select
              // onValueChange={(value) => setValue("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="pen">Pen</SelectItem>
                    <SelectItem value="notebook">Notebook</SelectItem>
                    <SelectItem value="desk accessory">
                      Desk Accessory
                    </SelectItem>
                    <SelectItem value="markers & highlighter">
                      Markers & Highlighter
                    </SelectItem>
                    <SelectItem value="frame">Frame</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Field 3 */}
            <div>
              <Label htmlFor="product title">Product Title:</Label>
              <Input
                type="text"
                id="title"
                placeholder="Title"
                // {...register("title")}
              />
            </div>

            {/* Field 4 */}
            <div>
              <Label htmlFor="price">Price:</Label>
              <Input
                type="number"
                id="price"
                placeholder="Price"
                // {...register("price")}
              />
            </div>

            {/* Field 5 */}
            <div>
              <Label htmlFor="quantity">Quantity:</Label>
              <Input
                type="number"
                id="quantity"
                placeholder="Quantity"
                // {...register("quantity")}
              />
            </div>

            {/* Field 6 */}
            <div>
              <Label htmlFor="brand">Brand:</Label>
              <Input
                type="text"
                id="brand"
                placeholder="Brand"
                // {...register("brand")}
              />
            </div>

            {/* Field 7 */}
            <div>
              <Label htmlFor="description">Description:</Label>
              <Textarea
                placeholder="Write product description"
                // {...register("description")}
              />
            </div>

            {/* Field 8 */}
            <div>
              <Label htmlFor="file">Picture:</Label>
              <Input
                type="file"
                id="file"
                // {...register("file")}
              />
            </div>

            {/* Field 9 */}
            <div>
              <Label htmlFor="brand">Author:</Label>
              <Input
                type="text"
                id="author"
                placeholder="Author"
                // {...register("author")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
