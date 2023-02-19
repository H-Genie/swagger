const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "test-api",
      description:
        "페이지네이션 테스트 API",
    },
    servers: [
      {
        url:
          "https://myapi-h-genie.koyeb.app",
      },
    ],
  },
  apis: ["./routes/*.js"]
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }