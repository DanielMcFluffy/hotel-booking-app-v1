
import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const LoginModal = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //google auth provider
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    const res = await signInWithPopup(auth, provider);
    GoogleAuthProvider.credentialFromResult(res);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onHide();
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onHide();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered >  <Modal.Header closeButton >
      <Modal.Title style={{ width: '100%', textAlign: 'center', fontSize: '18px' }} centered >Login or Sign Up</Modal.Title>
    </Modal.Header>

      <Modal.Body>
        <p style={{ fontWeight: 'bold', fontSize: '20px' }} >Welcome to Otel</p>
        <Form className="p-2"
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="rounded-pill" variant="secondary" type="submit" style={{ width: '100%', backgroundColor: '#644646' }}
            onClick={handleSignUp}
          >
            Sign up
          </Button>
          <p className='p-0 m-0' style={{ fontSize: '0.75rem', textAlign: 'center' }}>
            By signing up, you agree to our terms of service, privacy policy, and the use of cookies.
          </p>
          <Button variant="secondary" className="rounded-pill mt-3" style={{ width: '100%', backgroundColor: '#644646' }}
            onClick={handleLogin}
          > Login</Button>
          <p style={{ textAlign: 'center' }} >Have an account?</p>
          {/* /////////////////////////////////////////////// */}
          <p className="or-text mt-3" style={{ textAlign: 'center' }} >or</p>
          {/* /////////////////////////////////////////////// */}
          <Button variant="secondary" className="rounded-pill mt-3" style={{ width: '100%', backgroundColor: '#644646' }}
            onClick={handleGoogleSignIn}
          ><i className="bi bi-google"></i>  Continue with Google</Button>



        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal