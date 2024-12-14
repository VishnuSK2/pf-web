import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "../Components/ProjectCard";
import { getAllProjectAPI } from "../service/allAPI";

function Projects() {
  const [allProject, setAllProject] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const getAllProject = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      };
      try {
        const result = await getAllProjectAPI(searchKey, reqHeader);
        // console.log(result);
        if (result.status === 200) {
          setAllProject(result.data);
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  // console.log(allProject);
  // console.log(searchKey);

  useEffect(() => {
    getAllProject();
  }, [searchKey]);
  return (
    <>
      <Header />
      <div className="projects mt-5">
        <h1 className="text-center mb-5 text-info fw-bold">All Projects</h1>
      </div>

      <div className="d-flex justify-content-center align-items-center custom-labels mb-3">
        <div className="d-flex w-75 rounded mb-3">
          <input
            type="text"
            className="custom-label rounded-4 py-2 px-3 shadow text-info"
            placeholder="Search by technologies..."
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <i
            style={{ marginLeft: "-2em" }}
            className="fa-solid fa-magnifying-glass fa rotate-90 mt-2 fs-5 pe-4 text-info pt-1"
          />
        </div>
      </div>

      <Row className="container-fluid px-5">
        {allProject?.length > 0 ? (
          allProject.map((project) => (
            <Col sm={12} md={6} lg={4}>
              <ProjectCard project={project} />
            </Col>
          ))
        ) : (
          <div className="text-center">
            <img
              src="https://schoolville.com/assets/img/empty-cart-illustration.gif"
              alt=""
              className="w-25"
            />
            <p className="text-info fw-bold text-center">
              Nothing to display...
            </p>
          </div>
        )}
      </Row>
    </>
  );
}

export default Projects;
