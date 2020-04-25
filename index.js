const vm = require('vm');

const user = {
  name: '<script />',
};

const res = vm.runInNewContext('`<h2>hello, ${_(user.name)}</h2>`', {
  user,
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
});

console.log(res);
