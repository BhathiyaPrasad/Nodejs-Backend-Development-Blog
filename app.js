const express = require('express');
const { method, result } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const Blog = require('./models/blog');
const { render } = require('ejs');
const { request } = require('http');

// express app
const app = express();


// connect to the mongodb database

const dbURI = 'mongodb+srv://bhathiya:MasterPos1212@nodetuts.nhjrkox.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

// listen for requests


//middleware static files

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
   
// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
  title: 'New Blog',
  snippet: 'About My New V',
  body: 'more About my new Blog'
  
});
blog.save()
.then((result) => {
  res.send(result)
})
.catch((err) => {
  console.log(err);
})
});


app.get('/all-blog',(req,res) => {
  Blog.find()
  .then((result) => {
    res.send(result);

  })
  .catch(err => {
    console.log(err);
  });
});
app.get('/single-blog',(req, res) => {
  Blog.findById('65f3db4928d7dee04cf4c972')
  .then((result) => {
    res.send(result)
  })
  .catch(err =>{
    console.log(err);
  });
});

 

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});
app.post('/blogs', (req, res) =>{
  console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
  .then((result) =>{
    res.redirect('/blogs');
  })
  .catch((err) => {
     console.log(err);
  })
})
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
 
  Blog.findById(id)
  .then(result => {
    res.render('details', { blog:result, title:'Blog Details'})
  })
  .catch(err => {
    console.log(err);
  });
})

// This will find the id in database and delete the record

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then(result => {
     res.json({redirect: '/blogs'})
  })
  .catch(err => {
    console.log(err)
  })
})



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});