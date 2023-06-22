import styles from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import UserMenu from "../user-menu/UserMenu";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

const Menu = () => {
  const [t, setT] = React.useState(false);
  const { isAuth } = useAuth();

  const handleChange = () => {
    setT((prev) => !prev);
  };
  return (
    <div className={styles.menu}>
      {isAuth && (
        <Link to={"/create-post"} className={styles.menuBtn}>
          <EditIcon />
        </Link>
      )}

      <button
        onClick={handleChange}
        className={styles.menuBtn + " " + styles.menuBtnMob}
      >
        <MenuIcon />
      </button>
      <div className={styles.userMenuWrapper}>{t && <UserMenu />}</div>
    </div>
  );
};

export default Menu;
