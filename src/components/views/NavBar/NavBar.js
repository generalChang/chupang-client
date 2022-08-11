import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../_actions/user_actions";
import { message } from "antd";
import { withRouter } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
function NavBar(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
      .then((result) => {
        if (result.payload.success) {
          message.success("Successfully logged out!");
          props.history.push("/login");
        } else {
          message.warning("Failed to Logout..");
        }
      })
      .catch((err) => {
        message.error("Error.. try it later..");
      });
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ChuPang</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {user && user.userData && !user.userData.isAuth && (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Sign up</Nav.Link>
            </Nav>
          )}
          {user && user.userData && user.userData.isAuth && (
            <Nav>
              <Nav.Link href="/upload">Upload</Nav.Link>
              <Nav.Link href="" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(NavBar);
