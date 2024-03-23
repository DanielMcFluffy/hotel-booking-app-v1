import './Login.css'
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import brand from "../assets/brand.png";
import { useContext, useEffect, useState } from 'react';
import LoginModal from '../components/LoginModal';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';




const Login = () => {
  const [showModal, setShowModal] = useState(null);
  const showSignUp = () => setShowModal('SignUp');
  const showLogin = () => setShowModal('Login');
  const onHide = () => setShowModal(null);

  //extract out current user from the context value and redirect them to the profile page if they are logged in
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
  })

  return (
    <Container>
      <Row >
        <Col sm={6} className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }} >
          <Image
            src={brand}
            alt="brand-image"
            style={{
              height: "250px",
              width: "200px",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col sm={6} >
          <p className="m-4" style={{ fontSize: '54px' }} >Hotel bookings doesn&apos;t have to be boring.</p>
          <br />
          <p className="m-2" style={{ fontSize: '36px' }} >You deserve to excel. That begins with Otel.</p>
          <Col>
            <Row className="d-flex justify-content-center align-items-center p-3" >

              <Button variant="secondary" className="rounded-pill mt-3" style={{ width: '330px', backgroundColor: '#644646' }} ><i className="bi bi-google"></i>  Sign up with Google</Button>

              <Button variant='secondary' className="rounded-pill mt-3" style={{ width: '330px', backgroundColor: '#644646' }} ><i className="bi bi-facebook"></i> Sign up with Facebook</Button>

              <p className="or-text mt-3" style={{ textAlign: 'center' }} >or</p>


              <Button variant="secondary" className="rounded-pill mt-1" style={{ width: '330px' }}
                onClick={showSignUp}
              > Create an account</Button>
              <p className='mt-1' style={{ fontSize: '0.75rem', textAlign: 'center' }}>
                By signing up, you agree to our terms of service, privacy policy, and the use of cookies.
              </p>
              <Button variant="secondary" className="rounded-pill mt-3" style={{ width: '330px', backgroundColor: '#644646' }}
                onClick={showLogin}
              > Sign In</Button>
              <p style={{ textAlign: 'center' }} >Have an account?</p>
            </Row>
          </Col>
        </Col>
        <LoginModal show={showModal !== null} onHide={onHide} showModal={showModal} />
      </Row>
    </Container>
  )
}

export default Login