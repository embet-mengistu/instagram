import React from "react";
import "./header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { db, auth } from "../../firebase";
import Footer from "../Footer/Footer";

function Header(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = props;
  const navigate = useNavigate();

  // handles the signUp modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handles the sign in modals
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleSignInClose = () => setOpenSignIn(false);
  const handleSignInShow = () => setOpenSignIn(true);

  // tracks if logged in or out(authentication)
  useEffect(() => {
    // "auth.onAuthStateChanged": This method is provided by Firebase Authentication to listen to changes in the authentication state. It takes a callback function as its argument, which will be triggered whenever the authentication state changes.CAPTURES if logged in or not

    const unsubscribe = auth.onAuthStateChanged(
      // authUser: The parameter of the callback function represents the current user's data if authenticated, or null if not authenticated.
      (authUser) => {
        if (authUser) {
          // User is authenticated, you can execute code here
          console.log("User is logged in:", authUser);
          setUser(authUser);
          // Update your state, redirect, or perform other actions
        } else {
          setUser(null);
          // User is not authenticated, you can execute code here
          console.log("User is logged out");
          // Update your state, show login UI, or perform other actions
        }
      },
      [user, username]
    );
    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  // handles signUp
  const signUp = (e) => {
    e.preventDefault();

    // Create account for users
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Update the user's profile with the provided username
        return authUser.user
          .updateProfile({ displayName: username })
          .then(() => {
            // Sign-up and profile update successful
            setUser(authUser.user); // Update user state
            setUsername("");
            setEmail("");
            setPassword("");
            handleClose(); // Close the modal
          })
          .catch((updateProfileError) => {
            console.error("Error updating profile:", updateProfileError);
            alert(
              "An error occurred while updating the profile. Please try again."
            );
          });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        alert("An error occurred while signing up. Please try again.");
      });
  };

  // handles signIn
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password) // Use the correct state variables here
      .then((data) => {
        // Sign-in successful.
        setUser(data.user);
        setEmail("");
        setPassword("");
        setOpenSignIn(false); // Close the sign-in modal
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert("An error occurred while signing in. Please try again.");
      });
  };

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        setUsername("");
        setPassword("");
        setEmail("");
        setUser(null); // Update the user state to reflect the user being logged out
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="header">
      <div className="header_logos">
        <div>
          <img
            className="app_headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          />
        </div>
        {user ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              {/* <Button
                className="message_button"
                onClick={() => {
                  navigate("/messages");
                }}
              >
                <img
                  className="message_logo"
                  src="https://socialpros.co/wp-content/uploads/2023/05/2023-05-20_20h36_12.png"
                />
              </Button> */}
            </div>
            <div className="logOut_button">
              <Button onClick={handleLogOut}>LogOut</Button>
            </div>
          </div>
        ) : (
          <div>
            <Button
              style={{
                marginRight: "10px",
              }}
              onClick={handleSignInShow}
            >
              SignIn
            </Button>
            <Button onClick={handleShow}>SignUp</Button>
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose} className="modal" backdrop="true">
        <div className="signUp_container">
          <Modal.Header>
            <Modal.Title>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                className="app_headerImages"
                style={{ display: "block", margin: "0 auto" }}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="app_signup">
              <br />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {/* <Form.Label>Username</Form.Label> */}
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoFocus
                  style={{ width: "calc(99% - 5px)", marginRight: "5px" }}
                />
              </Form.Group>

              <br />
              <Form.Group
                className="mb-3 "
                controlId="exampleForm.ControlInput1"
              >
                {/* <Form.Label>Email Address</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  autoFocus
                  style={{ width: "calc(99% - 5px)", marginRight: "5px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <br />
              <Form.Group
                className="mb-3 lg-6"
                controlId="exampleForm.ControlTextarea1"
              >
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  autoFocus
                  style={{ width: "calc(99% - 5px)", marginRight: "5px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <br />
            </Form>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ width: "calc(50% - 5px)", marginRight: "5px" }}
              >
                Close
              </Button>

              <Button
                type="submit"
                variant="primary"
                onClick={signUp}
                style={{ width: "calc(50% - 5px)", marginRight: "5px" }}
              >
                Sign Up
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </div>
      </Modal>
      {/* SIGN IN */}
      <Modal
        show={openSignIn}
        onHide={() => setOpenSignIn(false)}
        className="modal"
        backdrop="true"
      >
        <div className="signUp_container">
          <Modal.Header>
            <Modal.Title>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                className="app_headerImages"
                style={{ display: "block", margin: "0 auto" }}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="app_signup">
              <br />
              <Form.Group
                className="mb-3 "
                controlId="exampleForm.ControlInput1"
              >
                {/* <Form.Label>Email Address</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  autoFocus
                  style={{ width: "calc(99% - 5px)", marginRight: "5px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <br />
              <Form.Group
                className="mb-3 lg-6"
                controlId="exampleForm.ControlTextarea1"
              >
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  autoFocus
                  style={{ width: "calc(99% - 5px)", marginRight: "5px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <br />
            </Form>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleSignInClose}
                style={{ width: "calc(50% - 5px)", marginRight: "5px" }}
              >
                Close
              </Button>

              <Button
                type="submit"
                variant="primary"
                onClick={signIn}
                style={{ width: "calc(50% - 5px)", marginRight: "5px" }}
              >
                Sign In
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
