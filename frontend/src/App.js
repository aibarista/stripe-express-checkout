import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutPage from './Pages/CheckOutPage';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
    const options = {
        mode: 'payment',
        amount: 2500,
        currency: 'usd',
        appearance: {/*...*/ },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutPage />
        </Elements>
    );
};

export default App;
