import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { server_url } from "../service/server_url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editUserProjectAPI } from "../service/allAPI";
import { editProjectResponseContext } from "../ContextAPI/ContextShare";

function EditProject({ project }) {
  const [show, setShow] = useState(false);
  const { editProjectResponse, setEditProjectResponse } = useContext(
    editProjectResponseContext
  );
  // console.log(project);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      projectImage: "",
      title: project?.title,
      languages: project?.languages,
      github: project?.github,
      overview: project?.overview,
      website: project?.website,
    });
    setPreview("");
  };
  const handleShow = () => setShow(true);

  const [projectData, setProjectData] = useState({
    id: project?._id,
    projectImage: "",
    title: project?.title,
    languages: project?.languages,
    github: project?.github,
    overview: project?.overview,
    website: project?.website,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      setPreview("");
    }
  }, [projectData.projectImage]);

  const handleUpdate = async () => {
    const { projectImage, id, title, languages, github, overview, website } =
      projectData;
    if (!title || !languages || !github || !overview || !website) {
      toast.warning("Please fill the missing filed");
    } else {
      //reqBody - formdata
      const reqBody = new FormData();
      preview
        ? reqBody.append("projectImage", projectImage)
        : reqBody.append("projectImage", project.projectImage);
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
          const result = await editUserProjectAPI(id, reqBody, reqHeader);
          // console.log(result);
          if (result.status == 200) {
            handleClose();
            setEditProjectResponse(result.data);
          } else {
            toast.warning(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <>
      <a
        className="btn btn-outline-light border-0 text-info fs-4"
        onClick={handleShow}
      >
        <CiEdit />
      </a>
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
                <div className="container mt-5 text-center">
                  <img
                    src={
                      preview
                        ? preview
                        : `${server_url}/uploads/${project?.projectImage}`
                    }
                    alt="projectImage"
                    className="w-100 mb-5 rounded-3 shadow p-1"
                  />
                </div>
              </label>
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
                  value={projectData?.title}
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
                  value={projectData?.languages}
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
                  value={projectData?.overview}
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
                  value={projectData?.github}
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
                  value={projectData?.website}
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
            onClick={handleUpdate}
          >
            Update
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

export default EditProject;
