const express = require('express');
const app = express();
const router = require('./routes/agbwellnessRoutes');
const path = require('path');
const public = path.join(__dirname, 'public');
const mustache = require('mustache-express');

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.static(public));
app.use(express.urlencoded({ extended: false }));

app.use('/',router);

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})
