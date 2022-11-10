"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[2540],{4852:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(9231);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(r),f=a,m=u["".concat(c,".").concat(f)]||u[f]||d[f]||i;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},9278:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=r(2203),a=(r(9231),r(4852));const i={title:"\u670d\u52a1\u7aef\u6e32\u67d3 SSR",order:11},o=void 0,l={unversionedId:"guide/basic/ssr",id:"guide/basic/ssr",title:"\u670d\u52a1\u7aef\u6e32\u67d3 SSR",description:"\u670d\u52a1\u5668\u6e32\u67d3\uff0c\u7b80\u79f0 SSR (Server Side Rendering)\uff0c\u662f\u4e00\u79cd\u5728\u670d\u52a1\u7aef\u8fd0\u884c Node.js \u7a0b\u5e8f\u52a8\u6001\u751f\u6210 HTML \u7684\u6e32\u67d3\u65b9\u5f0f\u3002",source:"@site/docs/guide/basic/ssr.md",sourceDirName:"guide/basic",slug:"/guide/basic/ssr",permalink:"/docs/guide/basic/ssr",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/basic/ssr.md",tags:[],version:"current",frontMatter:{title:"\u670d\u52a1\u7aef\u6e32\u67d3 SSR",order:11},sidebar:"docs",previous:{title:"\u6784\u5efa\u65f6\u6e32\u67d3 SSG",permalink:"/docs/guide/basic/ssg"},next:{title:"\u5b9a\u5236 HTML",permalink:"/docs/guide/basic/document"}},c={},s=[{value:"\u5f00\u542f SSR",id:"\u5f00\u542f-ssr",level:2},{value:"\u6570\u636e\u8bf7\u6c42",id:"\u6570\u636e\u8bf7\u6c42",level:2}],p={toc:s};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u670d\u52a1\u5668\u6e32\u67d3\uff0c\u7b80\u79f0 SSR (Server Side Rendering)\uff0c\u662f\u4e00\u79cd\u5728\u670d\u52a1\u7aef\u8fd0\u884c Node.js \u7a0b\u5e8f\u52a8\u6001\u751f\u6210 HTML \u7684\u6e32\u67d3\u65b9\u5f0f\u3002"),(0,a.kt)("p",null,"SSR \u76f8\u6bd4\u4f20\u7edf\u5728\u6d4f\u89c8\u5668\u7aef\u6e32\u67d3\u7684\u6a21\u5f0f(CSR)\uff0c\u53d7\u8bbe\u5907\u6027\u80fd\u548c\u7f51\u7edc\u60c5\u51b5\u7684\u5f71\u54cd\u66f4\u5c0f\uff0c\u53ef\u4ee5\u8fbe\u5230\u66f4\u597d\u7684\u6027\u80fd\u4f53\u9a8c\u548c SEO \u80fd\u529b\u3002"),(0,a.kt)("h2",{id:"\u5f00\u542f-ssr"},"\u5f00\u542f SSR"),(0,a.kt)("p",null,"\u4e0e SSG \u4e0d\u540c\u7684\u662f\uff0cICE \u4e2d SSR \u4e0d\u662f\u9ed8\u8ba4\u542f\u7528\u7684\u3002"),(0,a.kt)("p",null,"\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"ice.config.mts")," \u4e2d\uff0c\u589e\u52a0\u5982\u4e0b\u914d\u7f6e\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  // ...\n  ssr: true,\n});\n")),(0,a.kt)("h2",{id:"\u6570\u636e\u8bf7\u6c42"},"\u6570\u636e\u8bf7\u6c42"),(0,a.kt)("p",null,"\u5f00\u542f SSR \u540e\uff0c\u8def\u7531\u7ec4\u4ef6\u4e2d\u5bfc\u51fa\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"dataLoader")," \u65b9\u6cd5\u5c06\u4f1a\u5728 Server \u7aef\u88ab\u6267\u884c\uff0c\u5982\u679c SSR \u6e32\u67d3\u6210\u529f\uff0c\u5728 Client \u7aef\u5c06\u4e0d\u4f1a\u518d\u6b21\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"dataLoader"),"\uff0c\u800c\u4f1a\u590d\u7528 SSR \u7684\u7ed3\u679c\u3002\u5f53\u9875\u9762\u5728\u6d4f\u89c8\u5668\u4fa7\u901a\u8fc7\u8def\u7531\u8df3\u8f6c\uff0c\u6216\u9875\u9762\u964d\u7ea7\u65f6\uff0c\u624d\u4f1a\u5728 Client \u7aef\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"dataLoader"),"\u3002"),(0,a.kt)("p",null,"\u56e0\u6b64\uff0c\u4e00\u822c\u60c5\u51b5\u4e0b ",(0,a.kt)("inlineCode",{parentName:"p"},"dataLoader")," \u5185\u7684\u6570\u636e\u8bf7\u6c42\u9700\u8981\u4fdd\u6301\u540c\u6784\uff0c\u5728 Server \u7aef\u548c Client \u7aef\u90fd\u80fd\u6267\u884c\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u786e\u5b9e\u9700\u8981\u4e3a Server \u7aef\u6307\u5b9a\u4e0d\u4e00\u6837\u7684\u6570\u636e\u8bf7\u6c42\u65b9\u5f0f\uff0c\u53ef\u4ee5\u901a\u8fc7\u5b9a\u4e49 ",(0,a.kt)("inlineCode",{parentName:"p"},"serverDataLoader")," \u6765\u5b9e\u73b0\u3002\u5f53\u8def\u7531\u7ec4\u4ef6\u58f0\u660e\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"serverDataLoader"),"\uff0c\u4f1a\u5728 SSR \u4f18\u5148\u4f7f\u7528\u8fd9\u4e2a\u65b9\u6cd5\u3002"),(0,a.kt)("p",null,"\u793a\u4f8b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import { useData, defineDataLoader, defineServerDataLoader } from 'ice';\n\n// Client \u7aef\u4e13\u7528\u7684\u6570\u636e\u8bf7\u6c42\nexport const dataLoader = defineDataLoader(() => {\n  const data = await fetch('https://example.com/api/xxx');\n\n  return data;\n});\n\n// Server \u7aef\u4e13\u7528\u7684\u6570\u636e\u8bf7\u6c42\nexport const serverDataLoader = defineServerDataLoader(() => {\n  const data = await sendRequestInServer();\n\n  return data;\n});\n")),(0,a.kt)("p",null,"\u6784\u5efa Client \u7aef\u7684 Bundle \u65f6\uff0c\u4f1a\u79fb\u9664 ",(0,a.kt)("inlineCode",{parentName:"p"},"getServerData()")," \u53ca\u5176\u76f8\u5173\u4f9d\u8d56\u3002"))}d.isMDXComponent=!0}}]);