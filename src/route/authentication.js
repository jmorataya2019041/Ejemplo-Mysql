const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

router.get('/singup', isNotLoggedIn, (req, res) => {
    res.render('auth/singup')
});

router.get('/singin', isNotLoggedIn, (req, res) =>{
    res.render('auth/singin')
});

router.post('/singin', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local.singin',{
        successRedirect: '/profile',
        failureRedirect: '/singin',
        failureFlash: true
    })(req, res, next);

})

router.get('/profile', isLoggedIn, (req, res) =>{
    res.render('profile')
})

router.post('/singup', passport.authenticate('local.singup', {
    successRedirect: '/profile',
    failureRedirect: '/singup',
    failureFlash: true
}));

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/singin');
})

module.exports = router;