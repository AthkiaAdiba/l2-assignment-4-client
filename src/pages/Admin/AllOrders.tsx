/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/order.api";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

const AllOrders = () => {
  const { data: ordersData, isLoading } = useGetAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const allOrders = ordersData?.data;

  const handleUpdateOrderStatusToShipping = async (OrderId: string) => {
    const toastId = toast.loading("Updating Order Status...", {
      duration: 2000,
    });

    try {
      const res = await updateOrderStatus(OrderId);
      // console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  const handleDeleteOrder = async (OrderId: string) => {
    const toastId = toast.loading("Deleting Order...", {
      duration: 2000,
    });

    try {
      const res = await deleteOrder(OrderId);
      console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <div className="px-2 md:px-6 xl:px-14 mb-10">
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

      {allOrders?.length > 0 ? (
        <div>
          {allOrders?.map((item: any) => (
            <div
              key={item?._id}
              className="flex flex-col md:flex-row lg:flex-row justify-between mb-10 shadow-md border-2 rounded-md p-6"
            >
              {/* 1st column */}
              <div>
                <div>
                  <h1 className="text-2xl font-semibold mb-3">
                    User Information
                  </h1>
                  <div className="space-y-1">
                    <p>
                      <span className="text-base font-semibold">User Id:</span>{" "}
                      {item.user}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        User Name:
                      </span>
                      {item?.name}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        User Email:
                      </span>
                      {item?.email}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        User Address:
                      </span>
                      {item?.address}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        User Phone:
                      </span>
                      {item?.phone}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Order Date:
                      </span>
                      {new Date(item?.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Last Updated:
                      </span>
                      {new Date(item?.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h1 className="text-2xl font-semibold mb-3">Products</h1>
                  {item?.products?.map((productId: any, i: number) => (
                    <p key={i}>
                      <span className="text-base font-semibold mr-1">
                        ProductId:
                      </span>
                      {productId?.product},{" "}
                      <span className="text-base font-semibold mr-1">
                        Quantity:
                      </span>
                      {productId?.quantity}
                    </p>
                  ))}
                </div>
              </div>
              {/* 2nd column */}
              <div>
                {/*  */}
                <div>
                  <h1 className="text-2xl font-semibold mb-3 mt-3">
                    Shipping Information
                  </h1>
                  <div className="space-y-1">
                    <p>
                      <span className="text-base font-semibold mr-1">
                        User Name:
                      </span>
                      {item?.name}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        User Email:
                      </span>
                      {item?.email}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Address:
                      </span>
                      {item?.shippingAddress}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Phone:
                      </span>
                      {item?.shippingPhone}
                    </p>
                  </div>
                  <h1 className="text-xl font-semibold mb-3 mt-3">
                    Give The Product To Shipping
                  </h1>
                  <Button
                    onClick={() => handleUpdateOrderStatusToShipping(item?._id)}
                    className="rounded-none"
                  >
                    Shipping
                  </Button>
                  <h1 className="text-xl font-semibold mb-3 mt-3">
                    Delete The Order
                  </h1>
                  <Button
                    onClick={() => handleDeleteOrder(item?._id)}
                    className="rounded-none"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              {/* 3nd column */}
              <div>
                <div>
                  <h1 className="text-2xl font-semibold mb-3">Order Summery</h1>
                  <div className="space-y-1">
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Total Price:
                      </span>
                      {item?.totalPrice}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Status:
                      </span>
                      <span
                        className={`${
                          item?.orderStatus === "Pending"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        } p-1 rounded-sm`}
                      >
                        {item?.orderStatus}
                      </span>
                    </p>
                  </div>
                </div>
                {/*  */}
                <div>
                  <h1 className="text-2xl font-semibold mb-3 mt-3">
                    Transaction Details
                  </h1>
                  <div className="space-y-1">
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Transaction Id:
                      </span>
                      {item?.transaction?.id}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Bank Status:
                      </span>
                      {item?.transaction?.bank_status}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Transaction Date:
                      </span>
                      {new Date(item?.transaction?.date_time).toLocaleString()}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Transaction Method:
                      </span>
                      {item?.transaction?.method}
                    </p>
                    <p>
                      <span className="text-base font-semibold mr-1">
                        Transaction Message:
                      </span>
                      {item?.transaction?.sp_message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex items-center justify-center font-bold text-2xl">
          There is no order
        </p>
      )}
    </div>
  );
};

export default AllOrders;
