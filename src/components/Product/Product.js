import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    const { img, name, seller, price , stock , key} = props.product;
    // console.log()
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soo</small></p>
               { props.showAddToCart === true && <button onClick={()=> props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}
            </div>

        </div>
    );
};

export default Product;