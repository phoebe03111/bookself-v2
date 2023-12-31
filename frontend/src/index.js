import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import store from "./store";
import HomePage from "./pages/HomePage/HomePage";
import BooksPage from "./pages/BooksPage/BooksPage";
import AddBookPage from "./pages/AddBookPage/AddBookPage";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage";
import TrackerPage from "./pages/TrackerPage/TrackerPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:bookId" element={<BookDetailPage />} />
      <Route path="/books/add/:category" element={<AddBookPage />} />
      <Route path="/tracker" element={<TrackerPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
