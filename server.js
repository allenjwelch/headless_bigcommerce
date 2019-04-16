const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

process.env.PORT ? console.log('Running Production') : console.log('Runnining Development: "Cara\'s Stencil Demo"')

app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});
