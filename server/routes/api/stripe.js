const express = require("express");
const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KuvSGJ5s3GMFY7xzIibr4HHaFgEAiugF9pNWKZA7nrt2rdSemuLfgooccBNZ6PySxnnhkEEfUt5kCruaM6RtD9i00b31o46cp"
);
const endpointSecret = "whsec_kCLrcl7FJDOAeolDegmfdbFXMsJ80X8v";

router.post("/create-checkout", async (req, res) => {
  orderedItem = req.body.order;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: orderedItem.plan,
          },
          unit_amount: orderedItem.price*100,
        },
        quantity: 1,
      },
    ],

    mode: "payment",
    success_url: `${process.env.SERVER_URL}success/`,
    cancel_url: `${process.env.SERVER_URL}cancel`,
  });
  res.status(200).send(session);
});

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});


module.exports = router;
