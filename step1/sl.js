function say(name) {
  console.log('hellp'+ name);
}

// node have no window obj there are others like fs http and ...
// os fs event http

// console is global obj
// setTimeout() also
// clearTimeout()
// setInterval(); to repeatedly call func after delay
// clearInterval() to stop call func repeatedly


// browser has window obj
// window.console.log

// in node global == in browser window
// console.log(global);
// console.log(module);

// const log = require('./logger');
// logger.log('message');
// log('message')

// node built in modules 
// file system http os path(utility) process queryString stream
// path
const path = require('path');
let pathObj = path.parse(__filename);
// console.log(pathObj)

const os = require('os');
let total = os.totalmem();
let arch = os.arch()
let free = os.freemem();
// console.log(total/(1024*1024));
// console.log(free);
// console.log(arch);

const fs = require('fs');
// sync operation vs async includes.
// const files = fs.readdirSync('./')
// all async methods get func as last parameter
// node call it when everything completes. callback
// err and res 
const files2 = fs.readdir('./', (err,files) => {
  if(err) console.log(err);
  // else console.log(files);
}) 
// console.log(files2);

// events a signal that indicates that sth happened.
const EventEmitter = require('events');
// to use need instance of it
// emitter is obj from class  john from human
const emitter = new EventEmitter();
// to raise an event.
// making a noise or produce sth - signaling an event happened.
// raise
// name , then listener add : a function registered that have interest
// in that event. called when that event raised.
// register listener
// on = addListener
// with on we start game with emit we execute game

// emitter.on('messageLogged', (eventArg) => {
//   console.log('listener called', eventArg);
// })

// also we want send data up about that events.
// event arguments is those data we raise up with our events
// event name , id , data
// emitter.emit('messageLogged', {
//   id: 1,
//   url: 'http'
// });  it go to logger.

const Logger = require('./logger');
const logger = new Logger();
// now we register listener = on , on this new obj logger.
logger.on('messageLogged', (eventArg) => {
  console.log('listener called', eventArg);
})
// logger.log('message');

// http modules for creating networking applications.
const http = require('http');
// this server also is event emitter inside and have all capabilities
// http server come from net.server 
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('hellp workd');
    res.end();
  } 
  if (req.url === '/api') {
    res.write(JSON.stringify([1,2,3]));
    res.end();
  } 
});
// server.on('connection', (socket) => {
//   console.log('new Connection')
// });
server.listen(3000);
console.log('listening on port 3000')










