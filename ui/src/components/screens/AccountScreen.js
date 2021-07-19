import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions/user";
import DashWrapper from "../core/DashWrapper";
import styles from "../../styles/profile.module.css";
import TextWithHint from "../core/TextWithHint";
import Loader from "../core/Loader";
const AccountScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    image: "",
    fName: "",
    lName: "",
    department: "",
    role: "",
  });

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const { success } = userUpdateProfile;

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(getUserDetails("profile"));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  return (
    <DashWrapper>
      {loading && <Loader />}
      <Container>
        <Row>
          <Col>
            <h1 className={`${styles.heading} my-3`}>My Profile</h1>
            <Row>
              <Col md={12}>
                <div className="personalInfo p-3">
                  <Row>
                    <Col md={3}>Personal Info</Col>
                    <Col md={3}>
                      <TextWithHint text={user.fName} hint={"First Name"} />
                    </Col>
                    <Col md={3}>
                      <TextWithHint text={user.lName} hint={"Last Name"} />
                    </Col>
                    <Col md={3}>
                      <TextWithHint text={user.role} hint={"Role"} />
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="contact p-3">
                  <Row>
                    <Col md={3}>Contact Info</Col>
                    <Col md={6}>
                      {" "}
                      <TextWithHint text={user.email} hint={"Email"} />
                    </Col>
                    <Col md={3}>
                      {" "}
                      <TextWithHint text={user.fName} hint={"First Name"} />
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="org p-3">
                  <Row>
                    <Col md={3}>
                      {" "}
                      <TextWithHint text={user.fName} hint={"First Name"} />
                    </Col>
                    {user.department && (
                      <Col md={3}>
                        {" "}
                        <TextWithHint
                          text={user.department}
                          hint={"Department"}
                        />
                      </Col>
                    )}
                    <Col md={3}>
                      {" "}
                      <TextWithHint text={user.fName} hint={"First Name"} />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </DashWrapper>
  );
};

export default AccountScreen;
