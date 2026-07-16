const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env.PORT);
// console.log(process.env.USERNAME);

// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
