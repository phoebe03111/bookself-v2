import { BOOKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const bookSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: BOOKS_URL,
      }),
      providesTags: ["Books"],
    }),

    addBook: builder.mutation({
      query: (data) => ({
        url: BOOKS_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = bookSlice;
