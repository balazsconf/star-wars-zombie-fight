const jsonServer = require('json-server');
//const fs = require('fs');

const PORT = 3000;

const server = jsonServer.create();
const router = jsonServer.router('db-with-images.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
    console.log(`JSON Server is running at http://localhost:${PORT}`);
});
