import styles from "./AuthForm.module.scss";
import InputField from "./InputField";
import { useForm } from "react-hook-form";

const AuthForm = ({ type, setFormType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.authForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          {...register("email", {
            required: "This is requried",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          type={"email"}
          placeholder={"Enter your email"}
          error={errors?.email?.message}
        />
        <InputField
          {...register("password", {
            required: "This is requried",
            minLength: { value: 6, message: "Min length 6" },
          })}
          type={"password"}
          placeholder={"Enter your password"}
          error={errors?.password?.message}
        />
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
