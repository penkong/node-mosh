//(function (exports, require, module, __filename, __dirname))
const EventEmitter = require('events');
// const emitter = new EventEmitter();

class Logger extends EventEmitter {
  log(message) {
    // send http req
    console.log(message);
    // for raise event 
    // now after extend Event we have access to all functionality
    // on this
    // emitter.emit('messageLogged', {
    this.emit('messageLogged', {
      id: 1,
      url: 'gg'
    });
  }

}


// module.exports.log = log; 
// module.exports.endPoint = url; 
module.exports = Logger; 
