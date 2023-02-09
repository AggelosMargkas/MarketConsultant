const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(body);
    

    const { username, email, password, rep_password } = req.body;
    
      
    db.query('SELECT email FROM users WHERE email = ?', [email], async function (error, results) {
            if (error) {
                console.log(error);
            }

            if (results.length > 0) {
                return res.render('register', {
                    message: 'That email is already in use'
                });

            } else if (password !== rep_password) {
                return res.render('register', {
                    message: 'Passwords do not match.'
                });

            }

            let hashedPassword = await bcrypt.hash(password, 8);

            console.log(hashedPassword);

            /* To create an admin need to add this on the query below and register normally =>  type: 'admin' */
            /* When you finish delete it so that everyone that is being created is a user. */ 
            db.query('INSERT INTO users SET ?', { name: username, email: email, password: hashedPassword}, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    return res.render('register', {
                        message: "User registered"
                    });

                }
            });
            /*
            return res.render('register', {
                message: 'registered.'
            });
            */
            res.redirect('/');
            //res.send("registered");
        });

    
    
}



exports.login = (req, res) => {

    console.log(req.body);
        
    const { email, password } = req.body;

        
    db.query('SELECT email, password, type FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            return res.render('login', {
                message: error
            });
        }
        
        let boolValidate = bcrypt.compareSync(password, results[0].password);


        if( results[0].email != email ){
            return res.render('login', {
                message: 'That email you added does not exists.'
            });
        }
            /**results[0].password !== hashedPassword */
        else if( !boolValidate  ){
            return res.render('login', {
                message: 'Wrong Password.'
            });

        }
 
        
        if (results[0].type == "admin"){
            res.redirect('/adminsIndex');
        }else{
            res.redirect('/index');
        }
        //  res.send(results[0]['email']);
    });



}