var config = require('../config/config');
var response = require('../config/responses');
var commonHelpers = require('../helpers/commonHelpers');
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var Fakerator = require("fakerator");
var fakerator = Fakerator();



const userSignup = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.fact_dr_db);

        // request parameters
        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
        let mobile = req.body.mobile;

        // validating request parameters
        let isEmailValid = await commonHelpers.validateEmail(email);
        let isNameValid = await commonHelpers.validateName(name);
        let isMobileValid = await commonHelpers.validateMobile(mobile);
        // if want can add formatting to use entered value. i.e. can make its first letter capital and other small of name. (example - entered value -> 'suprIYa paTil' format to -> 'Supriya Patil')

        if (isEmailValid && isNameValid && password && isMobileValid) {
            let dataObj = {
                email,
                name,
                password: bcrypt.hashSync(password, 8),
                mobile
            }

            // inserting into database
            let result = await dba.collection(config.usersCollection).insertOne(dataObj);
            if (result.insertedCount) {
                res.status(200).send(response.successful_signup)
            } else {
                res.status(400).send(response.failed_to_signup)
            }
        } else {
            res.status(400).send(response.invalid_parameters)

        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        })
    }
}

module.exports.userSignup = userSignup;

const userLogin = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.fact_dr_db);

        var email = req.body.email;
        var password = req.body.password;

        if (email && password) {
            //retrieving data from db
            let result = await dba.collection(config.usersCollection).find({
                email: req.body.email
            }).project({
                password: 1
            }).toArray();

            if (result.length) {
                let passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);

                if (!passwordIsValid) return res.status(401).send({
                    auth: false,
                    token: null
                });

                let token = jwt.sign({
                    id: result[0]._id
                }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                app.locals.email = email;

                res.status(200).send({
                    auth: true,
                    token: token
                });
            } else {
                res.status(400).send(response.invalid_loggin_credentials);
            }
        } else {
            res.status(400).send(response.invalid_loggin_credentials);
        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        });
    }

}

module.exports.userLogin = userLogin;


const getUserDetails = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.fact_dr_db);

        let id = req.query.id;
        query = {};
        if (id) {
            query = {
                _id: ObjectId(id)
            }
        }

        // retrieving all users' data from database
        let result = await dba.collection(config.usersCollection).find(query).project({
            password: 0
        }).toArray();
        if (result.length) {
            res.status(200).send({
                data: result
            });
        } else {
            res.status(400).send(response.no_data_found);
        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        });
    }
}

module.exports.getUserDetails = getUserDetails;

const updateUserDetails = async (req, res) => {
    // update chat details
    // chatId
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.fact_dr_db);

        // request body

        let userId = req.body.userId;
        let updatedData = req.body;
        delete updatedData["userId"];

        if (userId) {
            // update the database
            let result = await dba.collection(config.usersCollection).updateOne({
                _id: ObjectId(userId)
            }, {
                $set: updatedData
            });
            if (result.modifiedCount) {
                res.status(200).send(response.successful_update);
            } else {
                res.status(400).send(response.no_data_found);
            }
        } else {
            res.status(400).send(response.invalid_parameters)
        }
    } catch (error) {
        res.status(400).send({
            msg: error
        });
    }

}

module.exports.updateUserDetails = updateUserDetails;

const createUserDetails = async (req, res) => {
    try {

        // request parameters
        let name = req.body.name;
        let mobile = req.body.mobile;
        let email = req.body.email;
        let dob = req.body.dob;
        let address = req.body.address;

        //database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.fact_dr_db);

        var data_obj = {
            name,
            mobile,
            email,
            dob,
            address
        }
        var result = await dba.collection(config.usersCollection).insertOne(data_obj);
        if (result.insertedCount) {
            res.status(200).send(response.successful_insert)
        } else {
            res.status(400).send(response.failed_to_insert)
        }

    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        })
    }

}

module.exports.createUserDetails = createUserDetails;

const deleteUserDetails = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.fact_dr_db);

        // request params
        let userId = req.body.userId;

        if (userId) {
            // deleteing user from database using userId
            let result = await dba.collection(config.usersCollection).deleteOne({
                _id: ObjectId(userId)
            });
            if (result.deletedCount) {
                res.status(200).send(response.successful_delete);
            } else {
                res.status(400).send(response.no_data_found);
            }
        } else {
            res.status(400).send(response.invalid_parameters)
        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        });
    }

}

module.exports.deleteUserDetails = deleteUserDetails;

const generateBulk = async (req, res) => {
    try {
         users_array = [];
         for (i = 0; i < req.query.quantity; i++) {
            user_obj = fakerator.entity.user();
            users_array.push(user_obj)
         }
        
        res.send(users_array)
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        });

    }
}

module.exports.generateBulk = generateBulk;