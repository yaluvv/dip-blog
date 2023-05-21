import Form from "../form/Form";
import styles from "./AuthForm.module.scss";

const AuthForm = ({ type, setFormType }) => {
  return (
    <div className={styles.authForm}>
      <Form>
        {type === "login" && (
          <button className={`btn ${styles.authFormBtn}`}>Login</button>
        )}
        {type === "signup" && (
          <button className={`btn ${styles.authFormBtn}`}>Signup</button>
        )}

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
      </Form>
    </div>
  );
};

export default AuthForm;
