const http = require('http')
require("dotenv").config();
const app = require('./app')
const port = process.env.PORT || 3011
const server = http.createServer(app)

server.listen(port)