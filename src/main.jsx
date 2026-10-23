import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ServicesProvider } from "./hooks/useServices";
import "./styles.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ServicesProvider>
      <App />
    </ServicesProvider>
  </BrowserRouter>,
);
