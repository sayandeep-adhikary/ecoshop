import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { useToast } from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_tlSLNCd7UwEn1FQYwrqLyNzNzs0U9DQ",
  authDomain: "ecoshop-b5edf.firebaseapp.com",
  projectId: "ecoshop-b5edf",
  storageBucket: "ecoshop-b5edf.appspot.com",
  messagingSenderId: "1024688150342",
  appId: "1:1024688150342:web:366331664d56a397673747",
  measurementId: "G-5853F8Q1FG",
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        // console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const toast = useToast();

  const signUpUserWithEmailAndPassword = (name, email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        updateProfile(firebaseAuth.currentUser, {
          displayName: name,
        }).then(() => {
          sendEmailVerification(firebaseAuth.currentUser).then(() => {
            toast({
              title: "Email verification sent.",
              status: "success",
              variant: "subtle",
              position: "top",
              isClosable: true,
            });
          });
        });
        toast({
          title: "Account created.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };
  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then(() => {
        toast({
          title: "Signed In Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };
  const signInWithGithub = () => {
    signInWithPopup(firebaseAuth, githubProvider)
      .then(() => {
        toast({
          title: "Signed In Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };
  const signInUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        toast({
          title: "Signed In Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };
  const signOutUser = () => {
    signOut(firebaseAuth)
      .then(() => {
        toast({
          title: "Logged Out Successfully.",
          status: "success",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
        
      })
      .catch((error) => {
        toast({
          title: capitalizeFirstLetter(
            error.code.split("auth/")[1].split("-").join(" ")
          ),
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
        });
      });
  };
  const isSignedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        isSignedIn,
        signInWithGoogle,
        signInWithGithub,
        signInUserWithEmailAndPassword,
        signOutUser,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
