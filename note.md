# fast-template-engine

基于 es6 模板字符串实现的模板引擎，追求渲染的高效

1. 简易的 XSS 过滤函数

```js
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
```

2. proto RPC typedArray

3. easy_sock 实现 rpc 通信
