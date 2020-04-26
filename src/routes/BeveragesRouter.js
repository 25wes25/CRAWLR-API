const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const BeverageModel = require('../models/beverage');

router.post('/beverages', createBeverage);
router.put('/beverages', modifyBeverage);
router.get('/beverages', getAllBeverages);
router.delete('/beverages/:id', deleteBeverage);

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

async function createBeverage(request, response, next) {
    let data = request.body;
    try {
        const beverage = new BeverageModel(data);
        beverage.save(function (err, dbRes) {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(dbRes);
        });
    } catch (e) {
        next(e);
    }
}

async function modifyBeverage(request, response, next) {
    let data = request.body;
    try {
        let query = {
            _id: mongoose.Types.ObjectId(data.id)
        };
        BeverageModel.findOneAndUpdate(query, data, {new: true}, function (err, dbRes) {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(dbRes);
        });
    } catch (e) {
        next(e);
    }
}

async function getAllBeverages(request, response, next) {
    try {
        let shots = await BeverageModel.find({category: "shot"}).exec();
        let cocktails = await BeverageModel.find({category: "cocktail"}).exec();
        let drinks = await BeverageModel.find({category: "drink"}).exec();
        let beverages = {
            shots: shots,
            cocktails: cocktails,
            drinks: drinks,
        };
        response.statusCode = statusOK;
        response.send(beverages);
    } catch (e) {
        next(e);
    }
}

async function deleteBeverage(request, response, next) {
    try {
        let query = {
            _id: mongoose.Types.ObjectId(request.params.id)
        };
        BeverageModel.findOneAndDelete(query, async (err, dbRes) => {
            if (err) return console.error(err);
            response.statusCode = statusOK;
            response.send(dbRes);
        });
    } catch (e) {
        next(e);
    }
}

module.exports = router;
