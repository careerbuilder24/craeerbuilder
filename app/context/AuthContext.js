
// First Attempt

// "use client";
// import { auth } from "../firebase/firebase.config";
// import { useContext, createContext, useState, useEffect } from "react";
// import CryptoJS from "crypto-js";
// import {
//     createUserWithEmailAndPassword,
//     GoogleAuthProvider,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     signInWithPopup,
//     signOut,
//     updateProfile
// } from "firebase/auth";

// export const AuthContext = createContext();

// // Encryption functions
// const SECRET_KEY = "your_secretf_ghopkeUgj2FsdGVkX1//PjDM6hCPfnNb3waRyMxAR+GdgIumOv7apGXjgeod7m3Lv9noJrzSZxvUDq2BS+OH2IwJtqWjd6AACkZYtOpzCSsNelQTm9ZH2gFKfGJiQhrF/2cM4UFF8pYvN9B43+jsZ9jgTgMryQZif5yqCND/5K7DGkl3VrA="; // Change this to a secure key

// const encryptData = (data) => {
//     return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
// };

// const decryptData = (cipherText) => {
//     try {
//         const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
//         return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//     } catch (error) {
//         return null;
//     }
// };

// // Secure session storage functions
// const saveUserToStorage = (userData, key = "user") => {
//     sessionStorage.setItem(key, encryptData(userData));
// };

// const getUserFromStorage = (key = "user") => {
//     const storedData = sessionStorage.getItem(key);
//     return storedData ? decryptData(storedData) : null;
// };

// const removeUserFromStorage = (key = "user") => {
//     sessionStorage.removeItem(key);
// };

// export const AuthContextProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [ManualUser, setManualUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Manual login
//     const loginUserManual = (userData) => {
//         setManualUser(userData);
//         saveUserToStorage(userData, "manualUser");
//     };

//     const logOutUserManual = () => {
//         setManualUser(null);
//         removeUserFromStorage("manualUser");
//     };

//     // Create user
//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     };

//     // Sign in user
//     const signInUser = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     // Sign out user
//     const signOutUser = async () => {
//         setLoading(true);
//         await signOut(auth);
//         setUser(null);
//         removeUserFromStorage();
//         setLoading(false);
//     };

//     // Update user profile
//     const updateUserProfile = async (user, name) => {
//         await updateProfile(user, { displayName: name });
//     };

//     // Google login function
//     const googleSignIn = async () => {
//         const provider = new GoogleAuthProvider();
//         const result = await signInWithPopup(auth, provider);
//         setUser(result.user);
//         saveUserToStorage(result.user);
//     };

//     // Google logout function
//     const logOut = async () => {
//         await signOut(auth);
//         setUser(null);
//         removeUserFromStorage();
//     };

//     // Auth state listener
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);
//                 saveUserToStorage(currentUser);
//             } else {
//                 setUser(null);
//                 removeUserFromStorage();
//             }
//             setLoading(false);
//         });

//         // Load session data
//         const storedUser = getUserFromStorage();
//         if (storedUser) setUser(storedUser);

//         const storedManualUser = getUserFromStorage("manualUser");
//         if (storedManualUser) setManualUser(storedManualUser);

//         return () => unsubscribe();
//     }, []);

//     return (
//         <AuthContext.Provider value={{
//             user, ManualUser, loginUserManual, logOutUserManual, loading,
//             googleSignIn, logOut, createUser, signInUser, signOutUser, updateUserProfile
//         }}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export const UserAuth = () => {
//     return useContext(AuthContext);
// };




// Second attempt

// "use client";

// import { auth } from "../firebase/firebase.config";
// import { useContext, createContext, useState, useEffect } from "react";
// import CryptoJS from "crypto-js";
// import Cookies from "js-cookie";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";

// export const AuthContext = createContext();

// // Use environment variable for secret key
// const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "fallback_secret_key";

// // ----- Encryption/Decryption -----
// const encryptData = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

// const decryptData = (cipherText) => {
//   try {
//     const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   } catch {
//     return null;
//   }
// };

