import { useSelector } from "react-redux";
import styles from "../../styles/header.module.css";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <nav className={styles.header}>
      <div className={styles.left}>
        <i className={`bi bi-envelope mr-4 ${styles.icon}`}></i>
        <i className={`bi bi-bell mr-4 ${styles.icon}`}></i>
      </div>
      <div className={`${styles.right} mx-auto d-flex align-items-center`}>
        <i className={`bi bi-person mr-2 ${styles.icon}`}></i>
        {userInfo && userInfo?.user}
      </div>
    </nav>
  );
};

export default Header;
