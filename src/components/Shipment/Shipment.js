import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart , processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
      const saveCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: saveCart, shipments : data, orderTime : new Date()}
      fetch('https://obscure-shore-45833.herokuapp.com/placeOrder',{
        method: "POST",
        headers : {"Content-Type": "application/json"},
        body: JSON.stringify(orderDetails)
      })
      .then(res=> res.json())
      .then(data =>{
        if(data){
          processOrder();
          alert('Order Success')
        }
      } )
    };
   
    // console.log(watch("example")); 
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" placeholder='Your Name' defaultValue={loggedInUser.name} ref={register({ required: true })} />
        {errors.name && <span style={{color: 'red'}}>Name is required</span>}        
        <input name="email" placeholder='Email Address' defaultValue={loggedInUser.email} ref={register({ required: true })} />
        {errors.email && <span style={{color: 'red'}} >Email is required</span>}        
        <input name="address" placeholder='Address' ref={register({ required: true })} />
        {errors.address && <span style={{color: 'red'}}>Address is required</span>}        
        <input name="phone" placeholder='Phone Number' ref={register({ required: true })} />
        {errors.phone && <span style={{color: 'red'}}>Phone is required</span>}        
        <input name="country" placeholder='Country Name' ref={register({ required: true })} />
        {errors.country && <span style={{color: 'red'}}>Country Name is required</span>}        
        <br/>
        <input type="submit" style={{background:'black',color:'white',padding:'10px 20px',cursor:'pointer'}} />
      </form>
    );
};

export default Shipment;