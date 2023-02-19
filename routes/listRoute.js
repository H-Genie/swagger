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



/**
 * @swagger
 * /list/gender:
 *  get:
 *    summary: "성별 종류 조회"
 *    tags: [list]
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *               [
 *                "M",
 *                "F"
 *               ]
*/

/**
 * @swagger
 * /list/race:
 *  get:
 *    summary: "인종 종류 조회"
 *    tags: [list]
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *               [
 *                "other",
 *                "native",
 *                "black",
 *                "white",
 *                "asian"
 *               ]
*/

/**
 * @swagger
 * /list/ethnicity:
 *  get:
 *    summary: "민족 종류 조회"
 *    tags: [list]
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *               [
 *                "nonhispanic",
 *                "hispanic"
 *               ]
*/