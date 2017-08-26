var express = require('express');
var router = express.Router();

var temp;
router.get('/', function (req, res) {
    if(req.cookies.islogin){

        console.log('cookies: ' + req.cookies.islogin);
        req.session.username = req.cookies.islogin;

    }

    if (req.session.username){

        console.log('session: ' + req.session.username);
        res.locals.username = req.session.username;

    }else{

        res.redirect('/login');
        return;
    }

    res.render('admin', {
        title: "没车位停车场预约系统"
    });

});

router.post('/',function (req,res) {
   temp = req.get();
   console.log(temp);
   return;
});

module.exports = router;