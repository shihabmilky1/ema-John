import React, { useState , useContext} from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
 }
const Login = () => {
    const [newUser,setNewUser] = useState(false);
    const [user, setUser] = useState({
        name:'',
        password:'',
        email:'',
        isSignedIn:false
    })//useState

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                mangeUser(user.name);
                toast.success('Create Successful',{
                position:'top-center',}
                );
            })
            .catch((error) => {
              const errorMessage = error.message;
              toast.error(errorMessage,{
                position:'top-center',}
                );
           });
                   }//Create Account By Email && Password
           if(!newUser && user.email  && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                toast.success('Login Successful',{
                    position:'top-center',}
                    );
                setLoggedInUser(user);
                  history.replace(from);     
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage,{
                    position:'top-center',}
                    );
            });
           }//User Login
        e.preventDefault();
    }//handleSubmit
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
    }
    const handleBlur = (e) => {
        let isValid;
        if(e.target.name === 'email'){
            isValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(e.target.value)
        }
        if(e.target.name == 'password'){
            isValid = (/^[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(e.target.value);
        }
        if(isValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }//handleBlur

    const handleGoogle= () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const userBio = result.user;
    const newUserInfo = {...user};
    newUserInfo.name = userBio.displayName;
    newUserInfo.email = userBio.email;
    console.log(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from); 

}).catch((error) => {
    var errorMessage = error.message;
    toast.error(errorMessage,{
        position:'top-center',}
        );
  });
    }//sign in google
    return (
        <>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" onBlur={handleBlur} name='name' placeholder="Your Name" />}
                <br/>
                <input type="email" onBlur={handleBlur} name='email' placeholder="Your Email" required/>
                <br/>
                <input type="password" onBlur={handleBlur} name='password' placeholder="Your Password" required/>
                <br/>
                <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser"/>New User
                <br/>
                <input style={{background:'black',color:'white',padding:'10px 15px',cursor:'pointer'}} type="submit" value={newUser ? "Sign up" : 'Sign in'}/>
            </form>
            <div className="buttons">
            <button onClick={handleGoogle} style={{padding:'10px 15px',background:'whitesmoke',}}><FontAwesomeIcon style={{marginRight:'5px'}} icon={faGoogle} />
            Sign In Google</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;