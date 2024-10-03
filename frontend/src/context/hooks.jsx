import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { TasksContext } from "./TasksContext";

export const useAuthContext = () => useContext(AuthContext);

export const useTaskContext = () => useContext(TasksContext);
