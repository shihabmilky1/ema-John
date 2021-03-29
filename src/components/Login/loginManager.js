import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

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
                name: userBio.displayName,
                email: userBio.email,
            };
            return newUserInfo;
        }).catch((error) => {
            var errorMessage = error.message;
            return errorMessage;
        });
}//googleSignIn

export const createUserWithEmailAndPassword = (name , email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                const newUserInfo = res;
                newUserInfo.error = '';
                newUserInfo.success = 'Create Successful';
                mangeUser(name);
                 return newUserInfo;
            })
            .catch((error) => {
              const errorMessage = error.message;
              const newUserInfo = {};
              newUserInfo.success = '';
              newUserInfo.error = errorMessage;
                    return errorMessage;                
           });
}

export const logInUserWithEmailAndPassword = (email , password) => {
  return  firebase.auth().signInWithEmailAndPassword(email , password)
            .then((res) => {
                const newUserInfo = res.user;
                newUserInfo.error = '';
                newUserInfo.success = 'Login Successful';
              return newUserInfo;
            })
            .catch((error) => {
                const errorMessage = error.message;
                const newUserInfo = {};
                newUserInfo.success = '';
                newUserInfo.error = errorMessage;
                    return errorMessage;
            });
}

const mangeUser = name => {
    const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name,
        }).then((res) => {
        // Update successful.
        // console.log(res);
        }).catch((error) => {
        // An error happened.
        });
}//mangeUser