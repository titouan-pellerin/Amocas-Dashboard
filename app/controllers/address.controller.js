const db = require("../models");
const Adherent = db.adherents;
const Address = db.addresses;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Address.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération de toutes les adresses"
            });
        });
};

exports.findOne = (req, res) => {
    Address.findOne({
            include: [{
                model: Adherent,
                as: "adherents",
                required: true,
                attributes: [],
                where: {
                    UserID: req.params.id
                },
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération de l'adresse"
            })
        })
};

exports.update = (req, res) => {
    Address.findOne({
            include: [{
                model: Adherent,
                as: "adherents",
                required: true,
                attributes: [],
                where: {
                    UserID: req.params.id
                },
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération de l'adresse"
            })
        })
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