const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 3001;
// const db = require('./models');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

//routes
// const routes = require('./routes');

app.get('/', (req,res) => res.send('API running'))

// app.use('/recipients', routes.recipients);
// app.use('/gifts', routes.gifts);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
