const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const app = new Koa();

const render = require('./render');

//클라이언트 라우팅이 제대로 작동하게 하려면, 
//서버측에서 준비되지 않은 요청이 들어 왔을 시, 
//리액트 어플리케이션이 띄워져있는 index.html 의 내용을 보여주어야 합니다.
//const indexHtml = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), { encoding: 'utf8'});

//웹 요청이 들어왔을 때, build 디렉토리에 알맞는 파일이 있으면 
//해당 파일을 반환하고, 그렇지 않으면 indexHtml가 반환됩니다.
// app.use(serve(path.resolve(__dirname, '../build/')));

// app.use(ctx => {
//     ctx.body = indexHtml;
// });


app.use((ctx, next) => {
    if(ctx.path === '/') return render(ctx);
    return next();
});
app.use(serve(path.resolve(__dirname, '../build/')));
app.use(render);

app.listen(3001);
