/* eslint-disable react/prop-types */
import FormRow from "../Form-components/FormRow";
import FormSelectRow from "../Form-components/FormSelectRow";
import { config } from "../../config";

const BoardForm = ({ taskData, setTaskData }) => {
  const { title, description, status } = taskData;

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative">
      <form className="flex flex-col gap-2">
        <FormRow
          value={title}
          label="Title"
          type={"text"}
          name={"title"}
          labelText="Enter title"
          handleChange={handleChange}
        />
        <FormRow
          value={description}
          label="Description"
          type={"text"}
          name={"description"}
          labelText="Enter description"
          handleChange={handleChange}
        />
        {status && (
          <FormSelectRow
            options={Object.values(config.task_statuses).map((status) => ({
              value: status,
              label: status,
            }))}
            labelText="Status"
            name="status"
            value={status}
            handleChange={handleChange}
          />
        )}
      </form>
    </div>
  );
};

export default BoardForm;
