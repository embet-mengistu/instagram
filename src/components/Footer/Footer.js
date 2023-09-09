import React, { useEffect, useState } from "react";
import "./footer.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../../firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

function Footer(props) {
  const navigate = useNavigate();
  const user = props.user;
  const [showDiv, setShowDiv] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  // when post button is clicked
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleDisabled = () => {
    if (!user) {
      setShowLoginMessage(true); // Show the login message
    } else {
      // Handle the action for a logged-in user
    }
  };
  useEffect(() => {
    if (showLoginMessage) {
      alert("You have to log in first to perform this action");
    }
  }, [showLoginMessage]);

  // handle the post div
  const handleClick = () => {
    setShowDiv(!showDiv); // Toggle the value of showDiv
  };

  // updating the file input with the selcted file
  const handleChange = (e) => {
    // if they select morethan 2 files,we are just taking  the one  at the list
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // handles the upload button
  const uploadToStorage = async () => {
    try {
      // storage: This refers to a Firebase Storage instance
      // storage.ref(): This function returns a reference to the root directory of your Firebase Storage bucket.
      // .ref(images/${image.name}): This part specifies the path within the storage bucket where you want to store the image. In this case, it's using a dynamic path composed of the string 'images/' followed by the name property of the image object.
      // image.name refers to the name of z image selected in handlechange fn(u can see it near the choose file button)
      // .put(image): This method is used to upload the image file to the specified location in the storage bucket.
      // conclusion..its just uploading the image
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      return new Promise((resolve, reject) => {
        // tracking how much is left to upload the image
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // making number from 0 to hundred based on how much file is sent so that the progress bar can display it
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      // calling the upload fn we worte
      await uploadToStorage();
      // after it uploades,get the downloaded link(url) so that we can pass it imageUrl
      const url = await storage
        .ref("images")
        .child(image.name)
        .getDownloadURL();

      await db.collection("posts").add({
        // using time from the database
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        caption: caption,
        // passing the url from line 87
        imageUrl: url,
        username: user.displayName,
      });

      setImage(null);
      setCaption("");
      setProgress(0);

      console.log(url);
    } catch (error) {
      console.log(error);
      alert("An error occurred during the upload process.");
    }
  };
  return (
    <div className="Footer">
      <div className="footer_logos">
        <div>
          <Button
            className="footer_buttons"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              className="home_logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBS3HQrW4rYidHHMVBj91XIvhVYzdq0LcqASK4Xakk&s"
            />
          </Button>
        </div>
        <div>
          {showDiv && (
            <div className="post_overlay">
              <div className="upload_div">
                <div className="progress_container">
                  <progress
                    className="imageupload_progress"
                    max="100"
                    value={progress}
                  />
                </div>
                <div className="upload_inputs">
                  <input
                    type="text"
                    placeholder="Enter a caption..."
                    className="upload_input"
                    value={caption}
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                  />
                </div>
                <div className="file_input_div">
                  <div className="file_input">
                    <input type="file" onChange={handleChange} />
                  </div>

                  <div className="upload_button">
                    <Button onClick={handleUpload}>Upload</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {user ? (
            <Button
              className="footer_buttons"
              onClick={handleClick}
              // disabled={!user}
            >
              <img
                className="post_logo"
                src="https://cdn-icons-png.flaticon.com/512/6537/6537820.png"
              />
            </Button>
          ) : (
            <Button
              className="footer_buttons"
              onClick={handleDisabled}
              // disabled={!user}
            >
              <img
                className="post_logo"
                src="https://cdn-icons-png.flaticon.com/512/6537/6537820.png"
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
