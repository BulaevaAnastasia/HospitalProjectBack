const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv').config();

const apiRoutes = require('./src/modules/routes/user.routes');

app.use(cors());

const url = process.env.DB_CONN;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use('/', apiRoutes);

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});