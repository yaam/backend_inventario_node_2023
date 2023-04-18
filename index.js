const express = require('express');
const {getConnection} = require('./db/db-connection-mongo');
require('dotenv').config();
const cors = require ('cors');
const app = express();
const por = process.env.PORT;

app.use(cors());
getConnection();


// Parseo JSON
app.use(express.json());
// middlewares
app.use('/usuario', require('./rutas/usuario'));
app.use('/estadoEquipo', require('./rutas/estadoEquipo'));
app.use('/marca', require('./rutas/marca'));
app.use('/tipoEquipo', require('./rutas/tipoEquipo'));
app.use('/inventario', require('./rutas/inventarios'));

app.listen(por, () =>{
  console.log(`Aplicacion corriendo en el puerto  ${por}`)
});