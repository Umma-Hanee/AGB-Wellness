const agbwellnessDAO = require('../models/agbwellnessModels');
const db = new agbwellnessDAO('goal.db');
const userDao = require('../models/userModel.js');
const employee_db = new agbwellnessDAO('employee.db');

exports.home = function (req, res) {
    res.render("index");
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
    res.render('about');
}

exports.employee = function (req, res) {
    res.render('employee');
}
exports.show_signup_page = function (req, res) {
    res.render("user/signup");
}

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    const email = req.body.email;
    const role = req.body.role;
    if (!user || !password) {
        res.send(401, 'no user or no password');
        return;
    }
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password);
        console.log("register user", user, "password", password);
        res.redirect('/login');
    });
}

exports.show_login_page = function (req, res) {
    res.render("user/login");
};

exports.handle_login = function (req, res) {
    res.render("employee");
};

exports.logout = function (req, res) {
    res
        .clearCookie("jwt")
        .status(200)
        .redirect("/");
}

exports.show_new_entries = function (req, res) {
    res.render('newEntry', {
        'title': 'AGB Wellness',
        'user': 'user'
    })
}

exports.loggedIn_landing = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render("entries", {
                title: "AGB Wellness",
                entries: list,
                user: "user"
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.post_new_entry = function (req, res) {
    console.log("processing post-new_entry controller");
    if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
}
db.addEntry(req.body.author, req.body.subject, req.body.contents);
res.redirect("/loggedIn");
};

//get all employees
exports.viewEmployees = function (req, res) {
    employee_db.getAllEmployees()
        .then((list) => {
            res.render('viewemployees', {
                staff: list,
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.deleteEmployee = function (req, res) {
    db.getAllEmployees()
        .then((list) => {
            res.render('entries', {
                'title': 'All employees',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}



exports.new_employee = function (req, res) {
    res.render('newEmployee')
}

exports.post_new_employee = function (req, res) {
    console.log('processing post-new_goal controller');
    if (!req.body.job) {
        response.status(400).send("Employee must have a job title ");
        return;
    }
    employee_db.addEmployee(req.body.job, req.body.employeeName, req.body.email, req.body.number, req.body.address);
    res.redirect('/viewemployees');
}

exports.update_employee = function (req, res) {
    res.render('updateemployee');
};

exports.post_update_employee = function (req, res) {
    console.log('processing post-update_goal controller');
    if (!req.body.job) {
        response.status(400).send("Employee must have a job");
        return;
    }
    employee_db.updateEmployee(req.body.employeeName, req.body.email, req.body.job);
    res.redirect('/viewemployees');
}

exports.remove_employee = function (req, res) {
    res.render('deleteEmployee');
};

exports.post_remove_employee = (req, res) => {
    console.log("DELETE PROCESS ..");
    if (!req.body.job) {
        response.status(400).send("Employee must have a job");
        return;
    }
    employee_db.removeEmployee(req.body.job, req.body.employeeName);
    res.redirect('/viewemployees');
}

exports.user = function (req, res) {
    res.render('user');
}
exports.post_user = function (req, res) {
    var prompt_employee= req.body.role;

    if(prompt_employee === 'manager'){
        res.redirect("/viewemployees");
    }
    res.redirect('employee');
}