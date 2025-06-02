const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // ako koristiš stariju Node verziju

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Pi API key iz dashboarda
const PI_API_KEY = process.env.PI_API_KEY;
const PI_API_URL = "https://api.minepi.com/v2";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Key ${PI_API_KEY}`,
};

// === 1. Create Payment ===
app.post("/create-payment", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const response = await fetch(`${PI_API_URL}/payments/${paymentId}/approve`, {
      method: "POST",
      headers,
    });

    const result = await response.json();
    console.log("Payment approved:", result);
    res.status(200).send({ success: true, result });
  } catch (error) {
    console.error("Error approving payment:", error);
    res.status(500).send({ error: "Failed to approve payment" });
  }
});

// === 2. Complete Payment ===
app.post("/complete-payment", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const response = await fetch(`${PI_API_URL}/payments/${paymentId}/complete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ txid }),
    });

    const result = await response.json();
    console.log("Payment completed:", result);
    res.status(200).send({ success: true, result });
  } catch (error) {
    console.error("Error completing payment:", error);
    res.status(500).send({ error: "Failed to complete payment" });
  }
});

app.get("/", (req, res) => {
  res.send("Pi Backend Radi ✅");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
