const db = require("../models");
const User = db.users;
const Trainer = db.trainers;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.user || !req.body.phone) {
        res.status(400).send({
            message: "Données incomplètes"
        });
        return;
    }

    User.create({
            LastName: req.body.user.lastName,
            FirstName: req.body.user.firstName,
            Password: req.body.user.password,
            EmailAddress: req.body.user.emailAddress,
            trainer: {
                Phone: req.body.phone
            }


        }, {
            include: [{
                model: Trainer,
                as: 'trainer',
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la création de l'animateur"
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};