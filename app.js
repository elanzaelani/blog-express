const express =require('express');

const expressLayouts = require('express-ejs-layouts');
// const { body, validationResult } = require('express-validator');
const session = require('express-session')
const cookieParser =require('cookie-parser')
const flash= require('connect-flash')

const app = express();

app.set('views', './src/views')
app.set('view engine', 'ejs');

//Built in midleware
app.use(express.static('public'))
app.use(expressLayouts)

app.use(express.urlencoded({extended:true})) //buildt in midleware utk menngirim data dari form  

//Konfigurasi Flash Message
app.use(cookieParser('secret'))
app.use(session({
    cookie : {maxAge:6000},
    secret :'secret',
    resave : true,
    saveUninitialized: true
}))
app.use(flash());



require('./src/routes/home.routes')(app);


const PORT = 3010;

app.listen(PORT, ()=>{
    console.log(`server bejalan di PORT ${PORT}` );
})