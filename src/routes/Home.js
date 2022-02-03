import { useState } from "react";

import { collection, orderBy, query, onSnapshot } from "firebase/firestore";

import { db } from "../fBase";
import { useEffect } from "react";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    //realtime updates
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
            attachmentUrl={tweet.attachmentUrl}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
