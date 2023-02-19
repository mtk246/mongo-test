const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Config Env
require("dotenv").config();

const SERVER_PORT = process.env.SERVER_PORT | 8000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_ATLAS_URL)
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server Listening At :${SERVER_PORT}`);
    });
})
