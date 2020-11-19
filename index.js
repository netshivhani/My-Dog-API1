const express = require('express');
const bodyParser = require('body-parser');
//const app = require('express-validator');
const { check, validationResult } = ('express-validator');
//const Memcached = require('memcached');


// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/', (req, res)=>{
    res.send('My dog App is up and running');
});
// import Dog routes
const DogRoutes = require('./src/routes/Dog.route');
const { body } = require('express-validator');

// create Dog routes with simple  validation
app.use('/api/v1/Dog',[check('email').isEmail(), DogRoutes,(req,res) => {
const errors = validationResult(req)
if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() })
})
console.log(req,body)
};

// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
});