import { useState } from "react";
import KanbanBoard from "../components/Kanban-board/Board";
import Modal from "../components/Layout/Modal";
import BoardForm from "../components/Kanban-board/board-form";
import { useTaskContext } from "../context/hooks";
import FullPageLoader from "../components/Layout/FullPageLoader";
import { config } from "../config";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormdata] = useState({
    title: "",
    description: "",
    status: config.task_statuses.todo,
  });

  const { loading, addTask } = useTaskContext();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addTaskFunc = async () => {
    closeModal();
    const response = await addTask(formData);
    if (!response.success) {
      alert("Error adding task!! check logs");
    } else {
      alert("Task added successfully");
    }
  };

  if (loading) return <FullPageLoader />;

  return (
    <section className="h-full w-full">
      <button
        onClick={openModal}
        className="px-10 rounded-md py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Add Task
      </button>
      <div className="shadow-md rounded-md mt-4 bg-white p-4 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <label className="font-semibold text-black">Search:</label>
          <input
            type="text"
            className="rounded-md border focus:border focus:outline-none md:min-w-[400px] min-w-[200px] text-black bg-white p-2"
          />
        </div>
        {/* Form Select Row replcaement later */}
        <div className="flex gap-2 items-center">
          <label className="font-semibold text-black">Sort by:</label>
          <select className="rounded-md border focus:border focus:outline-none md:min-w-[200px] min-w-[80px] text-black bg-white p-2">
            <option value="1">Priority</option>
            <option value="2">Due Date</option>
            <option value="3">Completed</option>
          </select>
        </div>
      </div>
      <KanbanBoard />
      <Modal isOpen={isModalOpen} onCancel={closeModal} onConfirm={addTaskFunc}>
        <h2 className="text-xl font-semibold mb-4">Add a new task</h2>
        <BoardForm
          isEditing={false}
          taskData={formData}
          setTaskData={setFormdata}
        />
      </Modal>
    </section>
  );
};

export default Home;
