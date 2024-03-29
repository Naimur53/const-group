import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect } from 'react';

import { useDispatch } from 'react-redux'
import { isAdmin, login, logout, putUserToDb, saveUserToDb, setLoading } from "../features/data/dataSlice";

const useFirebase = () => {
    // const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    // const saveUser = (user, method) => {
    //     fetch('https://cosnt-group-server-production.up.railway.app/users', {
    //         method: method,
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(res => 

    // }

    const googleSignIn = (location, navigate) => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                // saveUser(user, "PUT");  
                dispatch(putUserToDb({
                    displayName: user.displayName,
                    email: user.email,
                    createdAt: user.metadata.createdAt,
                    photoURL: user.photoURL,
                    uid: user.uid
                }))
                navigate(location.state?.from.pathname || '/');
            })
            .catch(error => {
            })
    };

    const signUpWithEmail = (info) => {
        const { name, email, password, location, navigate } = info;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                //save user ot database
                dispatch(saveUserToDb({
                    displayName: name,
                    email: user.email,
                    createdAt: user.metadata.createdAt,
                    photoURL: 'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png',
                    uid: user.uid
                }))
                //update user profile
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                }).then((data) => {


                }).catch((error) => {
                    // An error occurred
                    // ...
                })

                navigate(location.state?.from.pathname || '/')
                // ...
            }).catch(error => {

            })
    };
    const logInWithEmail = info => {
        const { email, password } = info;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in  
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
            });
    }

    useEffect(() => {
        dispatch(setLoading(true))
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // setUser(user);
                dispatch(login({
                    displayName: user.displayName,
                    email: user.email,
                    createdAt: user.metadata.createdAt,
                    photoURL: user.photoURL,
                    uid: user.uid
                }))
                dispatch(isAdmin({ email: user.email }))
            }
            else {
                dispatch(setLoading(false))
            }

        });
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(logout())
            // Sign-out successful.
        }).catch((error) => {
            // An error happened. 
        });
    }

    return {
        handleSignOut,
        googleSignIn,
        signUpWithEmail,
        logInWithEmail,
    };
};

export default useFirebase;