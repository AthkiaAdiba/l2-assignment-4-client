import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGetAllProductsQuery } from "@/redux/features/admin/product.api";
import { TProduct } from "@/types/product.type";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const params = [
    searchTerm && { name: "searchTerm", value: searchTerm },
    category && { name: "category", value: category },
    price > 0 && { name: "price", value: price.toString() },
  ].filter(Boolean); // Remove undefined values

  // console.log(params);
  const { data: productsData, isLoading } = useGetAllProductsQuery(
    params.length > 0 ? params : undefined
  );

  const products = productsData?.data;

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

      <div className="flex flex-col md:flex-row lg:flex-row gap-10 px-2 md:px-6 xl:px-28 pt-14">
        {/* search and filter sidebar */}
        <div className="lg:w-[500px] space-y-5">
          <h1 className="text-2xl font-semibold">Search</h1>
          <div className="flex w-full max-w-sm items-center">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Filter</h1>
            <hr className="border-t border-gray-300 my-4" />
            <h1 className="text-xl font-semibold mb-2">Price</h1>
            <Slider
              className="mb-4"
              defaultValue={[200]} // Default price
              min={0} // Minimum value
              max={500} // Maximum value
              step={2} // Step size
              onValueChange={(value) => setPrice(value[0])}
            />
            <h1 className="text-lg font-semibold mb-2">Category</h1>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="pen">Pen</SelectItem>
                  <SelectItem value="notebook">Notebook</SelectItem>
                  <SelectItem value="desk accessory">Desk Accessory</SelectItem>
                  <SelectItem value="markers & highlighter">
                    Markers & Highlighter
                  </SelectItem>
                  <SelectItem value="frame">Frame</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* card div */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product: TProduct) => (
            <div key={product._id} className="pb-10">
              <img
                src={product?.image}
                alt=""
                className="bg-[#f5eede] sm:w-full h-[300px]"
              />
              <div className="space-y-2 lg:px-2 mt-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-medium">{product?.name}</h1>
                  <h1 className="text-2xl">
                    <span className="font-semibold">Price:</span> $
                    {product?.price}
                  </h1>
                </div>
                <h1 className="text-2xl">
                  <span className="font-semibold">Category: </span>
                  {product?.category}
                </h1>
              </div>
              <Link to={`/allProducts/${product?._id}`}>
                <Button className="mt-5">View Details</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
