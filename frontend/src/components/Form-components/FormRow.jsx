/* eslint-disable react/prop-types */

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        id={name}
        name={name}
        onChange={handleChange}
        className="form-input text-black"
      />
    </div>
  );
};

export default FormRow;
