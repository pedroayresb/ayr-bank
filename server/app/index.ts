import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { db as sequelize } from './util/database'
import * as User from './models/user'

const app = express();
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:3000',
  exposedHeaders: ['accessToken']
}));
app.use(bodyParser.json());

app.use('/user', require('./routes/user'));
app.use('/transaction', require('./routes/transaction'));


(async () => {
  try {
    await sequelize.sync(
      { force: false }
    );
  } catch (err) {
    console.log(err);
  }
})();

app.listen(5000,  () => {
  console.log("Listening");
});
