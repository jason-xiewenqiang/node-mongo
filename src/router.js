require('colors');
const fs = require('fs');
const url = require('fs');
const router = require('koa-router')();

router.get('/', async (ctx) => {
  ctx.response.status = 200
  const file = fs.readFileSync(__dirname + '/template/index.html', 'utf-8');
  ctx.response.body = file;
  ctx.response.header.contentType = 'text/html; charset=UTF-8';
})

module.exports = router