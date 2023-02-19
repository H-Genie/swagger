/**
 * @swagger
 * tags
 *   name
 */

module.exports = {
    ...require('./patientRoute'),
    ...require('./statRoute'),
    ...require('./listRoute')
}