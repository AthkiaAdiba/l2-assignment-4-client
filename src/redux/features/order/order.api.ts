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
        url: `/users`,
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
  }),
});

export const {
  useCreateOrdersMutation,
  useGetAllOrdersQuery,
  useVerifyOrderQuery,
} = productManagementApi;
