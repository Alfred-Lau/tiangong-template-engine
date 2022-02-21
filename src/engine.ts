const vm = require('vm');

/*

// basic
const vm = require('vm');

const user = {
  name: 'liujian',
};

const res = vm.runInNewContext('`<h2>hello, ${user.name}</h2>`', { user });

console.log(res);


*/

const user = {
    name: '<script />',
};

const templateMap = {
    templateA: '`<h2> ${include("templateB")} </h2>`',
    templateB: '`<p>hello,engine</p>`', // fs.readFileAsync
};

const context = {
    /* include 能力 */
    include: function (module) {
        return templateMap[module]();
    },
    /* 简易的 XSS 过滤函数 */
    _: function (markup) {
        if (!markup) {
            return '';
        }
        return String(markup)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    },
};

Object.keys(templateMap).forEach((key) => {
    const temp = templateMap[key];
    templateMap[key] = vm.runInNewContext(
        `
  (function(){
    return ${temp}
  });
  `,
        context
    );
});

console.log(templateMap['templateA']());
