const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middleware/auth');
const path = require('path');
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


//controller and routes
const ctrl = require('./controllers');
const routes = require('./routes');

app.use('/users', ctrl.users);
app.use('/profile', ctrl.profile),
app.use('/recipients', ctrl.recipients);
app.use('/auth', routes.auth);

//Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
