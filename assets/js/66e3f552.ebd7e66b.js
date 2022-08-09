"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[971],{4852:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>m});var l=t(9231);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,l,r=function(e,n){if(null==e)return{};var t,l,r={},a=Object.keys(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=l.createContext({}),c=function(e){var n=l.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=c(e.components);return l.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},s=l.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),s=c(t),m=r,k=s["".concat(p,".").concat(m)]||s[m]||u[m]||a;return t?l.createElement(k,i(i({ref:n},d),{},{components:t})):l.createElement(k,i({ref:n},d))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=s;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var c=2;c<a;c++)i[c]=t[c];return l.createElement.apply(null,i)}return l.createElement.apply(null,t)}s.displayName="MDXCreateElement"},2025:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var l=t(4011),r=(t(9231),t(4852));const a={title:"\u73af\u5883\u53d8\u91cf",order:13},i=void 0,o={unversionedId:"guide/basic/env",id:"guide/basic/env",title:"\u73af\u5883\u53d8\u91cf",description:"ICE \u5185\u7f6e\u901a\u8fc7\u73af\u5883\u53d8\u91cf\u5b9e\u73b0\u7ed9\u6784\u5efa\u6216\u8fd0\u884c\u65f6\u4f20\u9012\u53c2\u6570\u7684\u529f\u80fd\u3002",source:"@site/docs/guide/basic/env.md",sourceDirName:"guide/basic",slug:"/guide/basic/env",permalink:"/docs/guide/basic/env",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/basic/env.md",tags:[],version:"current",frontMatter:{title:"\u73af\u5883\u53d8\u91cf",order:13},sidebar:"docs",previous:{title:"\u6784\u5efa\u914d\u7f6e",permalink:"/docs/guide/basic/config"},next:{title:"\u90e8\u7f72",permalink:"/docs/guide/best-practices/deploy"}},p={},c=[{value:"\u5982\u4f55\u914d\u7f6e\u73af\u5883\u53d8\u91cf",id:"\u5982\u4f55\u914d\u7f6e\u73af\u5883\u53d8\u91cf",level:2},{value:"\u547d\u4ee4\u884c\u73af\u5883\u53d8\u91cf",id:"\u547d\u4ee4\u884c\u73af\u5883\u53d8\u91cf",level:3},{value:"\u4f7f\u7528 <code>.env</code> \u6587\u4ef6",id:"\u4f7f\u7528-env-\u6587\u4ef6",level:3},{value:"\u4f7f\u7528\u73af\u5883\u53d8\u91cf",id:"\u4f7f\u7528\u73af\u5883\u53d8\u91cf",level:2},{value:"\u6784\u5efa\u65f6",id:"\u6784\u5efa\u65f6",level:3},{value:"\u8fd0\u884c\u65f6",id:"\u8fd0\u884c\u65f6",level:3},{value:"\u5185\u7f6e\u7684\u73af\u5883\u53d8\u91cf",id:"\u5185\u7f6e\u7684\u73af\u5883\u53d8\u91cf",level:2},{value:"ICE_CORE_MODE",id:"ice_core_mode",level:3},{value:"ICE_CORE_ROUTER",id:"ice_core_router",level:3},{value:"ICE_CORE_ERROR_BOUNDARY",id:"ice_core_error_boundary",level:3},{value:"ICE_CORE_INITIAL_DATA",id:"ice_core_initial_data",level:3},{value:"ICE_CORE_DEV_PORT",id:"ice_core_dev_port",level:3}],d={toc:c};function u(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,l.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"ICE \u5185\u7f6e\u901a\u8fc7\u73af\u5883\u53d8\u91cf\u5b9e\u73b0\u7ed9\u6784\u5efa\u6216\u8fd0\u884c\u65f6\u4f20\u9012\u53c2\u6570\u7684\u529f\u80fd\u3002"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"li"},".env")," \u6587\u4ef6\u6765\u914d\u7f6e\u73af\u5883\u53d8\u91cf"),(0,r.kt)("li",{parentName:"ul"},"\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"li"},"ICE_")," \u5f00\u5934\u7684\u73af\u5883\u53d8\u91cf\u5219\u4f1a\u540c\u65f6\u66b4\u9732\u5230\u8fd0\u884c\u65f6\u73af\u5883\u4e2d")),(0,r.kt)("h2",{id:"\u5982\u4f55\u914d\u7f6e\u73af\u5883\u53d8\u91cf"},"\u5982\u4f55\u914d\u7f6e\u73af\u5883\u53d8\u91cf"),(0,r.kt)("h3",{id:"\u547d\u4ee4\u884c\u73af\u5883\u53d8\u91cf"},"\u547d\u4ee4\u884c\u73af\u5883\u53d8\u91cf"),(0,r.kt)("p",null,"\u4f8b\u5982\u9700\u8981\u4fee\u6539 ICE \u672c\u5730\u5f00\u53d1\u670d\u52a1\u7684\u7aef\u53e3\u53f7\uff0c\u53ef\u4ee5\u5728\u547d\u4ee4\u884c\u4e2d\u4f7f\u7528\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ cross-env PORT=9999 npm start\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u793a\u4f8b\u4e2d\u4f7f\u7528\u4e86 cross-env \u6765\u517c\u5bb9\u4e0d\u5bb9\u64cd\u4f5c\u7cfb\u7edf\u7684\u73af\u5883\u53d8\u91cf\u914d\u7f6e\u65b9\u5f0f\u3002")),(0,r.kt)("h3",{id:"\u4f7f\u7528-env-\u6587\u4ef6"},"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"h3"},".env")," \u6587\u4ef6"),(0,r.kt)("p",null,"ICE \u5185\u7f6e\u4e86\u52a0\u8f7d ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," \u6587\u4ef6\u7684\u652f\u6301\uff0c\u5728\u8be5\u6587\u4ef6\u4e2d\u8bbe\u7f6e\u7684\u73af\u5883\u53d8\u91cf\u4f1a\u88ab\u81ea\u52a8\u52a0\u8f7d\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},"process.env")," \u4e0a\u3002"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},".env")," \u6587\u4ef6\u7684\u793a\u4f8b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"DEV_PORT=3000\nFOO=bar\n")),(0,r.kt)("p",null,"\u5982\u679c\u6709\u90e8\u5206\u73af\u5883\u53d8\u91cf\u7684\u914d\u7f6e\u5728\u672c\u5730\u6709\u5dee\u5f02\uff0c\u4f60\u53ef\u4ee5\u914d\u7f6e\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},".env.local")," \u6587\u4ef6\u4e2d\u53bb\u8986\u76d6 ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," \u4e2d\u7684\u914d\u7f6e\u3002\u5982\u5728\u4e4b\u524d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," \u7684\u57fa\u7840\u4e0a, \u4f60\u60f3\u672c\u5730\u5f00\u53d1\u8986\u76d6\u4e4b\u524d 3000 \u7aef\u53e3, \u800c\u4f7f\u7528 9999 \u7aef\u53e3\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"# The .env.local should not be committed.\nDEV_PORT=9999\n")),(0,r.kt)("p",null,"\u6b64\u5916\u4f60\u4e5f\u53ef\u4ee5\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},".env.${mode}")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},".env.${mode}.local")," \u6587\u4ef6\u4e2d\u6307\u5b9a\u4e0d\u540c\u6a21\u5f0f\u4e0b\u7684\u73af\u5883\u53d8\u91cf\u3002",(0,r.kt)("inlineCode",{parentName:"p"},"${mode}")," \u7684\u53d6\u503c\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"development")," \u6216 ",(0,r.kt)("inlineCode",{parentName:"p"},"production"),"\u3002"),(0,r.kt)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u662f\uff1a"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u8fd9\u51e0\u4e2a\u6587\u4ef6\u7684\u4f18\u5148\u7ea7\u7531\u4f4e\u81f3\u9ad8\u5206\u522b\u662f")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},".env")," "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},".env.local")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},".env.${mode}")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},".env.${mode}.local"))),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"\u4e00\u822c\u4e0d\u5efa\u8bae\u5c06 ",(0,r.kt)("inlineCode",{parentName:"li"},".local")," \u7ed3\u5c3e\u7684\u6587\u4ef6\u52a0\u5165\u7248\u672c\u7ba1\u7406 (\u5982 Git) \u4e2d\u3002")),(0,r.kt)("h2",{id:"\u4f7f\u7528\u73af\u5883\u53d8\u91cf"},"\u4f7f\u7528\u73af\u5883\u53d8\u91cf"),(0,r.kt)("p",null,"\u5728 ICE \u4e2d\uff0c\u73af\u5883\u53d8\u91cf\u7684\u4f7f\u7528\u573a\u666f\u5206\u6784\u5efa\u65f6\u4e0e\u8fd0\u884c\u65f6\u4e24\u79cd\u7c7b\u578b\u3002"),(0,r.kt)("p",null,"\u7279\u522b\u6ce8\u610f\uff1a\u73af\u5883\u53d8\u91cf\u5728\u4f7f\u7528\u65f6\u7684\u7c7b\u578b\u90fd\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),"\uff0c\u7279\u522b\u662f\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," \u6216 ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," \u65f6\u9700\u8981\u6ce8\u610f\u5224\u65ad\u4e3a\u5b57\u7b26\u4e32\u7c7b\u578b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// ICE_DISABLE_FOO=false\nif (process.env.ICE_DISABLE_FOO === 'false') {\n  // ...\n}\n")),(0,r.kt)("h3",{id:"\u6784\u5efa\u65f6"},"\u6784\u5efa\u65f6"),(0,r.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u6240\u6709\u8bbe\u7f6e\u7684\u73af\u5883\u53d8\u91cf\u90fd\u4f1a\u88ab\u6ce8\u5165\u5230\u6784\u5efa\u73af\u5883\uff0c\u4f60\u53ef\u4ee5\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"ice.config.mts")," \u6587\u4ef6\u6216\u5176\u5b83\u6784\u5efa\u63d2\u4ef6\u4e2d\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"process.env")," \u53d8\u91cf\u8bbf\u95ee\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const port = process.env.PORT;\n// ...\n")),(0,r.kt)("h3",{id:"\u8fd0\u884c\u65f6"},"\u8fd0\u884c\u65f6"),(0,r.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u73af\u5883\u53d8\u91cf\u662f\u4e0d\u80fd\u5728\u8fd0\u884c\u65f6\u8bbf\u95ee\u7684\uff0c\u5982\u82e5\u9700\u8981\u5728\u6d4f\u89c8\u5668\u73af\u5883\u4e2d\u8bbf\u95ee\uff0c\u53ef\u4ee5\u5728\u8bbe\u7f6e\u73af\u5883\u53d8\u91cf\u65f6\u589e\u52a0\u524d\u7f00\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"ICE_"),"\uff0c\u5982\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"# File .env\nICE_APP_ID=123456\n")),(0,r.kt)("p",null,"\u5728\u8fd0\u884c\u65f6\u4ee3\u7801\u4e2d\u8bbf\u95ee\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import React from 'react';\n\nexport default function AppID() {\n  return <h1>AppId is {process.env.ICE_APP_ID}.</h1>\n}\n")),(0,r.kt)("h2",{id:"\u5185\u7f6e\u7684\u73af\u5883\u53d8\u91cf"},"\u5185\u7f6e\u7684\u73af\u5883\u53d8\u91cf"),(0,r.kt)("p",null,"ICE \u4f1a\u5185\u7f6e\u4e00\u4e9b\u73af\u5883\u53d8\u91cf\u65b9\u4fbf\u4f7f\u7528\uff0c\u901a\u5e38\u7531 ",(0,r.kt)("inlineCode",{parentName:"p"},"ICE_CORE_")," \u5f00\u5934\uff0c\u5982\u4e0b\uff1a"),(0,r.kt)("h3",{id:"ice_core_mode"},"ICE_CORE_MODE"),(0,r.kt)("p",null,"\u7528\u4e8e ICE \u7684\u8fd0\u884c\u6a21\u5f0f\uff0c\u53ef\u80fd\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"development")," \u6216 ",(0,r.kt)("inlineCode",{parentName:"p"},"production"),"\u3002"),(0,r.kt)("h3",{id:"ice_core_router"},"ICE_CORE_ROUTER"),(0,r.kt)("p",null,"\u7528\u4e8e\u6807\u8bc6\u6846\u67b6\u662f\u5426\u542f\u7528\u8def\u7531\uff0c\u53ef\u80fd\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," \u6216 ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\u3002"),(0,r.kt)("h3",{id:"ice_core_error_boundary"},"ICE_CORE_ERROR_BOUNDARY"),(0,r.kt)("p",null,"\u7528\u4e8e\u6807\u8bc6\u6846\u67b6\u662f\u5426\u542f\u7528\u9519\u8bef\u8fb9\u754c\uff0c\u53ef\u80fd\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," \u6216 ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\u3002"),(0,r.kt)("h3",{id:"ice_core_initial_data"},"ICE_CORE_INITIAL_DATA"),(0,r.kt)("p",null,"\u7528\u4e8e\u6807\u8bc6\u6846\u67b6\u662f\u5426\u542f\u7528\u521d\u59cb\u6570\u636e\uff0c\u53ef\u80fd\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," \u6216 ",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\u3002"),(0,r.kt)("h3",{id:"ice_core_dev_port"},"ICE_CORE_DEV_PORT"),(0,r.kt)("p",null,"\u7528\u4e8e\u6807\u8bc6 ICE \u7684\u5f00\u53d1\u670d\u52a1\u5668\u7aef\u53e3\u53f7\u3002"))}u.isMDXComponent=!0}}]);