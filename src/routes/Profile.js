import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../fBase";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [profilePhoto, setProfilePhoto] = useState("");
  let navigate = useNavigate();

  const onLogOutClick = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const addPhoto = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    //eventlistener
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfilePhoto(result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <div className="container">
      <h3>USER INFORMATION</h3>
      <div class="displayProfile">
        <img
          src={profilePhoto}
          width="80px"
          height="80px"
          alt=" "
          style={{
            backgroundImage: profilePhoto,
            border: "0 solid",
            borderRadius: "100px",
          }}
        />
        <span>{userObj.displayName}</span>
      </div>
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placehoder="Display Name"
          autoFocus
          value={newDisplayName}
          onChange={onChange}
          style={{
            textAlign: "center",
            border: "2px solid white",
            borderRadius: "10px",
            padding: "8px",
          }}
        />
        <input
          type="submit"
          value="Update Profile Name"
          className="formBtn"
          style={{
            marginTop: 30,
          }}
        />
        <label htmlFor="attach-photo" className="formBtn addBtn">
          <span>Update Profile Photo</span>
        </label>
        <input
          id="attach-photo"
          type="file"
          accept="image/*"
          onChange={addPhoto}
          style={{
            opacity: 0,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
