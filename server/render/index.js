const fs = require('fs');
const path = require('path');
// ES6 형식으로 만들어진 모듈이므로, 뒤에 .default 를 붙여주어야합니다.
const render = require('./render').default;
var serialize = require('serialize-javascript');


const template = fs.readFileSync(path.join(__dirname, '../../build/index.html'), {encoding: 'utf8'});

module.exports = (ctx) => {
    const location = ctx.path;
    return render(location).then(
        ({html, state, helmet}) => {
            const page = template.replace('<div id="root"></div>', `<div id="root">${html}</div><script>window.__PRELOADED_STATE__=${JSON.stringify(serialize(state))}</script>`)
                                 .replace('<meta helmet>', `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`);
            ctx.body = page;
        }
    );
}
