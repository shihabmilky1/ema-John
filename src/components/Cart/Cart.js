import React from 'react';

const Cart = (props) => {
      const cart = props.cart;
      const {quantity} = props.cart;
    //   const total = cart.reduce((total,product)=> total + product.price * product.quantity ,0)
      let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const convertNum = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h4>Order Summery</h4>
            <p>items ordered : {cart.length}</p>
            <p>product price : {convertNum(total)}</p>
            <p><small>shipping cost : {shipping}</small></p>
            <p><small>tax + vat : {tax}</small></p>
            <p>total price :{grandTotal}</p>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;