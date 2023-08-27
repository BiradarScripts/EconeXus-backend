const db = require('./db');
db.connectToMongodb();

const cors = require('cors');
const express = require('express');
const server = express();
const userRouter = require('./routes/User');
const postRouter = require('./routes/Post');
const imageRouter = require('./routes/Image');

server.use(cors());
server.use(express.json({ limit: '500mb' })); 
server.use(express.urlencoded({ limit: '500mb', extended: true }));

server.use('/apis/auth', userRouter.routes);
server.use('/apis/post', postRouter.routes);
server.use('/apis/image', imageRouter.routes);

server.listen(8080, () => {
  console.log('Server connected');
});