// // ----- Session Storage Functions (Firebase User) -----
// const saveUserToSession = (userData, key = "user") => {
//   sessionStorage.setItem(key, encryptData(userData));
// };
// const getUserFromSession = (key = "user") => {
//   const storedData = sessionStorage.getItem(key);
//   return storedData ? decryptData(storedData) : null;
// };
// const removeUserFromSession = (key = "user") => sessionStorage.removeItem(key);

// // ----- Cookie Functions (Manual Login User) -----
// const saveUserToCookie = (userData, key = "manualUser") => {
//   Cookies.set(key, encryptData(userData), {
//     expires: 7,
//     secure: true,
//     sameSite: "Strict",
//   });
// };
// const getUserFromCookie = (key = "manualUser") => {
//   const storedData = Cookies.get(key);
//   return storedData ? decryptData(storedData) : null;
// };
// const removeUserFromCookie = (key = "manualUser") => Cookies.remove(key);

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Firebase user
//   const [ManualUser, setManualUser] = useState(null); // Manual login user
//   const [loading, setLoading] = useState(true);

//   // ----- Manual Login -----
//   const loginUserManual = (userData, expiryMinutes = 30) => {
//     const expireAt = new Date().getTime() + expiryMinutes * 60 * 1000;
//     const dataWithExpiry = { ...userData, expireAt };
//     setManualUser(dataWithExpiry);
//     saveUserToCookie(dataWithExpiry, "manualUser");
//   };

//   const logOutUserManual = () => {
//     setManualUser(null);
//     removeUserFromCookie("manualUser");
//   };

