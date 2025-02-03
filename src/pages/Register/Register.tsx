/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [addRegister] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onRegister: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const toastId = toast.loading("Registering...", { duration: 2000 });

    if (
      !data?.file ||
      !(data.file instanceof FileList) ||
      data.file.length === 0
    ) {
      toast.error("Please Provide your Picture", {
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

    // uploading registering data
    if (uploadedImage.url) {
      // registerData
      const registerData = {
        name: data.name,
        address: data.address,
        email: data.email,
        password: data.password,
        phone: data.phone,
        image: uploadedImage.url,
      };

      // uploading data
      try {
        const res = await addRegister(registerData);
        // console.log(res);
        if ("error" in res && res.error) {
          const errorMessage =
            (res.error as any)?.data?.message || "An error occurred";
          toast.error(errorMessage, { id: toastId });
        } else {
          toast.success(res?.data?.message, { id: toastId });
          navigate("/login");
          reset();
        }
      } catch (error: any) {
        toast.error(error.data.message, { id: toastId, duration: 2000 });

        reset();
      }
    }
  };

  return (
    <div className="bg-[#faf7f0] min-h-screen">
      <div className="space-y-5 max-w-2xl mx-auto pt-14 p-3 lg:p-0">
        <h1 className="text-center text-3xl font-bold">Create An Account</h1>
        <form
          onSubmit={handleSubmit(onRegister)}
          className="space-y-5 min-w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Field 1 */}
            <div>
              <Label htmlFor="name" className="text-xl font-semibold">
                Name:
              </Label>
              <Input
                className="bg-white rounded-none shadow-md mt-2"
                type="text"
                id="name"
                placeholder="Your Name"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-500">Name is required!</p>}
            </div>

            {/* Field 2 */}
            <div>
              <Label htmlFor="email" className="text-xl font-semibold">
                Email:
              </Label>
              <Input
                className="bg-white rounded-none shadow-md mt-2"
                type="email"
                id="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">Email is required!</p>
              )}
            </div>

            {/* Field 3 */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-xl font-semibold">
                  Password:
                </Label>
                <p
                  className="underline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  Show Password
                </p>
              </div>
              <Input
                className="bg-white rounded-none shadow-md mt-2"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Your Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500">Password is required!</p>
              )}
            </div>

            {/* Field 4 */}
            <div>
              <Label htmlFor="phone" className="text-xl font-semibold">
                Phone Number:
              </Label>
              <Input
                className="bg-white rounded-none shadow-md mt-2"
                type="number"
                id="phone"
                placeholder="Your Phone Number"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <p className="text-red-500">Phone Number is required!</p>
              )}
            </div>

            {/* Field 5 */}
            <div>
              <Label htmlFor="address" className="text-xl font-semibold">
                Address:
              </Label>
              <Input
                className="bg-white rounded-none shadow-md mt-2"
                type="text"
                id="address"
                placeholder="Your Address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p className="text-red-500">Address is required!</p>
              )}
            </div>

            {/* Field 6 */}
            <div>
              <Label htmlFor="file" className="text-xl font-semibold">
                Picture:
              </Label>
              <Input
                className="bg-white rounded-none shadow-md mt-2"
                type="file"
                id="file"
                {...register("file", { required: true })}
              />
              {errors.file && (
                <p className="text-red-500">Picture is required!</p>
              )}
            </div>
          </div>
          {/* Submit Button */}
          <Button type="submit" className="mx-auto w-full">
            Register
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-300"></div>
          <p className="text-lg">Sign up or log in with</p>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-6">
          <button className="flex items-center gap-2 border px-16 py-2 bg-white text-center flex-1">
            <FcGoogle /> Google
          </button>
          <button className="flex items-center gap-2 border px-16 py-2 bg-white flex-1 text-center">
            <FaFacebookF /> Facebook
          </button>
        </div>
        <div className="mx-auto">
          <h3 className="text-lg font-medium text-center">
            Have You a Account?
          </h3>
          <Link to="/login">
            <p className="underline text-center text-lg font-semibold">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
