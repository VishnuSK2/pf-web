import React, { useContext, useEffect, useState } from "react";
import AddProject from "./AddProject";
import { PiGithubLogoFill } from "react-icons/pi";
import { AiFillDelete } from "react-icons/ai";
import { deleteUserProjectAPI, getUserProjectAPI } from "../service/allAPI";
import { addProjectResponseContext } from "../ContextAPI/ContextShare";
import { editProjectResponseContext } from "../ContextAPI/ContextShare";
import EditProject from "./EditProject";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyProject() {
  const [userProject, setUserProject] = useState();
  const { addProjectResponse, setAddProjectResponse } = useContext(
    addProjectResponseContext
  );
  const { editProjectResponse, setEditProjectResponse } = useContext(
    editProjectResponseContext
  );

  const getUserProject = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      };
      try {
        const result = await getUserProjectAPI(reqHeader);
        // console.log(result);
        if (result.status == 200) {
          setUserProject(result.data);
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (pid) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      };
      //API Call
      try {
        const result = await deleteUserProjectAPI(pid, reqHeader);
        if (result.status == 200) {
          getUserProject();
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserProject();
  }, [addProjectResponse, editProjectResponse]);
  // console.log(userProject);

  return (
    <>
      <div className="container ">
        <div className="container card border border-info shadow mt-4 p-4 ">
          <div className="row ">
            <div className="col-md-6 col-sm-12 ">
              <h2 className="text-info fw-bold text-start">My Projects</h2>
            </div>
            <div className="col-3"></div>
            <div className="col-md-3 col-sm-12">
              <div className="">
                <AddProject />
              </div>
            </div>
          </div>
          {userProject?.length > 0 ? (
            userProject.map((project, index) => (
              <div key={index} className="mt-1 px-3 py-1">
                <div className="row">
                  <div className="col-md-7 col-sm-12">
                    <div className=" text-info d-flex">
                      <h5 className="mt-3 fw-bold">{project.title}</h5>
                      <EditProject project={project} />
                    </div>
                  </div>
                  <div className="col-2"></div>
                  <div className="col-md-3 col-sm-12">
                    <div className="d-flex">
                      <a
                        className="btn btn-outline-light text-info fs-4 "
                        href={project.github}
                        target="_blank"
                      >
                        <PiGithubLogoFill />
                      </a>
                      <button
                        className="btn btn-outline-light text-info fs-4 ms-1"
                        onClick={() => handleDelete(project?._id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <img
                src="https://schoolville.com/assets/img/empty-cart-illustration.gif"
                alt=""
                className="w-25"
              />
              <p className="text-info fw-bold">No Projects added yet</p>
            </div>
          )}
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

export default MyProject;
