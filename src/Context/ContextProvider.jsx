import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";
import { getElement } from "../Utility/Utility";


export const AuthContext = createContext(null)


const ContextProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkLight, setDarkLight] = useState(false);

  useEffect(() => {
    const data = getElement();
    setDarkLight(data);
  }, [setDarkLight]);

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
    setUser,
    darkLight,
    setDarkLight
  };

  return <AuthContext value={info}>{children}</AuthContext>;
};

export default ContextProvider;