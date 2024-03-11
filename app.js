const express = require('express');


// express app

const app = express();

// register view Engine 

app.set('view engine','ejs');

// listen for request

app.listen(3000);


app.get('/',(req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})




// 404 pages

app.use((req, res) => {
    res.status(404).render('404');
})