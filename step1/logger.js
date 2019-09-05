//(function (exports, require, module, __filename, __dirname))
let url = 'http://mylogger.io/log';
function log(message) {
  // send http req
  console.log(message);
};

// module.exports.log = log; 
// module.exports.endPoint = url; 
module.exports = log; 
