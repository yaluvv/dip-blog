import { forwardRef } from "react";
import styles from "./AuthForm.module.scss";

const InputField = forwardRef(({ type, placeholder, error, ...rest }, ref) => {
  const classError = error
    ? `${styles.input} ${styles.errorInput}`
    : styles.input;
  return (
    <label>
      <input
        className={classError}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  );
});
InputField.displayName = "InputField";
export default InputField;
