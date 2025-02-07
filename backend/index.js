const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const stripe = require("stripe")(process.env.stripeSecretKey);

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post('/create-intent', async (req, res) => {
    const { customerId, amount } = req.body;

    const intent = await stripe.paymentIntents.create({
        customer: process.env.stripeCustomerID,
        amount: Number(amount),
        currency: 'usd',
    });
    return res.json({ client_secret: intent.client_secret });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
