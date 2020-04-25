const vm = require('vm');

const user = {
  name: 'liujian',
};

const res = vm.runInNewContext('`<h2>hello, ${user.name}</h2>`', { user });

console.log(res);
