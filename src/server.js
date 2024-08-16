const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require("express-session");
require("./auth.google.js");
const googleAuthRouter = require('./auth.google.route.js')

const app = express();

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(session({
    name: "connect.sid",
    secret: 'tuz',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 86400000,
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(googleAuthRouter)

app.get('/login', (req, res) => {
    res.send('login to continue')
})

app.listen(8080, () => {
    console.log('Started listening on port');
})