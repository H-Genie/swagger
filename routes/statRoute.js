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



/**
 * @swagger
 * /stat:
 *  get:
 *    summary: "환자 정보 통계"
 *    tags: [stat]
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                stats:
 *                  type: array
 *                  example: 
 *                      [
 *                       {
 *                        "_id": "626d5ab4f9a8b28cee8cad60",
 *                        "count": 1,
 *                        "ethnicity": "hispanic",
 *                        "gender": "F",
 *                        "race": "native"
 *                       },
 *                      ...
 *                     ]
*/