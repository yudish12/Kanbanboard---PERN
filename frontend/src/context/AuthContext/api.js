import { config } from "../../config";
export const getUserApi = async (token) => {
  try {
    const res = await fetch(`${config.apiUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const loginApi = async (email, password) => {
  try {
    const res = await fetch(`${config.apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message };
    }
    console.log(data);
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const signupApi = async (email, password, first_name, last_name) => {
  try {
    const res = await fetch(`${config.apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const googleAuth = async (code) => {
  try {
    const res = await fetch(`${config.googleAuthUrlProd}?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return { success: false, error: data.message };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
