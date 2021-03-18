import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const initializeFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
}//initializeFramework

export const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const userBio = result.user;
            const newUserInfo = {
                name:userBio.displayName,
                email:userBio.email,
            };
            return newUserInfo

        }).catch((error) => {
            var errorMessage = error.message;
            toast.error(errorMessage, {
                position: 'top-center',
            }
            );
        });
}//googleSignIn

// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//             .then((res) => {
//                 mangeUser(user.name);
//                 toast.success('Create Successful',{
//                 position:'top-center',}
//                 );
//             })
//             .catch((error) => {
//               const errorMessage = error.message;
//               toast.error(errorMessage,{
//                 position:'top-center',}
//                 );
//            });
// }

// export const logInUserWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//             .then((res) => {
//                 toast.success('Login Successful',{
//                     position:'top-center',}
//                     );
//                 setLoggedInUser(user);
//                   history.replace(from);     
//             })
//             .catch((error) => {
//                 const errorMessage = error.message;
//                 toast.error(errorMessage,{
//                     position:'top-center',}
//                     );
//             });
// }

// const mangeUser = name => {
//     const user = firebase.auth().currentUser;
//         user.updateProfile({
//         displayName: name,
//         }).then((res) => {
//         // Update successful.
//         // console.log(res);
//         }).catch((error) => {
//         // An error happened.
//         });
// }//mangeUser