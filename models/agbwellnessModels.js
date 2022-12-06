const nedb = require('nedb');
const { resolve } = require('path');

class agbwellness {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    //a function to return all goals from the database
    getAllGoals() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, goals) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(goals);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', goals);
                }
            })
        })
    }

    getWeeklyGoals() {
        return new Promise((resolve, reject) => {
            this.db.find({ Category: 'weeklygoals' }, function (err, goals) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(goals);
                    //to see what the returned data looks like
                    console.log('getWeeklyGoals() returns: ', goals);
                }
            })
        })
    }
    //a function to add goal from the database
    addGoal(category, goalname, day, time, repeat, shortDescription) {
        var goal = {
            category: category,
            goalname: goalname,
            day: day,
            time: time,
            repeat: repeat,
            shortDescription: shortDescription
        }
        console.log('Goal Added', goal);
        this.db.insert(goal, function (err, doc) {
            if (err) {
                console.log('Error inserting document', category);
            } else {
                console.log('document inserted into the database', doc);
            }
        })

    }

    //a function to update goal from the database
    updateGoal = (category, goalname, day) => {
        return new Promise((resolve, reject) => {
            this.db.update(
                { category: category, day: day },
                { $set: { goalname: goalname } },
                { multi: true },
                (err, numReplaced) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(numReplaced);
                        console.log(
                            'document replaced in the database :' ,numReplaced);
                    }
                }
            );
        });

    };


    //a function to delete goal from the database
    removeGoal = (category, goalname) => {
        return new Promise((resolve, reject) => {
            this.db.remove(
                { category: category, goalname: goalname },
                {},
                (err, numRemoved) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(numRemoved);
                        console.log("document deleted in the database", numRemoved);
                    }
                }

            );
        });

    };



    //a function to return all employees from the database
    getAllEmployees() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, employees) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(employees);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', employees);
                }
            });
        });
    }

    
    //a function to add goal from the database
    addEmployee(job, employeeName, email, number, address) {
        var employee = {
            job: job,
            employeeName: employeeName,
            email: email,
            number: number,
            address: address
        }
        console.log('Employee Added', employee);
        this.db.insert(employee, function (err, doc) {
            if (err) {
                console.log('Error inserting document', job);
            } else {
                console.log('document inserted into the database', doc);
            }
        })

    }

    //a function to update goal from the database
    updateEmployee = (employeeName, email, job) => {
        return new Promise((resolve, reject) => {
            this.db.update(
                { employeeName: employeeName, email: email },
                { $set: { job: job } },
                { multi: true },
                (err, numReplaced) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(numReplaced);
                        console.log(
                            'document replaced in the database :' ,numReplaced);
                    }
                }
            );
        });

    };


    //a function to delete goal from the database
    removeEmployee = (job, employeeName) => {
        return new Promise((resolve, reject) => {
            this.db.remove(
                { job: job, employeeName: employeeName },
                {},
                (err, numRemoved) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(numRemoved);
                        console.log("document deleted in the database", numRemoved);
                    }
                }

            );
        });

    };

}



module.exports = agbwellness;

