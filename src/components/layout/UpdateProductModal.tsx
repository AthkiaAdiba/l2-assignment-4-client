/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateProductMutation } from "@/redux/features/admin/product.api";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

interface UpdateProductModalProps {
  productId?: string;
}

const UpdateProductModal = ({ productId }: UpdateProductModalProps) => {
  //   const { data: gotProduct } = useGetSingleProductQuery(productId);
  const [updateProduct] = useUpdateProductMutation();
  const [open, setOpen] = useState(false);
  //   const product = gotProduct?.data;

  const { register, handleSubmit, setValue, reset } = useForm();

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    // console.log(formData);
    const toastId = toast.loading("Updating Information...", {
      duration: 2000,
    });

    // Remove empty fields
    const updatedData: Record<string, any> = {};
    Object.keys(formData).forEach((key) => {
      if (key === "file") {
        // Check if file exists and has at least one file
        if (formData.file instanceof FileList && formData.file.length > 0) {
          updatedData[key] = formData[key];
        }
      } else if (formData[key] !== "" && formData[key] !== undefined) {
        updatedData[key] = formData[key];
      }
    });

    // console.log(updatedData);

    // Handle Image Upload if file exists
    if (updatedData.file) {
      const imageData = new FormData();
      const rowImage = updatedData.file[0];
      imageData.append("file", rowImage);
      imageData.append("upload_preset", upload_preset);
      imageData.append("cloud_name", cloud_name);

      try {
        const imageUploadResult = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );
        const uploadedImage = await imageUploadResult.json();

        if (uploadedImage.url) {
          updatedData.image = uploadedImage.url; // Store uploaded image URL
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: any) {
        toast.error("Image upload failed!", { id: toastId });
        return;
      }

      delete updatedData.file; // Remove the file field from final data
    }

    // console.log(updatedData);

    // Prepare user data
    const productData = {
      productId,
      data: updatedData,
    };

    // console.log(productData);

    // Send update request
    try {
      const res = await updateProduct(productData);
      console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
        setOpen(false);
        reset();
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-900 text-white">Update Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* field 1 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Product Name:
              </Label>
              <Input
                id="name"
                type="text"
                className="col-span-3"
                {...register("name")}
              />
            </div>
            {/* field 2 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title:
              </Label>
              <Input
                type="text"
                id="title"
                className="col-span-3"
                {...register("title")}
              />
            </div>
            {/* field 3 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand:
              </Label>
              <Input
                type="text"
                id="brand"
                className="col-span-3"
                {...register("brand")}
              />
            </div>
            {/* field 4 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price:
              </Label>
              <Input
                type="number"
                id="price"
                className="col-span-3"
                {...register("price")}
              />
            </div>
            {/* field 5 */}
            <div className="flex items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category:
              </Label>
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
            </div>
            {/* field 6 */}
            <div className="flex items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description:
              </Label>
              <Textarea
                placeholder="Write product description"
                {...register("description")}
              />
            </div>
            {/* field 7 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity:
              </Label>
              <Input
                type="number"
                id="quantity"
                className="col-span-3"
                {...register("quantity")}
              />
            </div>
            {/* field 8 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Product Image:
              </Label>
              <Input
                type="file"
                id="file"
                className="col-span-3"
                {...register("file")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
