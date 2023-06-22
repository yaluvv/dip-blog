import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.scss";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { authLogin } from "../../../redux/slices/authSlice";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({ setFormType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { payload } = await dispatch(authLogin(data));

      if (payload?.name === "AxiosError") {
        toast.warn(payload.message);
      } else {
        if ("token" in payload) {
          window.localStorage.setItem("token", payload.token);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }
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

        <button type="submit" className={`btn ${styles.authFormBtn}`}>
          Login
        </button>
        <p className={styles.authFormSub}>
          Если у вас еще нет аккаунта, зарегистрироваться здесь
          <button className="btn" onClick={() => setFormType("signup")}>
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
