import styles from "./AuthForm.module.scss";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthForm = ({ type, setFormType }) => {
  return (
    <div className={styles.authForm}>
      {type === "login" && <LoginForm setFormType={setFormType} />}
      {type === "signup" && <SignUpForm setFormType={setFormType} />}
    </div>
  );
};

export default AuthForm;
