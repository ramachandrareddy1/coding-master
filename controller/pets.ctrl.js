let petsModel = require('../models/pets.model').petsModel
let methods = {};
let pets = [];
methods.petPostCtrl = (req, res) => {
    try {
        req.body.ID = 'P_' + Date.now();
        pets.push(req.body);
        res.send({
            status: true,
            message: 'Request Processed Successfully'
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: 'Server side error',
            err: err
        });
    }
};

methods.petGetCtrl = (req, res) => {
    try {
        petId = null;
        if (Object.keys(req.query).length) {
            petId = req.query.petId;
        };
        let petsData = [];
        if (petId)
            petsData = pets.filter(e => e.ID == petId);
        else
            petsData = pets;

        res.send({
            status: true,
            message: 'Request Processed Successfully',
            data: petsData
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: 'Server side error',
            err: err
        });
    }
};

methods.petPutCtrl = (req, res) => {
    try {
        let petId = req.params.petId;
        pets.forEach((pet) => {
            if (pet.ID == petId) {
                pet.name = req.body.name;
                pet.age = req.body.age;
                pet.colour = req.body.colour;

                return;
            }
        })
        res.send({
            status: true,
            message: 'Request Processed Successfully'
        });
    } catch (err) {
        console.log('error', err)
        res.status(500).send({
            status: false,
            message: 'Server side error',
            err: err
        });
    }
};

methods.petDeleteCtrl = (req, res) => {
    try {
        let petId = req.params.petId;
        let index = pets.findIndex(pet => pet.ID == petId);
        pets.splice(index, 1);
        res.send({
            status: true,
            message: 'Request Processed Successfully'
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: 'Server side error',
            err: err
        });
    }
};

methods.petsValidationMiddleware = (req, res, next) => {
    let errors = [];
    let body = req.body;
    for (let eachModel in petsModel) {
        let reqEachItem = body[eachModel];
        if (!reqEachItem && petsModel[eachModel].required) {
            errors.push(`${eachModel} is mandatory field`);
        } else {
            if (typeof reqEachItem != petsModel[eachModel]['type']) {
                errors.push(`${eachModel} is a ${ petsModel[eachModel]['type']} `)
            }
        }
    }
    if (errors.length) {
        return res.status(422).send({ status: false, message: errors });
    };
    next()

}
module.exports = methods;