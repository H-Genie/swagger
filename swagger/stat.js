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