import React, { useState , useContext} from 'react';
import './Login.css'
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { googleSignIn, initializeFramework, logInUserWithEmailAndPassword , createUserWithEmailAndPassword} from './loginManager';


const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    const [newUser,setNewUser] = useState(false);
    const [user, setUser] = useState({
        name:'',
        password:'',
        email:'',
        isSignedIn:false,
        success:'',
        error:''
    })//useState

    initializeFramework();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogle = () => {
        googleSignIn()
        .then((res) =>{
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
    }
    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            createUserWithEmailAndPassword(user.name, user.email , user.password)
            .then((res) => {
                setUser(res)
                setLoggedInUser(res)
                //history.replace(from)
            })
              }//Create Account By Email && Password

           if(!newUser && user.email  && user.password){
            logInUserWithEmailAndPassword(user.email , user.password)
            .then((res)=>{
                setUser(res);
             setLoggedInUser(res);
             history.replace(from);
            })
           }//User Login
        e.preventDefault();
    }//handleSubmit

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
            <p>{user.success}</p>
            <p>{user.error}</p>
            </div>
            
        </>
    );
};

export default Login;