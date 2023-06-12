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
  }),
});

export const { useGetBooksQuery } = bookSlice;
