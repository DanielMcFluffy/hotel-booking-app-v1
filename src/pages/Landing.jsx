import { useContext, useEffect, useState } from "react";
import LoginModal from "../components/LoginModal"
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import brand from "../assets/brand.png";
import Sidebar from "../components/Sidebar";


const Landing = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //extract out current user from the context value and redirect them to the profile page if they are logged in
  /////////////////////////////////////////////////
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
  })
  /////////////////////////////////////////////////////

  return (
    <>

      <Navbar sticky="top" className="bg-body-tertiary ">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src={brand}
              alt="brand-image"
              style={{
                height: "80px",
                width: "80px",
                objectFit: "cover",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text className="text-center" >
              <p>Hotel bookings doesn&apos;t have to be boring.</p>

            </Navbar.Text>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-center" >
            <p>You deserve to excel. That begins with Otel.</p>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button className="rounded-pill " variant="secondary"
                onClick={handleShow}
              > <i className="bi bi-person-circle"></i> Sign In</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Sidebar />
        <Col>
          Content
        </Col>
      </Row>


      <LoginModal show={show} onHide={handleClose} />
    </>
  )
}

export default Landing