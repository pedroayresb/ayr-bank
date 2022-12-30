import app from './app';

import { config } from 'dotenv';

config({ path: '../../.env'});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default server;
