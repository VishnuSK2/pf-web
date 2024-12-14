import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { HiMiniCube } from "react-icons/hi2";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-info shadow mt-5">
      <MDBFooter className="text-center text-lg-start text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span className="text-light fw-bold">
              Get connected with us on social networks:
            </span>
          </div>
          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" className="text-light" />
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fa-brands fa-x-twitter text-light" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="google" className="text-light" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" className="text-light" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="youtube" className="text-light" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="whatsapp" className="text-light" />
            </a>
          </div>
        </section>
        <section>
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4 text-light">
                <h6 className="fw-bold mb-4 text-light">
                  <HiMiniCube className="me-1" />
                  Project-Fair
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4 text-light">
                <h6 className="text-uppercase fw-bold mb-4 text-light">
                  Products
                </h6>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Angular
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    React
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Vue
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Laravel
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4 text-light">
                <h6 className="text-uppercase fw-bold mb-4 text-light">
                  Useful links
                </h6>
                <p>
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none" }}
                    className="text-light"
                  >
                    Home
                  </Link>
                </p>
                <p>
                  <Link
                    to={"/login"}
                    style={{ textDecoration: "none" }}
                    className="text-light"
                  >
                    Login
                  </Link>
                </p>
                <p>
                  <Link
                    to={"/register"}
                    style={{ textDecoration: "none" }}
                    className="text-light"
                  >
                    Register
                  </Link>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol
                md="4"
                lg="3"
                xl="3"
                className="mx-auto mb-md-0 mb-4 text-light"
              >
                <h6 className="text-uppercase fw-bold mb-4 text-light">
                  Contact
                </h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  New York, NY 10012, US
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" />+ 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" />+ 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4 text-light"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright:
          <a
            className="text-reset fw-bold"
            href="#"
            style={{ textDecoration: "none" }}
          >
            ProjectFair.com
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer;
