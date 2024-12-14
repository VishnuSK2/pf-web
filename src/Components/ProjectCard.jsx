import React, { useState } from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import { PiGithubLogoFill } from "react-icons/pi";
import { RiExternalLinkLine } from "react-icons/ri";
import { server_url } from "../service/server_url";

function ProjectCard({ project }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="p-2">
        <Card className="w-100 border-0 shadow">
          <Card.Img
            variant="top"
            className="w-100"
            src={`${server_url}/uploads/${project?.projectImage}`}
            onClick={handleShow}
          />

          <Card.Body>
            <Card.Title className="text-info fw-bold">
              {project?.title}
            </Card.Title>
          </Card.Body>
        </Card>

        <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title className="text-info fw-bold text-uppercase">
              {project?.title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={6} sm={12}>
                <img
                  src={`${server_url}/uploads/${project?.projectImage}`}
                  className="w-100 shadow mt-3  border-3 p-1"
                  alt="projectImg"
                />
              </Col>

              <Col md={6}>
                <h6 className="text-info mt-3">
                  Languages:{" "}
                  <span className="fw-bold text-info">
                    {project?.languages}
                  </span>
                </h6>
                <p className="text-info">
                  Overview:{" "}
                  <span className="fw-bold text-info">{project?.overview}</span>
                </p>
              </Col>
            </Row>

            <div className="mt-2">
              <a
                href={project?.github}
                target="_blank"
                className="btn text-info"
              >
                <PiGithubLogoFill className="fs-2" />
              </a>
              <a
                href={project?.website}
                target="_blank"
                className="btn text-info"
              >
                <RiExternalLinkLine className="fs-2" />
              </a>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ProjectCard;
