import styles from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import UserMenu from "../user-menu/userMenu";
import React from "react";

const Menu = () => {
  const [t, setT] = React.useState(false);

  const handleChange = () => {
    setT((prev) => !prev);
  };
  return (
    <div className={styles.menu}>
      <button
        onClick={handleChange}
        className={styles.menuBtn + " " + styles.menuBtnMob}
      >
        <MenuIcon />
      </button>
      <button className={styles.menuBtn}>
        <SearchIcon />
      </button>
      <div className={styles.userMenuWrapper}>{t && <UserMenu />}</div>
    </div>
  );
};

export default Menu;
