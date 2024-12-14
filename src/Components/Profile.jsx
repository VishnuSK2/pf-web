import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { FaUserTie } from "react-icons/fa";
import { TfiAngleUp, TfiAngleDown } from "react-icons/tfi";
import { updateUserAPI } from "../service/allAPI";

function Profile() {
  const [open, setOpen] = useState(false);
  const [angleUp, setAngleUp] = useState(true);

  const [profileData, setProfileData] = useState({
    github: "",
    linkedin: "",
    profile: null,
  });

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setProfileData((preData) => ({
        ...preData,
        profile: files[0],
      }));
    }
  };

  const handleUpdate = async () => {
    const { github, linkedin, profile } = profileData;

    if (!github || !linkedin) {
      alert("Please fill all fileds");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("github", github);
      formData.append("linkedin", linkedin);
      if (profile) {
        formData.append("profile", profile);
      }
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };

      const result = await updateUserAPI(formData, headers);
      if (result.status == 200) {
        alert("Profile updated successfully!");
        setProfileData({
          github: "",
          linkedin: "",
          profile: null,
        });
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleArrow = () => {
    setAngleUp(!angleUp);
  };

  return (
    <>
      <div className="card shadow mt-5 bg-info px-3 py-1">
        <div className="d-flex justify-content-between">
          <h5 className="text-light pt-2 fw-bold">Profile</h5>
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-outline-info border-0 text-light"
          >
            <div onClick={handleArrow}>
              {angleUp ? (
                <TfiAngleDown className="fs-3" />
              ) : (
                <TfiAngleUp className="fs-3" />
              )}
            </div>
          </button>
        </div>
      </div>

      <Collapse in={open}>
        <div className="container mt-1 card shadow bg-info p-4">
          <label>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {profileData.profile ? (
              <img
                src={URL.createObjectURL(profileData.profile)}
                alt=""
                className="w-50 border border-3 rounded-3"
              />
            ) : (
              <FaUserTie
                style={{ fontSize: "8.5rem", borderRadius: "50%" }}
                className="text-light mt-3 border border-2 p-3 shadow"
              />
            )}
          </label>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Github link"
              onChange={(e) =>
                setProfileData({ ...profileData, github: e.target.value })
              }
              value={profileData?.github}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="LinkedIn link"
              onChange={(e) =>
                setProfileData({ ...profileData, linkedin: e.target.value })
              }
              value={profileData?.linkedin}
            />
            <div className="d-grid mt-3">
              <button
                className="btn btn-info shadow border fw-bold"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default Profile;
