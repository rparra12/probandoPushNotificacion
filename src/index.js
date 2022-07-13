require('dotenv').config();

const { application } = require('express')
const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()

//Middlewares

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Routes

app.use(require('./routes/index'));

//Static Content

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000);
console.log("asd");

