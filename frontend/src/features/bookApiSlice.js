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

    getBookById: builder.query({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
      }),
    }),

    addBook: builder.mutation({
      query: (data) => ({
        url: BOOKS_URL,
        method: "POST",
        body: data,
      }),
    }),

    updateBook: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookSlice;
