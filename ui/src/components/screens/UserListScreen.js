import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import Message from "../core/Message";
import Loader from "../core/Loader";
import { getUsers } from "../../redux/actions/user";
import { USER_LIST_RESET } from "../../redux/constants/user";

import DashWrapper from "../core/DashWrapper";
import Table from "../core/Table";
const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(getUsers());
    } else {
      history.push("/login");
      dispatch({ type: USER_LIST_RESET });
    }
  }, [dispatch, history, successDelete, userInfo]);

  return (
    <DashWrapper>
      <Container>
        <Helmet>
          <title>Admin | Users</title>
        </Helmet>
        <h1 className="my-3 heading">Users</h1>
        {loadingDelete && <Loader />}
        {errorDelete && <Message>{errorDelete}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table columns={["Date", "Name", "Email", "Type", ""]} data={users} />
        )}
      </Container>
    </DashWrapper>
  );
};

export default UserListScreen;
