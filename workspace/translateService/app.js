const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const errorController = require('./controllers/error');
const app = express();
const allRoutes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(allRoutes);
app.use(errorController.get404);

app.listen(3000);
