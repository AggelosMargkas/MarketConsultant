/*

https://www.youtube.com/watch?v=AZOZVyLrMvc&list=PLD9SRxG6ST3GBsczn8OUKLaErhrvOz9zQ&index=6


*/ 
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const exp = require("constants");


dotenv.config({ path: './.env'});

const app = express();


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    charset : 'utf8'
})


const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));


// Gia na paroume ta stoixeia tou form tis egraffis tou xristi kai meta me query na ta steiloume sthn vasi.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
    
console.log(__dirname);
app.set('view engine', 'hbs');

db.connect((error) => {
    if(error){
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

//connect the routes
app.use('/', require('./routes/pages'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/administrativeInserts'));
app.use('/', require('./routes/mapFunctions'));


app.listen(3000, ()=>{
    console.log("Server started on port 3000.")
})

