import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51IeGgvCvYK065ALopgI9UsyqdYrPK6sLYRCwbJuXYyjsOB9cgmy4aXw25s762TIfEBvbiWCLUJrkt7nPqinvLpqo00IerrByYs');
const ProcessPayment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
           <SimpleCardForm></SimpleCardForm>
            </Elements>
        </div>
    );
};

export default ProcessPayment;