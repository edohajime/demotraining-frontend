const FormInput = ({ type, name, placeholder, value, onChange }) => {
  return type === "textarea" ? (
    <textarea
      className="form-input"
      name={name}
      id={name}
      value={onChange ? value : undefined}
      onChange={onChange ? onChange : undefined}
      placeholder={placeholder}
    />
  ) : (
    <input
      className="form-input"
      type={type}
      name={name}
      id={name}
      value={onChange ? value : undefined}
      onChange={onChange ? onChange : undefined}
      placeholder={placeholder}
    />
  );
};
export default FormInput;
