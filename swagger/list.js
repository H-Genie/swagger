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