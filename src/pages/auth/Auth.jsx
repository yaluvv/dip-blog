import { useState } from "react";
import styles from "./Auth.module.scss";
import AuthForm from "../../components/common/auth-form/AuthForm";

const Auth = () => {
  const [formType, setFormType] = useState("signup");
  return (
    <section className={styles.auth}>
      <div className="container">
        <h2 className="text-center">Auth | {formType}</h2>
        <AuthForm type={formType} setFormType={setFormType} />
      </div>
    </section>
  );
};

export default Auth;
