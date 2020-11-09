const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split(";")[1].split("=")[1];
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
      });
};

exports.postLogin = (req, res, next) => {
    console.log(req.body)
    // res.setHeader('Set-Cookie','loggedIn=true');
    User.findById('5fa8d4e0db99196104524c43')
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save((err) => {
          console.log(err);
          res.redirect("/");
      });
    //   next();
    });
    
};

exports.postLogout = (req,res,next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/");
    });
}