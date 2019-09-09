//----------------------------
// patterns for async code
// cbs
// promises
// Async/await(same as promise);
//-----------------------------------
console.log('before');

// const user = getUser(3);
getUser(3, (user) => {
  console.log(user);
  // get repos
  getRpo(user.giHub, (repos) => {
    console.log(repos);
    // get commits with 
    getCommits(repo, (commits)=> {
      
    });
  });
});
// this called cb hell
// to resolve cb hell =>
// replace anonymous func with named func
// pattern for fixing callback hells;
getUser(3, getRpos);
console.log('after');
//-----------------------------
getUser2(4)
  .then(user => getRpos(user.github))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits))
  .catch(err => console.log(err));
function getUser2(id){
  return new Promise((resolve, reject)=> {
    // sth;
  })
}
// async and await like c#
// syntatic suger over promise
async function displayCommits() {
  try {
    const user = await getUser2(4);
    const repos = await getRpos(user.github);
    const commits = await getCommits(repos);
    const commits = await getCommits(repos[0]);
    console.log(commits)
  } catch (error) {
    console.log(error);
  }
}

function getUser2(id){
  return new Promise((resolve, reject)=> {
    // sth;
  })
}

//------------------------------------------
// cb pattern
// cb is function we call when the result is ready
function getUser(id, cb) {
  setTimeout(() => {
    console.log('reading a user from db');
    cb({
      id: id,
      giHub: 'mk'
    })
  }, 2000);
}

// fixing callback hells.
function getRpos(user) {
  getRpos(user.giHub, getCommits);
}
function getCommits(repos) {
  getCommits(repo, displayCommits);
}
function displayCommits(commits) {
  console.log(commits);
}

function getRpo(userName, cb) {
  setTimeout(() => {
    console.log(userName);
    cb(['repos', 'repos3']);
  }, 2000);
}
//------------------------------------------


