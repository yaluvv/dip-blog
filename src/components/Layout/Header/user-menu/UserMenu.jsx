import { Link } from "react-router-dom";
import styles from "./UserMenu.module.scss";
import { useState } from "react";

const initialState = [{ title: "Login/Signup", link: "/auth" }];

const UserMenu = () => {
  const [list, setList] = useState(initialState);
  return (
    <div className={styles.userMenu}>
      {list.map((item) => (
        <Link key={item.link} to={item.link}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default UserMenu;
