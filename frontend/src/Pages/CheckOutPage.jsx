import React, { useState } from 'react';
import { useStripe, useElements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { api } from "../helper";

const CheckoutPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState();

    const onConfirm = async (event) => {
        if (!stripe) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        const result = await api.post('/create-intent', { amount: 2500 });

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret: result.data.client_secret,
            confirmParams: {
                return_url: 'http://testpets.waggle.org',
            },
        });

        console.log(paymentIntent);

        if (error) {
            setErrorMessage(error.message);
        } else {
        }
    };

    return (
        <div id="checkout-page">
            <ExpressCheckoutElement onConfirm={onConfirm} />
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
};

export default CheckoutPage;