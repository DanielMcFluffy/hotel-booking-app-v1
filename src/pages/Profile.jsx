import { Container, Dropdown, DropdownButton, Image, Navbar } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
//authentication imports
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { AuthContext } from "../components/AuthProvider"
import { useNavigate } from "react-router-dom"
import brand from "../assets/brand.png";
import axios from "axios"
import { deleteBooking } from "../features/slices/listingSlice"
import { useDispatch } from "react-redux"

//MUI imports for table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const BASE_URL = 'https://d035733c-64bf-4096-9586-89a1c9c838f3-00-3ch5klv342331.kirk.replit.dev';

const Profile = () => {
  //check if currentUser exists
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //if currentUser is null, redirect to login page
  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
    console.log(currentUser)
  }, [currentUser, navigate])

  //signout handler
  const handleSignOut = () => {
    signOut(auth);
    navigate('/');
  }

  //useState to set the bookings data
  const [userBookings, setUserBookings] = useState([]);

  //extract out the uid from currentuser and use to query the database for the specific user's bookings
  //useEffect to fetch the data from the database


  useEffect(() => {
    const fetchUserBooking = async () => {
      const res = await axios.post(`${BASE_URL}/bookings/user`, { uid: currentUser.uid })
      setUserBookings(res.data)
    }
    fetchUserBooking()
  }, [currentUser])

  const rows = userBookings;

  const dispatch = useDispatch();

  //delete booking handler
  const handleDelete = (id) => {
    dispatch(deleteBooking(id));
    alert('Booking deleted successfully!')
    //refetch the user bookings
    const fetchUserBooking = async () => {
      const res = await axios.post(`${BASE_URL}/bookings/user`, { uid: currentUser.uid })
      setUserBookings(res.data)
    }
    fetchUserBooking()
  }


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

              <DropdownButton id="dropdown-basic-button" title={`Welcome ${currentUser.providerData[0].displayName}`}>
                <Dropdown.Item href="/profile">My bookings</Dropdown.Item>
                <Dropdown.Item
                  onClick={handleSignOut}
                >Log out</Dropdown.Item>
              </DropdownButton>

            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4" >

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Location </TableCell>
                <TableCell align="right">Distance</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Booking Start</TableCell>
                <TableCell align="right">Booking End</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.location}
                  </TableCell>
                  <TableCell align="right">{row.distance}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.rating}</TableCell>
                  <TableCell align="right">{row.booking_start}</TableCell>
                  <TableCell align="right">{row.booking_end}</TableCell>
                  <TableCell align="right"><Button
                    href={`/bookings/${row.id}`}
                  >Update</Button></TableCell>
                  <TableCell align="right"><Button
                    onClick={() => handleDelete(row.id)}
                  >Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Profile