require ('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log('Api Rest corriendo en el puerto: ', port);
});



