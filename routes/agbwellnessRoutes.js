const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/agbwellnessControllers.js');
const {login} = require('../auth/auth') 
const {verify} = require('../auth/auth')


router.get('/index', controller.home);
router.get('/agbwellness', controller.goals_list);
router.get('/about', controller.about);
router.get('/view', controller.view);
router.get('/update', controller.update_goals);
router.post('/update', controller.post_update_goal);
router.get('/delete', controller.remove_goals);
router.post('/delete', controller.post_remove_goal);
router.get('/weeklygoals', controller.weekly_goals);
router.get('/new', controller.new_goals); 
router.post('/new', controller.post_new_goal);
router.get('/signup', controller.show_signup_page);
router.post('/signup', controller.post_new_user);
router.get('/login', controller.show_login_page);
router.post('/login', login, controller.handle_login);
router.get('/employee', verify, controller.employee);
router.get("/logout",verify, controller.logout);
router.get("/loggedIn",verify, controller.loggedIn_landing);
router.get('/viewemployees', controller.viewEmployees);
router.get('/updateemployee', controller.update_employee);
router.post('/updateemployee', controller.post_update_employee);
router.get('/deleteemployee', controller.remove_employee);
router.post('/deleteemployee', controller.post_remove_employee);
router.get('/newemployee', controller.new_employee); 
router.post('/newemployee', controller.post_new_employee);
router.get('/user', controller.user);
router.post('/user', controller.post_user);




router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
    })  
   
module.exports = router; 