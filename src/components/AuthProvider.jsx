import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

//context to be passed in the user auth info
export const AuthContext = createContext();

// component that will be protecting routes (children) from unauthorized access i.e. currentUser === null 
const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  //checks if user is logged in

  //return keyword used to cleanup(unsubscribe) the listener when the component is unmounted.
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, [])

  const user = { currentUser }

  return (
    <AuthContext.Provider value={user}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider