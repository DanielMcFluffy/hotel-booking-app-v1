import { Button, Col, Container, Row } from "react-bootstrap"
import { useContext, useEffect } from "react"
//authentication imports
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { AuthContext } from "../components/AuthProvider"
import { useNavigate } from "react-router-dom"

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

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Profile</h1>
            <p>Welcome</p>
            <Button
              onClick={() => signOut(auth)}
              variant="secondary"
              style={{ backgroundColor: '#644646' }}
            >Sign out</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile