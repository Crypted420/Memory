var express = require('express');
var router = express.Router();
var home = require('../controllers/home');

router.get('/', (req, res)=>{
    if(!req.isAuthenticated()){
        res.redirect('/user/login');
    }
    res.redirect('/home')
})
router.get('/home', home.home);
router.get('/home/profile', home.user_profile);
router.post('/home/profile', home.user_profile_post);
router.post('/home/create', home.record_post);
router.get('/home/create' , (req, res, next) => {
    if(!req.isAuthenticated()){
        res.redirect('/user/login')
    }
    res.redirect('/home')
});
router.post('/home', home.record_delete);

// router.post('/home?record_name=', home.record_delete);
module.exports = router;
