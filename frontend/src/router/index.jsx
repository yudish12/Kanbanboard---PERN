import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import AppLayout from "../components/Layout/AppLayout";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <AppLayout>
        <ProtectedRoute outlet={<Home />} />
      </AppLayout>
    ),
  },
  {
    path: "login",
    element: (
      <AppLayout>
        <Login />
      </AppLayout>
    ),
  },
  {
    path: "signup",
    element: (
      <AppLayout>
        <Signup />
      </AppLayout>
    ),
  },
]);
