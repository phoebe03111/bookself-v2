import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
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
    <>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <ThemeProvider theme={theme}>
          <Header />
          <Outlet />
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
