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


// redirects

app.get('/about-me', (req, res) => {
    res.redirect('/about-us');         // to work wit h redirects you ,ust declared the function like above when you write if user request about-us in to url tab and then respond with the file directory of html
                                        // after that if your mistakenly go to the similiar but wrong name like about-me instead of about-us you can redirect it with this function besides this comment    
})

// 404 pages

app.use((req, res) => {
    res.sendFile('./views/blog.html', {root: __dirname});
})