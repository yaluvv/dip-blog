const InputField = ({ type, placeholder }) => {
  return (
    <label>
      <input type={type} placeholder={placeholder} />
    </label>
  );
};

export default InputField;
