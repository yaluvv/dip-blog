import { Link } from "react-router-dom";
import styles from "./UserMenu.module.scss";

const initialState = [{ title: "Login/Signup", link: "/auth" }];
const userLinks = [
  { title: "My posts", link: "/manage" },
  { title: "My profile", link: "/manage/profile" },
];

const UserMenu = () => {
  const user = true;
  return (
    <div className={styles.userMenu}>
      {user &&
        userLinks.map((item) => (
          <Link key={item.link} to={item.link}>
            {item.title}
          </Link>
        ))}

      {!user &&
        initialState.map((item) => (
          <Link key={item.link} to={item.link}>
            {item.title}
          </Link>
        ))}
    </div>
  );
};

export default UserMenu;
