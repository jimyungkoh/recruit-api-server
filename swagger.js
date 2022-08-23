const {openingApi} = require("./api");
const swaggerAutogen = require("swagger-autogen")();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./api/company.js', './api/jobApplication.js', './api/opening.js'];

swaggerAutogen(outputFile, endpointsFiles);
