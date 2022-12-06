const agbwellnessDAO = require('../models/agbwellnessModels');
const db = new agbwellnessDAO('goal.db');

exports.home = function (req, res) {
    res.send('<h1>Welcome to the AGB Wellness application.</h1>');
}

exports.goals_list = function (req, res) {
    res.send('<h1>Not yet implemented: will show a list of guest book entries.</h1>');
    db.getAllGoals();
}



exports.new_goals = function (req, res) {
    res.send('<h1>Not yet implemented: show a new goal page.</h1>');
}

exports.view = function (req, res) {
    db.getAllGoals()
        .then((list) => {
            res.render('entries', {
                'title': 'Weekly Goals',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.delete = function (req, res) {
    db.getAllGoals()
        .then((list) => {
            res.render('entries', {
                'title': 'Weekly Goals',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}
exports.update = function (req, res) {
    db.getAllGoals()
        .then((list) => {
            res.render('entries', {
                'title': 'Weekly Goals',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}


exports.weekly_goals = function (req, res) {
    res.send('<h1>Processing Weekly Goals, see terminal</h1>');
    db.getWeeklyGoals();
}

exports.new_goals = function (req, res) {
    res.render('newGoals', {
        'title': 'Add Goals'
    })
}

exports.post_new_goal = function (req, res) {
    console.log('processing post-new_goal controller');
    if (!req.body.category) {
        response.status(400).send("Goals must have a category.");
        return;
    }
    db.addGoal(req.body.category, req.body.goalname, req.body.day, req.body.time, req.body.repeat, req.body.shortDescription);
    res.redirect('/view');
}

exports.update_goals = function (req, res) {
    res.render('update', {
        'title': 'update Goal'
    })
}

exports.post_update_goal = function (req, res) {
    console.log('processing post-update_goal controller');
    if (!req.body.category) {
        response.status(400).send("Goals must have a category.");
        return;
    }
    db.updateGoal(req.body.category, req.body.goalname, req.body.day);
    res.redirect('/view');
}

exports.remove_goals = function (req, res) {
    res.render('delete', {
        'title': 'delete Goal'
    })
}

exports.post_remove_goal = (req, res) => {
    console.log("DELETE PROCESS ..");
    if (!req.body.category) {
        response.status(400).send("Goals must have a category.");
        return;
    }
    db.removeGoal(req.body.category, req.body.goalname);
    res.redirect('/view');
}

exports.about = function (req, res) {
    res.send('<h1>Under construction</h1>');
}

exports.show_signup_page = function(req, res) {
    res.render("signup");
     } 