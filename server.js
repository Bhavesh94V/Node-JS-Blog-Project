const express = require('express');

const app = express();
const cors = require('cors');
require('./config/db');
const router = require('./routes/BlogRouter');


app.use("/", router)
app.use(express.urlencoded());

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.listen(9999, () => {
    console.log("Server Listen on port 9999.....")
})