"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[384],{4852:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>m});var r=t(9231);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=r.createContext({}),c=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},s=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=c(t),m=i,f=s["".concat(p,".").concat(m)]||s[m]||d[m]||o;return t?r.createElement(f,a(a({ref:n},u),{},{components:t})):r.createElement(f,a({ref:n},u))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=s;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=t[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}s.displayName="MDXCreateElement"},2111:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=t(2203),i=(t(9231),t(4852));const o={title:"API",order:15},a=void 0,l={unversionedId:"guide/basic/api",id:"guide/basic/api",title:"API",description:"Hooks",source:"@site/docs/guide/basic/api.md",sourceDirName:"guide/basic",slug:"/guide/basic/api",permalink:"/docs/guide/basic/api",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/basic/api.md",tags:[],version:"current",frontMatter:{title:"API",order:15},sidebar:"docs",previous:{title:"\u6784\u5efa\u914d\u7f6e",permalink:"/docs/guide/basic/config"},next:{title:"\u73af\u5883\u53d8\u91cf",permalink:"/docs/guide/basic/env"}},p={},c=[{value:"Hooks",id:"hooks",level:2},{value:"<code>useMounted</code>",id:"usemounted",level:3},{value:"\u7ec4\u4ef6",id:"\u7ec4\u4ef6",level:2},{value:"<code>&lt;ClientOnly /&gt;</code>",id:"clientonly-",level:3}],u={toc:c};function d(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"hooks"},"Hooks"),(0,i.kt)("h3",{id:"usemounted"},(0,i.kt)("inlineCode",{parentName:"h3"},"useMounted")),(0,i.kt)("p",null,"\u8be5\u65b9\u6cd5\u4f1a\u5728 React Hydrate \u5b8c\u6210\u540e\u8fd4\u56de ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),"\uff0c\u4e00\u822c\u5728\u5f00\u542f SSR/SSG \u7684\u5e94\u7528\u4e2d\uff0c\u7528\u4e8e\u63a7\u5236\u5728\u4e0d\u540c\u7aef\u4e2d\u6e32\u67d3\u4e0d\u540c\u7684\u7ec4\u4ef6\u3002"),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"\u4f7f\u7528\u6b64 ",(0,i.kt)("inlineCode",{parentName:"p"},"useMounted")," \u800c\u4e0d\u662f ",(0,i.kt)("inlineCode",{parentName:"p"},"typeof windows !== 'undefined'")," \u6765\u5224\u65ad\u5f53\u524d\u662f\u5426\u5728 Client \u7aef\u4e2d\u6e32\u67d3\u3002"),(0,i.kt)("p",{parentName:"admonition"},"\u56e0\u4e3a\u7b2c\u4e00\u6b21 Client \u7aef\u6e32\u67d3\u5fc5\u987b\u4e0e Server \u7aef\u6e32\u67d3\u7684\u63a5\u53e3\u4e00\u81f4\uff0c\u5982\u679c\u4e0d\u4f7f\u7528\u6b64 Hook \u5224\u65ad\u7684\u8bdd\uff0c\u5728 Hydrate \u65f6\u53ef\u80fd\u51fa\u73b0\u8282\u70b9\u4e0d\u5339\u914d\u7684\u60c5\u51b5\u3002")),(0,i.kt)("p",null,"\u4f7f\u7528\u793a\u4f8b\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"import { useMounted } from 'ice';\n\nconst Home = () => {\n  const mounted = useMounted();\n  return <div>{mounted ? 'Client' : 'Server'}</div>;\n};\n")),(0,i.kt)("h2",{id:"\u7ec4\u4ef6"},"\u7ec4\u4ef6"),(0,i.kt)("h3",{id:"clientonly-"},(0,i.kt)("inlineCode",{parentName:"h3"},"<ClientOnly />")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"<ClientOnly />")," \u7ec4\u4ef6\u53ea\u5141\u8bb8\u5728 React Hydrate \u5b8c\u6210\u540e\u5728 Client \u7aef\u4e2d\u6e32\u67d3\u7ec4\u4ef6\u3002"),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"<ClientOnly />")," \u7ec4\u4ef6\u5305\u88f9\u4e0d\u80fd\u5728 Node.js \u4e2d\u8fd0\u884c\u7684\u7ec4\u4ef6\uff0c\u6bd4\u5982\u5982\u679c\u7ec4\u4ef6\u8981\u8bbf\u95ee ",(0,i.kt)("inlineCode",{parentName:"p"},"window")," \u6216 ",(0,i.kt)("inlineCode",{parentName:"p"},"document")," \u5bf9\u8c61\u3002")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Props")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"children"),": \u4e00\u4e2a\u51fd\u6570\uff0c\u4e14\u8fd4\u56de\u4ec5\u5728\u6d4f\u89c8\u5668\u4e2d\u6e32\u67d3\u7684\u7ec4\u4ef6\u3002\u8be5\u51fd\u6570\u4e0d\u4f1a\u5728 Server \u7aef\u4e2d\u6267\u884c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"fallback"),"\uff08\u53ef\u9009\uff09: \u5728 React Hydrate \u5b8c\u6210\u4e4b\u524d\u6e32\u67d3\u7684\u7ec4\u4ef6")),(0,i.kt)("p",null,"\u4f7f\u7528\u793a\u4f8b\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ClientOnly } from 'ice';\n\nexport function Home () {\n  return (\n    <ClientOnly fallback={<div>loading...</div>}>\n      {() => <span>page url is {window.location.href}</span>}\n    </ClientOnly>\n  );\n};\n")),(0,i.kt)("p",null,"\u5f15\u5165\u4e00\u4e2a\u7ec4\u4ef6\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"import { ClientOnly } from 'ice';\nimport MyComponent from './MyComponent';\n\nexport function Home () {\n  return (\n    <ClientOnly fallback={<div>loading...</div>}>\n      {() => <MyComponent />}\n    </ClientOnly>\n  );\n};\n")))}d.isMDXComponent=!0}}]);