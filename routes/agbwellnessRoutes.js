const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/agbwellnessControllers.js');

router.get('/', controller.home);
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