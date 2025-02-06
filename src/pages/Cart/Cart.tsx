import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetSingleUserQuery } from "@/redux/features/admin/user.api";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrdersMutation } from "@/redux/features/order/order.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Cart = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  // const user = useAppSelector(selectCurrentUser);
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrdersMutation();
  const { data: userData } = useGetSingleUserQuery(undefined);
  const user = userData?.data;

  console.log(address);
  console.log(phone);
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    setAddress(data.address);
    setPhone(data.phone);
  };

  const handlePlaceOrder = async () => {
    await createOrder({
      products: cartData.items,
      address,
      phone,
      name: user?.name,
      email: user?.email,
    });
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        window.location.href = data?.data?.payment?.checkout_url;
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  return (
    <div className="flex flex-col md:flex-row lg:flex-row sm:gap-5 lg:gap-14 px-2 md:px-6 xl:px-28 pt-14">
      <div className="flex-1">
        <h1 className="text-4xl font-semibold mb-10">Your Cart</h1>
        <div>
          {cartData?.items?.length > 0 ? (
            <div>
              {cartData?.items?.map((item) => (
                <div key={item.product}>
                  <div className="mb-10 flex justify-between">
                    <div className="flex flex-col md:flex-row lg:flex-row gap-3 lg:gap-9">
                      <img
                        src={item.image}
                        alt=""
                        className="h-36 w-36 bg-[#f0e7d8]"
                      />
                      <div className="space-y-2">
                        <h1 className="text-xl font-semibold">{item.name}</h1>
                        <h1 className="text-xl font-semibold pb-0 md:pb-10 lg:pb-10">
                          {item.category}
                        </h1>
                        <h1
                          onClick={() => dispatch(removeFromCart(item.product))}
                          className="underline"
                        >
                          Remove
                        </h1>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold mb-5">
                        ${(item.quantity * item.price).toFixed(2)}
                      </h1>
                      {/* Buttons */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.product,
                                quantity: Math.max(item.quantity - 1, 1),
                              })
                            )
                          }
                          className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.product,
                                quantity: Math.min(
                                  item.quantity + 1,
                                  item.stock
                                ),
                              })
                            )
                          }
                          className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 mb-10 h-px flex-1 bg-gray-300"></div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-3xl">Your cart is empty.</p>
          )}
        </div>
      </div>
      {/* summery cart */}
      <div>
        {/* form div */}
        <div className="bg-[#f4eee0] p-5 mb-10 space-y-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="name" className="text-xl font-semibold">
              Name:
            </Label>
            <Input
              className="bg-white rounded-none shadow-md mt-2"
              type="text"
              id="name"
              defaultValue={user?.name}
              disabled={true}
            />
            <Label htmlFor="email" className="text-xl font-semibold">
              Email:
            </Label>
            <Input
              className="bg-white rounded-none shadow-md mt-2"
              type="email"
              id="email"
              defaultValue={user?.email}
              disabled={true}
            />
            <Label htmlFor="address" className="text-xl font-semibold">
              Shipping Address:
            </Label>
            <Input
              className="bg-white rounded-none shadow-md mt-2"
              type="text"
              id="address"
              defaultValue={user?.address}
              {...register("address")}
            />
            <Label htmlFor="phone" className="text-xl font-semibold">
              Phone:
            </Label>
            <Input
              className="bg-white rounded-none shadow-md mt-2"
              type="number"
              id="phone"
              defaultValue={user?.phone}
              {...register("phone")}
            />
            <Button type="submit" className="mt-5 w-full rounded-none">
              Update Information
            </Button>
          </form>
        </div>

        {/* order summery */}
        <div className="bg-[#fffefa] p-5 md:w-[260px] lg:w-[350px] space-y-4">
          <h1 className="text-2xl font-semibold">Order Summery</h1>
          <p className="text-lg">{cartData?.totalQuantity} items</p>
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <p>${cartData.totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-10 mb-10 h-px flex-1 bg-gray-300"></div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-semibold">
              ${cartData.totalPrice.toFixed(2)}
            </p>
          </div>
          <Button onClick={handlePlaceOrder} className="rounded-none w-full">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
