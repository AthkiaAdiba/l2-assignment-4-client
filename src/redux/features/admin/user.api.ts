import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    updateSingleUser: builder.mutation({
      query: (args) => ({
        url: `/users/${args.userId}/user-data`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["users"],
    }),
    updateUserStatus: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} = userApi;
