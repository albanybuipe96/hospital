import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Head from "react-helmet";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/user";
import styles from "../../styles/forms.module.css";
import Loader from "../core/Loader";
import Message from "../core/Message";
const RegisterScreen = ({ history }) => {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, message, success } = userRegister;
  const [passwordErr, setPasswordErr] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.fName) {
      history.push("/");
    }
    if (success) {
      history.push("/login");
    }
  }, [history, userInfo, success]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.email.split("@"));
    formData.confirmPassword === formData.password
      ? dispatch(register(formData))
      : setPasswordErr(!passwordErr);
  };
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "remember"
      ? setFormData((prevState) => ({
          ...prevState,
          remember: !prevState.remember,
        }))
      : setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      {loading && <Loader />}
      <div className={styles.formWrapper}>
        <Form onSubmit={handleSubmit} className={styles.formContainer}>
          {error && (
            <Message variant={error.type}>
              {error.text ? error.text : error}
            </Message>
          )}
          {message && <Message variant={message.type}>{message.text}</Message>}
          <div className={styles.names}>
            {" "}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-light">
                  {" "}
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                aria-label="Name"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-light">
                  {" "}
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                aria-label="Phone"
              />
            </InputGroup>
          </div>
          <div className={styles.names}>
            {" "}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-light">
                  {" "}
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                aria-label="Email"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-light">
                  {" "}
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                aria-label="Department"
              />
            </InputGroup>
          </div>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text className="bg-light">
                <i className="bi bi-key"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="password"
              type={show ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              aria-label="Password"
            />
            <InputGroup.Append>
              <InputGroup.Text
                className="bg-warning"
                onClick={() => setShow(!show)}
              >
                <i className={show ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text className="bg-light">
                <i className="bi bi-key"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="confirmPassword"
              type={show ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              aria-label="Confirm Password"
            />
            <InputGroup.Append>
              <InputGroup.Text
                className="bg-warning"
                onClick={() => setShow(!show)}
              >
                <i className={show ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          {formData.password !== formData.confirmPassword && (
            <p>
              <small
                style={{
                  color: "red",
                }}
              >
                Passwords don't match
              </small>
            </p>
          )}
          <Button type="submit" variant="dark">
            Register
          </Button>
          <div className={styles.small}>
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RegisterScreen;
