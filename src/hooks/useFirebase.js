import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect } from 'react';
import { initializeAppAuthentication } from "../Components/firebase/firebase.init";

import { useDispatch } from 'react-redux'
import { login, logout, setLoading } from "../features/data/dataSlice";
initializeAppAuthentication();

const useFirebase = () => {
    // const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    // const saveUser = (user, method) => {
    //     fetch('http://localhost:5000/users', {
    //         method: method,
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(res => console.log(res))

    // }

    const googleSignIn = (location, navigate) => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                // saveUser(user, "PUT"); 
                navigate(location.state?.from.pathname || '/');
            })
            .catch(error => {
                console.log(error.message);
            })
    };

    const signUpWithEmail = (info) => {
        const { name, email, password, location, navigate } = info;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                //save user ot database
                //update user profile
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://i.stack.imgur.com/YaL3s.jpg"
                }).then((data) => {
                    // Profile updated!
                    // setUser(user);
                    // ...
                    // await handleSignOut();
                    // await logInWithEmail({ email, password });
                    // console.log(user);
                    // saveUser(user, "POST"); 
                    // saveUser(user, "POST");


                }).catch((error) => {
                    // An error occurred
                    // ...
                })

                navigate(location.state?.from.pathname || '/')
                // ...
            }).catch(error => {
                console.log(error.message);
            })
    };
    const logInWithEmail = info => {
        const { email, password } = info;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
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
            }
            dispatch(setLoading(false))

        });
    }, [auth]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(logout())
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
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