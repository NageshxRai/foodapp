const express = require('express')
const app = express()
const port = 5000;
const mongoDbConnection = require ("./database")
mongoDbConnection();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow the specified headers
  next();
});

app.use(express.json())
app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/DisplayData'))
app.use('/api', require('./Routes/OrderData'))
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen (port, () =>{
    console.log(`Listening to port ${port}`)
})
