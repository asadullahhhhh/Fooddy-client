import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";


export const AuthContext = createContext(null)


const ContextProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email and Password Sign up
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email and Password Login
  const logIn = (emil, password) => {
    return signInWithEmailAndPassword(auth, emil, password);
  };

  // Google Login
  const gLogIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // LogOut
  const logOut = () => {
    return signOut(auth);
  };

  // LogIn or LogOut
  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, currentUser => {
        if(currentUser){
            setUser(currentUser)
            setLoading(false)
        }
        else{
          setLoading(false)
        }
    })


    return () => {
        unSuscribe()
    }
  }, [])

  const info = {
    isOpen,
    setIsOpen,
    signUp,
    logIn,
    gLogIn,
    logOut,
    user,
    loading,
    setUser
  };

  return <AuthContext value={info}>{children}</AuthContext>;
};

export default ContextProvider;