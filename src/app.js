require('colors');
const koa = require('koa');
const app = new koa();
const cors = require('koa-cors');
const router = require('./router');
const static = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const serverPort = 8000;

// db.connect().then(() => {
//   console.log(`db connected ! yooh`.bgGreen);
// }).catch(() => {
//   console.log(`db connect fail !!!`.bgRed);
// });

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(static(__dirname + '/static'));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(serverPort);

console.log(`server run in port ${ serverPort }`.blue);

