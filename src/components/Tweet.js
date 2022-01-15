import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../fBase";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner, attachmentUrl }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      //delete tweet
      await deleteDoc(doc(db, "tweets", `${tweetObj.id}`));
      if (attachmentUrl) {
        const refFromUrl = ref(storage, attachmentUrl);
        const desertRef = ref(storage, refFromUrl);
        await deleteObject(desertRef);
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (e) => {
    setNewTweet(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(tweetObj, newTweet);
    const newTweetRef = doc(db, "tweets", `${tweetObj.id}`);
    await updateDoc(newTweetRef, {
      text: newTweet,
    });
    setEditing(false);
  };
  return (
    <div className="tweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container tweetEdit">
                <input
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  onChange={onChange}
                  required
                  className="formInput"
                />
                <input type="submit" value="Update Tweet" className="formBtn" />
              </form>
              <button onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {attachmentUrl && <img src={attachmentUrl} alt="" />}
          {isOwner && (
            <div className="tweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
