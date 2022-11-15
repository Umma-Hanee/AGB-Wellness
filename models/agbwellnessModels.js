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
    init() {
        this.db.insert({
            category: 'Nutrition',
            goalname: 'Detox water ',
            day: '2020-02-16',
            time: '10pm',
            repeat: 'Daily',
            shortDescription: 'Detox water helps in cleansing the body and should be taking at least once a week'
        });
        //for later debugging
        console.log('db goal nutrition inserted');
        this.db.insert({
            category: 'Mental Health',
            goalname: 'Breathing Excercise ',
            day: '2020-02-15',
            time: '6am',
            repeat: 'Weekly',
            shortDescription: 'Doing breathing excercises in the morning helps in clearing the mind'
        });
        //for later debugging
        console.log('db goal Mental Health inserted');
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
}

module.exports = agbwellness;

