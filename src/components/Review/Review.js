import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
// import fakeData from '../../fakeData'
import ReviewItems from '../ReviewItems/ReviewItems';
import './Review.css'
import Cart from '../Cart/Cart';
import thankImages from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [placeOrdered,setPlaceOrdered] = useState(false)
    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment')
}
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
       
    };
    useEffect(() => {
        // cart
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart)
        fetch('https://obscure-shore-45833.herokuapp.com/productByKeys',{
            method: 'POST',
            headers : {"Content-Type" :"application/json"},
            body: JSON.stringify(productKey)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        // const CartProduct = productKey.map(key => {
        //     const product = fakeData.find(pd=> pd.key === key)
        //     product.quantity = saveCart[key];
        //     console.log(saveCart[key])
        //     return product;
        // });
        // setCart(CartProduct)
    },[])
    let thank;
    if (placeOrdered) {
        thank = <img src={thankImages}/>
    }
    return (
        <div className="shop-container">
          <div className="product-container">
          {
                cart.map(pd => <ReviewItems removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItems>
                    )
            }
            {thank}
               {/* https://prnt.sc/10n67nb */}
          </div>
          <div className="cart-container">
              <Cart cart={cart}>
                  <button onClick={handleProceedCheckout} >Proceed Checkout</button>
              </Cart>
          </div>
        </div>
    );
};

export default Review;