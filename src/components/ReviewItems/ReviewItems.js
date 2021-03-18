import React from 'react';
const ReviewItems = (props) => {
    const {name,quantity,key,price} = props.product;
    return (
        <div >
            <h3>{name}</h3>
            <p>Quantity :{quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button onClick={() =>props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItems;