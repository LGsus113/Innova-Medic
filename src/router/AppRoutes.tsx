import { Routes, Route } from "react-router-dom";
import PrivateRoute from "@src/context/PrivateRoute";

import App from "@src/pages/App";
import Home from "@src/pages/Home";
import Profile from "@src/pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
