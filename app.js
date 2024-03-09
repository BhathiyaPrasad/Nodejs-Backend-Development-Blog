const express = require('express');


// express app

const app = express();

// listen for request

app.listen(3000);

app.get('/',(req, res) => {
    res.send('<p>Home Page</p>');
})

app.get('/about-us', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname});
})

app.get('/contact', (req, res) => {
    res.sendFile('./views/blog.html', {root: __dirname});
})