var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth');


router.get('/login', auth.login);
router.post('/login',  auth.login_post);
router.get('/create-account', auth.create);
router.post('/create-account', auth.create_post);
router.get('/forgot-password', auth.forgot_password);
router.post('/forgot-password', auth.forgot_password_post);
router.get('/reset-password/:token/:user', auth.reset_password)
router.post('/reset-password/:token/:user', auth.reset_password_post);
router.get('/logout', auth.logout);
module.exports = router;
