import styles from "./Nav.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeValue, sortsValues } from "../../../../redux/slices/sortSlice";

const navItems = [
  {
    title: "Popular",
    value: sortsValues.POPULAR,
  },
  {
    title: "New",
    value: sortsValues.NEW,
  },
];

const Nav = () => {
  const { value: sortValue } = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li
            className={sortValue === item.value ? styles.active : ""}
            key={item.title}
          >
            <button onClick={() => dispatch(changeValue(item.value))}>
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
