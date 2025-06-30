import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@src/context/AuthContext";
import AppRoutes from "@src/router/AppRoutes";
import "@src/style/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root' en el HTML.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  </StrictMode>
);
