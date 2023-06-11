const path = require('path');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

require('dotenv').config();

const PORT = 3001;

const errorController = require('./controllers/error');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const allRoutes = require('./routes/routes');
app.use(allRoutes);
app.use(errorController.get404);

console.log(`Server running on http://localhost:${PORT}`)
app.listen(PORT);
