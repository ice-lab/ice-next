"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[6029],{4852:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(9231);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,f=d["".concat(i,".").concat(m)]||d[m]||u[m]||s;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<s;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8842:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(9231),r=n(9841);const s="tabItem_PkC0";function o(e){let{children:t,hidden:n,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(s,o),hidden:n},t)}},4429:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(2203),r=n(9231),s=n(9841),o=n(8555),l=n(4584),i=n(6661),p=n(5711);const c="tabList_OF_g",u="tabItem_Krmg";function d(e){var t;const{lazy:n,block:o,defaultValue:d,values:m,groupId:f,className:k}=e,g=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),h=m??g.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),v=(0,l.l)(h,((e,t)=>e.value===t.value));if(v.length>0)throw new Error(`Docusaurus error: Duplicate values "${v.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const N=null===d?d:d??(null==(t=g.find((e=>e.props.default)))?void 0:t.props.value)??g[0].props.value;if(null!==N&&!h.some((e=>e.value===N)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${N}" but none of its children has the corresponding value. Available values are: ${h.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:b,setTabGroupChoices:y}=(0,i.U)(),[x,C]=(0,r.useState)(N),w=[],{blockElementScrollPositionUntilNextRender:S}=(0,p.o5)();if(null!=f){const e=b[f];null!=e&&e!==x&&h.some((t=>t.value===e))&&C(e)}const M=e=>{const t=e.currentTarget,n=w.indexOf(t),a=h[n].value;a!==x&&(S(t),C(a),null!=f&&y(f,String(a)))},T=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=w.indexOf(e.currentTarget)+1;n=w[t]??w[0];break}case"ArrowLeft":{const t=w.indexOf(e.currentTarget)-1;n=w[t]??w[w.length-1];break}}null==(t=n)||t.focus()};return r.createElement("div",{className:(0,s.Z)("tabs-container",c)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":o},k)},h.map((e=>{let{value:t,label:n,attributes:o}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:x===t?0:-1,"aria-selected":x===t,key:t,ref:e=>w.push(e),onKeyDown:T,onFocus:M,onClick:M},o,{className:(0,s.Z)("tabs__item",u,null==o?void 0:o.className,{"tabs__item--active":x===t})}),n??t)}))),n?(0,r.cloneElement)(g.filter((e=>e.props.value===x))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},g.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==x})))))}function m(e){const t=(0,o.Z)();return r.createElement(d,(0,a.Z)({key:String(t)},e))}},7994:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var a=n(2203),r=(n(9231),n(4852)),s=n(4429),o=n(8842);const l={title:"\u72b6\u6001\u7ba1\u7406",order:3},i=void 0,p={unversionedId:"guide/plugins/store",id:"guide/plugins/store",title:"\u72b6\u6001\u7ba1\u7406",description:"icejs \u57fa\u4e8e icestore \uff0c\u63d0\u4f9b\u4e3b\u6d41\u7684\u72b6\u6001\u7ba1\u7406\u89e3\u51b3\u65b9\u6848\uff0c\u4ee5\u66f4\u597d\u7ba1\u7406\u590d\u6742\u7684\u72b6\u6001\u7ba1\u7406\u903b\u8f91\u3002",source:"@site/docs/guide/plugins/store.md",sourceDirName:"guide/plugins",slug:"/guide/plugins/store",permalink:"/docs/guide/plugins/store",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/plugins/store.md",tags:[],version:"current",frontMatter:{title:"\u72b6\u6001\u7ba1\u7406",order:3},sidebar:"docs",previous:{title:"\u63d2\u4ef6\u5217\u8868",permalink:"/docs/guide/plugins/plugin-list"},next:{title:"\u6743\u9650\u7ba1\u7406",permalink:"/docs/guide/plugins/auth"}},c={},u=[{value:"\u5f00\u542f\u72b6\u6001\u7ba1\u7406",id:"\u5f00\u542f\u72b6\u6001\u7ba1\u7406",level:2},{value:"\u5168\u5c40\u72b6\u6001",id:"\u5168\u5c40\u72b6\u6001",level:2},{value:"\u5b9a\u4e49 Model",id:"\u5b9a\u4e49-model",level:3},{value:"\u521d\u59cb\u5316 Store",id:"\u521d\u59cb\u5316-store",level:3},{value:"\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528",id:"\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528",level:3},{value:"\u9875\u9762\u72b6\u6001",id:"\u9875\u9762\u72b6\u6001",level:2},{value:"\u5b9a\u4e49 Model",id:"\u5b9a\u4e49-model-1",level:3},{value:"\u521d\u59cb\u5316 Store",id:"\u521d\u59cb\u5316-store-1",level:3},{value:"\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528",id:"\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528-1",level:3},{value:"\u8fdb\u9636\u7528\u6cd5",id:"\u8fdb\u9636\u7528\u6cd5",level:2},{value:"\u8bbe\u7f6e\u521d\u59cb\u72b6\u6001",id:"\u8bbe\u7f6e\u521d\u59cb\u72b6\u6001",level:3},{value:"Model \u5b9a\u4e49\u8be6\u7ec6\u8bf4\u660e",id:"model-\u5b9a\u4e49\u8be6\u7ec6\u8bf4\u660e",level:3},{value:"state",id:"state",level:4},{value:"reducers",id:"reducers",level:4},{value:"effects",id:"effects",level:4},{value:"Model \u4e4b\u95f4\u901a\u4fe1",id:"model-\u4e4b\u95f4\u901a\u4fe1",level:3},{value:"\u4f7f\u7528\u4e0d\u53ef\u53d8\u72b6\u6001",id:"\u4f7f\u7528\u4e0d\u53ef\u53d8\u72b6\u6001",level:3},{value:"\u83b7\u53d6\u5185\u7f6e\u7684\u52a0\u8f7d\u72b6\u6001\u548c\u9519\u8bef\u72b6\u6001",id:"\u83b7\u53d6\u5185\u7f6e\u7684\u52a0\u8f7d\u72b6\u6001\u548c\u9519\u8bef\u72b6\u6001",level:3},{value:"\u9875\u9762\u5207\u6362\u540e\u91cd\u7f6e\u72b6\u6001",id:"\u9875\u9762\u5207\u6362\u540e\u91cd\u7f6e\u72b6\u6001",level:3},{value:"\u5728 Class Component \u4e2d\u4f7f\u7528",id:"\u5728-class-component-\u4e2d\u4f7f\u7528",level:3},{value:"Redux Devtools",id:"redux-devtools",level:3}],d={toc:u};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"icejs \u57fa\u4e8e ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ice-lab/icestore"},"icestore")," \uff0c\u63d0\u4f9b\u4e3b\u6d41\u7684\u72b6\u6001\u7ba1\u7406\u89e3\u51b3\u65b9\u6848\uff0c\u4ee5\u66f4\u597d\u7ba1\u7406\u590d\u6742\u7684\u72b6\u6001\u7ba1\u7406\u903b\u8f91\u3002"),(0,r.kt)("details",null,(0,r.kt)("summary",null,"\u793a\u4f8b"),(0,r.kt)("ul",null,(0,r.kt)("li",null,(0,r.kt)("a",{href:"https://github.com/ice-lab/ice-next/tree/master/examples/with-store",target:"_blank",rel:"noopener noreferrer"},"with-store")))),(0,r.kt)("h2",{id:"\u5f00\u542f\u72b6\u6001\u7ba1\u7406"},"\u5f00\u542f\u72b6\u6001\u7ba1\u7406"),(0,r.kt)("p",null,"\u5b89\u88c5\u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm i @ice/plugin-store -D\n")),(0,r.kt)("p",null,"\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"ice.config.mts")," \u4e2d\u6dfb\u52a0\u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="ice.config.mts"',title:'"ice.config.mts"'},"import { defineConfig } from '@ice/app';\nimport store from '@ice/plugin-store';\n\nexport default defineConfig({\n  plugins: [\n    store(),\n  ],\n});\n")),(0,r.kt)("h2",{id:"\u5168\u5c40\u72b6\u6001"},"\u5168\u5c40\u72b6\u6001"),(0,r.kt)("p",null,"\u63a8\u8350\u5728\u4e0d\u540c\u9875\u9762\u7ec4\u4ef6\u4e2d\u5171\u4eab\u7684\u72b6\u6001\u5b58\u653e\u5728\u5168\u5c40\u72b6\u6001\u4e2d\uff0c\u6bd4\u5982\u4e3b\u9898\u3001\u56fd\u9645\u5316\u8bed\u8a00\u3001\u7528\u6237\u4fe1\u606f\u7b49\u3002"),(0,r.kt)("h3",{id:"\u5b9a\u4e49-model"},"\u5b9a\u4e49 Model"),(0,r.kt)("p",null,"\u7ea6\u5b9a\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"src/models")," \u76ee\u5f55\u5b9a\u4e49\u5168\u5c40\u72b6\u6001\u3002\u4ee5\u5b9a\u4e49\u5168\u5c40\u7528\u6237\u72b6\u6001\u4e3a\u4f8b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/models/user.ts"',title:'"src/models/user.ts"'},"import { createModel } from 'ice';\n\ninterface User {\n  name: string;\n  id: string;\n}\n\nexport default createModel({\n  // \u5b9a\u4e49  model \u7684\u521d\u59cb state\n  state: {\n    name: '',\n    id: '',\n  } as User,\n  // \u5b9a\u4e49\u6539\u53d8\u8be5 model \u72b6\u6001\u7684\u7eaf\u51fd\u6570\n  reducers: {\n    update(state, payload) {\n      return {\n        ...state,\n        ...payload,\n      };\n    },\n  },\n  // \u5b9a\u4e49\u5904\u7406\u8be5 model \u526f\u4f5c\u7528\u7684\u51fd\u6570\n  effects: (dispatch) => ({\n    async getUserInfo() {\n      await delay(1000);\n      this.update({\n        name: 'taobao',\n        id: '123',\n      });\n    },\n  }),\n})\n")),(0,r.kt)("h3",{id:"\u521d\u59cb\u5316-store"},"\u521d\u59cb\u5316 Store"),(0,r.kt)("p",null,"\u7ea6\u5b9a\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"src/store.ts")," \u4e2d\u521d\u59cb\u5316 Store\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/store.ts"',title:'"src/store.ts"'},"import { createStore } from 'ice';\nimport user from './models/user';\n\nexport default createStore({ user });\n")),(0,r.kt)("h3",{id:"\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528"},"\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"import { useEffect } from 'react';\n+ import store from '@/store';\n\nexport default function Home() {\n+ const [userState, userDispatchers] = store.useModel('user');\n\n+ useEffect(() => {\n+   // \u89e6\u53d1 dispatcher \u83b7\u53d6\u6570\u636e\u5e76\u4fee\u6539 state\n+   userDispatchers.getUserInfo()\n+ }, [])\n  return (\n    <>\n+     <span>{userState.id}</span>\n+     <span>{userState.name}</span>\n    </>\n  );\n}\n")),(0,r.kt)("h2",{id:"\u9875\u9762\u72b6\u6001"},"\u9875\u9762\u72b6\u6001"),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"\u9875\u9762\u72b6\u6001\u53ea\u80fd\u5728\u8be5\u9875\u9762\u4e0b\u7684\u7ec4\u4ef6\u4e2d\u4f7f\u7528\uff0c\u65e0\u6cd5\u8de8\u9875\u9762\u4f7f\u7528\u3002")),(0,r.kt)("h3",{id:"\u5b9a\u4e49-model-1"},"\u5b9a\u4e49 Model"),(0,r.kt)("p",null,"\u7ea6\u5b9a\u5728\u5f53\u524d\u8def\u7531\u76ee\u5f55\u4e0b\u65b0\u5efa models \u76ee\u5f55\u5e76\u5b9a\u4e49 Model\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"}," src\n \u2514\u2500\u2500 pages\n |   \u251c\u2500\u2500 home                // /home \u9875\u9762\n+|   \u2502   \u251c\u2500\u2500 models          // \u5b9a\u4e49 model\n+|   \u2502   |   \u2514\u2500\u2500 info.ts\n |   \u2502   \u2514\u2500\u2500 index.tsx\n")),(0,r.kt)("p",null,"\u5b9a\u4e49 Model \u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/pages/home/models/info.ts"',title:'"src/pages/home/models/info.ts"'},"import { createModel } from 'ice';\n\nexport default createModel({\n  state: {\n    title: '',\n  },\n  reducers: {\n    update(state, payload) {\n      return {\n        ...state,\n        ...payload,\n      };\n    },\n  },\n});\n")),(0,r.kt)("h3",{id:"\u521d\u59cb\u5316-store-1"},"\u521d\u59cb\u5316 Store"),(0,r.kt)("p",null,"\u7ea6\u5b9a\u5728\u5f53\u524d\u8def\u7531\u76ee\u5f55\u4e0b\u65b0\u5efa store \u6587\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"}," src\n \u2514\u2500\u2500 pages\n |   \u251c\u2500\u2500 home                // /home \u9875\u9762\n |   \u2502   \u251c\u2500\u2500 models          // \u5b9a\u4e49 model\n |   \u2502   |   \u2514\u2500\u2500 info.ts\n+|   \u2502   \u251c\u2500\u2500 store.ts       // \u521b\u5efa store\n |   \u2502   \u2514\u2500\u2500 index.tsx\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/pages/home/store.ts"',title:'"src/pages/home/store.ts"'},"import { createStore } from 'ice';\nimport info from './models/info';\n\nconst store = createStore({ info });\n\nexport default store;\n")),(0,r.kt)("h3",{id:"\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528-1"},"\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff",metastring:'title="src/pages/home/index.tsx"',title:'"src/pages/home/index.tsx"'},"import { useEffect } from 'react';\n+ import homeStore from './store';\n\nexport default function Home() {\n+ const [infoState, infoDispatchers] = homeStore.useModel('info');\n\n+ useEffect(() => {\n+   infoDispatchers.update({ title: 'ICE' })\n+ }, [])\n  return (\n+   <h1>{infoState.title}</h1>\n  );\n};\n")),(0,r.kt)("h2",{id:"\u8fdb\u9636\u7528\u6cd5"},"\u8fdb\u9636\u7528\u6cd5"),(0,r.kt)("h3",{id:"\u8bbe\u7f6e\u521d\u59cb\u72b6\u6001"},"\u8bbe\u7f6e\u521d\u59cb\u72b6\u6001"),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"\u9875\u9762\u7ea7\u72b6\u6001\u76ee\u524d\u4e0d\u652f\u6301\u8bbe\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"initialStates"),"\u3002")),(0,r.kt)("p",null,"\u5047\u8bbe\u6211\u4eec\u6709 ",(0,r.kt)("inlineCode",{parentName:"p"},"user")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"counter")," \u4e24\u4e2a Model\uff1a"),(0,r.kt)(s.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"store",label:"src/store.ts",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { createStore } from 'ice';\nimport user from './models/user';\nimport counter from './models/counter';\n\nexport default createStore({ user, counter });\n"))),(0,r.kt)(o.Z,{value:"user",label:"src/models/user.ts",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { createModel } from 'ice';\n\nexport default createModel({ \n  state: {\n    name: '',\n  }\n});\n"))),(0,r.kt)(o.Z,{value:"counter",label:"src/models/counter.ts",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { createModel } from 'ice';\n\nexport default createModel({ \n  state: {\n    count: 0,\n  }\n});\n")))),(0,r.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"src/app.ts")," \u4e2d\u8bbe\u7f6e\u4e24\u4e2a Model \u521d\u59cb\u72b6\u6001\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/app.ts"',title:'"src/app.ts"'},"import { defineStoreConfig } from '@ice/plugin-store/esm/runtime';\n\nexport const store = defineStoreConfig(async () => {\n  // \u6a21\u62df\u8bf7\u6c42\u540e\u7aef\u6570\u636e\n  // const data = (await fetch('your-url')).json();\n  return {\n    initialStates: {\n      // initialStates \u952e\u503c\u4e0e createStore \u7684\u7b2c\u4e00\u4e2a\u5165\u53c2\u952e\u503c\u4fdd\u6301\u4e00\u81f4\n      user: {\n        name: 'icejs',\n      },\n      counter: {\n        count: 1\n      }\n    },\n  };\n});\n")),(0,r.kt)("h3",{id:"model-\u5b9a\u4e49\u8be6\u7ec6\u8bf4\u660e"},"Model \u5b9a\u4e49\u8be6\u7ec6\u8bf4\u660e"),(0,r.kt)("p",null,"\u63d2\u4ef6\u7ea6\u5b9a\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"src/models"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"src/pages/**/models")," \u76ee\u5f55\u4e0b\u7684\u6587\u4ef6\u4e3a\u9879\u76ee\u5b9a\u4e49\u7684 model \u6587\u4ef6\uff0c\u6bcf\u4e2a\u6587\u4ef6\u9700\u8981\u9ed8\u8ba4\u5bfc\u51fa\u4e00\u4e2a\u5bf9\u8c61\u3002"),(0,r.kt)("h4",{id:"state"},"state"),(0,r.kt)("p",null,"\u5b9a\u4e49 Model \u7684\u521d\u59cb state\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { createModel } from 'ice';\n\nexport default createModel({\n state: { count: 0 },\n})\n")),(0,r.kt)("h4",{id:"reducers"},"reducers"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"type Reducers = { \n  [k: string]: (state, payload) => any;\n};\n")),(0,r.kt)("p",null,"\u4e00\u4e2a\u6539\u53d8\u8be5\u6a21\u578b\u72b6\u6001\u7684\u51fd\u6570\u96c6\u5408\u3002\u8fd9\u4e9b\u65b9\u6cd5\u4ee5\u6a21\u578b\u7684\u4e0a\u4e00\u6b21 ",(0,r.kt)("inlineCode",{parentName:"p"},"state")," \u548c\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"payload"),"\uff08\u8c03\u7528 reducer \u65f6\u4f20\u5165\u7684\u53c2\u6570\uff09\u4f5c\u4e3a\u5165\u53c2\uff0c\u5728\u65b9\u6cd5\u4e2d\u4f7f\u7528\u53ef\u53d8\u7684\u65b9\u5f0f\u6765\u66f4\u65b0\u72b6\u6001\u3002 \u8fd9\u4e9b\u65b9\u6cd5\u5e94\u8be5\u662f\u4ec5\u4f9d\u8d56\u4e8e ",(0,r.kt)("inlineCode",{parentName:"p"},"state")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"payload")," \u53c2\u6570\u6765\u8ba1\u7b97\u4e0b\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"state")," \u7684\u7eaf\u51fd\u6570\u3002\u5bf9\u4e8e\u6709\u526f\u4f5c\u7528\u7684\u51fd\u6570\uff0c\u8bf7\u4f7f\u7528 ",(0,r.kt)("a",{parentName:"p",href:"#effects"},(0,r.kt)("inlineCode",{parentName:"a"},"effects"))," \u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { createModel } from 'ice';\n\nexport default ({\n  state: { count: 0, list: [] },\n\n  reducers: {\n    increment (state, payload) {\n      const newList = state.list.slice();\n      newList.push(payload);\n      const newCount = state.count + 1;\n      return { ...state, count: newCount, list: newList }\n    },\n    decrement (state) {\n      return { ...state, count: state.count - 1 }\n    }\n  }\n}\n")),(0,r.kt)("h4",{id:"effects"},"effects"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"type Effects = (dispatch) => ({ [string]: (payload, rootState) => void })\n")),(0,r.kt)("p",null,"\u4e00\u4e2a\u53ef\u4ee5\u5904\u7406\u8be5\u6a21\u578b\u526f\u4f5c\u7528\u7684\u51fd\u6570\u96c6\u5408\u3002\u8fd9\u4e9b\u65b9\u6cd5\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"p"},"payload")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"rootState"),"\uff08\u5f53\u524d\u6a21\u578b\u7684 state\uff09 \u4f5c\u4e3a\u5165\u53c2\uff0c\u9002\u7528\u4e8e\u8fdb\u884c\u5f02\u6b65\u8c03\u7528\u3001\u6a21\u578b\u8054\u52a8\u7b49\u573a\u666f\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { createModel } from 'ice';\n\nexport default createModel({\n  reducers: {\n    increment() {\n      // ...\n    }\n  },\n  effects: (dispatch) => ({\n    async asyncDecrement() {\n      const list = (await fetch('your-url')).json();  // \u8fdb\u884c\u4e00\u4e9b\u5f02\u6b65\u64cd\u4f5c\n      this.increment(list);                               // \u8c03\u7528\u6a21\u578b reducers \u5185\u7684\u65b9\u6cd5\u6765\u66f4\u65b0\u72b6\u6001\n    },\n  }),\n})\n")),(0,r.kt)("h3",{id:"model-\u4e4b\u95f4\u901a\u4fe1"},"Model \u4e4b\u95f4\u901a\u4fe1"),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"\u5982\u679c\u4e24\u4e2a Model \u4e0d\u5c5e\u4e8e\u540c\u4e00\u4e2a Store \u5b9e\u4f8b\uff0c\u662f\u65e0\u6cd5\u901a\u4fe1\u7684")),(0,r.kt)(s.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"user",label:"src/models/user.ts",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// src/models/user.ts\nimport { createModel } from 'ice';\n\nexport default createModel({\n  state: {\n    name: '',\n    tasks: 0,\n  },\n  effects: () => ({\n    async refresh() {\n      const data = (await fetch('/user')).json();\n      // \u901a\u8fc7 this.foo \u8c03\u7528\u81ea\u8eab\u7684 reducer\n      this.setState(data);\n    },\n  }),\n});\n"))),(0,r.kt)(o.Z,{value:"task",label:"src/models/tasks.ts",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// src/models/tasks.ts\nexport default {\n  state: [],\n  effects: (dispatch) => ({\n    async refresh() {\n      const data = await fetch('/tasks');\n      this.setState(data);\n    },\n    async add(task) {\n      await fetch('/tasks/add', task);\n      // \u8c03\u7528\u53e6\u4e00\u4e2a model user \u7684 effects\n      await dispatch.user.refresh();\n      // \u901a\u8fc7 this.foo \u8c03\u7528\u81ea\u8eab\u7684 effects\n      await this.refresh();\n    },\n  }),\n};\n")))),(0,r.kt)("h3",{id:"\u4f7f\u7528\u4e0d\u53ef\u53d8\u72b6\u6001"},"\u4f7f\u7528\u4e0d\u53ef\u53d8\u72b6\u6001"),(0,r.kt)("p",null,"Redux \u9ed8\u8ba4\u7684\u51fd\u6570\u5f0f\u5199\u6cd5\u5728\u5904\u7406\u4e00\u4e9b\u590d\u6742\u5bf9\u8c61\u7684 state \u65f6\u4f1a\u975e\u5e38\u7e41\u7410\u3002\u63a8\u8350\u4f7f\u7528 ",(0,r.kt)("a",{parentName:"p",href:"https://immerjs.github.io/immer/"},"immer")," \u7684\u65b9\u5f0f\u6765\u64cd\u4f5c state\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"import { createModel } from 'ice';\n\nexport default createModel({\n  state: {\n    tasks: ['A Task', 'B Task'],\n    detail: {\n      name: 'Bob',\n      age: 3,\n    },\n  },\n  reducers: {\n    addTasks(state, payload) {\n-     return {\n-       ...state,\n-       tasks: [ ...state.tasks, payload ],\n-     },\n+     state.tasks.push(payload);\n    },\n    updateAge(state, payload) {\n-     return {\n-       ...state,\n-       detail: {\n-         ...state.detail,\n-         age: payload,\n-       },\n-     },\n+     state.detail.age = payload;\n    }\n  }\n})\n")),(0,r.kt)("p",null,"\u6ce8\u610f\uff1a\u56e0\u4e3a immer \u65e0\u6cd5\u652f\u6301\u5b57\u7b26\u4e32\u6216\u6570\u5b57\u8fd9\u6837\u7684\u7b80\u5355\u7c7b\u578b\uff0c\u56e0\u6b64\u5982\u679c state \u7b26\u5408\u8fd9\u79cd\u60c5\u51b5\uff08\u6781\u5c11\u6570\uff09\u5219\u4e0d\u652f\u6301\u901a\u8fc7 immer \u64cd\u4f5c\uff0c\u5fc5\u987b\u4f7f\u7528 Redux \u9ed8\u8ba4\u7684\u51fd\u6570\u5f0f\u5199\u6cd5\uff08\u8fd4\u56de\u4e00\u4e2a\u65b0\u503c\uff09\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"import { createModel } from 'ice';\n\nexport default createModel({\n  state: 0,\n  reducers: {\n    add(state) {\n-     state += 1;\n+     return state += 1;\n    },\n  },\n})\n")),(0,r.kt)("h3",{id:"\u83b7\u53d6\u5185\u7f6e\u7684\u52a0\u8f7d\u72b6\u6001\u548c\u9519\u8bef\u72b6\u6001"},"\u83b7\u53d6\u5185\u7f6e\u7684\u52a0\u8f7d\u72b6\u6001\u548c\u9519\u8bef\u72b6\u6001"),(0,r.kt)("p",null,"\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"useModelEffectsState")," API \u5373\u53ef\u83b7\u53d6\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},"effects")," \u7684 \u52a0\u8f7d\u72b6\u6001\uff08 ",(0,r.kt)("inlineCode",{parentName:"p"},"isLoading")," \uff09\u548c \u9519\u8bef\u72b6\u6001\uff08",(0,r.kt)("inlineCode",{parentName:"p"},"error"),"\uff09\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"import store from '@/store';\n\nfunction FunctionComponent() {\n  const [state, dispatchers] = store.useModel('counter');\n+  const effectsState = store.useModelEffectsState('counter');\n\n  useEffect(() => {\n    dispatchers.asyncDecrement();\n  }, []);\n\n+  console.log(effectsState.asyncDecrement.isLoading); // true\n+  console.log(effectsState.asyncDecrement.error);  // null\n}\n")),(0,r.kt)("h3",{id:"\u9875\u9762\u5207\u6362\u540e\u91cd\u7f6e\u72b6\u6001"},"\u9875\u9762\u5207\u6362\u540e\u91cd\u7f6e\u72b6\u6001"),(0,r.kt)("p",null,"\u5728\u5355\u9875\u5e94\u7528\u4e0b\u8fdb\u884c\u9875\u9762\u5207\u6362\u65f6\uff0c\u9875\u9762\u72b6\u6001\u662f\u4f1a\u4fdd\u7559\u7684\u3002\u5982\u679c\u60f3\u5207\u6362\u9875\u9762\u540e\u518d\u6b21\u8fdb\u5165\u539f\u9875\u9762\u65f6\u91cd\u65b0\u521d\u59cb\u5316\u9875\u9762\u72b6\u6001\uff0c\u9700\u8981\u6dfb\u52a0\u4ee5\u4e0b\u914d\u7f6e\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff",metastring:'title="ice.config.mts"',title:'"ice.config.mts"'},"import { defineConfig } from '@ice/app';\nimport store from '@ice/plugin-store';\n\nexport default defineConfig({\n  plugins: [\n-   store(),\n+   store({ resetPageState: true }),\n  ],\n});\n")),(0,r.kt)("h3",{id:"\u5728-class-component-\u4e2d\u4f7f\u7528"},"\u5728 Class Component \u4e2d\u4f7f\u7528"),(0,r.kt)("p",null,"\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"withModel")," \u53ef\u4ee5\u5b9e\u73b0\u5728 Class Component \u4e2d\u4f7f\u7528\u72b6\u6001\u7ba1\u7406\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import store from '@/store';\n\n@store.withModel('todos')\nexport default class TodoList extends React.Component {\n  render() {\n    const { todos } = this.props;\n    const [state, dispatchers] = todos;\n    console.log('state: ', state);\n    // ...\n  }\n}\n")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"TS \u5e94\u7528\u9700\u8981\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," \u91cc\u6dfb\u52a0 ",(0,r.kt)("inlineCode",{parentName:"p"},'compilerOptions: { "experimentalDecorators": true }'),"\n\u624d\u53ef\u542f\u7528\u88c5\u9970\u5668\u8bed\u6cd5\u3002")),(0,r.kt)("h3",{id:"redux-devtools"},"Redux Devtools"),(0,r.kt)("p",null,"\u63d2\u4ef6\u4e2d\u9ed8\u8ba4\u96c6\u6210\u4e86 Redux Devtools\uff0c\u4e0d\u9700\u8981\u989d\u5916\u7684\u914d\u7f6e\u5c31\u53ef\u4ee5\u5728 Redux Devtools \u8c03\u8bd5\uff1a"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://img.alicdn.com/tfs/TB1wK4nqypE_u4jSZKbXXbCUVXa-1918-430.png",alt:null})),(0,r.kt)("p",null,"\u5982\u679c\u9700\u8981\u5b9a\u4e49 Devtools \u7684\u53c2\u6570\uff0c\u53ef\u4ee5\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"createStore")," \u7684 options \u5165\u53c2\u4e2d\u914d\u7f6e\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"createStore({ user }, {\n  redux: {\n    devtoolOptions: {\n      // \u66f4\u591a\u914d\u7f6e\u53c2\u8003\uff1ahttps://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md\n    }\n  }\n})\n")))}m.isMDXComponent=!0}}]);