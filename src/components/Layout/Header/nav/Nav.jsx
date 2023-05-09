import { Link } from "react-router-dom";

import styles from "./Nav.module.scss";

const navItems = [
  {
    title: "Popular",
    link: "/popular",
  },
  {
    title: "New",
    link: "/new",
    class: "newBtn",
  },
];

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li className={item.class ? styles[item.class] : ""} key={item.title}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
