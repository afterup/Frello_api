const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const config = require('./config/config');
// const { sequelize } = require('./models');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

require('./routes/page')(app);

app.listen(config.port);
// sequelize.sync()
//     .then(() => {
//         
//         console.log(`Server started on port ${config.port}`);
//     });