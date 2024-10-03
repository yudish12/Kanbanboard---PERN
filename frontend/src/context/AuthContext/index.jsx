import React, { useState, useEffect, useCallback } from "react";
import { localStorageGet, localStorageSet } from "../../utils/localstorage";
import { getUserApi, loginApi, signupApi } from "./api";
import { isEmail, isPassword } from "../../utils/validators";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";

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
      alert("Error!! Please check logs");
    }
    console.log(resp);
    setUser(resp.data.data);
    setIsAuthenticated(true);
    setLoading(false);
  }, [token]);

  // Signup Function
  const signupFunc = async (email, password, first_name, last_name) => {
    if (!isEmail(email) || !isPassword(password) || !first_name || !last_name) {
      alert("Please enter all fields");
      return;
    }
    const resp = await signupApi(email, password, first_name, last_name);
    if (!resp.success) {
      alert("Error!! Please check logs");
      return;
    }
    localStorageSet("user", resp.data.token);
    setUser(resp.data.user);
    setIsAuthenticated(true);
  };

  // Login Function
  const loginFunc = async (email, password) => {
    if (!isEmail(email) || !isPassword(password)) {
      alert("Please enter email and password");
      return;
    }
    const resp = await loginApi(email, password);
    if (!resp.success) {
      alert("Error!! Please check logs");
      return;
    }
    localStorageSet("user", resp.data.token);
    setUser(resp.data.user);
    setIsAuthenticated(true);
  };

  // Logout Function
  const logoutFunc = () => {
    localStorageSet("user", null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Google Login Function
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        console.log(authResult.code);
        const result = await googleAuth(authResult.code);
        console.log(result);
        setUser(result.data.user);
        setIsAuthenticated(true);
        localStorageSet("user", result.data.token);
      } else {
        console.log(authResult);
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
