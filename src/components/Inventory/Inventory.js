import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = () => {
        const product = {}
    fetch('https://obscure-shore-45833.herokuapp.com/addProduct',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
    }
    return (
        <div>
            <form action="">
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="file"/>
                <button type="submit" onClick={handleAddProduct}>Add Product</button> 
            </form>
        </div>
    );
};

export default Inventory;