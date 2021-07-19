import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/dashboard.module.css";

import Head from "react-helmet";
import DashWrapper from "../core/DashWrapper";
import DashItem from "../DashItem";
import { getUsers } from "../../redux/actions/user";
import Table from "../core/Table";
import { Container } from "react-bootstrap";

const Dashboard = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const info = [
    {
      number: users?.length,
      item: "users",
    },
    {
      number: 15,
      item: "leave requests",
    },
    {
      number: 1,
      item: "Admins",
    },
  ];
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (userInfo && userInfo.role === "admin") {
      dispatch(getUsers());
    }
  }, [history, userInfo, dispatch]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {userInfo && (
        <DashWrapper>
          <Container>
            <div className={styles.dash_content}>
              <div className={styles.dash_stats}>
                {info.map((info) => (
                  <DashItem item={info} />
                ))}
              </div>
            </div>

            {userInfo.role === "admin" && (
              <section className={styles.users}>
                <h1>Users</h1>
                <Table
                  columns={["Date", "Name", "Email", "Type", ""]}
                  data={users}
                />
              </section>
            )}
          </Container>
        </DashWrapper>
      )}
    </>
  );
};

export default Dashboard;
