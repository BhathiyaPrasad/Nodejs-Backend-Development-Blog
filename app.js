const express = require('express');
const { method } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const { error } = require('firebase-functions/logger');

// express app
const app = express();


// connect to the mongodb database

const dbURI = 'mongodb+srv://bhathiya:MasterPos1212@nodetuts.nhjrkox.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI)
.then((result) => console.log('Connected to the db'))
.catch((err) => console.log(err))

// listen for requests
app.listen(3000);

//middleware static files

app.use(express.static('public'));


app.use(morgan('dev'));
    

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});