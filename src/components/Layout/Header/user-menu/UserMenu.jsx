import { Link } from "react-router-dom";
import styles from "./UserMenu.module.scss";
import { useAuth } from "../../../../hooks/useAuth";
import UserMenuAuth from "./UserMenuAuth";

const initialState = [{ title: "Login/Signup", link: "/auth" }];
const userLinks = [
  { title: "My posts", link: "/manage" },
  { title: "My profile", link: "/manage/profile" },
];

const UserMenu = () => {
  const { isAuth } = useAuth();

  return (
    <div className={styles.userMenu}>
      {isAuth && <UserMenuAuth />}

      {!isAuth &&
        initialState.map((item) => (
          <Link key={item.link} to={item.link}>
            {item.title}
          </Link>
        ))}
    </div>
  );
};

export default UserMenu;
