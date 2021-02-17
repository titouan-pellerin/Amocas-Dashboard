const db = require("../models");
const {
    body,
    validationResult
} = require('express-validator');

const User = db.users;
const Adherent = db.adherents;
const Address = db.addresses;
const Has = db.has;
const PersonInCharge = db.personsincharge;
const IsRegisteredFor = db.is_registered_for;
const ParticipateTo = db.participate_to;
const Season = db.seasons;
const Activity = db.activities;
const Op = db.Sequelize.Op;


exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('user.lastName', 'Nom invalide').exists().isString(),
                body('user.firstName', 'Prénom invalide').exists().isString(),
                body('user.password', 'Mot de passe invalide').exists().isString(),
                body('address.addressFirstLine', 'Première ligne de l\'adresse invalide').exists().isString(),
                body('address.addressSecondLine', 'Seconde ligne de l\'adresse invalide').optional().isString(),
                body('address.city', 'Ville invalide').exists().isString(),
                body('address.postalCode', 'Code postal invalide').exists().isLength({
                    min: 5,
                    max: 5
                }),
                body('birthDate', 'Date de naissance invalide').exists().isString(),
                body('gender', 'Genre invalide').exists().isString(),
                body('registrationDate', 'Date d\'inscription invalide').exists().isString(),
                body('phone1', 'Téléphone 1 invalide').optional().isString(),
                body('phone2', 'Téléphone 2 invalide').optional().isString(),
                body('personsInCharge.user.lastName', 'Nom de la personne responsable invalide').optional().isString(),
                body('personsInCharge.user.firstName', 'Prénom de la personne responsable invalide').optional().isString(),
                body('personsInCharge.user.password', 'Mot de passe de la personne responsable invalide').optional().isString(),
                body('personsInCharge.user.emailAddress', 'Adresse e-mail de la personne responsable invalide').optional().isEmail(),
                body('personsInCharge.user.personInCharge.phone1', 'Téléphone 1 de la personne responsable invalide').optional().isString(),
                body('personsInCharge.user.personInCharge.phone2', 'Téléphone 2 de la personne responsable invalide').optional().isString(),
                body('isRegistredFor', 'ID de saison invalide').optional().isInt(),
                body('participateTo.ActivityID', 'ID d\'atelier invalide').optional().isInt(),
            ]
        }
    }
}

exports.create = (req, res) => {
    let message = '';
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
        return
    }

    const {
        user,
        address,
        birthDate,
        gender,
        registrationDate,
        phone1,
        phone2,
        personsInCharge,
        isRegisteredFor,
        participateTo
    } = req.body;

    const newAddress = {
        AddressFirstLine: address.addressFirstLine,
        AddressSecondLine: address.addressSecondLine,
        City: address.city,
        PostalCode: address.postalCode
    };

    const newUser = {
        FirstName: user.firstName,
        LastName: user.lastName,
        Password: user.password,
        EmailAddress: user.emailAddress
    };



    Address.create(newAddress)
        .then(addressData => {
            User.create(newUser).then(userData => {
                Adherent.create({
                    UserID: userData.UserID,
                    BirthDate: birthDate,
                    Gender: gender,
                    RegistrationDate: registrationDate,
                    Phone1: phone1,
                    Phone2: phone2,
                    AddressID: addressData.AddressID,
                    is_registered_fors: isRegisteredFor,
                    participate_tos: participateTo

                }, {
                    include: [{
                        model: IsRegisteredFor,
                        as: 'is_registered_fors',
                        required: true
                    }, {
                        model: ParticipateTo,
                        as: 'participate_tos',
                        required: true
                    }]
                }).then(adherentData => {
                    if (personsInCharge) {
                        personsInCharge.forEach(personInCharge => {
                            console.log(personInCharge);
                            User.create({
                                LastName: personInCharge.lastName,
                                FirstName: personInCharge.firstName,
                                Password: personInCharge.password,
                                EmailAddress: personInCharge.emailAddress,
                                personsincharge: {
                                    Phone1: personInCharge.personInCharge.phone1,
                                    Phone2: personInCharge.personInCharge.phone2,
                                    has: {
                                        UserID_Adherents: userData.UserID
                                    }
                                }

                            }, {
                                include: [{

                                    model: PersonInCharge,
                                    as: 'personsincharge',
                                    required: true,
                                    include: [{
                                        model: Has,
                                        as: 'has',
                                        required: true
                                    }]
                                }]
                            }).catch(err => {
                                res.status(500).send({
                                    message: err.message || "Une erreur est survenue lors de la création de la personne responsable"
                                });
                            });
                        });

                    }
                    res.send({
                        message: "Adhérent créé avec succès"
                    });

                }).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message: err.message || "Une erreur est survenue lors de la création de l'adhérent"
                    });
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    message: err.message || "Une erreur est survenue lors de la création de l'utilisateur"
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la création de l'adresse"
            });
        });
};

exports.findAll = (req, res) => {
    const {
        page,
        size,
    } = req.query;

    const {
        limit,
        offset
    } = getPagination(page, size);

    Adherent.findAndCountAll({
        //where: condition,
        //order: [{model: Address, as:"Address"}, 'PostalCode', 'ASC'],
        limit,
        offset,
        subQuery: false,
        distinct:true,
        include: [{
                model: User,
                as: "User",
                attributes: ['LastName', 'FirstName', 'EmailAddress'],
                required: true
            }, {
                model: Address,
                as: "Address",
                attributes: ['City'],
                required: true
            }, {
                model: IsRegisteredFor,
                as: 'is_registered_fors',
                required: true,
                include: [{
                    model: Season,
                    as: "Season",
                    attributes: ['SeasonStart', 'SeasonEnd'],
                    required: true
                }]
            }, {
                model: ParticipateTo,
                as: 'participate_tos',
                required: true,
                include: [{
                    model: Activity,
                    as: 'Activity',
                    required: true,
                }]
            },

        ]
    }).then(data => {
        let result = Array();
        for (let adherent of data.rows) {
            result.push({
                'N°': adherent.UserID,
                'Nom': adherent.User.LastName,
                'Prénom': adherent.User.FirstName,
                'Âge': calculateAge(new Date(adherent.BirthDate)),
                'Ville': adherent.Address.City,
                'Atelier(s)': getActivitiesName(adherent.participate_tos),
                'Saisons d\'inscription': adherent.is_registered_fors.Season,
                'Date d\'inscription': new Date(adherent.RegistrationDate).toLocaleDateString('fr-FR'),
                'Adresse e-mail': adherent.User.EmailAddress,
            });
        }
        data.rows = result;
        const response = getPagingData(data, page, limit);

        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération des adhérents"
        });
    });
};

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


function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getActivitiesName(participate_tos) {
    let result = Array();
    participate_tos.forEach(participate_to => {
        result.push(participate_to.Activity.Name);
    });
    return result;
}

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return {
        limit,
        offset
    };
};

const getPagingData = (data, page, limit) => {
    const {
        count: totalItems,
        rows: adherents
    } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        totalItems,
        adherents,
        totalPages,
        currentPage
    };
};