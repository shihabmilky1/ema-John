import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
const Shop = () => {  
  const [products, setProducts]  = useState([]);
  const [cart,setCart] = useState([]);

    useEffect(()=>{
        fetch('https://obscure-shore-45833.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])



  useEffect(() =>{
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    fetch('http://localhost:5000/productByKeys',{
        method: 'POST',
        headers : {"Content-Type" :"application/json"},
        body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))
    // if(products.length > 0){
    //     const previousCart = productKeys.map( pdkey =>{
    //         const product = products.find(pd => pd.key === pdkey);
    //         product.quantity = saveCart[pdkey];
    //         return product;
    //     })
    //     setCart(previousCart)
    // }
  },[])

  const handleAddProduct = (product) => {
    const sameProduct = cart.find(pd => pd.key === product.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
        count = sameProduct.quantity + 1;
        // console.log(count);
        sameProduct.quantity = count;
        // console.log(sameProduct.quantity);
        const others = cart.filter(pd => pd.key !== product.key);
        newCart = [...others,sameProduct]
    }
    else{
        product.quantity = 1;
        newCart = [...cart,product]
    }
      setCart(newCart);
      addToDatabaseCart(product.key,count)
  }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} showAddToCart={true} product={product} handleAddProduct={handleAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
            <Cart cart={cart}>
            <Link to="/review">
            <button>Review Order</button>
            </Link>
            </Cart>
            </div>

        </div>
    );
};

export default Shop;