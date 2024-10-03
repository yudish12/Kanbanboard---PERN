import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./context/AuthContext";
import { config } from "./config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TasksProvider from "./context/TasksContext";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={config.googleClientID}>
    <AuthProvider>
      <TasksProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </TasksProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
