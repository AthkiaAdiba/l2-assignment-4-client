/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateProductMutation } from "@/redux/features/admin/product.api";
import { Label } from "@radix-ui/react-label";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProducts = () => {
  const [addProduct] = useCreateProductMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const toastId = toast.loading("Adding Product", { duration: 2000 });

    if (
      !data?.file ||
      !(data.file instanceof FileList) ||
      data.file.length === 0
    ) {
      toast.error("Please Provide Product Picture", {
        id: toastId,
        duration: 2000,
      });
      return;
    }

    const imageData = new FormData();
    const rowImage = data?.file[0];
    // console.log(rowImage);
    imageData.append("file", rowImage);
    imageData.append("upload_preset", upload_preset);
    imageData.append("cloud_name", cloud_name);
    // console.log(rowImage);

    const imageUploadResult = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: imageData,
      }
    );

    const uploadedImage = await imageUploadResult.json();

    // uploading product data
    if (uploadedImage.url) {
      // productData
      const productData = {
        name: data.name,
        title: data.title,
        brand: data.brand,
        price: Number(data.price),
        category: data.category,
        description: data.description,
        quantity: Number(data.quantity),
        image: uploadedImage.url,
      };

      // uploading product
      try {
        const res = await addProduct(productData);
        // console.log(res);
        if ("error" in res && res.error) {
          const errorMessage =
            (res.error as any)?.data?.message || "An error occurred";
          toast.error(errorMessage, { id: toastId });
        } else {
          toast.success(res?.data?.message, { id: toastId });
          reset();
        }
      } catch (error: any) {
        toast.error(error.data.message, { id: toastId, duration: 2000 });

        reset();
      }
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center pb-5">Add Product</h1>
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500">Product Name is required!</p>
              )}
            </div>

            {/* Field 2 */}
            <div>
              <Label htmlFor="category">Category:</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
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
              {errors.category && (
                <p className="text-red-500">Category is required!</p>
              )}
            </div>
            {/* Field 3 */}
            <div>
              <Label htmlFor="product title">Product Title:</Label>
              <Input
                type="text"
                id="title"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">Title is required!</p>
              )}
            </div>

            {/* Field 4 */}
            <div>
              <Label htmlFor="price">Price:</Label>
              <Input
                type="number"
                id="price"
                placeholder="Price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500">Price is required!</p>
              )}
            </div>

            {/* Field 5 */}
            <div>
              <Label htmlFor="quantity">Quantity:</Label>
              <Input
                type="number"
                id="quantity"
                placeholder="Quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <p className="text-red-500">Quantity is required!</p>
              )}
            </div>

            {/* Field 6 */}
            <div>
              <Label htmlFor="brand">Brand:</Label>
              <Input
                type="text"
                id="brand"
                placeholder="Brand"
                {...register("brand", { required: true })}
              />
              {errors.brand && (
                <p className="text-red-500">Brand is required!</p>
              )}
            </div>

            {/* Field 7 */}
            <div>
              <Label htmlFor="description">Description:</Label>
              <Textarea
                placeholder="Write product description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500">Description is required!</p>
              )}
            </div>

            {/* Field 8 */}
            <div>
              <Label htmlFor="file">Picture:</Label>
              <Input
                type="file"
                id="file"
                {...register("file", { required: true })}
              />
              {errors.file && <p className="text-red-500">File is required!</p>}
            </div>

            {/* Field 9 */}
            <div>
              <Label htmlFor="brand">Author:</Label>
              <Input
                type="text"
                id="author"
                placeholder="Author"
                {...register("author")}
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

export default AddProducts;
