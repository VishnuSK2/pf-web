import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import titleImages from "../assets/Images/img1.png";
import ProjectCard from "../Components/ProjectCard";
import { HiMiniCube } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getHomeProjectAPI } from "../service/allAPI";

function Home() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHomeProjects();
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const getHomeProjects = async () => {
    const result = await getHomeProjectAPI();
    if (result.status == 200) {
      setAllProjects(result.data);
    } else {
      console.log(result);
    }
    // console.log(allProjects);
  };

  const handleProject = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/projects");
    } else {
      toast.warning(
        <p className="text-center">Please login to explore our projects</p>
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="container-fluid p-3 shadow rounded-3 bg-info w-100 ">
          <Row className="p-2">
            <Col sm={12} md={6} className=" p-5">
              <img src={titleImages} alt="titleImage" className="w-100" />
            </Col>
            <Col sm={12} md={6} className="p-5 text-light rounded-5">
              <div className="d-flex ">
                <HiMiniCube className="fs-1 mt-2" />
                <p className="text-light fs-1 fw-bold m-0 ms-1">Project-Fair</p>
              </div>
              <p style={{ textAlign: "justify" }} className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                adipisci atque enim sapiente officia deleniti doloribus totam
                perspiciatis quidem. Commodi eum eos blanditiis magnam, autem
                nesciunt assumenda nihil dolorum quidem. Deserunt, autem.
                Praesentium, saepe modi. Nam impedit quae sit magni modi nihil?
                Maiores cupiditate libero dolore, repellat illo possimus
                quisquam aspernatur veniam a, totam rerum et, voluptas cum vitae
                nostrum!
              </p>
              {isloggedIn ? (
                <Link
                  to={"/dashboard"}
                  className="btn btn-info shadow rounded-5 text-info fw-bold bg-light"
                >
                  Manage Projects
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="btn btn-info border border-1 text-light shadow fw-bold"
                >
                  Start to Explore
                </Link>
              )}
            </Col>
          </Row>
        </div>

        {/* {project cards} */}
        <div className="all-projects">
          <p className="text-info text-center fs-1 fw-bold mt-4">
            Explore Your Projects
          </p>
          <marquee scrollAmount={12}>
            <Row className="mt-4">
              {allProjects.length > 0
                ? allProjects.map((project) => (
                    <Col sm={12} md={6} lg={4}>
                      <ProjectCard project={project} />
                    </Col>
                  ))
                : null}
            </Row>
          </marquee>
          <div className="d-flex justify-content-center text-info fw-bold mt-2 btn">
            <p className="fs-3" onClick={handleProject}>
              View More Projects
            </p>
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
export default Home;
