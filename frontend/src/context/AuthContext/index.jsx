import React, { useState, useEffect, useCallback } from "react";
import { localStorageGet, localStorageSet } from "../../utils/localstorage";
import { getUserApi, loginApi, signupApi } from "./api";
import { isEmail, isPassword } from "../../utils/validators";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { toast } from "react-toastify";

export const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorageGet("user");

  const getUser = useCallback(async () => {
    const resp = await getUserApi(token);
    if (!resp.success) {
      toast.error(resp.error);
      setLoading(false);
    }
    setUser(resp.data.data);
    setIsAuthenticated(true);
    setLoading(false);
  }, [token]);

  // Signup Function
  const signupFunc = async (email, password, first_name, last_name) => {
    if (!isEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!isPassword(password)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!first_name || !last_name) {
      toast.error("Please enter first name and last name");
      return;
    }
    const resp = await signupApi(email, password, first_name, last_name);
    if (!resp.success) {
      toast.error(resp.error);
      setLoading(false);
      return;
    }
    localStorageSet("user", resp.data.token);
    setUser(resp.data.user);
    setIsAuthenticated(true);
    toast.success("Signup successful");
  };

  // Login Function
  const loginFunc = async (email, password) => {
    if (!isEmail(email) || !isPassword(password)) {
      toast.error("Please enter valid email and password");
      return;
    }
    const resp = await loginApi(email, password);
    if (!resp.success) {
      toast.error(resp.error);
      setLoading(false);
      return;
    }
    localStorageSet("user", resp.data.token);
    setUser(resp.data.user);
    setIsAuthenticated(true);
    toast.success("Logged in successfully");
  };

  // Logout Function
  const logoutFunc = () => {
    localStorageSet("user", null);
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  // Google Login Function
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        console.log(authResult.code);
        const result = await googleAuth(authResult.code);
        if (!result.success) {
          toast.error(result.error);
          setLoading(false);
          return;
        }
        setUser(result.data.user);
        setIsAuthenticated(true);
        localStorageSet("user", result.data.token);
        toast.success("Logged in successfully");
      } else {
        console.log(authResult);
        toast.success("Logged in successfully");
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        loginFunc,
        logoutFunc,
        signupFunc,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
