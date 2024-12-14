import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { HiMiniCube } from "react-icons/hi2";
import { Form } from "react-bootstrap";
import loginImage from "../../src/assets/Images/login.png";
import registerImage from "../../src/assets/Images/register.png";
import { FaHome } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI, registerAPI } from "../service/allAPI";
import { TokenAuthContext } from "../ContextAPI/TokenAuth";

function Auth({ register }) {
  const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext);
  const navigate = useNavigate();
  const isRegisterForm = register ? true : false;

  const [userData, setUserDate] = useState({
    userName: "",
    email: "",
    password: "",
  });
  // console.log(userData);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { userName, email, password } = userData;
    if (!userName || !email || !password) {
      toast.info("Please insert the missing fields");
    } else {
      try {
        const result = await registerAPI(userData);
        if (result.status === 200) {
          toast.success(`${result.data.userName} has successfully registered`);
          navigate("/login");
          setUserDate({ userName: "", email: "", password: "" });
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      toast.info("Please insert the missing fields");
    } else {
      try {
        const result = await loginAPI({ email, password });
        if (result.status === 200) {
          sessionStorage.setItem("userName", result.data.existingUser.userName);
          sessionStorage.setItem("token", result.data.token);
          setIsAuthorized(true);
          navigate("/");
          setUserDate({ email: "", password: "" });
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="container mt-5 w-75">
        <div className="shadow p-4 bg-info rounded-3">
          <div className="text-end">
            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              className="text-light fw-bold"
            >
              <FaHome className="fs-3" />
              <TiArrowBack className="fs-3" />
            </Link>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-12">
              {isRegisterForm ? (
                <div>
                  <div className="d-flex justify-content-center mt-3">
                    <HiMiniCube className="fs-1 mt-2 text-light" />
                    <h1 className="fw-bolder text-light mt-1">
                      <Link
                        to={"/"}
                        style={{ textDecoration: "none" }}
                        className="text-light fw-bold ms-1"
                      >
                        Project-Fair
                      </Link>
                    </h1>
                  </div>
                  <div className="text-center">
                    <img
                      src={registerImage}
                      alt="RegisterImage"
                      className="w-75"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-center mt-3">
                    <HiMiniCube className="fs-1 mt-2 text-light" />
                    <h1 className="fw-bolder text-light mt-1">
                      <Link
                        to={"/"}
                        style={{ textDecoration: "none" }}
                        className="text-light fw-bold ms-1"
                      >
                        Project-Fair
                      </Link>
                    </h1>
                  </div>
                  <div className="text-center">
                    <img
                      src={loginImage}
                      alt="loginImage"
                      className="w-75 p-4"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="text-light text-center">
                {isRegisterForm ? (
                  <p className="fs-5 m-0 fw-bold text-uppercase">
                    Sign up to your Account
                  </p>
                ) : (
                  <p className="fs-5 m-0 fw-bold text-uppercase mt-5">
                    Sign in to your Account
                  </p>
                )}
                <Form className="mt-4 text-light fs-6">
                  {isRegisterForm && (
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className="fs-6 shadow"
                        placeholder="Enter your username"
                        onChange={(e) =>
                          setUserDate({ ...userData, userName: e.target.value })
                        }
                        value={userData.userName}
                      />
                    </Form.Group>
                  )}

                  <Form.Group
                    className="mb-3"
                    controlId="examplleForm.ControlInput2"
                  >
                    <Form.Control
                      type="email"
                      className="fs-6 shadow"
                      placeholder="Enter your email"
                      onChange={(e) =>
                        setUserDate({ ...userData, email: e.target.value })
                      }
                      value={userData.email}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="examplleForm.ControlInput2"
                  >
                    <Form.Control
                      type="password"
                      className="fs-6 shadow"
                      placeholder="Enter your password"
                      onChange={(e) =>
                        setUserDate({ ...userData, password: e.target.value })
                      }
                      value={userData.password}
                    />
                  </Form.Group>

                  {isRegisterForm ? (
                    <div className="fs-6 fw-light">
                      <div className="d-grid">
                        <button
                          className="btn btn-info border shadow fw-bold rounded-3"
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                      </div>

                      <p className="mt-2">
                        Already have an account ? click here to
                        <Link
                          to={"/login"}
                          style={{ textDecoration: "none" }}
                          className="fw-bold text-light text-success ms-1"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div className="fs-6 fw-light">
                      <div className="d-grid">
                        <button
                          className="btn btn-info border shadow fw-bold rounded-3"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                      </div>
                      <p className="mt-2">
                        New to here ? click here to
                        <Link
                          to={"/register"}
                          style={{ textDecoration: "none" }}
                          className=" fw-bold text-light ms-1"
                        >
                          Register
                        </Link>
                      </p>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        autoClose={5000}
        className="mt-5"
        theme="colored"
        position="top-center"
      />
    </>
  );
}

export default Auth;
