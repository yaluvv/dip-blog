import styles from "./TextField.module.scss";

const TextField = ({ placeholder, onChange, value, name }) => {
  return (
    <label className={styles.textField}>
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </label>
  );
};

export default TextField;
