const express = require('express'); // Para crear los endpoint
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();         // para acceder a las variables de entorno

const app = express();



//Base de datos
dbConnection();

app.use(cors());

//directorio publico

app.use( express.static('public') ); // consumir la carpeta publica


//lectura y parseo del body
app.use( express.json()) ;

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'))


//TODO AUTH //crear , login ,renew
//TODO CRUD: eventos




//escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

