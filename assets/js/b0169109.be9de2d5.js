"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[851],{4852:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(9231);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),s=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=s(n),m=r,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return n?a.createElement(f,u(u({ref:t},c),{},{components:n})):a.createElement(f,u({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,u=new Array(l);u[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:r,u[1]=o;for(var s=2;s<l;s++)u[s]=n[s];return a.createElement.apply(null,u)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8842:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(9231),r=n(9841);const l="tabItem_PkC0";function u(e){let{children:t,hidden:n,className:u}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(l,u),hidden:n},t)}},4429:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(2203),r=n(9231),l=n(9841),u=n(8555),o=n(4584),i=n(6661),s=n(5711);const c="tabList_OF_g",p="tabItem_Krmg";function d(e){var t;const{lazy:n,block:u,defaultValue:d,values:m,groupId:f,className:h}=e,g=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),b=m??g.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),v=(0,o.l)(b,((e,t)=>e.value===t.value));if(v.length>0)throw new Error(`Docusaurus error: Duplicate values "${v.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const k=null===d?d:d??(null==(t=g.find((e=>e.props.default)))?void 0:t.props.value)??g[0].props.value;if(null!==k&&!b.some((e=>e.value===k)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${k}" but none of its children has the corresponding value. Available values are: ${b.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:N}=(0,i.U)(),[x,A]=(0,r.useState)(k),O=[],{blockElementScrollPositionUntilNextRender:C}=(0,s.o5)();if(null!=f){const e=y[f];null!=e&&e!==x&&b.some((t=>t.value===e))&&A(e)}const w=e=>{const t=e.currentTarget,n=O.indexOf(t),a=b[n].value;a!==x&&(C(t),A(a),null!=f&&N(f,String(a)))},T=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=O.indexOf(e.currentTarget)+1;n=O[t]??O[0];break}case"ArrowLeft":{const t=O.indexOf(e.currentTarget)-1;n=O[t]??O[O.length-1];break}}null==(t=n)||t.focus()};return r.createElement("div",{className:(0,l.Z)("tabs-container",c)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":u},h)},b.map((e=>{let{value:t,label:n,attributes:u}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:x===t?0:-1,"aria-selected":x===t,key:t,ref:e=>O.push(e),onKeyDown:T,onFocus:w,onClick:w},u,{className:(0,l.Z)("tabs__item",p,null==u?void 0:u.className,{"tabs__item--active":x===t})}),n??t)}))),n?(0,r.cloneElement)(g.filter((e=>e.props.value===x))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},g.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==x})))))}function m(e){const t=(0,u.Z)();return r.createElement(d,(0,a.Z)({key:String(t)},e))}},6745:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(2203),r=(n(9231),n(4852)),l=n(4429),u=n(8842);const o={title:"\u6743\u9650\u7ba1\u7406"},i=void 0,s={unversionedId:"guide/advanced/auth",id:"guide/advanced/auth",title:"\u6743\u9650\u7ba1\u7406",description:"\u793a\u4f8b",source:"@site/docs/guide/advanced/auth.md",sourceDirName:"guide/advanced",slug:"/guide/advanced/auth",permalink:"/docs/guide/advanced/auth",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/advanced/auth.md",tags:[],version:"current",frontMatter:{title:"\u6743\u9650\u7ba1\u7406"},sidebar:"docs",previous:{title:"\u73af\u5883\u53d8\u91cf",permalink:"/docs/guide/basic/env"},next:{title:"CSS \u8d44\u6e90\u672c\u5730\u5316",permalink:"/docs/guide/advanced/css-assets-local"}},c={},p=[{value:"\u5b89\u88c5\u63d2\u4ef6",id:"\u5b89\u88c5\u63d2\u4ef6",level:2},{value:"\u521d\u59cb\u5316\u6743\u9650\u6570\u636e",id:"\u521d\u59cb\u5316\u6743\u9650\u6570\u636e",level:2},{value:"\u9875\u9762\u6743\u9650",id:"\u9875\u9762\u6743\u9650",level:2},{value:"\u64cd\u4f5c\u6743\u9650",id:"\u64cd\u4f5c\u6743\u9650",level:2},{value:"\u83b7\u53d6\u6743\u9650\u6570\u636e",id:"\u83b7\u53d6\u6743\u9650\u6570\u636e",level:3},{value:"\u8bbe\u7f6e\u6743\u9650\u6570\u636e",id:"\u8bbe\u7f6e\u6743\u9650\u6570\u636e",level:3},{value:"\u81ea\u5b9a\u4e49\u6743\u9650\u7ec4\u4ef6",id:"\u81ea\u5b9a\u4e49\u6743\u9650\u7ec4\u4ef6",level:3},{value:"\u81ea\u5b9a\u4e49 Fallback",id:"\u81ea\u5b9a\u4e49-fallback",level:2}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("details",{open:!0},(0,r.kt)("summary",null,"\u793a\u4f8b"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://github.com/ice-lab/ice-next/tree/master/examples/basic-project",target:"_blank",rel:"noopener noreferrer"},"basic-project")))),(0,r.kt)("p",null,"\u5bf9\u4e8e\u4e00\u4e2a Web \u5e94\u7528\uff0c\u6743\u9650\u7ba1\u7406\u662f\u7ecf\u5e38\u4f1a\u6d89\u53ca\u7684\u9700\u6c42\u4e4b\u4e00\uff0c\u901a\u5e38\u5305\u542b\u4ee5\u4e0b\u51e0\u79cd\u5e38\u89c1\u7684\u6743\u9650\u7ba1\u7406\u7c7b\u578b\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u9875\u9762\u6743\u9650\uff1a\u5f53\u7528\u6237\u8bbf\u95ee\u67d0\u4e2a\u6ca1\u6709\u6743\u9650\u7684\u9875\u9762\u65f6\u8df3\u8f6c\u5230\u65e0\u6743\u9650\u9875\u9762"),(0,r.kt)("li",{parentName:"ul"},"\u64cd\u4f5c\u6743\u9650\uff1a\u9875\u9762\u4e2d\u7684\u67d0\u4e9b\u6309\u94ae\u6216\u7ec4\u4ef6\u9488\u5bf9\u65e0\u6743\u9650\u7684\u7528\u6237\u76f4\u63a5\u9690\u85cf"),(0,r.kt)("li",{parentName:"ul"},"\u63a5\u53e3\u6743\u9650\uff1a\u5f53\u7528\u6237\u901a\u8fc7\u64cd\u4f5c\u8c03\u7528\u6ca1\u6709\u6743\u9650\u7684\u63a5\u53e3\u65f6\u8df3\u8f6c\u5230\u65e0\u6743\u9650\u9875\u9762")),(0,r.kt)("p",null,"ice.js \u63d0\u4f9b ",(0,r.kt)("inlineCode",{parentName:"p"},"@ice/plugin-auth")," \u63d2\u4ef6\uff0c\u5e2e\u52a9\u7528\u6237\u66f4\u7b80\u5355\u7ba1\u7406\u524d\u4e24\u79cd\u7c7b\u578b\u7684\u6743\u9650\u3002\u63a5\u53e3\u6743\u9650\u7ba1\u7406\u8bf7\u89c1\u6570\u636e\u8bf7\u6c42\u6587\u6863\u3002"),(0,r.kt)("h2",{id:"\u5b89\u88c5\u63d2\u4ef6"},"\u5b89\u88c5\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5b89\u88c5\u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm i @ice/plugin-auth -D\n")),(0,r.kt)("p",null,"\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"ice.config.mts")," \u4e2d\u6dfb\u52a0\u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="ice.config.mts"',title:'"ice.config.mts"'},"import { defineConfig } from '@ice/app';\nimport auth from '@ice/plugin-auth';\n\nexport default defineConfig({\n  plugins: [\n   auth(),\n  ],\n});\n")),(0,r.kt)("h2",{id:"\u521d\u59cb\u5316\u6743\u9650\u6570\u636e"},"\u521d\u59cb\u5316\u6743\u9650\u6570\u636e"),(0,r.kt)("p",null,"\u5927\u591a\u6570\u60c5\u51b5\u4e0b\u6743\u9650\u7ba1\u7406\u901a\u5e38\u9700\u8981\u4ece\u670d\u52a1\u7aef\u83b7\u53d6\u6743\u9650\u6570\u636e\uff0c\u7136\u540e\u5728\u524d\u7aef\u901a\u8fc7\u6743\u9650\u5bf9\u6bd4\u4ee5\u6b64\u63a7\u5236\u9875\u9762\u3001\u64cd\u4f5c\u7b49\u7b49\u6743\u9650\u884c\u4e3a\u3002\u7ea6\u5b9a\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"src/app.ts")," \u4e2d\u5bfc\u51fa ",(0,r.kt)("inlineCode",{parentName:"p"},"auth")," \u5bf9\u8c61\uff0c\u8be5\u5bf9\u8c61\u5305\u542b\u4ece\u670d\u52a1\u7aef\u5f02\u6b65\u83b7\u53d6\u521d\u59cb\u5316\u7684\u6743\u9650\u6570\u636e\uff0c\u5e76\u4e14\u7ea6\u5b9a\u6700\u7ec8\u8fd4\u56de\u683c\u5f0f\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"{ initialAuth: { [key: string]: boolean } }"),"\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/app.ts"',title:'"src/app.ts"'},"import { defineAuthConfig } from '@ice/plugin-auth/esm/types';\n\nexport const auth = defineAuthConfig(async () => {\n  // \u6a21\u62df\u8bf7\u6c42\u6743\u9650\u6570\u636e\n  // const data = (await fetch('/api/auth')).json();\n  return {\n    initialAuth: {\n      admin: true,\n      guest: false,\n    },\n  };\n});\n")),(0,r.kt)("h2",{id:"\u9875\u9762\u6743\u9650"},"\u9875\u9762\u6743\u9650"),(0,r.kt)("p",null,"\u5982\u9700\u5bf9\u67d0\u4e9b\u9875\u9762\u8fdb\u884c\u6743\u9650\u63a7\u5236\uff0c\u53ea\u9700\u5728\u9875\u9762\u7ec4\u4ef6\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"getConfig")," \u4e2d\u914d\u7f6e\u51c6\u5165\u6743\u9650\u5373\u53ef\u3002"),(0,r.kt)(l.Z,{mdxType:"Tabs"},(0,r.kt)(u.Z,{value:"home",label:"src/pages/index.tsx",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export default function Home() {\n  return <div>Home</div>\n}\n\nexport function getConfig() {\n  return {\n    // \u5f53\u524d\u7528\u6237\u662f admin \u65f6\uff0c\u6709\u6743\u9650\u8bbf\u95ee\u8be5\u9875\u9762\n    auth: ['admin'],\n  };\n}\n"))),(0,r.kt)(u.Z,{value:"user",label:"src/pages/about.tsx",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"export default function About() {\n  return <div>About</div>\n}\n\nexport function getConfig() {\n  return {\n    // \u5f53\u524d\u7528\u6237\u662f admin \u65f6\uff0c\u65e0\u6743\u9650\u8bbf\u95ee\u8be5\u9875\u9762\n    auth: ['guest'],\n  };\n}\n")))),(0,r.kt)("h2",{id:"\u64cd\u4f5c\u6743\u9650"},"\u64cd\u4f5c\u6743\u9650"),(0,r.kt)("p",null,"\u5728\u67d0\u4e9b\u573a\u666f\u4e0b\uff0c\u5982\u67d0\u4e2a\u7ec4\u4ef6\u4e2d\u8981\u6839\u636e\u89d2\u8272\u5224\u65ad\u662f\u5426\u6709\u64cd\u4f5c\u6743\u9650\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7 useAuth Hooks \u5728\u7ec4\u4ef6\u4e2d\u83b7\u53d6\u6743\u9650\u6570\u636e\uff0c\u540c\u65f6\u4e5f\u53ef\u4ee5\u66f4\u65b0\u521d\u59cb\u7684\u6743\u9650\u6570\u636e\u3002"),(0,r.kt)("h3",{id:"\u83b7\u53d6\u6743\u9650\u6570\u636e"},"\u83b7\u53d6\u6743\u9650\u6570\u636e"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\nimport { useAuth } from 'ice';\n\nfunction Foo() {\n  const [auth] = useAuth();\n  return (\n    <>\n      \u5f53\u524d\u7528\u6237\u6743\u9650\u6570\u636e\uff1a\n      <code>{JSON.stringify(auth)}</code>\n    </>\n  );\n}\n")),(0,r.kt)("h3",{id:"\u8bbe\u7f6e\u6743\u9650\u6570\u636e"},"\u8bbe\u7f6e\u6743\u9650\u6570\u636e"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\nimport { useAuth } from 'ice';\n\nfunction Home() {\n  const [auth, setAuth] = useAuth();\n\n  // \u66f4\u65b0\u6743\u9650\uff0c\u4e0e\u9ed8\u8ba4\u7684 auth \u6570\u636e\u8fdb\u884c\u5408\u5e76\n  function updateAuth() {\n    setAuth({ admin: false, guest: true });\n  }\n\n  return (\n    <>\n      \u5f53\u524d\u7528\u6237\u89d2\u8272\uff1a\n      <code>{JSON.stringify(auth)}</code>\n      <button type=\"button\" onClick={updateAuth}>\n        \u66f4\u65b0\u6743\u9650\n      </button>\n    </>\n  );\n}\n")),(0,r.kt)("h3",{id:"\u81ea\u5b9a\u4e49\u6743\u9650\u7ec4\u4ef6"},"\u81ea\u5b9a\u4e49\u6743\u9650\u7ec4\u4ef6"),(0,r.kt)("p",null,"\u5bf9\u4e8e\u64cd\u4f5c\u7c7b\u6743\u9650\uff0c\u901a\u5e38\u6211\u4eec\u53ef\u4ee5\u81ea\u5b9a\u4e49\u5c01\u88c5\u6743\u9650\u7ec4\u4ef6\uff0c\u4ee5\u4fbf\u66f4\u7ec6\u7c92\u5ea6\u7684\u63a7\u5236\u6743\u9650\u548c\u590d\u7528\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\nimport { useAuth } from 'ice';\nimport NoAuth from '@/components/NoAuth';\n\nfunction Auth({ children, authKey, fallback }) {\n  const [auth] = useAuth();\n  // \u5224\u65ad\u662f\u5426\u6709\u6743\u9650\n  const hasAuth = auth[authKey];\n\n  // \u6709\u6743\u9650\u65f6\u76f4\u63a5\u6e32\u67d3\u5185\u5bb9\n  if (hasAuth) {\n    return children;\n  } else {\n    // \u65e0\u6743\u9650\u65f6\u663e\u793a\u6307\u5b9a UI\n    return fallback || NoAuth;\n  }\n}\n\nexport default Auth;\n")),(0,r.kt)("p",null,"\u4f7f\u7528\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"function Foo() {\n  return (\n    <Auth authKey={'starRepo'}>\n      <Button type=\"button\">Star</Button>\n    </Auth>\n  );\n}\n")),(0,r.kt)("h2",{id:"\u81ea\u5b9a\u4e49-fallback"},"\u81ea\u5b9a\u4e49 Fallback"),(0,r.kt)("p",null,"\u652f\u6301\u81ea\u5b9a\u4e49\u65e0\u6743\u9650\u65f6\u7684\u5c55\u793a\u7ec4\u4ef6\uff0c\u9ed8\u8ba4\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"<>No Auth</>")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff",metastring:'title="src/app.tsx"',title:'"src/app.tsx"'},"import { defineAuthConfig } from '@ice/plugin-auth/esm/types';\n\nexport const auth = defineAuthConfig(async () => {\n  return {\n    initialAuth: {\n      admin: true,\n    },\n+   NoAuthFallback: (routeConfig) => {\n+     console.log(routeConfig); // \u5f53\u524d\u9875\u9762\u7684\u914d\u7f6e \n+     return (\n+       <div>\u6ca1\u6709\u6743\u9650</div>\n+     )\n+   },\n+ };\n});\n")))}m.isMDXComponent=!0}}]);