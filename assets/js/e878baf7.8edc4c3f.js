"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[8377],{4852:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=u(n),m=a,k=s["".concat(p,".").concat(m)]||s[m]||d[m]||i;return n?r.createElement(k,l(l({ref:t},c),{},{components:n})):r.createElement(k,l({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=s;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var u=2;u<i;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},9855:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var r=n(4011),a=(n(9231),n(4852));const i={title:"\u5e94\u7528\u5165\u53e3",order:4},l=void 0,o={unversionedId:"guide/basic/app",id:"guide/basic/app",title:"\u5e94\u7528\u5165\u53e3",description:"ICE \u901a\u8fc7\u5e94\u7528\u914d\u7f6e\u7684\u65b9\u5f0f\u6e32\u67d3\u6574\u4e2a\u5e94\u7528\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u6839\u636e\u63d0\u4f9b\u7684\u914d\u7f6e\u5b9a\u5236\u5e94\u7528\u3002",source:"@site/docs/guide/basic/app.md",sourceDirName:"guide/basic",slug:"/guide/basic/app",permalink:"/docs/guide/basic/app",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/basic/app.md",tags:[],version:"current",frontMatter:{title:"\u5e94\u7528\u5165\u53e3",order:4},sidebar:"docs",previous:{title:"\u76ee\u5f55\u7ed3\u6784",permalink:"/docs/guide/basic/directory"},next:{title:"\u8def\u7531",permalink:"/docs/guide/basic/router"}},p={},u=[{value:"\u5e94\u7528\u914d\u7f6e\u6587\u4ef6",id:"\u5e94\u7528\u914d\u7f6e\u6587\u4ef6",level:2},{value:"\u914d\u7f6e\u9879",id:"\u914d\u7f6e\u9879",level:2},{value:"app",id:"app",level:3},{value:"<code>rootId</code>",id:"rootid",level:4},{value:"<code>strict</code>",id:"strict",level:4},{value:"<code>errorBoundary</code>",id:"errorboundary",level:4},{value:"router",id:"router",level:3},{value:"<code>type</code>",id:"type",level:4},{value:"<code>basename</code>",id:"basename",level:4},{value:"\u5e94\u7528\u7ea7\u6570\u636e",id:"\u5e94\u7528\u7ea7\u6570\u636e",level:2},{value:"\u8fd0\u884c\u65f6\u62d3\u5c55",id:"\u8fd0\u884c\u65f6\u62d3\u5c55",level:2}],c={toc:u};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"ICE \u901a\u8fc7\u5e94\u7528\u914d\u7f6e\u7684\u65b9\u5f0f\u6e32\u67d3\u6574\u4e2a\u5e94\u7528\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u6839\u636e\u63d0\u4f9b\u7684\u914d\u7f6e\u5b9a\u5236\u5e94\u7528\u3002"),(0,a.kt)("h2",{id:"\u5e94\u7528\u914d\u7f6e\u6587\u4ef6"},"\u5e94\u7528\u914d\u7f6e\u6587\u4ef6"),(0,a.kt)("p",null,"\u6846\u67b6\u4ee5 ",(0,a.kt)("inlineCode",{parentName:"p"},"src/app.ts")," \u4f5c\u4e3a\u5e94\u7528\u914d\u7f6e\u6587\u4ef6\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import { defineAppConfig } from 'ice';\n\nexport default defineAppConfig({\n  app: {\n    strict: true,\n  },\n});\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u63a8\u8350\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"defineAppConfig()")," \u7684\u65b9\u5f0f\u5bfc\u51fa\u5e94\u7528\u914d\u7f6e\uff0c\u4ee5\u83b7\u5f97\u826f\u597d\u7684\u7c7b\u578b\u63d0\u793a\u3002")),(0,a.kt)("h2",{id:"\u914d\u7f6e\u9879"},"\u914d\u7f6e\u9879"),(0,a.kt)("p",null,"\u5e94\u7528\u5165\u53e3\u7684\u914d\u7f6e\u9879\uff0c\u652f\u6301\u5e94\u7528\u5e38\u7528\u7684\u76f8\u5173\u914d\u7f6e\u3002"),(0,a.kt)("h3",{id:"app"},"app"),(0,a.kt)("h4",{id:"rootid"},(0,a.kt)("inlineCode",{parentName:"h4"},"rootId")),(0,a.kt)("p",null,"\u6839\u8282\u70b9 id"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"string")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c ",(0,a.kt)("inlineCode",{parentName:"li"},"ice-container"))),(0,a.kt)("h4",{id:"strict"},(0,a.kt)("inlineCode",{parentName:"h4"},"strict")),(0,a.kt)("p",null,"\u662f\u5426\u5f00\u542f React \u7684\u4e25\u683c\u6a21\u5f0f (React.StrictMode)"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b ",(0,a.kt)("inlineCode",{parentName:"li"},"boolean")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c ",(0,a.kt)("inlineCode",{parentName:"li"},"false"))),(0,a.kt)("h4",{id:"errorboundary"},(0,a.kt)("inlineCode",{parentName:"h4"},"errorBoundary")),(0,a.kt)("p",null,"\u662f\u5426\u542f\u7528\u5185\u7f6e\u7684\u9519\u8bef\u8fb9\u754c\u6355\u83b7\u80fd\u529b"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b ",(0,a.kt)("inlineCode",{parentName:"li"},"boolean")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c ",(0,a.kt)("inlineCode",{parentName:"li"},"false"))),(0,a.kt)("h3",{id:"router"},"router"),(0,a.kt)("h4",{id:"type"},(0,a.kt)("inlineCode",{parentName:"h4"},"type")),(0,a.kt)("p",null,"\u8def\u7531\u7c7b\u578b"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b ",(0,a.kt)("inlineCode",{parentName:"li"},"string"),"\uff0c\u53ef\u9009\u503c\u4e3a ",(0,a.kt)("inlineCode",{parentName:"li"},"hash")," \u6216 ",(0,a.kt)("inlineCode",{parentName:"li"},"browser")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u4e3a ",(0,a.kt)("inlineCode",{parentName:"li"},"browser"))),(0,a.kt)("h4",{id:"basename"},(0,a.kt)("inlineCode",{parentName:"h4"},"basename")),(0,a.kt)("p",null,"\u8def\u7531 basename"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b ",(0,a.kt)("inlineCode",{parentName:"li"},"string")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c ",(0,a.kt)("inlineCode",{parentName:"li"},"/"))),(0,a.kt)("h2",{id:"\u5e94\u7528\u7ea7\u6570\u636e"},"\u5e94\u7528\u7ea7\u6570\u636e"),(0,a.kt)("p",null,"\u53ef\u4ee5\u5728\u5e94\u7528\u5165\u53e3\u5b9a\u4e49\u5e76\u5bfc\u51fa ",(0,a.kt)("inlineCode",{parentName:"p"},"getAppData")," \u65b9\u6cd5\uff0c\u6765\u83b7\u53d6\u5e94\u7528\u7ea7\u6570\u636e\u3002\u793a\u4f8b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import type { GetAppData } from 'ice';\n\n// ...\n\nexport const getAppData: GetAppData = () => {\n  return new Promise((resolve) => {\n    resolve({\n      success: true,\n      id: 34293\n    });\n  });\n};\n")),(0,a.kt)("p",null,"\u5728\u9875\u9762\u6216\u5176\u4ed6\u7ec4\u4ef6\u4e2d\uff0c\u53ef\u4ee5\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"useAppData")," \u65b9\u6cd5\u83b7\u53d6\u9875\u9762\u7ea7\u6570\u636e\u3002\u793a\u4f8b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { useAppData } from 'ice';\nimport type { AppData } from 'ice';\n\nexport default function Home(props) {\n  const appData = useAppData<AppData>();\n\n  // ...\n}\n")),(0,a.kt)("h2",{id:"\u8fd0\u884c\u65f6\u62d3\u5c55"},"\u8fd0\u884c\u65f6\u62d3\u5c55"),(0,a.kt)("p",null,"\u5e94\u7528\u5165\u53e3\u9664\u4e86\u652f\u6301\u5b9a\u4e49\u5e94\u7528\u914d\u7f6e\u4e4b\u5916\uff0c\u540c\u65f6\u4e5f\u627f\u62c5\u8fd0\u884c\u65f6\u6269\u5c55\u7684\u80fd\u529b\uff0c\u6bd4\u5982\u6743\u9650\u914d\u7f6e\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineAppConfig } from 'ice';\nimport { defineAuthConfig } from '@ice/plugin-auth/esm/types';\n\n// \u5bfc\u51fa auth \u76f8\u5173\u7684\u80fd\u529b\uff0c\u8be5\u80fd\u529b\u7531 @ice/plugin-auth \u63d2\u4ef6\u63d0\u4f9b\nexport const auth = defineAuthConfig(() => {\n  return {\n    initialAuth: {\n      admin: true,\n    },\n  };\n});\n\nexport default defineAppConfig({\n  app: {\n    strict: true,\n  },\n});\n")))}d.isMDXComponent=!0}}]);