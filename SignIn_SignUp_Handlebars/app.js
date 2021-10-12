const express = require('express');
const exhbs = require('express-handlebars');

const exp = express();

exp.engine('hbs',exhbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

exp.set('view engine','hbs');

exp.get('/',(req,res)=>{
    res.render('welcome');
});

exp.get('/signin',function(req,res){
    res.render('signin',
        {
            username: 'priyansh',
            password: 'priyansh123',
            signin: 'Sign In'
        }
    );
});

exp.get('/signup',function(req,res){
    res.render('signup',
        {
            username: 'priyansh',
            password: 'priyansh123',
            confirmpassword: 'priyansh123',
            signup: 'Sign Up'
        }
    );
});

exp.listen(443, ()=>{
    console.log('Server Listening on port 443');
});