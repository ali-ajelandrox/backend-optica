const express=require('express');
const cors = require('cors');
const conectarDB=require('./config/db')

const app =express();

//conectamos a la BD
conectarDB();
//middle ware para leer json


app.use(cors());

app.use(express.json());

app.use('/api/producto',require('./routes/producto'))

//ruta principal
app.listen(4000, ()=>{
    console.log('servidor corriendo exitosamente')
});



