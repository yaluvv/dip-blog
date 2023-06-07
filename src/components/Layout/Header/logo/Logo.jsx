import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link className={styles.logo} to={"/"}>
      <div>React Blog</div>
    </Link>
  );
};

export default Logo;
