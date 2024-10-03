/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd";

const TaskItem = ({ task, index, onDelete, onEdit }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-blue-200 p-4 mb-4 rounded-md shadow"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 className="text-lg font-semibold">{task.title}</h4>
          <p className="text-sm text-gray-700">{task.description}</p>
          <small className="block mt-2 text-xs text-gray-500">
            Created at:{" "}
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
          <div className="flex mt-3 space-x-2">
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => onEdit(task.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
