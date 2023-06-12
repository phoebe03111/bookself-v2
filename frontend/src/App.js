import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header/Header";
import "./styles/App.scss";

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
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
