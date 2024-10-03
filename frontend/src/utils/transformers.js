export const transformTasks = (tasksFromBackend) => {
  const tasks = {};
  const columns = {
    "column-1": { id: "column-1", title: "TODO", taskIds: [] },
    "column-2": { id: "column-2", title: "IN PROGRESS", taskIds: [] },
    "column-3": { id: "column-3", title: "DONE", taskIds: [] },
  };

  // Loop through the tasks and process them
  tasksFromBackend.forEach((task) => {
    // Add the task to the tasks map
    tasks[`task-${task.id}`] = {
      id: `task-${task.id}`,
      title: task.title,
      description: task.description,
      createdAt: new Date(task.createdAt).toLocaleString(),
    };

    // Add the task to the appropriate column based on its status
    if (task.status === "TODO") {
      columns["column-1"].taskIds.push(`task-${task.id}`);
    } else if (task.status === "IN_PROGRESS") {
      columns["column-2"].taskIds.push(`task-${task.id}`);
    } else if (task.status === "DONE") {
      columns["column-3"].taskIds.push(`task-${task.id}`);
    }
  });

  // Sort tasks in each column by their 'order' field
  Object.keys(columns).forEach((columnId) => {
    columns[columnId].taskIds.sort((a, b) => {
      const orderA = tasksFromBackend.find(
        (t) => t.id === parseInt(a.split("-")[1])
      ).order;
      const orderB = tasksFromBackend.find(
        (t) => t.id === parseInt(b.split("-")[1])
      ).order;
      return orderA - orderB;
    });
  });

  return {
    tasks,
    columns,
    columnOrder: ["column-1", "column-2", "column-3"],
  };
};
