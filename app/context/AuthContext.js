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
    updateProfile
} from "firebase/auth";

export const AuthContext = createContext();

const SECRET_KEY = "your_secret_key_here"; // Change to a secure key

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (cipherText) => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
        return null;
    }
};

// ---- Session Storage Functions (for firebase user) ----
const saveUserToSession = (userData, key = "user") => {
    sessionStorage.setItem(key, encryptData(userData));
};
const getUserFromSession = (key = "user") => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? decryptData(storedData) : null;
};
const removeUserFromSession = (key = "user") => {
    sessionStorage.removeItem(key);
};

// ---- Cookie Functions (for manual login user) ----
const saveUserToCookie = (userData, key = "manualUser") => {
    Cookies.set(key, encryptData(userData), { expires: 7, secure: true });
};
const getUserFromCookie = (key = "manualUser") => {
    const storedData = Cookies.get(key);
    return storedData ? decryptData(storedData) : null;
};
const removeUserFromCookie = (key = "manualUser") => {
    Cookies.remove(key);
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ManualUser, setManualUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Manual login (COOKIE storage)
    const loginUserManual = (userData) => {
        setManualUser(userData);
        saveUserToCookie(userData, "manualUser");
    };
    const logOutUserManual = () => {
        setManualUser(null);
        removeUserFromCookie("manualUser");
    };

    // Firebase functions
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signOutUser = async () => {
        setLoading(true);
        await signOut(auth);
        setUser(null);
        removeUserFromSession();
        setLoading(false);
    };
    const updateUserProfile = async (user, name) => {
        await updateProfile(user, { displayName: name });
    };
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        saveUserToSession(result.user);
    };
    const logOut = async () => {
        await signOut(auth);
        setUser(null);
        removeUserFromSession();
    };

    // Auth state listener
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

        // Load from storage
        const storedUser = getUserFromSession();
        if (storedUser) setUser(storedUser);

        const storedManualUser = getUserFromCookie("manualUser");
        if (storedManualUser) setManualUser(storedManualUser);

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            user, ManualUser, loginUserManual, logOutUserManual, loading,
            googleSignIn, logOut, createUser, signInUser, signOutUser, updateUserProfile
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
