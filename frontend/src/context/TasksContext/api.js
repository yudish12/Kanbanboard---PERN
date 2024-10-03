import { config } from "../../config";
import { localStorageGet } from "../../utils/localstorage";

export const getTasksApi = async () => {
  const token = localStorageGet("user");
  try {
    const res = await fetch(`${config.apiUrl}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const addTaskApi = async (task) => {
  const token = localStorageGet("user");
  try {
    const res = await fetch(`${config.apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, error: data.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const updateTaskApi = async (task) => {
  const token = localStorageGet("user");
  try {
    const res = await fetch(`${config.apiUrl}/tasks`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, error: data.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const reorderTaskApi = async (payload) => {
  const token = localStorageGet("user");
  try {
    const res = await fetch(`${config.apiUrl}/tasks/reorder`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, error: data.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const deleteTaskApi = async (taskId) => {
  const token = localStorageGet("user");
  try {
    const res = await fetch(`${config.apiUrl}/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: taskId }),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, error: data.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
