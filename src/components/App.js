import { useEffect, useState } from "react";
import RoutingPage from "./Router";
import { auth } from "../fBase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName || "Anonymous",
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    // console.log(user);
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  };

  return (
    <div>
      {init ? (
        <RoutingPage
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
