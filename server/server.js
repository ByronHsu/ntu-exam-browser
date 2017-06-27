const express = require('express');
const api = require('./api');
const login = require('./login');

const server = express();

server.use(express.static(`${__dirname}/../build`));
server.use('/api', api);
server.use('/login', login);

const port = process.env.PORT || 3000;
server.listen(port, () => {console.log(`server is running on ${port}`)});
