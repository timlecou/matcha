const express = require('express')();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Pool, Client } = require('pg')
const pool = new Pool()

const bodyParser = require('body-parser');
const TokenGenerator = require('uuid-token-generator');

let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

//-------------------MAILER---------------

const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'noreply42matcha@gmail.com',
      pass: 'Mot.2paSse'
  }
});

//-----------------------------------

module.exports = function(app) {

    /**
     * create the reset_password_token and send an email with the password reinitialization link
     */
    app.post("/reset_password", (req, res) => {
        const username = req.body.username;

        try {
            pool.query('SELECT * FROM "User" WHERE username = $1',      // checks if the user exists
            [username],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {

                    // generates the reset_password_token and the password reinitialization link
                    const token = new TokenGenerator(256, TokenGenerator.BASE62).generate();
                    var link = 'http://localhost:3000/reset_password/' + token;

                    let mailDetails = {         //format the password reinitialization email
                        from: 'noreply42matcha@gmail.com',
                        to: results.rows[0].email,
                        subject: 'Account confirmation',
                        text: `Hi ${results.rows[0].first_name}, you seem to have forgotten your password.
                        You can reinitialize it by clicking the following link : ${link}`
                    };
                    
                    mailTransporter.sendMail(mailDetails, function(err, data) {     //send the password reinitialization email
                        if(err) {
                            console.error(err);
                            console.log('Error Occurs');
                        } else {
                            console.log('Email sent successfully');
                        }
                    });

                    pool.query('UPDATE "User" SET reset_password_token = $1 WHERE username = $2',       // insert the reset_password_token in the user column
                    [token, username],
                    (error) => {
                        if (error) throw error;
                        res.status(200).json({ message: "password reinitialization email sent" });
                    });
                }
            });
        }
        catch (err) {
            console.error(err);
        }
    });

    /**
     * change the password of a user, using its reset_password_token to authenticate the user
     */
    app.post("/reset_password/:token", (req, res) => {
        const token = req.params.token;
        const new_password = req.body.new_password;

        try {
            pool.query('SELECT * FROM "User" WHERE reset_password_token = $1',   //  chekc if the user exists and if it is authorized to change its password
            [token],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {    // if the user exists and has asked for a password change

                    if (new_password === undefined) {
                        res.status(500).json({ message: "no password specified" });
                      }
                    bcrypt.hash(new_password, 10).then(hash => {                   

                        pool.query('UPDATE "User" SET password = $1, reset_password_token = $2 WHERE reset_password_token = $2',    //updates the password
                        [hash, token],
                        (error) => {
                            if (error) throw error;
                            res.status(200).json({ message: "password updated" });
                        });
                    });
                }
            });
        }
        catch (err) {
            console.error(err);
        }
    });

}