/* eslint-disable react/prop-types */
const FormSelectRow = ({
  options = [],
  labelText = "",
  name = "",
  value,
  handleChange,
}) => {
  return (
    <div className={`flex gap-2 items-center `}>
      {labelText && (
        <label htmlFor={name} className={`font-semibold text-black `}>
          {labelText}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={`rounded-md border focus:border focus:outline-none md:min-w-[200px] min-w-[80px] text-black bg-white p-2`}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelectRow;
