import React from "react";
import ReactDOM from "react-dom/client";
import "src/MuiClassNameSetup";
import * as Mui from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

// App
import App from "src/App";

// Japanese locale
dayjs.locale(ja);

const theme = Mui.createTheme({
  typography: {
    fontFamily: ["Noto Sans JP", "Roboto", "sans-serif"].join(","),
    body1: {
      fontSize: "1.1rem",
    },
  },
});

const root = ReactDOM.createRoot(
  document.querySelector("body>div") as HTMLElement
);

root.render(
  <Mui.ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Mui.CssBaseline />
      <App />
    </LocalizationProvider>
  </Mui.ThemeProvider>
);
