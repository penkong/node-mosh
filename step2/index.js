const express = require('express');

const app = express();
// like db
const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
]
app.get('/', (req, res) => {
  res.send('heelp workd');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// /api is route
// courses endpoint
// route params /:id/:time or what ever.
// query string parameters adding after ? sortBy=name
app.get('/api/courses/:id', (req, res) => {
  // res.send(req.params.id);
  // res.send(req.query); show us as key value pairs.
  const course = courses.find(el => el.id = parseInt(req.params.id));
  if(!course) {
    res.status(404).send('course not found');
  }
  res.send(course);
});











const port = process.env.PORT || 3000;
// to set env var we use set on windows export on mac
// set PORT=5000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
})