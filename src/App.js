import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product  , setProduct] =useState({
      name:"React from FB",
      price:399,
      productBy:"SNITCH"

  })
  const makePayment= token=>{
    const body={
      token ,
      product
    }
    const headers={
      "content-Type":"application/json"
    }

    return fetch(`http://localhost:8282/payment`,{
      method:"POST",
      headers ,
      body:JSON.stringify(body)
    }).then(response=>{
      console.log("RESPONSE" , response);
      const{status}=response;
      console.log("STATUS", status);

    })
    .catch(error=>console.log(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
        stripeKey="pk_test_51P8D1tSDYOr93Wwos1r9S6usR52p4xPdKY63pSw0naqC8AVK5YsQh8ne5IuNeD9P4QxKSxXJfZBdNuSdtpFvWcnF00ZpwJScEa"
        token= {makePayment}
        name="Buy Tshirt"
        amount={product.price * 100}
        shippingAddress
        billingAddress
        >
      <button className="btn-large blue">Buy your Customize tshirt in just {product.price} $</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
