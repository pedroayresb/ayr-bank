const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require('./util/database');
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/dev', require('./routes/dev'));
app.use('/user', require('./routes/user'));


(async () => {
  try {
    await sequelize.sync(
      { force: false }
    );
  } catch (err) {
    console.log(err);
  }
})();

app.listen(5000,  (err) => {
  console.log("Listening");
});
