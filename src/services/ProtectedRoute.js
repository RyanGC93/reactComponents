import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // your auth context
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { redirect } from "react-router";

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("uscv er", !user);

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        setAuthenticated(true);
        console.log("authenticated", authenticated);
        setLoaded(true);
        redirect("/");
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, [loaded, authenticated]);
  console.log("authenticate 2d", authenticated);
  return true ? children : <Navigate to="/lofgdfgin" />;
};
export default ProtectedRoute;
