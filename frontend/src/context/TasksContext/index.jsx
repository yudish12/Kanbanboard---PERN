/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from "react";
import {
  addTaskApi,
  deleteTaskApi,
  getTasksApi,
  reorderTaskApi,
  updateTaskApi,
} from "./api";
import { localStorageGet } from "../../utils/localstorage";

export const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorageGet("user");

  const getTasks = async () => {
    const response = await getTasksApi();
    if (!response.success) {
      alert("Error getting tasks!! check logs");
      setLoading(false);
      return;
    }
    setTasks(response.data.data);
    setLoading(false);
  };

  const addTask = async (task) => {
    setLoading(true);
    const response = await addTaskApi({
      ...task,
      order: (tasks?.tasks?.length ?? 0) + 1,
    });
    if (response.success) {
      getTasks();
      return response;
    }
    setLoading(false);
    return response;
  };

  const removeTask = async (taskid) => {
    const response = await deleteTaskApi(taskid);
    if (response.success) {
      getTasks();
      return response;
    }
  };

  const updateTask = async (newData) => {
    setLoading(true);
    const response = await updateTaskApi(newData);
    if (response.success) {
      getTasks();
      setLoading(false);
      return response;
    }
    setLoading(false);
  };

  const updateBoard = async (taskId, newColumn, newOrder) => {
    // Update task state optimistically
    setTasks((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));

      const task = temp.find((t) => t.id.toString() === taskId.toString());
      const sourceColumn = task.status;
      const sourceOrder = task.order;

      if (sourceColumn === newColumn) {
        // Moving within the same column
        if (newOrder > sourceOrder) {
          // Task moved down in the same column
          temp.forEach((t) => {
            if (
              t.status === sourceColumn &&
              t.order > sourceOrder &&
              t.order <= newOrder
            ) {
              // Decrement the order of tasks between the old and new positions
              t.order -= 1;
            }
          });
        } else if (newOrder < sourceOrder) {
          // Task moved up in the same column
          temp.forEach((t) => {
            if (
              t.status === sourceColumn &&
              t.order >= newOrder &&
              t.order < sourceOrder
            ) {
              console.log(t);
              // Increment the order of tasks between the new and old positions
              t.order += 1;
            }
          });
        }
      } else {
        // Moving between different columns
        // Decrease order of tasks in the source column
        temp.forEach((t) => {
          if (t.status === sourceColumn && t.order > sourceOrder) {
            t.order -= 1;
          }
        });

        // Increase order of tasks in the destination column
        temp.forEach((t) => {
          if (t.status === newColumn && t.order >= newOrder) {
            t.order += 1;
          }
        });
      }
      // Update the task's column and order optimistically
      task.status = newColumn;
      task.order = newOrder;
      temp.sort((a, b) => a.order - b.order);
      return temp;
    });

    // Call the backend API to persist changes
    const response = await reorderTaskApi({
      newOrder,
      taskId,
      newStatus: newColumn,
    });

    // If the API fails, revert the changes
    if (!response.success) {
      getTasks();
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    getTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        removeTask,
        getTasks,
        updateTask,
        setTasks,
        updateBoard,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
