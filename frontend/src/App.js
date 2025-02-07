import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutPage from './Components/CheckoutPage';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51QkWrf2VX3dt2aloa3HNGjpGbOF2690DyzsVg41vU055w22OIyxM2XacuIHpRvRuvFBj7OeedmO9H9QEw1VWUmhz00Lt77O0Zk');

function App() {
    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Customizable with appearance API.
        appearance: {/*...*/ },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutPage />
        </Elements>
    );
};

export default App;