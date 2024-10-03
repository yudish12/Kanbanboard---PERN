import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import { useTaskContext } from "../../context/hooks";
import { config } from "../../config";
import { useState } from "react";
import Modal from "../Layout/Modal";
import BoardForm from "./board-form";

const KanbanBoard = () => {
  const { tasks, updateBoard, updateTask, removeTask } = useTaskContext();
  const [taskEdit, setTaskEdit] = useState({
    title: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const todoTasks = tasks?.filter(
    (task) => task.status === config.task_statuses.todo
  );
  const doneTasks = tasks?.filter(
    (task) => task.status === config.task_statuses.done
  );
  const inProgressTasks = tasks?.filter(
    (task) => task.status === config.task_statuses.in_progress
  );

  const handleDelete = (taskId) => {
    removeTask(taskId);
  };

  const handleEdit = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskEdit({
      id: task.id,
      title: task.title,
      description: task.description,
    });
    openModal();
  };

  const updateTaskConfirmed = async () => {
    const task = tasks.find(
      (taskEl) => taskEl.id.toString() === taskEdit.id.toString()
    );
    await updateTask({
      ...task,
      title: taskEdit.title,
      description: taskEdit.description,
    });
    closeModal();
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    updateBoard(draggableId, destination.droppableId, destination.index + 1);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-around space-x-4 mt-8">
        <TaskColumn
          key={config.task_statuses.todo}
          column={config.task_statuses.todo}
          tasks={todoTasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <TaskColumn
          key={config.task_statuses.in_progress}
          column={config.task_statuses.in_progress}
          tasks={inProgressTasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <TaskColumn
          key={config.task_statuses.done}
          column={config.task_statuses.done}
          tasks={doneTasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={updateTaskConfirmed}
      >
        <h2 className="text-xl font-semibold mb-4">Add a new task</h2>
        <BoardForm
          isEditing={false}
          taskData={taskEdit}
          setTaskData={setTaskEdit}
        />
      </Modal>
    </DragDropContext>
  );
};

export default KanbanBoard;
