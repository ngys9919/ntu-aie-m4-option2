import { useContext } from "react";
import styles from "./Header.module.css";

function Header() {

  return (
    <header className={styles.header}>
      <h1 className={styles.header__brand}>Simple Task Manager</h1>
    </header>
  );
}

export default Header;
