const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose'); 
const bodyparser = require('body-parser');  
const bcrypt = require('bcryptjs');
const user = require('./models.js');
const db = require('./urlmodel.js');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const rp = require('request-promise');


//Middle Ware for Parsing URL encoded request
routes.use(bodyparser.urlencoded({ extended: true }));

routes.use(cookieParser('secret'));

routes.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));

routes.use(passport.initialize());

routes.use(passport.session());

// using flash for flash messages 
routes.use(flash());

// MIDDLEWARES
// Global variable
routes.use(function (req, res, next) {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

const checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        return next();
    } else {
        res.redirect('/login');
    }
}

mongoose.connect("mongodb+srv://user:iitbombay@cluster0.5957j.mongodb.net/user?retryWrites=true&w=majority",{
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log("Database Connected"))

routes.get('/', (req, res) => {
    res.render('index');
})

//Contains logic for Register, Hashing the Password
routes.post('/',(req, res) =>{
    var { username, password} = req.body;
    var err;

    if(!username || !password)
    {
        err="Please fill all the Fields.."
        res.render('index', { 'err': err });
    }

    if (typeof err == 'undefined')
    {
        user.findOne({ username: username }, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Username.Please try another.";
                res.render('index', { 'err': err });
            }
            else
            {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        user({
                            username,
                            password,
                        }).save((err, data) => {
                            if (err) throw err;
                            req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/login');
                        });
                    });
                });
            }
        });
    }
});


// Authentication Strategy
var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy((username, password, done) => {
    user.findOne({username : username }, (err, data) => {
        if (err) throw err;
        if (!data) {
            return done(null, false, { message: "User Doesn't Exists.." });
        }
        bcrypt.compare(password, data.password, (err, match) => {
            if (err) {
                return done(null, false);
            }
            if (!match) {
                return done(null, false, { message: "Password Doesn't Match" });
            }
            if (match) {
                return done(null, data);
            }
        });
    });
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    user.findById(id, function (err, user) {
        cb(err, user);
    });
});
// ---------------
// end of autentication statregy

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/success',
        failureFlash: true,
    })(req, res, next);
});

routes.get('/success',checkAuthenticated,(req, res) => {
    res.render('success');
});

//Function to query in db collection
function fun(urls) {
    const val = db.find({ url : urls.url});
    return val;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }

routes.post("/success", async(req, res) =>{
    const urls = await req.body;

    if(await !isValidUrl(urls.url)) {
        req.flash('error_message', "Please enter a Valid URL such as http://google.com/");
        res.redirect('/success');
    }
    else {
    const flag = await fun(urls);

    if(isEmpty(flag))
    {
        console.log("Ni mila data")
        rp(urls)
            .then(function(html){
                fla="Success";
                res.render('urlresult',{'flag' : fla ,'data' : html});
                const Url = new db({
                    url : urls.url,
                    content : html
                })
                Url.save().then( data =>{
                    console.log("Data Saved in DB in htmlcodes Collection")
                });
            })
            .catch(function(err){
                //handle error
                req.flash('error_message', "Something's wrong with this URL. Try searching another one.");
                res.redirect('/success');
            });
    }
    else
    {
        fla="Success";
        //console.log(data[0].content);
        res.render('urlresult',{'flag' : fla ,'data' : flag[0].content});
    }
}
})

routes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = routes;