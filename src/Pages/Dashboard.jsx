import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Col, Row } from "react-bootstrap";
import MyProject from "../Components/MyProject";
import Profile from "../Components/Profile";
import { FaRegEye } from "react-icons/fa";

function Dashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("userName")) {
      setUserName(sessionStorage.getItem("userName"));
    } else {
      setUserName("User");
    }
  }, []);

  return (
    <>
      <Header insideDashboard />
      <div className="container-fluid px-4">
        <Row>
          {/* {my projects} */}
          <Col sm={12} md={8}>
            <h2 className="mt-5 px-2">
              Welcome{" "}
              <span className="text-info fw-bolder text-uppercase">
                {userName}
              </span>
            </h2>

            <MyProject />
          </Col>

          {/* {profile} */}
          <Col sm={12} md={4} className="text-center">
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
