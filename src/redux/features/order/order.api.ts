import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrders: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `/orders/my-orders`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrdersMutation,
  useGetAllOrdersQuery,
  useVerifyOrderQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = productManagementApi;
