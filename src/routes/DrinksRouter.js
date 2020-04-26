const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const DrinkModel = require('../models/drink');

router.post('/drinks', createDrink);
router.put('/drinks', modifyDrink);
router.get('/drinks', getAllDrinks);
router.get('/drinks/user/:userId', getAllUsersDrinks);
router.get('/drinks/:id', getDrinkById);
router.delete('/drinks/:id', deleteDrink);

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

async function createDrink(request, response, next) {
    let data = request.body;
    try {
        const drink = new DrinkModel(data);
        drink.save(function (err, dbRes) {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(dbRes);
        });
    } catch (e) {
        next(e);
    }
}

async function modifyDrink(request, response, next) {
    let data = request.body;
    try {
        let query = {
            _id: mongoose.Types.ObjectId(data.id)
        };
        DrinkModel.findOneAndUpdate(query, data, {new: true}, function (err, dbRes) {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(dbRes);
        });
    } catch (e) {
        next(e);
    }
}

async function getAllDrinks(request, response, next) {
    try {
        let drinks = await DrinkModel.find().exec();
        response.statusCode = statusOK;
        response.send(drinks);
    } catch (e) {
        next(e);
    }
}

async function getAllUsersDrinks(request, response, next) {
    try {
        let drinks = await DrinkModel.find({userId: request.params.userId}).exec();
        response.statusCode = statusOK;
        response.send(drinks);
    } catch (e) {
        next(e);
    }
}

async function getDrinkById(request, response, next) {
    try {
        let drink = await DrinkModel.find({_id: request.params.id}).exec();
        if (drink.length >= 1) {
            response.statusCode = statusOK;
            response.send(drink[0]);
        } else {
            response.statusCode = statusError;
            next("No drink found for get drink by id");
        }
    } catch (e) {
        next(e);
    }
}

async function deleteDrink(request, response, next) {
    try {
        let query = {
            _id: mongoose.Types.ObjectId(request.params.id)
        };
        DrinkModel.findOneAndDelete(query, async (err, dbRes) => {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(dbRes);
        });
    } catch (e) {
        next(e);
    }
}

module.exports = router;
