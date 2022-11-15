"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[34],{4852:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(9231);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),u=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(o,".").concat(m)]||d[m]||c[m]||s;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<s;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1514:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var r=n(2203),a=(n(9231),n(4852));const s={},i="\u7f51\u7edc\u8bf7\u6c42",l={unversionedId:"guide/advanced/request",id:"guide/advanced/request",title:"\u7f51\u7edc\u8bf7\u6c42",description:"\u5c0f\u7a0b\u5e8f\u7aef\u4e0d\u652f\u6301\u8be5\u80fd\u529b\u3002",source:"@site/docs/guide/advanced/request.md",sourceDirName:"guide/advanced",slug:"/guide/advanced/request",permalink:"/docs/guide/advanced/request",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/advanced/request.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Keep Alive",permalink:"/docs/guide/advanced/keep-alive"},next:{title:"\u72b6\u6001\u7ba1\u7406",permalink:"/docs/guide/advanced/store"}},o={},u=[{value:"\u5b89\u88c5 request \u63d2\u4ef6",id:"\u5b89\u88c5-request-\u63d2\u4ef6",level:2},{value:"\u76ee\u5f55\u7ea6\u5b9a",id:"\u76ee\u5f55\u7ea6\u5b9a",level:2},{value:"\u6d88\u8d39 service",id:"\u6d88\u8d39-service",level:2},{value:"\u5728\u6a21\u578b\u4e2d\u8c03\u7528 service",id:"\u5728\u6a21\u578b\u4e2d\u8c03\u7528-service",level:3},{value:"\u5728\u89c6\u56fe\u4e2d\u8c03\u7528 service",id:"\u5728\u89c6\u56fe\u4e2d\u8c03\u7528-service",level:3},{value:"API",id:"api",level:2},{value:"request",id:"request",level:3},{value:"useRequest",id:"userequest",level:3},{value:"API",id:"api-1",level:4},{value:"\u5e38\u7528\u4f7f\u7528\u65b9\u5f0f",id:"\u5e38\u7528\u4f7f\u7528\u65b9\u5f0f",level:4},{value:"\u8bf7\u6c42\u914d\u7f6e",id:"\u8bf7\u6c42\u914d\u7f6e",level:3},{value:"\u591a\u4e2a\u8bf7\u6c42\u914d\u7f6e",id:"\u591a\u4e2a\u8bf7\u6c42\u914d\u7f6e",level:3},{value:"\u5f02\u5e38\u5904\u7406",id:"\u5f02\u5e38\u5904\u7406",level:2},{value:"\u9ad8\u9636\u7528\u6cd5",id:"\u9ad8\u9636\u7528\u6cd5",level:2},{value:"Mock \u63a5\u53e3",id:"mock-\u63a5\u53e3",level:3},{value:"\u5982\u4f55\u89e3\u51b3\u63a5\u53e3\u8de8\u57df\u95ee\u9898",id:"\u5982\u4f55\u89e3\u51b3\u63a5\u53e3\u8de8\u57df\u95ee\u9898",level:3},{value:"\u6839\u636e\u73af\u5883\u914d\u7f6e\u4e0d\u540c\u7684 baseURL",id:"\u6839\u636e\u73af\u5883\u914d\u7f6e\u4e0d\u540c\u7684-baseurl",level:3}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u7f51\u7edc\u8bf7\u6c42"},"\u7f51\u7edc\u8bf7\u6c42"),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"\u5c0f\u7a0b\u5e8f\u7aef\u4e0d\u652f\u6301\u8be5\u80fd\u529b\u3002")),(0,a.kt)("p",null,"\u5927\u90e8\u5206\u524d\u7aef\u5e94\u7528\u90fd\u4f1a\u9009\u62e9\u901a\u8fc7 HTTP(s) \u534f\u8bae\u4e0e\u540e\u7aef\u670d\u52a1\u901a\u8baf\u3002",(0,a.kt)("br",{parentName:"p"}),"\n","ice.js \u63d0\u4f9b\u4e86\u4e00\u5957\u4ece UI \u4ea4\u4e92\u5230\u8bf7\u6c42\u670d\u52a1\u7aef\u6570\u636e\u7684\u5b8c\u6574\u65b9\u6848\uff0c\u901a\u8fc7\u5207\u9762\u7f16\u7a0b\u7684\u65b9\u5f0f\u7edf\u4e00\u4e86\u6570\u636e\u8bf7\u6c42\u7ba1\u7406\uff0c\u7b80\u5316\u4e86\u8bbe\u7f6e\u53c2\u6570\u3001\u9519\u8bef\u5904\u7406\u7b49\u903b\u8f91\u7684\u5b9e\u73b0\u3002"),(0,a.kt)("h2",{id:"\u5b89\u88c5-request-\u63d2\u4ef6"},"\u5b89\u88c5 ",(0,a.kt)("a",{parentName:"h2",href:"https://www.npmjs.com/@ice/plugin-request"},"request \u63d2\u4ef6")),(0,a.kt)("p",null,"\u7f51\u7edc\u8bf7\u6c42\u662f\u53ef\u9009\u80fd\u529b\uff0c\u5728\u4f7f\u7528\u524d\u9700\u8981\u5355\u72ec\u5b89\u88c5 ",(0,a.kt)("inlineCode",{parentName:"p"},"@ice/plugin-request")," \u63d2\u4ef6\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm i @ice/plugin-request -D\n")),(0,a.kt)("p",null,"\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u6dfb\u52a0\u63d2\u4ef6\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="ice.config.mts"',title:'"ice.config.mts"'},"import { defineConfig } from '@ice/app';\nimport request from '@ice/plugin-request';\n\nexport default defineConfig(() => ({\n  plugins: [\n    request(),\n  ],\n}));\n")),(0,a.kt)("h2",{id:"\u76ee\u5f55\u7ea6\u5b9a"},"\u76ee\u5f55\u7ea6\u5b9a"),(0,a.kt)("p",null,"\u6846\u67b6\u7ea6\u5b9a ",(0,a.kt)("inlineCode",{parentName:"p"},"service")," \u76ee\u5f55\u7528\u4e8e\u6536\u655b\u8bf7\u6c42\u903b\u8f91\uff0c\u76ee\u5f55\u7ec4\u7ec7\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-diff"}," src\n \u251c\u2500\u2500 models\n+\u251c\u2500\u2500 services                       // \u5b9a\u4e49\u5168\u5c40\u6570\u636e\u8bf7\u6c42\uff0c\u975e\u5fc5\u987b\n+\u2502   \u2514\u2500\u2500 user.ts\n \u2514\u2500\u2500 pages\n |   \u251c\u2500\u2500 home\n |   \u2502   \u251c\u2500\u2500 models\n+|   \u2502   \u251c\u2500\u2500 services               // \u5b9a\u4e49\u9875\u9762\u7ea7\u6570\u636e\u8bf7\u6c42\n+|   \u2502   |    \u2514\u2500\u2500 repo.ts\n |   \u2502   \u2514\u2500\u2500 components\n |   \u251c\u2500\u2500 about\n |   \u2502   \u251c\u2500\u2500 services\n |   \u2502   \u251c\u2500\u2500 components\n |   \u2502   \u2514\u2500\u2500 index.tsx\n \u2514\u2500\u2500 app.ts\n")),(0,a.kt)("p",null,"\u901a\u8fc7\u8c03\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"request")," \u5b9a\u4e49\u6570\u636e\u8bf7\u6c42\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="pages/home/service/repo.ts"',title:'"pages/home/service/repo.ts"'},"import { request } from 'ice';\n\nexport default {\n  // \u7b80\u5355\u573a\u666f\n  async getUser() {\n    return await request('/api/user');\n  },\n\n  // \u53c2\u6570\u573a\u666f\n  async getRepo(id) {\n    return await request(`/api/repo/${id}`);\n  },\n\n  // \u683c\u5f0f\u5316\u8fd4\u56de\u503c\n  async getDetail(params) {\n    const data = await request({\n      url: `/api/detail`,\n      params\n    });\n\n    return data.map(item => {\n      return {\n        ...item,\n        price: item.oldPrice,\n        text: item.status === '1' ? '\u786e\u5b9a' : '\u53d6\u6d88'\n      };\n    });\n  }\n}\n")),(0,a.kt)("h2",{id:"\u6d88\u8d39-service"},"\u6d88\u8d39 service"),(0,a.kt)("p",null,"\u6d88\u8d39 service \u4e3b\u8981\u6709\u4e24\u79cd\u65b9\u5f0f\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5728\u6a21\u578b\u4e2d\u8c03\u7528 service\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"service")," -> ",(0,a.kt)("inlineCode",{parentName:"li"},"model")," -> ",(0,a.kt)("inlineCode",{parentName:"li"},"view")),(0,a.kt)("li",{parentName:"ul"},"\u5728\u89c6\u56fe\u4e2d\u8c03\u7528 service\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"service")," -> ",(0,a.kt)("inlineCode",{parentName:"li"},"view"))),(0,a.kt)("h3",{id:"\u5728\u6a21\u578b\u4e2d\u8c03\u7528-service"},"\u5728\u6a21\u578b\u4e2d\u8c03\u7528 service"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u7ed3\u5408 ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/advanced/store"},"\u72b6\u6001\u7ba1\u7406")," \u4f7f\u7528")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"service"),"\uff1a\u7ea6\u5b9a\u6570\u636e\u8bf7\u6c42\u7edf\u4e00\u7ba1\u7406\u5728 services \u76ee\u5f55\u4e0b\uff1b"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"model"),"\uff1a\u7ea6\u5b9a\u6570\u636e\u8bf7\u6c42\u7edf\u4e00\u5728 models \u91cc\u8fdb\u884c\u8c03\u7528\uff1b"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"view"),"\uff1a\u6700\u7ec8\u5728\u89c6\u56fe\u91cc\u901a\u8fc7\u8c03\u7528 models \u7684 effects \u7684\u65b9\u6cd5\u89e6\u53d1\u6570\u636e\u8bf7\u6c42\u3002")),(0,a.kt)("p",null,"\u5728\u6a21\u578b\u4e2d\u8c03\u7528\u5b9a\u4e49\u597d\u7684 service\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import userService from '@/services/user';\n\n// src/models/user.ts\nexport default {\n  state: {\n    name: 'taoxiaobao',\n    age: 20,\n  },\n  reducers: {\n    update(prevState, payload) {\n      return { ...prevState, ...payload };\n    },\n  },\n  effects: (dispatch) => ({\n    async fetchUserInfo() {\n      const data = await userService.getUser();\n      dispatch.user.update(data);\n    },\n  }),\n};\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5728\u89c6\u56fe\u4e2d\u8c03\u7528\u6a21\u578b\u65b9\u6cd5\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import React, { useEffect } from 'react';\nimport store from '@/store';\n\nconst HomePage = () => {\n  // \u8c03\u7528\u5b9a\u4e49\u7684 user \u6a21\u578b\n  const [userState, userDispatchers] = store.useModel('user');\n\n  useEffect(() => {\n    // \u8c03\u7528 user \u6a21\u578b\u4e2d\u7684 fetchUserInfo \u65b9\u6cd5\n    userDispatchers.fetchUserInfo();\n  }, []);\n\n  return <>Home</>;\n};\n")),(0,a.kt)("h3",{id:"\u5728\u89c6\u56fe\u4e2d\u8c03\u7528-service"},"\u5728\u89c6\u56fe\u4e2d\u8c03\u7528 service"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"service"),"\uff1a\u7ea6\u5b9a\u6570\u636e\u8bf7\u6c42\u7edf\u4e00\u7ba1\u7406\u5728 services \u76ee\u5f55\u4e0b\uff1b"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"view"),"\uff1a\u6700\u7ec8\u5728\u89c6\u56fe\u91cc\u901a\u8fc7 useRequest \u76f4\u63a5\u8c03\u7528 service \u89e6\u53d1\u6570\u636e\u8bf7\u6c42\u3002")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import React, { useEffect } from 'react';\nimport { useRequest } from 'ice';\nimport userService from '@/services/user';\n\nexport default function HomePage() {\n  // \u8c03\u7528 service\n  const { data, error, loading, request } = useRequest(userService.getUser);\n\n  useEffect(() => {\n    // \u89e6\u53d1\u6570\u636e\u8bf7\u6c42\n    request();\n  }, []);\n\n  return <>Home</>;\n}\n")),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("h3",{id:"request"},"request"),(0,a.kt)("p",null,"request \u57fa\u4e8e axios \u8fdb\u884c\u5c01\u88c5\uff0c\u5728\u4f7f\u7528\u4e0a\u6574\u4f53\u4e0e axios \u4fdd\u6301\u4e00\u81f4\uff0c\u5dee\u5f02\u70b9\uff1a"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u9ed8\u8ba4\u53ea\u8fd4\u56de\u670d\u52a1\u7aef\u54cd\u5e94\u7684\u6570\u636e ",(0,a.kt)("inlineCode",{parentName:"li"},"Response.data"),"\uff0c\u800c\u4e0d\u662f\u6574\u4e2a Response\uff0c\u5982\u9700\u8fd4\u56de\u6574\u4e2a Response \u8bf7\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"li"},"withFullResponse")," \u53c2\u6570\u5f00\u542f"),(0,a.kt)("li",{parentName:"ol"},"\u5728 axios \u57fa\u7840\u4e0a\u9ed8\u8ba4\u652f\u6301\u4e86\u591a\u8bf7\u6c42\u5b9e\u4f8b\u7684\u80fd\u529b")),(0,a.kt)("p",null,"\u4f7f\u7528\u65b9\u5f0f\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { request } from 'ice';\n\nasync function getList() {\n  const resData = await request({\n    url: '/api/user',\n  });\n  console.log(resData.list);\n\n  const { status, statusText, data } = await request({\n    url: '/api/user',\n    withFullResponse: true\n  });\n  console.log(data.list);\n}\n")),(0,a.kt)("p",null,"\u5e38\u7528\u4f7f\u7528\u65b9\u5f0f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"request(RequestConfig);\n\nrequest.get('/user', RequestConfig);\nrequest.post('/user', data, RequestConfig);\n")),(0,a.kt)("p",null,"RequestConfig:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"{\n  // `url` is the server URL that will be used for the request\n  url: '/user',\n  // `method` is the request method to be used when making the request\n  method: 'get', // default\n  // `headers` are custom headers to be sent\n  headers: {'X-Requested-With': 'XMLHttpRequest'},\n  // `params` are the URL parameters to be sent with the request\n  // Must be a plain object or a URLSearchParams object\n  params: {\n    ID: 12345\n  },\n  // `data` is the data to be sent as the request body\n  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'\n  data: {\n    firstName: 'Fred'\n  },\n  // `timeout` specifies the number of milliseconds before the request times out.\n  // If the request takes longer than `timeout`, the request will be aborted.\n  timeout: 1000, // default is `0` (no timeout)\n  // `withCredentials` indicates whether or not cross-site Access-Control requests\n  // should be made using credentials\n  withCredentials: false, // default\n  // `responseType` indicates the type of data that the server will respond with\n  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'\n  responseType: 'json', // default\n  // should be made return full response\n  withFullResponse: false,\n  // request instance name\n  instanceName: 'request2'\n}\n")),(0,a.kt)("p",null,"\u66f4\u5b8c\u6574\u7684\u914d\u7f6e\u8bf7 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/axios/axios#request-config"},"\u53c2\u8003"),"\u3002"),(0,a.kt)("p",null,"\u8fd4\u56de\u5b8c\u6574 Response Scheme \u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"{\n  // `data` is the response that was provided by the server\n  data: {},\n\n  // `status` is the HTTP status code from the server response\n  status: 200,\n\n  // `statusText` is the HTTP status message from the server response\n  statusText: 'OK',\n\n  // `headers` the HTTP headers that the server responded with\n  // All header names are lower cased and can be accessed using the bracket notation.\n  // Example: `response.headers['content-type']`\n  headers: {},\n\n  // `config` is the config that was provided to `axios` for the request\n  config: {},\n\n  // `request` is the request that generated this response\n  // It is the last ClientRequest instance in node.js (in redirects)\n  // and an XMLHttpRequest instance in the browser\n  request: {}\n}\n")),(0,a.kt)("h3",{id:"userequest"},"useRequest"),(0,a.kt)("p",null,"\u4f7f\u7528 useRequest \u53ef\u4ee5\u6781\u5927\u7684\u7b80\u5316\u5bf9\u8bf7\u6c42\u72b6\u6001\u7684\u7ba1\u7406\uff0cuseRequest \u57fa\u4e8e ",(0,a.kt)("a",{parentName:"p",href:"https://ahooks.js.org/zh-CN/hooks/use-request/index"},"ahooks/useRequest")," \u5c01\u88c5\uff0c\u5dee\u5f02\u70b9\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5c06 ",(0,a.kt)("inlineCode",{parentName:"li"},"requestMethod")," \u53c2\u6570\u9ed8\u8ba4\u8bbe\u7f6e\u4e3a\u4e0a\u8ff0\u7684 ",(0,a.kt)("inlineCode",{parentName:"li"},"request"),"\uff08\u5373 axios\uff09\uff0c\u4fdd\u8bc1\u6846\u67b6\u4f7f\u7528\u7684\u4e00\u81f4\u6027"),(0,a.kt)("li",{parentName:"ul"},"manual \u53c2\u6570\u9ed8\u8ba4\u503c\u4ece ",(0,a.kt)("inlineCode",{parentName:"li"},"false")," \u6539\u4e3a ",(0,a.kt)("inlineCode",{parentName:"li"},"true"),"\uff0c\u56e0\u4e3a\u5b9e\u9645\u4e1a\u52a1\u66f4\u591a\u90fd\u662f\u8981\u624b\u52a8\u89e6\u53d1\u7684"),(0,a.kt)("li",{parentName:"ul"},"\u8fd4\u56de\u503c ",(0,a.kt)("inlineCode",{parentName:"li"},"run")," \u6539\u4e3a ",(0,a.kt)("inlineCode",{parentName:"li"},"request"),"\uff0c\u56e0\u4e3a\u66f4\u7b26\u5408\u8bed\u4e49")),(0,a.kt)("h4",{id:"api-1"},"API"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const {\n  // \u8bf7\u6c42\u8fd4\u56de\u7684\u6570\u636e\uff0c\u9ed8\u8ba4\u4e3a undefined\n  data,\n  // \u8bf7\u6c42\u629b\u51fa\u7684\u5f02\u5e38\uff0c\u9ed8\u8ba4\u4e3a undefined\n  error,\n  // \u8bf7\u6c42\u72b6\u6001\n  loading,\n  // \u624b\u52a8\u89e6\u53d1\u8bf7\u6c42\uff0c\u53c2\u6570\u4f1a\u4f20\u9012\u7ed9 service\n  request,\n  // \u5f53\u6b21\u6267\u884c\u8bf7\u6c42\u7684\u53c2\u6570\u6570\u7ec4\n  params,\n  // \u53d6\u6d88\u5f53\u524d\u8bf7\u6c42\uff0c\u5982\u679c\u6709\u8f6e\u8be2\uff0c\u505c\u6b62\n  cancel,\n  // \u4f7f\u7528\u4e0a\u4e00\u6b21\u7684 params\uff0c\u91cd\u65b0\u6267\u884c\u8bf7\u6c42\n  refresh,\n  // \u76f4\u63a5\u4fee\u6539 data\n  mutate,\n  // \u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u65b0\u8bf7\u6c42\u4f1a\u8986\u76d6\u65e7\u8bf7\u6c42\u3002\u5982\u679c\u8bbe\u7f6e\u4e86 fetchKey\uff0c\u5219\u53ef\u4ee5\u5b9e\u73b0\u591a\u4e2a\u8bf7\u6c42\u5e76\u884c\uff0cfetches \u5b58\u50a8\u4e86\u591a\u4e2a\u8bf7\u6c42\u7684\u72b6\u6001\n  fetches\n} = useRequest(service, {\n  // \u9ed8\u8ba4\u4e3a true \u5373\u9700\u8981\u624b\u52a8\u6267\u884c\u8bf7\u6c42\n  manual,\n   // \u521d\u59cb\u5316\u7684 data\n  initialData,\n  // \u8bf7\u6c42\u6210\u529f\u65f6\u89e6\u53d1\uff0c\u53c2\u6570\u4e3a data \u548c params\n  onSuccess,\n  // \u8bf7\u6c42\u62a5\u9519\u65f6\u89e6\u53d1\uff0c\u53c2\u6570\u4e3a error \u548c params\n  onError,\n  // \u683c\u5f0f\u5316\u8bf7\u6c42\u7ed3\u679c\n  formatResult,\n  // \u8bf7\u6c42\u552f\u4e00\u6807\u8bc6\n  cacheKey,\n  // \u8bbe\u7f6e\u663e\u793a loading \u7684\u5ef6\u8fdf\u65f6\u95f4\uff0c\u907f\u514d\u95ea\u70c1\n  loadingDelay,\n  // \u9ed8\u8ba4\u53c2\u6570\n  defaultParams,\n  // \u8f6e\u8be2\u95f4\u9694\uff0c\u5355\u4f4d\u4e3a\u6beb\u79d2\n  pollingInterval,\n  // \u5728\u9875\u9762\u9690\u85cf\u65f6\uff0c\u662f\u5426\u7ee7\u7eed\u8f6e\u8be2\uff0c\u9ed8\u8ba4\u4e3a true\uff0c\u5373\u4e0d\u4f1a\u505c\u6b62\u8f6e\u8be2\n  pollingWhenHidden,\n  // \u6839\u636e params\uff0c\u83b7\u53d6\u5f53\u524d\u8bf7\u6c42\u7684 key\n  fetchKey,\n  // \u5728\u5c4f\u5e55\u91cd\u65b0\u83b7\u53d6\u7126\u70b9\u6216\u91cd\u65b0\u663e\u793a\u65f6\uff0c\u662f\u5426\u91cd\u65b0\u53d1\u8d77\u8bf7\u6c42\u3002\u9ed8\u8ba4\u4e3a false\uff0c\u5373\u4e0d\u4f1a\u91cd\u65b0\u53d1\u8d77\u8bf7\u6c42\n  refreshOnWindowFocus,\n  // \u5c4f\u5e55\u91cd\u65b0\u805a\u7126\uff0c\u5982\u679c\u6bcf\u6b21\u90fd\u91cd\u65b0\u53d1\u8d77\u8bf7\u6c42\uff0c\u4e0d\u662f\u5f88\u597d\uff0c\u6211\u4eec\u9700\u8981\u6709\u4e00\u4e2a\u65f6\u95f4\u95f4\u9694\uff0c\u5728\u5f53\u524d\u65f6\u95f4\u95f4\u9694\u5185\uff0c\u4e0d\u4f1a\u91cd\u65b0\u53d1\u8d77\u8bf7\u6c42\uff0c\u9700\u8981\u914d\u7f6e refreshOnWindowFocus \u4f7f\u7528\n  focusTimespan,\n  // \u9632\u6296\u95f4\u9694, \u5355\u4f4d\u4e3a\u6beb\u79d2\uff0c\u8bbe\u7f6e\u540e\uff0c\u8bf7\u6c42\u8fdb\u5165\u9632\u6296\u6a21\u5f0f\n  debounceInterval,\n  // \u8282\u6d41\u95f4\u9694, \u5355\u4f4d\u4e3a\u6beb\u79d2\uff0c\u8bbe\u7f6e\u540e\uff0c\u8bf7\u6c42\u8fdb\u5165\u8282\u6d41\u6a21\u5f0f\u3002\n  throttleInterval,\n  // \u53ea\u6709\u5f53 ready \u4e3a true \u65f6\uff0c\u624d\u4f1a\u53d1\u8d77\u8bf7\u6c42\n  ready,\n  // \u5728 manual = false \u65f6\uff0crefreshDeps \u53d8\u5316\uff0c\u4f1a\u89e6\u53d1\u8bf7\u6c42\u91cd\u65b0\u6267\u884c\n  refreshDeps,\n});\n")),(0,a.kt)("h4",{id:"\u5e38\u7528\u4f7f\u7528\u65b9\u5f0f"},"\u5e38\u7528\u4f7f\u7528\u65b9\u5f0f"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { useRequest } from 'ice';\n// \u7528\u6cd5 1\uff1a\u4f20\u5165\u5b57\u7b26\u4e32\nconst { data, error, loading } = useRequest('/api/repo');\n\n// \u7528\u6cd5 2\uff1a\u4f20\u5165\u914d\u7f6e\u5bf9\u8c61\nconst { data, error, loading } = useRequest({\n  url: '/api/repo',\n  method: 'get',\n});\n\n// \u7528\u6cd5 3\uff1a\u4f20\u5165 service \u51fd\u6570\nconst { data, error, loading, request } = useRequest((id) => ({\n  url: '/api/repo',\n  method: 'get',\n  data: { id },\n});\n")),(0,a.kt)("p",null,"\u66f4\u591a\u4f7f\u7528\u65b9\u5f0f\u8be6\u89c1 ",(0,a.kt)("a",{parentName:"p",href:"https://ahooks.js.org/zh-CN/hooks/use-request/index"},"ahooks/useRequest")),(0,a.kt)("h3",{id:"\u8bf7\u6c42\u914d\u7f6e"},"\u8bf7\u6c42\u914d\u7f6e"),(0,a.kt)("p",null,"\u5728\u5b9e\u9645\u9879\u76ee\u4e2d\u901a\u5e38\u9700\u8981\u5bf9\u8bf7\u6c42\u8fdb\u884c\u5168\u5c40\u7edf\u4e00\u7684\u5c01\u88c5\uff0c\u4f8b\u5982\u914d\u7f6e\u8bf7\u6c42\u7684 baseURL\u3001\u7edf\u4e00 header\u3001\u62e6\u622a\u8bf7\u6c42\u548c\u54cd\u5e94\u7b49\u7b49\uff0c\u8fd9\u65f6\u53ea\u9700\u8981\u5728\u5e94\u7528\u7684\u7684 appConfig \u4e2d\u8fdb\u884c\u914d\u7f6e\u5373\u53ef\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/app.tsx"',title:'"src/app.tsx"'},"import { defineRequestConfig } from '@ice/plugin-request/esm/types';\n\nexport const requestConfig = defineRequestConfig({\n  // \u53ef\u9009\u7684\uff0c\u5168\u5c40\u8bbe\u7f6e request \u662f\u5426\u8fd4\u56de response \u5bf9\u8c61\uff0c\u9ed8\u8ba4\u4e3a false\n  withFullResponse: false,\n\n  baseURL: '/api',\n  headers: {},\n  // ...RequestConfig \u5176\u4ed6\u53c2\u6570\n\n  // \u62e6\u622a\u5668\n  interceptors: {\n    request: {\n      onConfig: (config) => {\n        // \u53d1\u9001\u8bf7\u6c42\u524d\uff1a\u53ef\u4ee5\u5bf9 RequestConfig \u505a\u4e00\u4e9b\u7edf\u4e00\u5904\u7406\n        config.headers = { a: 1 };\n        return config;\n      },\n      onError: (error) => {\n        return Promise.reject(error);\n      },\n    },\n    response: {\n      onConfig: (response) => {\n        // \u8bf7\u6c42\u6210\u529f\uff1a\u53ef\u4ee5\u505a\u5168\u5c40\u7684 toast \u5c55\u793a\uff0c\u6216\u8005\u5bf9 response \u505a\u4e00\u4e9b\u683c\u5f0f\u5316\n        if (!response.data.status !== 1) {\n          alert('\u8bf7\u6c42\u5931\u8d25');\n        }\n        return response;\n      },\n      onError: (error) => {\n        // \u8bf7\u6c42\u51fa\u9519\uff1a\u670d\u52a1\u7aef\u8fd4\u56de\u9519\u8bef\u72b6\u6001\u7801\n        console.log(error.response.data);\n        console.log(error.response.status);\n        console.log(error.response.headers);\n        return Promise.reject(error);\n      },\n    },\n  },\n});\n")),(0,a.kt)("h3",{id:"\u591a\u4e2a\u8bf7\u6c42\u914d\u7f6e"},"\u591a\u4e2a\u8bf7\u6c42\u914d\u7f6e"),(0,a.kt)("p",null,"\u5728\u67d0\u4e9b\u590d\u6742\u573a\u666f\u7684\u5e94\u7528\u4e2d\uff0c\u6211\u4eec\u4e5f\u53ef\u4ee5\u914d\u7f6e\u591a\u4e2a\u8bf7\u6c42\uff0c\u6bcf\u4e2a\u914d\u7f6e\u8bf7\u6c42\u90fd\u662f\u5355\u4e00\u7684\u5b9e\u4f8b\u5bf9\u8c61\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/app.tsx"',title:'"src/app.tsx"'},"import { defineRequestConfig } from '@ice/plugin-request/esm/types';\n\nexport const requestConfig = defineRequestConfig([\n  {\n    baseURL: '/api',\n    // ...RequestConfig \u5176\u4ed6\u53c2\u6570\n  },\n  {\n    // \u914d\u7f6e request \u5b9e\u4f8b\u540d\u79f0\uff0c\u5982\u679c\u4e0d\u914d\u9ed8\u8ba4\u4f7f\u7528\u5185\u7f6e\u7684 request \u5b9e\u4f8b\n    instanceName: 'request2',\n    baseURL: '/api2',\n    // ...RequestConfig \u5176\u4ed6\u53c2\u6570\n  }\n]);\n")),(0,a.kt)("p",null,"\u4f7f\u7528\u793a\u4f8b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { request } from 'ice';\n\nexport default {\n  // \u4f7f\u7528\u9ed8\u8ba4\u7684\u8bf7\u6c42\u65b9\u6cd5\uff0c\u5373\u8c03\u7528 /api/user \u63a5\u53e3\n  async getUser() {\n    return await request({\n      url: '/user',\n    });\n  },\n\n  // \u4f7f\u7528\u81ea\u5b9a\u4e49\u7684 request \u8bf7\u6c42\u65b9\u6cd5\uff0c\u5373\u8c03\u7528\u63a5\u53e3 /api2/user\n  async getRepo(id) {\n    return await request({\n      instanceName: 'request2',\n      url: `/repo/${id}`,\n    });\n  },\n};\n")),(0,a.kt)("h2",{id:"\u5f02\u5e38\u5904\u7406"},"\u5f02\u5e38\u5904\u7406"),(0,a.kt)("p",null,"\u65e0\u8bba\u662f\u62e6\u622a\u5668\u91cc\u7684\u9519\u8bef\u53c2\u6570\uff0c\u8fd8\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"request")," / ",(0,a.kt)("inlineCode",{parentName:"p"},"useRequest")," \u8fd4\u56de\u7684\u9519\u8bef\u5bf9\u8c61\uff0c\u90fd\u7b26\u5408\u4ee5\u4e0b\u7c7b\u578b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const error = {\n  // \u670d\u52a1\u7aef\u8fd4\u56de\u9519\u8bef\u72b6\u6001\u7801\u65f6\u5219\u5b58\u5728\u8be5\u5b57\u6bb5\n  response: {\n    data: {},\n    status: {},\n    headers: {}\n  },\n  // \u670d\u52a1\u7aef\u672a\u8fd4\u56de\u7ed3\u6784\u65f6\u5219\u5b58\u5728\u8be5\u5b57\u6bb5\n  request: XMLHttpRequest,\n  // \u4e00\u5b9a\u5b58\u5728\uff0c\u5373 RequestConfig\n  config: {\n  },\n  // \u4e00\u5b9a\u5b58\u5728\n  message: ''\n}\n")),(0,a.kt)("h2",{id:"\u9ad8\u9636\u7528\u6cd5"},"\u9ad8\u9636\u7528\u6cd5"),(0,a.kt)("h3",{id:"mock-\u63a5\u53e3"},"Mock \u63a5\u53e3"),(0,a.kt)("p",null,"\u9879\u76ee\u5f00\u53d1\u521d\u671f\uff0c\u540e\u7aef\u63a5\u53e3\u53ef\u80fd\u8fd8\u6ca1\u5f00\u53d1\u597d\u6216\u4e0d\u591f\u7a33\u5b9a\uff0c\u6b64\u65f6\u524d\u7aef\u53ef\u4ee5\u901a\u8fc7 Mock \u7684\u65b9\u5f0f\u6765\u6a21\u62df\u63a5\u53e3\uff0c\u53c2\u8003\u6587\u6863 ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/basic/mock"},"\u672c\u5730 Mock \u80fd\u529b"),"\u3002"),(0,a.kt)("h3",{id:"\u5982\u4f55\u89e3\u51b3\u63a5\u53e3\u8de8\u57df\u95ee\u9898"},"\u5982\u4f55\u89e3\u51b3\u63a5\u53e3\u8de8\u57df\u95ee\u9898"),(0,a.kt)("p",null,"\u5f53\u8bbf\u95ee\u9875\u9762\u5730\u5740\u548c\u8bf7\u6c42\u63a5\u53e3\u5730\u5740\u7684\u57df\u540d\u6216\u7aef\u53e3\u4e0d\u4e00\u81f4\u65f6\uff0c\u5c31\u4f1a\u56e0\u4e3a\u6d4f\u89c8\u5668\u7684\u540c\u6e90\u7b56\u7565\u5bfc\u81f4\u8de8\u57df\u95ee\u9898\uff0c\u6b64\u65f6\u63a8\u8350\u540e\u7aef\u63a5\u53e3\u901a\u8fc7 CORS \u652f\u6301\u4fe1\u4efb\u57df\u540d\u7684\u8de8\u57df\u8bbf\u95ee\uff0c\u5177\u4f53\u8bf7\u53c2\u8003\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS"},"HTTP \u8bbf\u95ee\u63a7\u5236\uff08CORS\uff09")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.ruanyifeng.com/blog/2016/04/cors.html"},"\u8de8\u57df\u8d44\u6e90\u5171\u4eab CORS \u8be6\u89e3")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.html5rocks.com/en/tutorials/cors/"},"Using CORS"))),(0,a.kt)("h3",{id:"\u6839\u636e\u73af\u5883\u914d\u7f6e\u4e0d\u540c\u7684-baseurl"},"\u6839\u636e\u73af\u5883\u914d\u7f6e\u4e0d\u540c\u7684 baseURL"),(0,a.kt)("p",null,"\u5927\u90e8\u5206\u60c5\u51b5\u4e0b\uff0c\u524d\u7aef\u4ee3\u7801\u91cc\u7528\u5230\u7684\u540e\u7aef\u63a5\u53e3\u5199\u7684\u90fd\u662f\u76f8\u5bf9\u8def\u5f84\u5982 ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/getFoo.json"),"\uff0c\u7136\u540e\u8bbf\u95ee\u4e0d\u540c\u73af\u5883\u65f6\u6d4f\u89c8\u5668\u4f1a\u6839\u636e\u5f53\u524d\u57df\u540d\u53d1\u8d77\u5bf9\u5e94\u7684\u8bf7\u6c42\u3002\u5982\u679c\u57df\u540d\u8ddf\u5b9e\u9645\u8bf7\u6c42\u7684\u63a5\u53e3\u5730\u5740\u4e0d\u4e00\u81f4\uff0c\u5219\u9700\u8981\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"request.baseURL")," \u6765\u914d\u7f6e\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/app.tsx"',title:'"src/app.tsx"'},"import { defineRequestConfig } from '@ice/plugin-request/esm/types';\n\nexport const requestConfig = defineRequestConfig({\n  baseURL: '//service.example.com/api',\n});\n")),(0,a.kt)("p",null,"\u7ed3\u5408",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/basic/env"},"\u6784\u5efa\u914d\u7f6e"),"\u5373\u53ef\u5b9e\u73b0\u4e0d\u540c\u73af\u5883\u4f7f\u7528\u4e0d\u540c\u7684 baseURL\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title=".env.local"',title:'".env.local"'},"# The should not be committed.\nBASEURL=http://localhost:9999/api\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title=".env.prod"',title:'".env.prod"'},"BASEURL=https://example.com/api\n")),(0,a.kt)("p",null,"\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"src/app.tsx")," \u4e2d\u914d\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"request.baseURL"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="src/app.tsx"',title:'"src/app.tsx"'},"import { defineRequestConfig } from '@ice/plugin-request/esm/types';\n\nexport const requestConfig = defineRequestConfig({\n  baseURL: process.env.BASEURL,\n});\n")))}c.isMDXComponent=!0}}]);