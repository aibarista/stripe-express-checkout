const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const stripe = Stripe("sk_test_51QkWrf2VX3dt2aloCSqPQg7IGY9011FPiPSlLZoY4bOqhgmjXMKuTz3kFNAHaK3CqTAGaFWWwK1pZqqMzELG3l4v00bqx2KTCP");

app.use(bodyParser.json());
app.use(cors());

app.post("/create-intent", async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    // Validate request body
    if (!paymentMethodId || !amount) {
      return res.status(400).json({ error: "Missing required fields: paymentMethodId or amount." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirmation_method: "manual", // Manual for PaymentRequest API
      confirm: true,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
    console.log("send client Secret")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
