import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/manage">Manage Inventory here</Link>
               {loggedInUser.email && <button onClick={()=>setLoggedInUser({})}>{loggedInUser.email && <b>Sign out</b>}</button>}
            </nav>
        </div>
    );
};

export default Header;
