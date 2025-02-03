/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["products"],
      transformResponse: (response: TResponseRedux<any>) => {
        // console.log("Inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteSingleProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: (args) => ({
        url: `/products/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    // getAllAcademicFaculty: builder.query({
    //   query: () => {
    //     return {
    //       url: "/academic-faculties",
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
    //     // console.log("Inside redux", response);
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    // addAcademicFaculty: builder.mutation({
    //   query: (data) => ({
    //     url: "/academic-faculties/create-academic-faculty",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // getAllAcademicDepartment: builder.query({
    //   query: () => {
    //     return {
    //       url: "/academic-departments",
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
    //     // console.log("Inside redux", response);
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    // addAcademicDepartment: builder.mutation({
    //   query: (data) => ({
    //     url: "/academic-departments/create-academic-department",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteSingleProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery,
} = productManagementApi;
