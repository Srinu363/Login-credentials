const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require('./controller/user');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://0.0.0.0:27017/test')
  .then(() => {
    console.log('DB Connected.');
  })
  .catch(err => {
    console.error('DB Connection Error:', err);
  });

app.post('/signup', userController.signup);
app.post('/signin', userController.signin);
app.listen(5000, () => {
  console.log('Backend Running At Port 5000');
});
