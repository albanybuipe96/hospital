import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../../styles/dashboard.module.css";
const DashWrapper = ({ children }) => {
  return (
    <div className={styles.dash_wrapper}>
      <SideBar />
      <main className={styles.main_content}>
        <Header />
        {children}
      </main>
    </div>
  );
};

export default DashWrapper;
