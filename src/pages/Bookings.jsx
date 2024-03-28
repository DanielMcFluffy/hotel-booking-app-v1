import { Button, Card, Col, Container, Dropdown, DropdownButton, Image, Navbar, Row } from "react-bootstrap"
import brand from "../assets/brand.png";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing, bookListing } from "../features/slices/listingSlice";
import ReactDatePicker from "react-datepicker";
import { differenceInDays, addDays, addMonths } from 'date-fns';
import LoginModal from "../components/LoginModal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";


//date format function
const formatDate = (date) => {
  return date ? date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '';
}

//datepicker component
const DatePicker = ({ startDate, endDate, onChange }) => {
  return (
    <ReactDatePicker
      selected={startDate}
      onChange={onChange}
      minDate={addDays(new Date(), 1)}
      maxDate={addMonths(new Date(), 5)}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      showDisabledMonthNavigation
    />
  );
};


const Bookings = () => {

  //useParams hook to extract the bookingId from the URL to send query to the database by filtering the booking with the bookingId
  const { bookingId } = useParams();

  const { currentUser } = useContext(AuthContext);

  //dispatch function to book the listing
  const handleBooking = async () => {
    const resultAction = await dispatch(bookListing({ data: { uid: currentUser.uid, booking_start: formatDate(startDate), booking_end: formatDate(endDate) }, id: bookingId }));
    if (bookListing.fulfilled.match(resultAction)) {
      const response = resultAction.payload;
      if (response.status === 200) {
        alert('Booking successful!');
      }
    }
    else {
      alert('This listing has been booked by another user. Please try another listing.');
    }
  }


  //fetch the booking data from the database using the bookingId

  // state management variables
  const listings = useSelector(state => state.listing.listings);
  // const loading = useSelector(state => state.listing.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListing(bookingId));
  }, [dispatch, bookingId])

  console.log(currentUser)

  //uid of the user to sent to the db
  console.log((currentUser && currentUser.uid) || 'No user logged in')
  console.log(listings)


  //date picker state management

  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  //modal state management
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //logout function button

  const handleSignOut = () => {
    signOut(auth);
  }


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

      <Container>
        <Row sm={6}>
          <h2>{listings.location}</h2>
        </Row>
        <Row>
          <Col sm={8}>

            <Image
              src={listings.image}
              alt="brand-image"
              style={{
                height: "400px",
                width: "600px",
                objectFit: "cover",
              }} />
            <ul>
              <li>
                <p>Distance: {listings.distance} kilometers away</p>
              </li>
              <li>
                <p>{`Rating: ${listings.rating}/5`}</p>
              </li>
            </ul>
          </Col>
          <Col sm={4}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Total</Card.Title>
                <Card.Text>

                  <span style={{ fontWeight: 'bold' }} > {`RM${listings.price}`}</span> night {endDate ? `x ${differenceInDays(new Date(endDate), new Date(startDate))}` : ''} = <span style={{ fontWeight: 'bold' }} >{differenceInDays(new Date(endDate), new Date(startDate)) > 0 ? `RM${listings.price * differenceInDays(new Date(endDate), new Date(startDate))}` : ''}</span>

                  <br />
                  {`Booking start: ${formatDate(startDate)}`} <br />
                  {`Booking end: ${formatDate(endDate)}`} <br />

                  {/* keep track of ${formatDate(startDate)} and ${formatDate(endDate)} to be passed to the db  */}

                  <DatePicker startDate={startDate} endDate={endDate} onChange={onChange} />
                </Card.Text>

                <Button
                  //if user is logged in, the booking button will be enabled, else the login modal will be shown
                  onClick={currentUser ? handleBooking : handleShow}
                  variant="primary">Book</Button>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <LoginModal show={show} onHide={handleClose} />

      </Container>
    </>
  )
}


export default Bookings