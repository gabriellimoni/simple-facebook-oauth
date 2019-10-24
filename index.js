const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'dev'

const app = express()
    
// Browser preflight and headers
const cors = require('./src/middlewares/cors.js')
app.use(cors.config);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/controllers/contaController')(app)

// Starts server
app.listen(port, () => {
    console.log('Running Skylar - Task :' + port)
});
