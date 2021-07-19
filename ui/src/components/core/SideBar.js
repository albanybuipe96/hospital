import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/user";
import styles from "../../styles/sidebar.module.css";
const SideBar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  React.useEffect(() => {
    let currentWindow = document.location.pathname.split("/")[1];
    console.log(currentWindow);
    const currentItem =
      currentWindow === "/" || ""
        ? document.getElementById("main")
        : document.getElementById(`${currentWindow}`);

    currentItem?.classList.add("active");
    console.log(document.getElementById(`${currentWindow}`));
  });
  return (
    <div className={styles.side_wrapper}>
      <div className={`${styles.side_items}`}>
        {userInfo && (
          <ul id="side">
            {" "}
            <li id="main">
              <Link to="/">
                <i className="bi bi-speedometer2 mr-3"></i>Dashboard
              </Link>
            </li>{" "}
            <li id="myaccount">
              <Link to="/myaccount">
                <i className="bi bi-person mr-3"></i>Account
              </Link>
            </li>
            <li id="settings">
              <Link to="/settings">
                <i className="bi bi-gear mr-3"></i>Settings
              </Link>
            </li>
            <li className={styles.log_out} onClick={handleLogout}>
              <i className="bi bi-box-arrow-left mr-3"></i>Logout
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideBar;
