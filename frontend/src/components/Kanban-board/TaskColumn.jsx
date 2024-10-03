/* eslint-disable react/prop-types */
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

const TaskColumn = ({ column, tasks, onDelete, onEdit }) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-4 w-full">
      <h3 className="text-lg font-semibold mb-4">{column}</h3>
      <Droppable droppableId={column}>
        {(provided) => (
          <div
            className="flex flex-col min-h-[100px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks?.map((task, index) => (
              <TaskItem
                key={task.id.toString()} // Ensure task.id is a string
                task={task}
                index={index}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
