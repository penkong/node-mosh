//----------------------------
// patterns for async code
// cbs
// promises
// Async/await(same as promise);
//-----------------------------------

console.log('before');
console.log('after');

// promises
// Promises pattern
// promise is obj that holds eventual result of an async operation

// creating a promise obj
// Promise is constructor func
// we will go to consume this object
const p = new Promise((resolve, reject)=> {
  // some async work.
  setTimeout(() => {
    // full filled
    resolve('user object');
    // pending => rejected.
    reject(new Error('message'));
  },2000);
})

p
  .then(result => console.log('result'))
  .catch(err => console.log('err'))

function getUser(id) {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      console.log('async work');
      resolve({ id: id, github: ',ks`'})
    }, 2000);

  });
}

//
getUser2(4)
  .then(user => getRpos(user.github))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits))
  .catch(err => console.log(err));

function getUser2(id) {
  return new Promise((resolve, reject) => {
    // sth;
  })
}

// promise api
// to creating promises that already resolved.
// like for unit test
// it's return a promise that already resolved.
const p = Promise.resolve('user obj');
p.then(result => console.log(result))
// or
// for see call stack in js we use new Error.
const p2 = Promise.reject(new Error('errro'));
p.then(result => console.log(err));

// 2 getUser.
Promise.all([p, p2])
  .then(() => {})

// if we want one of promise resolve
Promise.race([p1, p2]).then(() => {});