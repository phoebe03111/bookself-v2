import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/App.scss";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import BooksPage from "./pages/BooksPage/BooksPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#33413c",
    },
    secondary: {
      main: "#a50000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Header />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
