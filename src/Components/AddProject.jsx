import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoImagesSharp } from "react-icons/io5";
import { addProjectAPI } from "../service/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectResponseContext } from "../ContextAPI/ContextShare";

function AddProject() {
  const { addProjectResponse, setAddProjectResponse } = useContext(
    addProjectResponseContext
  );
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      projectImage: "",
      title: "",
      languages: "",
      github: "",
      overview: "",
      website: "",
    });
    setPreview("");
  };
  const handleShow = () => setShow(true);

  const [projectData, setProjectData] = useState({
    projectImage: "",
    title: "",
    languages: "",
    github: "",
    overview: "",
    website: "",
  });
  // console.log(projectData);

  const handleAddProject = async () => {
    const { projectImage, title, languages, github, overview, website } =
      projectData;

    if (
      !projectImage ||
      !title ||
      !languages ||
      !github ||
      !overview ||
      !website
    ) {
      toast.warning("Please fill the missing filed");
    } else {
      //reqBody - formdata
      const reqBody = new FormData();
      reqBody.append("projectImage", projectImage);
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("github", github);
      reqBody.append("overview", overview);
      reqBody.append("website", website);

      //reqHeader - content type - multipart/form-data
      const token = sessionStorage.getItem("token");
      console.log(token);

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        };
        //API Call
        try {
          const result = await addProjectAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            handleClose();
            setAddProjectResponse(result.data);
          } else {
            toast.warning(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const [fileStatus, setFileStatus] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (
      projectData.projectImage.type == "image/png" ||
      projectData.projectImage.type == "image/jpeg" ||
      projectData.projectImage.type == "image/jpg"
    ) {
      // console.log("Generate URL");
      setFileStatus(false);
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      // console.log("Please upload the following formats");
      setFileStatus(true);
      setProjectData({ ...projectData, projectImage: "" });
    }
  }, [projectData.projectImage]);

  return (
    <>
      <Button variant="primary" className="bg-info" onClick={handleShow}>
        Add Project
      </Button>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12 text-center">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projectImage: e.target.files[0],
                    })
                  }
                />
                <div className="container mt-4 text-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Project-Image"
                      className="w-100 mb-5 rounded-3 shadow p-1"
                    />
                  ) : (
                    <IoImagesSharp
                      className="text-info"
                      style={{ fontSize: "15rem" }}
                    />
                  )}
                </div>
              </label>
              {fileStatus && (
                <div className="mt-4 px-5 fs-6 text-info container mb-4 text-center">
                  Please upload the following file extenstions{" "}
                  <span className="fw-bold">( jpeg / jpg / png )</span>
                </div>
              )}
            </div>

            <div className="col-md-6 col-sm-12 px-5 m-0">
              <FloatingLabel
                controlId="floatingInput"
                label="Project Title"
                className="mb-3 p-0"
              >
                <Form.Control
                  type="text"
                  placeholder="project title"
                  className="rounded-3 border border-info"
                  onChange={(e) =>
                    setProjectData({ ...projectData, title: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Language Used"
                className="mb-3 p-0"
              >
                <Form.Control
                  type="text"
                  placeholder="Language Used"
                  className="rounded-3 border border-info"
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      languages: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Overview"
                className="mb-3 p-0"
              >
                <Form.Control
                  type="text"
                  placeholder="Overview"
                  className="rounded-3 border border-info"
                  onChange={(e) =>
                    setProjectData({ ...projectData, overview: e.target.value })
                  }
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Github"
                className="mb-3 p-0"
              >
                <Form.Control
                  type="text"
                  placeholder="Github"
                  className="rounded-3 border border-info"
                  onChange={(e) =>
                    setProjectData({ ...projectData, github: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Website"
                className="mb-3 p-0"
              >
                <Form.Control
                  type="text"
                  placeholder="Website"
                  className="rounded-3 border border-info"
                  onChange={(e) =>
                    setProjectData({ ...projectData, website: e.target.value })
                  }
                />
              </FloatingLabel>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            className="bg-info shadow"
            onClick={handleAddProject}
          >
            Add
          </Button>
          <Button
            variant="primary"
            className="bg-info shadow"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        autoClose={5000}
        className="mt-5"
        theme="colored"
        position="top-center"
      />
    </>
  );
}

export default AddProject;
