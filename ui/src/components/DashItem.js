import React from "react";
import styles from "../styles/dashboard.module.css";
const DashItem = ({ item }) => {
  return (
    <div className={styles.dash_item}>
      <span>{item.item}</span>
      <span>{item.number}</span>
    </div>
  );
};

export default DashItem;
