/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toggleLoginForm, setToggleLoginForm] = useState(false);
  const form = useForm();
  const [login] = useLoginMutation();
  const disPatch = useAppDispatch();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Logging in", { duration: 2000 });

    try {
      const res = await login(data).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;

      disPatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });

      navigate(from, { replace: true });
      // navigate(`/${user.role}/dashboard`);

      form.reset();
    } catch (error: any) {
      // console.log(error.data.message);
      toast.error(error.data.message, { id: toastId, duration: 2000 });

      form.reset();
    }
  };

  return (
    <div className="bg-[#faf7f0] h-screen">
      <div className="space-y-5 max-w-md mx-auto pt-14">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">
                    Email:
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white rounded-none shadow-md"
                      placeholder="Your Email"
                      type="email"
                      {...field}
                      value={field.value || ""}
                      {...register("email", { required: true })}
                    />
                  </FormControl>
                  {/* Show error message */}
                  {errors.email && (
                    <p className="text-red-500">Email is required</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-xl font-semibold">
                      Password:
                    </FormLabel>
                    <p
                      className="underline"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      Show Password
                    </p>
                  </div>
                  <FormControl>
                    <Input
                      className="bg-white rounded-none shadow-md"
                      placeholder="Your Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      value={field.value || ""}
                      {...register("password", { required: true })}
                    />
                  </FormControl>
                  {/* Show error message */}
                  {errors.password && (
                    <p className="text-red-500">Password is required</p>
                  )}
                </FormItem>
              )}
            />
            <p className="underline">Forgotten your password?</p>
            <DialogFooter>
              <Button type="submit" className="mx-auto w-full">
                Log In
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-300"></div>
          <p className="text-lg">Sign up or log in with</p>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-6">
          <button className="flex items-center gap-2 border px-16 py-2 bg-white text-center">
            <FcGoogle /> Google
          </button>
          <button className="flex items-center gap-2 border px-16 py-2 bg-white">
            <FaFacebookF /> Facebook
          </button>
        </div>
        <div className="mx-auto">
          <h3 className="text-lg font-medium text-center">New to Papier?</h3>
          <p
            className="underline text-center"
            onClick={() => setToggleLoginForm(!toggleLoginForm)}
          >
            Create an account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
