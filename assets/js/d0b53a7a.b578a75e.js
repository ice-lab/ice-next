"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[7114],{4852:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(9231);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),p=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),s=p(n),m=r,f=s["".concat(c,".").concat(m)]||s[m]||u[m]||i;return n?a.createElement(f,l(l({ref:t},d),{},{components:n})):a.createElement(f,l({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=s;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},8014:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(2203),r=(n(9231),n(4852));const i={title:"\u4f7f\u7528 antd \u7ec4\u4ef6"},l=void 0,o={unversionedId:"guide/advanced/antd",id:"guide/advanced/antd",title:"\u4f7f\u7528 antd \u7ec4\u4ef6",description:"icejs \u9879\u76ee\u4e2d\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 antd \u7ec4\u4ef6\uff0c\u5173\u4e8e antd \u7ec4\u4ef6\u6309\u9700\u5f15\u5165\u7684\u95ee\u9898\u8bf4\u660e\uff1a",source:"@site/docs/guide/advanced/antd.md",sourceDirName:"guide/advanced",slug:"/guide/advanced/antd",permalink:"/docs/guide/advanced/antd",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/advanced/antd.md",tags:[],version:"current",frontMatter:{title:"\u4f7f\u7528 antd \u7ec4\u4ef6"},sidebar:"docs",previous:{title:"\u5143\u7d20\u53ef\u89c1",permalink:"/docs/guide/basic/appear"},next:{title:"\u6743\u9650\u7ba1\u7406",permalink:"/docs/guide/advanced/auth"}},c={},p=[{value:"\u5f00\u542f\u63d2\u4ef6",id:"\u5f00\u542f\u63d2\u4ef6",level:2},{value:"\u914d\u7f6e",id:"\u914d\u7f6e",level:2},{value:"importStyle",id:"importstyle",level:3},{value:"dark",id:"dark",level:3},{value:"compact",id:"compact",level:3},{value:"theme",id:"theme",level:3}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"icejs \u9879\u76ee\u4e2d\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 antd \u7ec4\u4ef6\uff0c\u5173\u4e8e antd \u7ec4\u4ef6\u6309\u9700\u5f15\u5165\u7684\u95ee\u9898\u8bf4\u660e\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u811a\u672c\u4ee3\u7801\u6309\u9700\u5f15\u5165\uff1a\u4e0d\u63a8\u8350\u4f7f\u7528 babel-plugin-import\uff0c\u793e\u533a\u4e3b\u6d41\u5de5\u5177 Webpack/Vite \u7b49\u90fd\u5df2\u652f\u6301 tree-shaking\uff0c\u6784\u5efa\u65f6\u9ed8\u8ba4\u90fd\u4f1a\u505a\u6309\u9700\u7684\u5f15\u5165"),(0,r.kt)("li",{parentName:"ul"},"\u6837\u5f0f\u4ee3\u7801\u6309\u9700\u5f15\u5165\uff1a\u7ed3\u5408\u793e\u533a\u8ba8\u8bba ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/ant-design/ant-design/issues/16600#issuecomment-492572520"},"issue"),"\uff0c\u5927\u591a\u6570\u573a\u666f\u4e0b\u6837\u5f0f\u6309\u9700\u5f15\u5165\u5e76\u65e0\u592a\u5927\u610f\u4e49\uff0c\u53cd\u800c\u4f1a\u5f15\u5165\u5176\u4ed6\u5de5\u7a0b\u95ee\u9898\uff0c\u56e0\u6b64\u63a8\u8350\u7ec4\u4ef6\u6837\u5f0f\u5728\u9879\u76ee\u7ea7\u5168\u91cf\u5f15\u5165")),(0,r.kt)("p",null,"\u7efc\u4e0a\u6240\u8ff0\uff0c\u5982\u679c\u4e0d\u5b58\u5728\u4e3b\u9898\u5b9a\u5236\u4ee5\u53ca\u6837\u5f0f\u5927\u5c0f\u6781\u81f4\u7684\u8981\u6c42\uff0c\u9879\u76ee\u4e2d\u5e76\u4e0d\u9700\u8981\u4f7f\u7528 antd \u63d2\u4ef6\uff0c\u901a\u8fc7\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"src/global.css")," \u4e2d\u5168\u91cf\u5f15\u5165\u6837\u5f0f\u5373\u53ef\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-css",metastring:'title="src/global.css"',title:'"src/global.css"'},"@import 'antd/dist/antd.css';\n\nbody {}\n")),(0,r.kt)("h2",{id:"\u5f00\u542f\u63d2\u4ef6"},"\u5f00\u542f\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5b89\u88c5\u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm i -D @ice/plugin-antd\n")),(0,r.kt)("p",null,"\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"ice.config.mts")," \u4e2d\u6dfb\u52a0\u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="ice.config.mts"',title:'"ice.config.mts"'},"import { defineConfig } from '@ice/app';\nimport antd from '@ice/plugin-antd';\n\nexport default defineConfig({\n  plugins: [\n    antd({\n      importStyle: true,\n    }),\n  ],\n});\n")),(0,r.kt)("h2",{id:"\u914d\u7f6e"},"\u914d\u7f6e"),(0,r.kt)("h3",{id:"importstyle"},"importStyle"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u7c7b\u578b: ",(0,r.kt)("inlineCode",{parentName:"li"},"boolean")),(0,r.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c: ",(0,r.kt)("inlineCode",{parentName:"li"},"false"))),(0,r.kt)("p",null,"\u4e3a antd \u7ec4\u4ef6\u6309\u9700\u52a0\u8f7d\u6837\u5f0f\u3002"),(0,r.kt)("h3",{id:"dark"},"dark"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u7c7b\u578b: ",(0,r.kt)("inlineCode",{parentName:"li"},"boolean")),(0,r.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c: ",(0,r.kt)("inlineCode",{parentName:"li"},"false"))),(0,r.kt)("p",null,"\u5f00\u542f\u6697\u8272\u4e3b\u9898\u3002"),(0,r.kt)("h3",{id:"compact"},"compact"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u7c7b\u578b: ",(0,r.kt)("inlineCode",{parentName:"li"},"boolean")),(0,r.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c: ",(0,r.kt)("inlineCode",{parentName:"li"},"false"))),(0,r.kt)("p",null,"\u5f00\u542f\u7d27\u51d1\u4e3b\u9898\u3002"),(0,r.kt)("h3",{id:"theme"},"theme"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u7c7b\u578b: ",(0,r.kt)("inlineCode",{parentName:"li"},"Record<string, string>")),(0,r.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c: ",(0,r.kt)("inlineCode",{parentName:"li"},"{}"))),(0,r.kt)("p",null,"\u914d\u7f6e antd \u7684 theme \u4e3b\u9898\uff0c\u914d\u7f6e\u5f62\u5f0f\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="ice.config.mts"',title:'"ice.config.mts"'},"import { defineConfig } from '@ice/app';\nimport antd from '@ice/plugin-antd';\n\nexport default defineConfig({\n  plugins: [\n    antd({\n      theme: {\n        // primary-color \u4e3a antd \u7684 theme token\n        'primary-color': '#1DA57A',\n      },\n    }),\n  ],\n});\n")))}u.isMDXComponent=!0}}]);