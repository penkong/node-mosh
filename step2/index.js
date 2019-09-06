const express = require('express');
// it returns a class
// for input validation.
const Joi = require('joi');
// http security
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
// instead of console.log();
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const app = express();
// to detect environment
// console.log(process.env.NODE_ENV)
// console.log(app.get('env'));

// middle ware take req and return resp or pass to another
// every route is middleware 
// turn json to json object
app.use(express.json());
// key=value&key=value nam=sth
// we can read req with urlencoded params
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
// configuration
config.get('name');
config.get('mail.host');
// export app_password=1234
// config.get('mail.password');

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  // console.log('morgan enable')
  // export DEBUG=app:startup,app:db or app:*
  startupDebugger('morgan enabled');
}
app.use(require('./logger'));
app.use((req,res,next) => {
  console.log('Authenticated...');
  next();
})

app.get('/', (req, res) => {
  res.send('heelp workd');
});
app.use('/api/courses', courses)
////////////////////////////////////

const port = process.env.PORT || 3000;
// to set env var we use set on windows export on mac
// set PORT=5000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
})