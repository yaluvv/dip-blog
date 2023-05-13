import styles from "./AuthForm.module.scss";
import InputField from "./InputField";

const AuthForm = ({ type, setFormType }) => {
  return (
    <div className={styles.authForm}>
      <form>
        <InputField type={"email"} placeholder={"Enter your email"} />
        <InputField type={"password"} placeholder={"Enter your password"} />
        {type === "login" && (
          <button className={`btn ${styles.authFormBtn}`}>Login</button>
        )}
        {type === "signup" && (
          <button className={`btn ${styles.authFormBtn}`}>Signup</button>
        )}
      </form>
      {type === "login" && (
        <p className={styles.authFormSub}>
          Если у вас еще нет аккаунта, зарегистрироваться здесь
          <button className="btn" onClick={() => setFormType("signup")}>
            Signup
          </button>
        </p>
      )}
      {type === "signup" && (
        <p className={styles.authFormSub}>
          Если у вас есть аккаунт, войти здесь
          <button className="btn" onClick={() => setFormType("login")}>
            Login
          </button>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
