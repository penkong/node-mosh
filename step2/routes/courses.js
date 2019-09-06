
const expres = require('express');
// like db

const courses = [{
  id: 1,
  name: 'course1'
  },
  {
    id: 2,
    name: 'course2'
  },
  {
    id: 3,
    name: 'course3'
  },
]
// router object
const router = express.Router();

router.get('/', (req, res) => {
  res.send(courses);
});

// /api is route
// courses endpoint
// route params /:id/:time or what ever.
// query string parameters adding after ? sortBy=name
router.get('/:id', (req, res) => {
  // res.send(req.params.id);
  // res.send(req.query); show us as key value pairs.
  const course = courses.find(el => el.id = parseInt(req.params.id));
  if (!course)
    return res.status(404).send('course not found');
  res.send(course);
});


router.post('/', (req, res) => {
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
  const {
    error
  } = validateCourse(req.body);
  // if invalid
  if (error)
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

router.put('/:id', (req, res) => {
  // lookup the course if not 
  const course = courses.find(el => el.id = parseInt(req.params.id));
  if (!course)
    return res.status(404).send('course not found');
  // const result = validateCourse(req.body);
  const {
    error
  } = validateCourse(req.body);
  // if invalid
  if (error)
    return res.status(400).send(error.details[0].message);
  // update course
  // logic
  course.name = req.body.name;
  res.send(course);
});
router.delete('/:id', (req, res) => {
  // look up
  const course = courses.find(el => el.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('course not found');
  // delete
  const indexOfDel = courses.indexOf(course);
  courses.splice(indexOfDel, 1);
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


module.exports = router