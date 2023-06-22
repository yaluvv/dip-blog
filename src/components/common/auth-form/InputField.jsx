import { forwardRef } from "react";
import styles from "./AuthForm.module.scss";

const InputField = forwardRef(
  ({ type, placeholder, error, children, onChange, ...rest }, ref) => {
    const classError = error
      ? `${styles.input} ${styles.errorInput}`
      : styles.input;
    return (
      <label>
        <input
          className={classError}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {error && <span className={styles.errorText}>{error}</span>}
        {children}
      </label>
    );
  }
);
InputField.displayName = "InputField";
export default InputField;
