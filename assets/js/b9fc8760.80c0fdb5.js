"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[1138],{4852:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var r=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),m=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=m(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=m(n),d=a,f=u["".concat(p,".").concat(d)]||u[d]||c[d]||o;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var m=2;m<o;m++)i[m]=n[m];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1095:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>m});var r=n(2203),a=(n(9231),n(4852));const o={title:"\u5f00\u53d1\u73af\u5883",order:1},i=void 0,l={unversionedId:"guide/basic/development",id:"guide/basic/development",title:"\u5f00\u53d1\u73af\u5883",description:"\u672c\u6587\u8bb2\u8ff0\u5728\u5f00\u53d1\u5e94\u7528\u524d\u5982\u4f55\u5b89\u88c5\u6700\u5c0f\u5f00\u53d1\u73af\u5883\u3002",source:"@site/docs/guide/basic/development.md",sourceDirName:"guide/basic",slug:"/guide/basic/development",permalink:"/docs/guide/basic/development",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/basic/development.md",tags:[],version:"current",frontMatter:{title:"\u5f00\u53d1\u73af\u5883",order:1},sidebar:"docs",previous:{title:"\u5feb\u901f\u5f00\u59cb",permalink:"/docs/guide/start"},next:{title:"\u76ee\u5f55\u7ed3\u6784",permalink:"/docs/guide/basic/directory"}},p={},m=[{value:"Node.js",id:"nodejs",level:2},{value:"\u5305\u7ba1\u7406\u5de5\u5177",id:"\u5305\u7ba1\u7406\u5de5\u5177",level:2},{value:"IDE",id:"ide",level:2}],s={toc:m};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u672c\u6587\u8bb2\u8ff0\u5728\u5f00\u53d1\u5e94\u7528\u524d\u5982\u4f55\u5b89\u88c5\u6700\u5c0f\u5f00\u53d1\u73af\u5883\u3002"),(0,a.kt)("h2",{id:"nodejs"},"Node.js"),(0,a.kt)("p",null,"\u5f00\u53d1\u524d\u7aef\u5e94\u7528\u524d\u9700\u8981\u5b89\u88c5 ",(0,a.kt)("a",{parentName:"p",href:"https://nodejs.org"},"Node.js"),"\uff0c\u5e76\u786e\u4fdd node \u7248\u672c\u662f 14.x \u6216\u4ee5\u4e0a\u3002\u63a8\u8350\u4f7f\u7528 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/nvm-sh/nvm"},"nvm"),"\uff08Windows \u4e0b\u4f7f\u7528 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/coreybutler/nvm-windows"},"nvm-windows"),"\uff09 \u6216\u8005 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Schniz/fnm"},"fnm")," \u6765\u7ba1\u7406 node \u7248\u672c\u3002\u4e0b\u9762\u4ee5\u5728 mac \u4e0b\u5b89\u88c5 nvm \u4e3a\u4f8b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash\n# \u5b89\u88c5 node 14 \u7248\u672c\n$ nvm install 14\n# \u4f7f\u7528 node 14\n$ nvm use 14\n# \u9a8c\u8bc1 node \u662f\u5426\u5b89\u88c5\u6210\u529f\n$ node -v\nv14.19.3\n")),(0,a.kt)("h2",{id:"\u5305\u7ba1\u7406\u5de5\u5177"},"\u5305\u7ba1\u7406\u5de5\u5177"),(0,a.kt)("p",null,"\u5b89\u88c5 Node.js \u540e\uff0c\u9ed8\u8ba4\u4f1a\u5305\u542b npm\u3002\u9664\u6b64\u4ee5\u5916\uff0c\u8fd8\u6709\u5176\u4ed6\u7684\u5305\u7ba1\u7406\u5de5\u5177\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://pnpm.io/"},"pnpm"),"\uff08\u63a8\u8350\uff09"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/cnpm"},"cnpm"),"\uff08\u63a8\u8350\uff09"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://yarnpkg.com/"},"yarn"))),(0,a.kt)("p",null,"\u5b89\u88c5 pnpm \u793a\u4f8b\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm i pnpm -g --register=https://registry.npmmirror.com/\n# \u9a8c\u8bc1 pnpm \u662f\u5426\u5b89\u88c5\u6210\u529f\n$ pnpm -v\n7.1.7\n")),(0,a.kt)("p",null,"\u5982\u679c\u7ecf\u5e38\u9700\u8981\u5207\u6362 npm \u955c\u50cf\u6e90\uff0c\u63a8\u8350\u4f7f\u7528 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Pana/nrm"},"nrm")," \u8fdb\u884c\u7ba1\u7406\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm install -g nrm\n# \u9a8c\u8bc1 nrm \u662f\u5426\u5b89\u88c5\u6210\u529f\n$ nrm --version\n# \u67e5\u770b\u6240\u6709\u955c\u50cf\u6e90\n$ nrm ls\n# \u63a8\u8350\u4f7f\u7528\u6dd8\u5b9d\u955c\u50cf\u6e90\nnrm use taobao\n")),(0,a.kt)("h2",{id:"ide"},"IDE"),(0,a.kt)("p",null,"\u63a8\u8350\u4f7f\u7528 IDE \u8fdb\u884c\u524d\u7aef\u5e94\u7528\u5f00\u53d1\u548c\u8c03\u8bd5\uff0c\u4f1a\u6709\u66f4\u597d\u7684\u8c03\u8bd5\u4f53\u9a8c\u3002\u76ee\u524d\u6bd4\u8f83\u6d41\u884c\u7684 IDE \u6709\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/"},"Visual Studio Code"),"\uff08\u63a8\u8350\uff09"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.jetbrains.com/webstorm/"},"WebStorm"),"\uff08\u63a8\u8350\uff09"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.sublimetext.com/"},"Sublime Text")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://atom.io/"},"Atom"))))}c.isMDXComponent=!0}}]);