//   // ----- Firebase Auth Functions -----
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signInUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const signOutUser = async () => {
//     setLoading(true);
//     await signOut(auth);
//     setUser(null);
//     removeUserFromSession();
//     setLoading(false);
//   };

//   const updateUserProfile = async (user, name) => {
//     await updateProfile(user, { displayName: name });
//   };

//   const googleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     setUser(result.user);
//     saveUserToSession(result.user);
//   };

//   const logOut = async () => {
//     await signOut(auth);
//     setUser(null);
//     removeUserFromSession();
//   };

//   // ----- Auto Logout Timer for Manual User -----
//   useEffect(() => {
//     let timer;
//     if (ManualUser?.expireAt) {
//       const timeLeft = ManualUser.expireAt - new Date().getTime();
//       if (timeLeft > 0) {
//         timer = setTimeout(() => {
//           logOutUserManual();
//         }, timeLeft);
//       } else {
//         logOutUserManual();
//       }
//     }
//     return () => clearTimeout(timer);
//   }, [ManualUser]);

//   // ----- Auto Logout Timer for Firebase User -----
//   useEffect(() => {
//     let firebaseTimer;
//     if (user) {
//       firebaseTimer = setTimeout(() => {
//         logOut();
//       }, 60 * 60 * 1000); // 1 hour auto logout
//     }
//     return () => clearTimeout(firebaseTimer);
//   }, [user]);

//   // ----- Auth State Listener -----
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         saveUserToSession(currentUser);
//       } else {
//         setUser(null);
//         removeUserFromSession();
//       }
//       setLoading(false);
//     });

//     // Load manual user from cookie
//     const storedManualUser = getUserFromCookie("manualUser");
//     if (storedManualUser) {
//       const now = new Date().getTime();
//       if (storedManualUser.expireAt > now) {
//         setManualUser(storedManualUser);
//       } else {
//         removeUserFromCookie("manualUser");
//       }
//     }

//     // Load Firebase user from session storage
//     const storedUser = getUserFromSession();
//     if (storedUser) setUser(storedUser);

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         ManualUser,
//         loginUserManual,
//         logOutUserManual,
//         loading,
//         googleSignIn,
//         logOut,
//         createUser,
//         signInUser,
//         signOutUser,
//         updateUserProfile,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => useContext(AuthContext);


// Third attempt
"use client";

import { auth } from "../firebase/firebase.config";
import { useContext, createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "fallback_secret_key";

/* ---------- Encryption / Decryption ---------- */
const encryptData = (data) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
};

/* ---------- Session Storage ---------- */
const saveUserToSession = (userData, key = "user") =>
  sessionStorage.setItem(key, encryptData(userData));

const getUserFromSession = (key = "user") => {
  const storedData = sessionStorage.getItem(key);
  return storedData ? decryptData(storedData) : null;
};

const removeUserFromSession = (key = "user") => sessionStorage.removeItem(key);

/* ---------- Cookie Functions ---------- */
const saveUserToCookie = (userData, key = "manualUser") => {
  Cookies.set(key, encryptData(userData), {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
  if (userData.email)
    Cookies.set("user_email", userData.email, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  if (userData.name)
    Cookies.set("user_name", userData.name, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
};

const getUserFromCookie = (key = "manualUser") => {
  const storedData = Cookies.get(key);
  return storedData ? decryptData(storedData) : null;
};

const removeUserFromCookie = (key = "manualUser") => {
  Cookies.remove(key);
  Cookies.remove("user_email");
  Cookies.remove("user_name");
};

/* ---------- Auth Context Provider ---------- */
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [ManualUser, setManualUser] = useState(null); // Manual login user
  const [loading, setLoading] = useState(true);

  /* ---------- Manual Login ---------- */
  // const loginUserManual = (userData, expiryMinutes = 30) => {
  //   const expireAt = new Date().getTime() + expiryMinutes * 60 * 1000;
  //   const dataWithExpiry = { ...userData, expireAt };
  //   setManualUser(dataWithExpiry);
  //   saveUserToCookie(dataWithExpiry, "manualUser");
  // };

  const loginUserManual = (userData) => {
    const expireAt = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
    const dataWithExpiry = { ...userData, expireAt };
    setManualUser(dataWithExpiry);
    saveUserToCookie(dataWithExpiry, "manualUser");
  };


  const logOutUserManual = () => {
    setManualUser(null);
    removeUserFromCookie("manualUser");
  };

  /* ---------- Firebase Auth ---------- */
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = async (user, name) => {
    await updateProfile(user, { displayName: name });
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    saveUserToSession(result.user);
    return result;
  };

  /* ---------- Unified Logout ---------- */
  const logoutAll = async () => {
    try {
      // Firebase logout
      await signOut(auth);

      // Clear both manual + firebase states
      setUser(null);
      setManualUser(null);

      removeUserFromSession();
      removeUserFromCookie();

      // Also clear extra storage
      sessionStorage.removeItem("manualUser");
      localStorage.removeItem("blog_draft");
      localStorage.removeItem("blogDraft");

    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Auto Logout for Manual User
  useEffect(() => {
    let timer;
    if (ManualUser?.expireAt) {
      const timeLeft = ManualUser.expireAt - Date.now();
      if (timeLeft > 0) {
        timer = setTimeout(() => {
          logoutAll();  // instead of only logOutUserManual
        }, timeLeft);
      } else {
        logoutAll();
      }
    }
    return () => clearTimeout(timer);
  }, [ManualUser]);

  // Auto Logout for Firebase User (24h)
  useEffect(() => {
    let firebaseTimer;
    if (user) {
      firebaseTimer = setTimeout(() => {
        logoutAll();
      }, 24 * 60 * 60 * 1000); // 24 hours
    }
    return () => clearTimeout(firebaseTimer);
  }, [user]);

  /* ---------- Firebase Auth State Listener ---------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        saveUserToSession(currentUser);
      } else {
        setUser(null);
        removeUserFromSession();

      }
      setLoading(false);
    });

    // Load manual user
    const storedManualUser = getUserFromCookie("manualUser");
    if (storedManualUser && storedManualUser.expireAt > new Date().getTime()) {
      setManualUser(storedManualUser);
    } else {
      removeUserFromCookie("manualUser");
    }

    // Load Firebase user
    const storedUser = getUserFromSession();
    if (storedUser) setUser(storedUser);

    return () => unsubscribe();
  }, []);

  /* ---------- Combined Logged-In User ---------- */
  const loggedInUser = ManualUser || user;

  return (
    <AuthContext.Provider
      value={{
        user, // Firebase user
        ManualUser, // Manual user
        loggedInUser, //  unified user object
        loginUserManual,
        logOutUserManual,
        loading,
        googleSignIn,
        logoutAll, //  single logout
        createUser,
        signInUser,
        updateUserProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
