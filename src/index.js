require('dotenv').config();

const { application } = require('express')
const express = require('express')
const cors = require('cors');
const morgan = require('morgan')
const path = require('path')

const app = express()

//Middlewares

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());

//Routes

app.use(require('./routes/index'));

//Static Content

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
console.log("asd");

