(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1001:function(e,p,b){"use strict";!function(n){b.d(p,"a",function(){return l});b(865);var r=b(867),o=(b(115),b(38)),e=b(1),i=b(231),a=b(23),c=b(14),t=function(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e};function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=(ENV.mock.isStart?ENV.mock:ENV).apiDomain,l=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(f,e.PureComponent),t(f,[{key:"render",value:function(){var t=this,e=this.state.fileList,e={action:u+a.a.system_uploadLogo,withCredentials:!0,fileList:e,onChange:function(e){e=(e=e.fileList).filter(function(e){if(e.response){if(0===e.response.code)return c.a.prompt.success(e.response.msg),!0;"error"===e.status&&c.a.prompt.error("上传失败")}return!0});t.setState({fileList:e})},beforeUpload:function(e){t.setState({fileList:[]})}};return n.createElement("div",null,n.createElement(i.b,{title:"logo管理"}),n.createElement(i.a,null,n.createElement(r.a,e,n.createElement(o.a,null,"文件上传"))))}}]),f);function f(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f);e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(f.__proto__||Object.getPrototypeOf(f)).call(this,e));return e.state={fileList:[]},e}}.call(this,b(1))},916:function(e,i,a){"use strict";a.r(i),function(e){var t=a(229),n=a(1001),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,r=arguments[t];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=Object(t.b)(function(e,t){return r({},t)})(n.a);i.default=function(){return e.createElement(o,null)}}.call(this,a(1))}}]);