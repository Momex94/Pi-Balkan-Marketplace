const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Balkan Pi Marketplace backend radi!");
});

// Primer rute za Pi autentikaciju (stub)
app.post("/verify-payment", (req, res) => {
  const paymentData = req.body;
  console.log("Primljena uplata:", paymentData);
  res.status(200).json({ success: true, message: "Uplata verifikovana." });
});

app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
});
