const express = require('express');
// it returns a class
// for input validation.
const Joi = require('joi');

const app = express();
app.use(express.json());

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
  if(!course) 
    return res.status(404).send('course not found');
  res.send(course);
});


app.post('/api/courses', (req, res) => {
  // validate input
  // if(!req.body.name || req.body.name < 3 ) {
  //   // 400 bad req
  //   res.status(400).send('name is required and min is 3 chars');
  //   return;
  // }
  // const schema = {
  //   name: Joi.string().min(3).required()
  // }
  // const result = Joi.validate(req.body, schema)
  // console.log(result);
  const { error } = validateCourse(req.body);
  // if invalid
  if(error) 
    return res.status(400).send(error.details[0].message);
  // logic
  const course = {
    id: courses.length + 1,
    // we need enable parse json objects in req.body express not have it
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // lookup the course if not 
  const course = courses.find(el => el.id = parseInt(req.params.id));
  if (!course) 
    return res.status(404).send('course not found');
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  // if invalid
  if (error) 
    return res.status(400).send(error.details[0].message);
  // update course
  // logic
  course.name = req.body.name;
  res.send(course);
});
/////////////////////////////////
function validateCourse(course) {
  // validate
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(course, schema);
};


app.delete('/api/courses/:id', (req,res) => {
  // look up
  const course = courses.find(el => el.id === parseInt(req.params.id));
  if (!course) 
    return res.status(404).send('course not found');
  // delete
  const indexOfDel = courses.indexOf(course);
  courses.splice(indexOfDel, 1);
  res.send(course);
});



////////////////////////////////////

const port = process.env.PORT || 3000;
// to set env var we use set on windows export on mac
// set PORT=5000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
})