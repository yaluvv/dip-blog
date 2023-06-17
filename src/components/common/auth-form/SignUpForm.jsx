import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.scss";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { authSignup } from "../../../redux/slices/authSlice";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { httpService } from "../../../services/http.service";

const SignUpForm = ({ setFormType }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const handleChangeImage = async () => {
    try {
      const formData = new FormData();
      const imageSrc = getValues("avatarUrl")[0];
      formData.append("image", imageSrc);
      const { data } = await httpService.post("/avatar", formData);
      setValue("avatarUrl", data.url, {
        shouldValidate: true,
      });
    } catch (err) {
      console.warn(err);
    }
  };
  const onSubmit = async (data) => {
    const avatarUrl = data.avatarUrl[0].name;
    // console.log({ ...data, avatarUrl, role: "User" });
    const { payload } = await dispatch(
      authSignup({ ...data, avatarUrl: getValues("avatarUrl"), role: "User" })
    );

    if ("token" in payload) {
      window.localStorage.setItem("token", payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
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

      <InputField
        placeholder={"Enter your full name"}
        type={"text"}
        {...register("fullName", {
          requried: "This is requried",
          minLength: { value: 6, message: "Min length 6" },
        })}
        error={errors?.fullName?.message}
      />
      <InputField
        onChange={handleChangeImage}
        type={"file"}
        {...register("avatarUrl", {
          onChange: () => {
            handleChangeImage();
          },
        })}
      >
        <div>
          {getValues("avatarUrl") && (
            <img src={`http://localhost:4444${getValues("avatarUrl")}`} />
          )}
        </div>

        <p>Change photo</p>
      </InputField>
      <button className={`btn ${styles.authFormBtn}`}>Signup</button>
      <p className={styles.authFormSub}>
        Если у вас есть аккаунт, войти здесь
        <button
          type="button"
          className="btn"
          onClick={() => setFormType("login")}
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;
