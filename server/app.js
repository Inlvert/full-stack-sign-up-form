const express = require('express');
const router = require('./routers');
const cors = require('cors');

const app = express();

app.use(cors(
  {
    origin: ["https://full-stack-sign-up-form-server.vercel.app"],
    methods: ["POST", "GET"],
    credentals: true
  }
));
app.use(express.json());
app.use(router)

module.exports = app;