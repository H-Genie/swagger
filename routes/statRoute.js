const { Router } = require('express');
const statRouter = Router();
const { Stat } = require('../models');

statRouter.get('/', async (_, res) => {
    try {
        let stats = await Stat.find({});
        return res.send({ stats });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

module.exports = { statRouter }