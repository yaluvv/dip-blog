import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.scss";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { authSignup } from "../../../redux/slices/authSlice";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { httpService } from "../../../services/http.service";
import { toast } from "react-toastify";

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
      const imgTypes = ["png", "jpg", "jpeg"];
      const isHaveImgType = imgTypes.find(
        (item) => item === getValues("avatarUrl")[0].name.split(".")[1]
      );

      if (isHaveImgType) {
        const formData = new FormData();
        const imageSrc = getValues("avatarUrl")[0];
        formData.append("image", imageSrc);
        const { data } = await httpService.post("/avatar", formData);
        setValue("avatarUrl", data.url, {
          shouldValidate: true,
        });
      } else {
        toast.warn("Формат изображения должен быть в: PNG, JPG, JPEG");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onSubmit = async (data) => {
    try {
      // const avatarUrl = data.avatarUrl[0].name;

      // console.log({ ...data, avatarUrl, role: "User" });
      if (!Boolean(getValues("avatarUrl"))) {
        const { email, fullName, password } = data;

        const { payload } = await dispatch(
          authSignup({ email, fullName, password, role: "User" })
        );

        if ("token" in payload) {
          window.localStorage.setItem("token", payload.token);
        }
      } else {
        const { payload } = await dispatch(
          authSignup({
            ...data,
            avatarUrl: getValues("avatarUrl"),
            role: "User",
          })
        );

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
            <img
              src={`${import.meta.env.VITE_API_URL}${getValues("avatarUrl")}`}
            />
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
