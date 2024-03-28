import { useContext, useEffect, useState } from "react";
import LoginModal from "../components/LoginModal"
import { AuthContext } from "../components/AuthProvider";
import { Link } from "react-router-dom";
import { Button, Col, Container, Dropdown, DropdownButton, Navbar, Row, Spinner } from "react-bootstrap";
import { Image } from "react-bootstrap";
import brand from "../assets/brand.png";
import Sidebar from "../components/Sidebar";
import CardListing from "../components/CardListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../features/slices/listingSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";



const Landing = () => {
  //modal state management
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //extract out current user from the context value
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  //logout function button

  const handleSignOut = () => {
    signOut(auth);
  }


  /////////////////////////////////////////////////////

  const dispatch = useDispatch();

  // const loading = useSelector(state => state.listings.loading);
  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch])

  // state management variables
  const listings = useSelector(state => state.listing.listings);
  const loading = useSelector(state => state.listing.loading);
  //////////////////////////////////////////////////////

  //useEffect code to close login modal upon sign in
  useEffect(() => {
    if (currentUser) {
      handleClose();
    }
  }, [currentUser])


  return (
    <>

      <Navbar sticky="top" className="bg-body-tertiary ">
        <Container>
          <Navbar.Brand href="/">
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
              {currentUser ?

                (<DropdownButton id="dropdown-basic-button" title={`Welcome ${currentUser.providerData[0].displayName || currentUser.email}`}>
                  <Dropdown.Item href="/profile">My bookings</Dropdown.Item>
                  <Dropdown.Item onClick={handleSignOut}>Log out</Dropdown.Item>
                </DropdownButton>) :

                (<Button className="rounded-pill " variant="secondary"
                  onClick={handleShow}
                > <i className="bi bi-person-circle"></i> Sign In</Button>)
              }
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Sidebar />

        <Col className="my-3">
          <Row >

            {loading && (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Spinner animation="border" variant="primary" />
            </div>)}
            {listings.length > 0 && listings.map((item) => (
              <Col sm={3} key={item.id} className="mb-4" >
                <Link to={'/bookings/' + item.id} className="no-underline" >
                  <CardListing location={item.location} distance={item.distance} booking_start={item.booking_start} booking_end={item.booking_end} price={item.price} rating={item.rating} image={item.image} />
                </Link>
              </Col>
            ))}


          </Row>

        </Col>
      </Row>


      <LoginModal show={show} onHide={handleClose} />
    </>
  )
}

export default Landing