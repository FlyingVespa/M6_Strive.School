import express from 'express';
import listEndpoints from 'express-list-endpoints';

import blogPostsRoute from './services/blogPosts/index.js';
import authorsRoute from './services/authors/index.js';

const { PORT } = process.env;

const server = express();

server.use(express.json());

server.use('/blogPosts', blogPostsRoute);
server.use('/authors', authorsRoute);

console.table(listEndpoints(server));

server.listen(PORT, () => console.log('Server is running on port:', PORT));
server.on('error', (err) => console.log('server is not running:', err));
