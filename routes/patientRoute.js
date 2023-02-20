const { Router } = require('express');
const patientRouter = Router();
const { Patient, Brief, Condition, Drug, Visit } = require('../models');

patientRouter.get('/', async (req, res) => {
    try {
        const {
            length,
            page,
            order_column,
            order_desc,
            gender,
            race,
            ethnicity,
            age_min,
            age_max,
            death
        } = req.query;

        let ageQuery = {};
        if (age_min !== undefined) ageQuery.$gte = parseInt(age_min);
        if (age_max !== undefined) ageQuery.$lte = parseInt(age_max);

        const query = {
            [gender !== undefined && 'gender']: gender,
            [race !== undefined && 'race']: { $in: race && race.split(',') },
            [ethnicity !== undefined && 'ethnicity']: ethnicity,
            [Object.keys(ageQuery).length !== 0 && 'age']: ageQuery,
            [death !== undefined && 'isDeath']: death === "Y" ? true : false
        }
        const sort = order_column && {
            [order_column]: order_desc
        }

        const patients = await Patient.find(query)
            .sort(sort)
            .skip(length * page)
            .limit(length);
        const totalLength = await Patient.find(query).countDocuments();

        return res.send({ patients, page: parseInt(page) + 1, totalLength });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID', async (req, res) => {
    try {
        const { personID } = req.params;
        let briefs = await Brief.findOne({ personID: parseInt(personID) });

        return res.send(
            {
                conditionList: briefs.conditionList,
                visitCount: briefs.visitCount
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/condition', async (req, res) => {
    try {
        const { personID } = req.params;
        let conditions = await Condition.findOne({ personID: parseInt(personID) });

        return res.send({ conditionList: conditions.conditionList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/drug', async (req, res) => {
    try {
        const { personID } = req.params;
        let drugs = await Drug.findOne({ personID: parseInt(personID) });

        return res.send({ drugList: drugs.drugList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

patientRouter.get('/:personID/visit', async (req, res) => {
    try {
        const { personID } = req.params;
        let visits = await Visit.findOne({ personID: parseInt(personID) });

        return res.send({ visitList: visits.visitList });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

module.exports = { patientRouter }