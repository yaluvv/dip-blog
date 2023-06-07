import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "../auth-form/InputField";

const Form = ({ children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  return (
    <form onSubmit={handleSubmit}>
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

      {children}
    </form>
  );
};

export default Form;
