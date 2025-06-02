// backend/index.js
const express = require('express');
const cors = require('cors');
const paymentsRouter = require('./routes/payments');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/payments', paymentsRouter);

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
