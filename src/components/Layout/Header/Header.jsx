import styles from "./Header.module.scss";
import Nav from "./nav/Nav";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <Nav />
          <Logo />
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
