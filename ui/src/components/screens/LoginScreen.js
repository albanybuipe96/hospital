import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../redux/actions/user";
import styles from "../../styles/forms.module.css";
import Loader from "../core/Loader";
import Message from "../core/Message";
import Head from "react-helmet";
const LoginScreen = ({ location, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { goBack } = useHistory();
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, goBack, redirect]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));
  };

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>

      {loading && <Loader />}
      <div className={styles.formWrapper}>
        <Form onSubmit={handleSubmit} className={styles.formContainer}>
          {error && <Message variant="danger">{error.text}</Message>}
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
              placeholder="Enter your email"
              aria-label="Email"
            />
          </InputGroup>
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
              aria-label="Email"
            />
            <InputGroup.Append>
              <InputGroup.Text onClick={() => setShow(!show)}>
                <i className={show ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <small className={styles.forgot}>
            <Link to="/forgot">Forgot Password?</Link>
          </small>

          <Button type="submit" variant="success">
            Log in
          </Button>
          <div className={styles.small}>
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginScreen;
