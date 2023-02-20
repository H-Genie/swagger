const { Router } = require('express');
const listRouter = Router();
const { List } = require('../models');

listRouter.get('/gender', async (_, res) => {
    try {
        let lists = await List.find({ category: "gender" });
        let result = [];
        for (let i = 0; i < lists.length; i++) {
            result.push(lists[i].value)
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

listRouter.get('/race', async (_, res) => {
    try {
        let lists = await List.find({ category: "race" });
        let result = [];
        for (let i = 0; i < lists.length; i++) {
            result.push(lists[i].value)
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

listRouter.get('/ethnicity', async (_, res) => {
    try {
        let lists = await List.find({ category: "ethnicity" });
        let result = [];
        for (let i = 0; i < lists.length; i++) {
            result.push(lists[i].value)
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
});

module.exports = { listRouter }