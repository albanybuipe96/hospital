import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../core/Message";
import Loader from "../core/Loader";

import { getUserDetails, updateUser } from "../../redux/actions/user";
import { USER_UPDATE_RESET } from "../../redux/constants/user";
import DashWrapper from "../core/DashWrapper";

const UserEditScreen = ({ match, history }) => {
  const roles = ["admin", "junior member", "registrar", "senior member", "hod"];
  const user_id = match.params.user_id;

  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/users");
    } else {
      if (!user?.fName || user?._id !== user_id) {
        dispatch(getUserDetails(user_id));
      } else {
        setRole(user.role);
      }
    }
  }, [dispatch, user, user_id, successUpdate, history]);

  const submitHandler = (e) => {
    dispatch(updateUser({ _id: user_id, role: role }));
  };

  return (
    <DashWrapper>
      <Container>
        <Link to="/users" className="btn btn-dark my-3">
          Go Back
        </Link>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <h1 style={{ fontSize: "1.6rem", padding: "2rem 0 0.5rem 0 " }}>
              Edit User
            </h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Row>
                  <Col md={6}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      className="mb-3"
                      type="text"
                      value={user.fName}
                      readOnly
                    ></Form.Control>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={user.lName}
                      readOnly
                    ></Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      value={user.email}
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      label="Is admin?"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option>Select user's role</option>
                      {roles.map((role, index) => (
                        <option value={role}>{role}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="warning" onClick={submitHandler}>
                Update
              </Button>
            </Form>
          </>
        )}
      </Container>
    </DashWrapper>
  );
};

export default UserEditScreen;
