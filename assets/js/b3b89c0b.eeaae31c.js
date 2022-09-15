"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[8221],{4852:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>k});var a=n(9231);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=u(n),k=r,c=m["".concat(o,".").concat(k)]||m[k]||d[k]||l;return n?a.createElement(c,i(i({ref:t},s),{},{components:n})):a.createElement(c,i({ref:t},s))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=m;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3366:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var a=n(4011),r=(n(9231),n(4852));const l={title:"\u5f00\u53d1\u63d2\u4ef6",order:1},i=void 0,p={unversionedId:"guide/plugins/plugin-dev",id:"guide/plugins/plugin-dev",title:"\u5f00\u53d1\u63d2\u4ef6",description:"ICE \u63d0\u4f9b\u4e86\u63d2\u4ef6\u673a\u5236\uff0c\u5728\u63d0\u4f9b\u4e30\u5bcc\u7684\u6846\u67b6\u80fd\u529b\u7684\u57fa\u7840\u4e0a\u4e5f\u53ef\u4ee5\u8ba9\u5f00\u53d1\u8005\u53ef\u4ee5\u5728\u6846\u67b6\u80fd\u529b\u4e0d\u6ee1\u8db3\u8bc9\u6c42\u7684\u60c5\u51b5\u4e0b\u8fdb\u884c\u5b9a\u5236\uff1a",source:"@site/docs/guide/plugins/plugin-dev.md",sourceDirName:"guide/plugins",slug:"/guide/plugins/plugin-dev",permalink:"/docs/guide/plugins/plugin-dev",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/plugins/plugin-dev.md",tags:[],version:"current",frontMatter:{title:"\u5f00\u53d1\u63d2\u4ef6",order:1},sidebar:"docs",previous:{title:"\u4ece Rax \u8fc1\u79fb",permalink:"/docs/guide/best-practices/integrate-from-rax"},next:{title:"CSS \u8d44\u6e90\u672c\u5730\u5316",permalink:"/docs/guide/plugins/css-assets-local"}},o={},u=[{value:"\u63d2\u4ef6\u89c4\u8303",id:"\u63d2\u4ef6\u89c4\u8303",level:2},{value:"\u5de5\u7a0b\u80fd\u529b\u5b9a\u5236",id:"\u5de5\u7a0b\u80fd\u529b\u5b9a\u5236",level:2},{value:"\u63d2\u4ef6 API",id:"\u63d2\u4ef6-api",level:3},{value:"context",id:"context",level:4},{value:"onConfig",id:"onconfig",level:4},{value:"onHook",id:"onhook",level:4},{value:"registerUserConfig",id:"registeruserconfig",level:4},{value:"registerCliOption",id:"registerclioption",level:4},{value:"modifyUserConfig",id:"modifyuserconfig",level:4},{value:"registerTask",id:"registertask",level:4},{value:"getAllTask",id:"getalltask",level:4},{value:"generator",id:"generator",level:4},{value:"addRenderTemplate",id:"addrendertemplate",level:5},{value:"addRenderFile",id:"addrenderfile",level:5},{value:"addExport",id:"addexport",level:5},{value:"addExportTypes",id:"addexporttypes",level:5},{value:"watch",id:"watch",level:4},{value:"addEvent",id:"addevent",level:5},{value:"removeEvent",id:"removeevent",level:5},{value:"\u8fd0\u884c\u65f6\u80fd\u529b\u5b9a\u5236",id:"\u8fd0\u884c\u65f6\u80fd\u529b\u5b9a\u5236",level:2},{value:"\u8fd0\u884c\u65f6 API",id:"\u8fd0\u884c\u65f6-api",level:3},{value:"appContext",id:"appcontext",level:4},{value:"addProvider",id:"addprovider",level:4},{value:"addWrapper",id:"addwrapper",level:4},{value:"setAppRouter",id:"setapprouter",level:4},{value:"setRender",id:"setrender",level:4},{value:"useData",id:"usedata",level:4},{value:"useConfig",id:"useconfig",level:4}],s={toc:u};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"ICE \u63d0\u4f9b\u4e86\u63d2\u4ef6\u673a\u5236\uff0c\u5728\u63d0\u4f9b\u4e30\u5bcc\u7684\u6846\u67b6\u80fd\u529b\u7684\u57fa\u7840\u4e0a\u4e5f\u53ef\u4ee5\u8ba9\u5f00\u53d1\u8005\u53ef\u4ee5\u5728\u6846\u67b6\u80fd\u529b\u4e0d\u6ee1\u8db3\u8bc9\u6c42\u7684\u60c5\u51b5\u4e0b\u8fdb\u884c\u5b9a\u5236\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5b9a\u5236\u4fee\u6539\u6846\u67b6\u6784\u5efa\u914d\u7f6e"),(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301\u5728\u6574\u4e2a\u6784\u5efa\u751f\u547d\u5468\u671f\u5b9a\u5236\u884c\u4e3a\uff0c\u6bd4\u5982\u9879\u76ee\u542f\u52a8\u524d\u62c9\u53d6\u67d0\u4e9b\u8d44\u6e90"),(0,r.kt)("li",{parentName:"ul"},"\u652f\u6301\u6269\u5c55\u8fd0\u884c\u65f6\u80fd\u529b\uff0c\u6bd4\u5982\u7edf\u4e00\u4e3a\u8def\u7531\u7ec4\u4ef6\u589e\u52a0\u9274\u6743\u903b\u8f91\uff08\u6dfb\u52a0\u9ad8\u9636\u7ec4\u4ef6\uff09")),(0,r.kt)("h2",{id:"\u63d2\u4ef6\u89c4\u8303"},"\u63d2\u4ef6\u89c4\u8303"),(0,r.kt)("p",null,"ICE \u63d2\u4ef6\u672c\u8d28\u662f\u4e00\u4e2a JS \u6a21\u5757\uff0c\u5b98\u65b9\u63a8\u8350\u4ee5 TS \u8fdb\u884c\u5f00\u53d1\u4ee5\u83b7\u5f97\u826f\u597d\u7684\u7c7b\u578b\u63d0\u793a\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import type { Plugin } from '@ice/types';\ninterface PluginOptions {\n  test: boolean;\n}\nconst plugin: Plugin<PluginOptions> = (options) => ({\n  name: 'plugin-name',\n  setup: (pluginAPI) => {\n\n  },\n  // runtime \u4e3a\u53ef\u9009\uff0c\u5982\u679c\u4ec5\u5b9a\u5236\u6784\u5efa\u914d\u7f6e\uff0c\u53ef\u4ee5\u4e0d\u7528\u8bbe\u7f6e\n  runtime: '/absolute/path/to/runtime',\n});\n\nexport default plugin;\n")),(0,r.kt)("h2",{id:"\u5de5\u7a0b\u80fd\u529b\u5b9a\u5236"},"\u5de5\u7a0b\u80fd\u529b\u5b9a\u5236"),(0,r.kt)("p",null,"\u6846\u67b6\u4e3a\u5b9a\u5236\u5de5\u7a0b\u80fd\u529b\u63d0\u4f9b\u4e86\u63d2\u4ef6 API\uff0c\u65b9\u4fbf\u5f00\u53d1\u8005\u6269\u5c55\u548c\u81ea\u5b9a\u4e49\u80fd\u529b\u3002"),(0,r.kt)("h3",{id:"\u63d2\u4ef6-api"},"\u63d2\u4ef6 API"),(0,r.kt)("h4",{id:"context"},"context"),(0,r.kt)("p",null,"context \u5305\u542b\u6784\u5efa\u65f6\u7684\u4e0a\u4e0b\u6587\u4fe1\u606f\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"command")," \u5f53\u524d\u8fd0\u884c\u547d\u4ee4\uff0cstart/build/test"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"commandArgs")," script \u547d\u4ee4\u6267\u884c\u65f6\u63a5\u53d7\u5230\u7684\u53c2\u6570"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"rootDir")," \u9879\u76ee\u6839\u76ee\u5f55"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"userConfig")," \u7528\u6237\u5728\u6784\u5efa\u914d\u7f6e\u6587\u4ef6 ice.config.mts \u4e2d\u914d\u7f6e\u7684\u5185\u5bb9"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pkg")," \u9879\u76ee package.json \u4e2d\u7684\u5185\u5bb9"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"webpack")," webpack \u5b9e\u4f8b\uff0c\u5de5\u7a0b\u4e0d\u5efa\u8bae\u5b89\u88c5\u591a\u4e2a webpack \u7248\u672c\uff0c\u53ef\u4ee5\u4ece ",(0,r.kt)("inlineCode",{parentName:"li"},"context.webpack")," \u4e0a\u83b7\u53d6\u5185\u7f6e\u7684 webpack \u5b9e\u4f8b")),(0,r.kt)("h4",{id:"onconfig"},"onConfig"),(0,r.kt)("p",null,"\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"onGetConfig")," \u83b7\u53d6\u6846\u67b6\u7684\u5de5\u7a0b\u914d\u7f6e\uff0c\u5e76\u901a\u8fc7\u8be5 API \u5bf9\u914d\u7f6e\u8fdb\u884c\u81ea\u5b9a\u4e49\u4fee\u6539\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const plugin = () => ({\n  name: 'plugin-test',\n  setup: ({ onGetConfig }) => {\n    onGetConfig((config) => {\n      config.alias = {\n        '@': './src/',\n      }\n    });\n  },\n})\n")),(0,r.kt)("p",null,"\u4e3a\u4e86\u7b80\u5316\u5f00\u53d1\u8005\u7684\u914d\u7f6e\uff0c\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"onGetConfig")," \u4fee\u6539\u914d\u7f6e\u9879\u662f\u57fa\u4e8e\u5e95\u5c42\u5de5\u7a0b\u5de5\u5177\u7684\u62bd\u8c61\uff0c\u5305\u62ec\u4ee5\u4e0b\u914d\u7f6e\u9879\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"mode")," \u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"li"},"'none' | 'development' | 'production'")," \u4ee5\u786e\u5b9a\u6784\u5efa\u73af\u5883"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"entry")," \u914d\u7f6e\u5e94\u7528\u5165\u53e3\u6587\u4ef6"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"define")," \u6ce8\u5165\u5230\u8fd0\u884c\u65f6\u7684\u53d8\u91cf"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"experimental")," \u5b9e\u9a8c\u6027\u80fd\u529b\uff0c\u540c ",(0,r.kt)("a",{parentName:"li",href:"https://webpack.js.org/configuration/experiments/#experiments"},"webpack.experiments")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"outputDir")," \u6784\u5efa\u8f93\u51fa\u76ee\u5f55"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"externals")," \u540c ",(0,r.kt)("a",{parentName:"li",href:"https://webpack.js.org/configuration/externals/"},"webpack.externals")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"outputAssetsPath")," \u9759\u6001\u8d44\u6e90\u8f93\u51fa\u76ee\u5f55\uff0c\u53ef\u4ee5\u5206\u522b\u914d\u7f6e js \u548c css"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"sourceMap")," \u6e90\u7801\u8c03\u8bd5\u6620\u5c04\uff0c\u540c ",(0,r.kt)("a",{parentName:"li",href:"https://webpack.js.org/configuration/devtool/"},"webpack.devtool")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"publicPath")," \u540c ",(0,r.kt)("a",{parentName:"li",href:"https://webpack.js.org/guides/public-path/#root"},"webpack.output.publicPath")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"alias")," \u540c ",(0,r.kt)("a",{parentName:"li",href:"https://webpack.js.org/configuration/resolve/#resolvealias"},"webpack.resolve.alias")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"hash")," \u914d\u7f6e\u8d44\u6e90\u8f93\u51fa\u6587\u4ef6\u540d\u662f\u5426\u5e26 hash"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"transformPlugins")," ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/unjs/unplugin"},"unplugin \u6807\u51c6")," \u63d2\u4ef6\uff0c\u8be5\u63d2\u4ef6\u5bf9\u4e8e\u670d\u52a1\u7aef\u548c\u6d4f\u89c8\u5668\u7aef\u4ea7\u7269\u540c\u65f6\u751f\u6548"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"transforms")," \u914d\u7f6e\u6e90\u7801\u8f6c\u5316\uff0c\u652f\u6301\u5bf9\u6e90\u7801\u8fdb\u884c\u5b9a\u5236\u8f6c\u5316"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"middlewares")," development \u5f00\u53d1\u9636\u6bb5\u914d\u7f6e\u4e2d\u95f4\u4ef6"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"proxy")," \u914d\u7f6e\u4ee3\u7406\u670d\u52a1"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"compileIncludes")," \u914d\u7f6e\u9700\u8981\u8fdb\u884c\u7f16\u8bd1\u7684\u4e09\u65b9\u4f9d\u8d56"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"minify")," \u662f\u5426\u8fdb\u884c\u538b\u7f29"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"minimizerOptions")," \u538b\u7f29\u914d\u7f6e\u9879\uff0c\u57fa\u4e8e ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/terser/terser#minify-options"},"minify-options")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"analyzer")," \u5f00\u542f\u4ea7\u7269\u5206\u6790"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"https")," \u914d\u7f6e https \u670d\u52a1"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"port")," \u914d\u7f6e\u8c03\u8bd5\u7aef\u53e3"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"cacheDir")," \u914d\u7f6e\u6784\u5efa\u7f13\u5b58\u76ee\u5f55"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"tsCheckerOptions")," ts \u7c7b\u578b\u68c0\u67e5 ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/TypeStrong/fork-ts-checker-webpack-plugin"},"\u914d\u7f6e\u9879")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"eslintOptions")," eslint \u68c0\u67e5 ",(0,r.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/eslint-webpack-plugin"},"\u914d\u7f6e\u9879")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"splitChunks")," \u662f\u5426\u5206\u5305"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"assetsManifest")," \u662f\u5426\u751f\u6210\u8d44\u6e90 manifest"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"devServer")," \u914d\u7f6e webpack dev server ",(0,r.kt)("a",{parentName:"li",href:"https://webpack.js.org/configuration/dev-server/"},"\u914d\u7f6e")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"fastRefresh")," \u662f\u5426\u5f00\u542f fast-refresh \u80fd\u529b"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"configureWebpack")," \u5982\u679c\u4e0a\u8ff0\u5feb\u6377\u914d\u7f6e\u9879\u4e0d\u6ee1\u8db3\u5b9a\u5236\u9700\u6c42\uff0c\u53ef\u4ee5\u901a\u8fc7 configureWebpack \u8fdb\u884c\u81ea\u5b9a\u4e49")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ onGetConfig }) => {\n    onGetConfig((config) => {\n      config.configureWebpack.push((webpackConfig) => {\n        webpackConfig.mode = 'development';\n        return webpackConfig;\n      })\n    });\n  },\n})\n")),(0,r.kt)("h4",{id:"onhook"},"onHook"),(0,r.kt)("p",null,"\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"onHook")," \u76d1\u542c\u547d\u4ee4\u6784\u5efa\u65f6\u4e8b\u4ef6\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"onHook")," \u6ce8\u518c\u7684\u51fd\u6570\u6267\u884c\u5b8c\u6210\u540e\u624d\u4f1a\u6267\u884c\u540e\u7eed\u64cd\u4f5c\uff0c\u53ef\u4ee5\u7528\u4e8e\u5728\u547d\u4ee4\u8fd0\u884c\u4e2d\u9014\u63d2\u5165\u63d2\u4ef6\u60f3\u505a\u7684\u64cd\u4f5c\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ onHook }) => {\n    onHook('before.build.load', () => {\n      // do something before build\n    });\n    onHook('after.build.compile', (stats) => {\n      // do something after build\n    });\n  },\n})\n")),(0,r.kt)("p",null,"\u76ee\u524d\u652f\u6301\u7684\u751f\u547d\u5468\u671f\u5982\u4e0b\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"before.start.run")," \u6784\u5efa\u547d\u4ee4 start \u6267\u884c\u524d\uff0c\u8be5\u9636\u6bb5\u53ef\u4ee5\u83b7\u53d6\u5404\u9879\u6784\u5efa\u4efb\u52a1\u6700\u7ec8\u914d\u7f6e"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"before.build.run")," \u6784\u5efa\u547d\u4ee4 build \u6267\u884c\u524d\uff0c\u540c start"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"after.start.compile")," \u6784\u5efa\u547d\u4ee4 start \u6267\u884c\u7ed3\u675f\uff0c\u8be5\u9636\u6bb5\u53ef\u4ee5\u83b7\u53d6\u6784\u5efa\u7684\u6267\u884c\u7ed3\u679c"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"after.build.compile")," \u6784\u5efa\u547d\u4ee4 build \u6267\u884c\u7ed3\u675f\uff0c\u540c start"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"after.start.devServer")," dev \u9636\u6bb5\u7684 server \u670d\u52a1\u542f\u52a8\u540e\uff0c\u8be5\u9636\u6bb5\u53ef\u4ee5\u83b7\u53d6\u76f8\u5173 dev server \u542f\u52a8\u7684 url \u7b49\u4fe1\u606f")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u6bcf\u4e2a\u5468\u671f\u53ef\u4ee5\u83b7\u53d6\u7684\u5177\u4f53\u7684\u53c2\u6570\u7c7b\u578b\u53ef\u4ee5\u53c2\u8003 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ice-lab/ice-next/blob/master/packages/types/src/plugin.ts"},"TS \u7c7b\u578b"))),(0,r.kt)("h4",{id:"registeruserconfig"},"registerUserConfig"),(0,r.kt)("p",null,"\u4e3a\u7528\u6237\u914d\u7f6e\u6587\u4ef6 ",(0,r.kt)("inlineCode",{parentName:"p"},"ice.config.mts")," \u4e2d\u6dfb\u52a0\u81ea\u5b9a\u4e49\u5b57\u6bb5\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ registerUserConfig }) => {\n    registerUserConfig({\n      name: 'custom-key',\n      validation: 'boolean' // \u53ef\u9009\uff0c\u652f\u6301\u7c7b\u578b\u6709 string, number, array, object, boolean\n      setConfig: () => {\n        // \u8be5\u5b57\u6bb5\u5bf9\u4e8e\u914d\u7f6e\u7684\u5f71\u54cd\uff0c\u901a\u8fc7 onGetConfig \u8bbe\u7f6e\n      },\n    });\n  },\n});\n")),(0,r.kt)("h4",{id:"registerclioption"},"registerCliOption"),(0,r.kt)("p",null,"\u4e3a\u547d\u4ee4\u884c\u542f\u52a8\u6dfb\u52a0\u81ea\u5b9a\u4e49\u53c2\u6570\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ registerCliOption }) => {\n    registerCliOption({\n      name: 'custom-option',\n      commands: ['start'], // \u652f\u6301\u7684\u6269\u5c55\u7684\u547d\u4ee4\n      setConfig: () => {\n        // \u8be5\u5b57\u6bb5\u5bf9\u4e8e\u914d\u7f6e\u7684\u5f71\u54cd\uff0c\u901a\u8fc7 onGetConfig \u8bbe\u7f6e\n      },\n    });\n  },\n});\n")),(0,r.kt)("h4",{id:"modifyuserconfig"},"modifyUserConfig"),(0,r.kt)("p",null,"\u4e3a\u547d\u4ee4\u884c\u542f\u52a8\u6dfb\u52a0\u81ea\u5b9a\u4e49\u53c2\u6570\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ modifyUserConfig }) => {\n    modifyUserConfig(key, value); // key, value \u5206\u522b\u4e3a\u7528\u6237\u914d\u7f6e\u6587\u4ef6\u952e\u503c\u5bf9\n  },\n});\n")),(0,r.kt)("h4",{id:"registertask"},"registerTask"),(0,r.kt)("p",null,"\u6dfb\u52a0\u81ea\u5b9a\u4e49\u4efb\u52a1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ registerTask }) => {\n    registerTask(name, config); // name: Task\u540d, config: \u5bf9\u4e8e\u4efb\u52a1\u914d\u7f6e\u540c onGetConfig \u914d\u7f6e\u9879\n  },\n});\n")),(0,r.kt)("h4",{id:"getalltask"},"getAllTask"),(0,r.kt)("p",null,"\u83b7\u53d6\u6240\u6709\u4efb\u52a1\u540d\u79f0\uff0c\u5185\u7f6e\u4e3b\u8981\u4efb\u52a1\u540d\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"web"),"\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ getAllTask }) => {\n    const tasks = getAllTask();\n  },\n});\n")),(0,r.kt)("h4",{id:"generator"},"generator"),(0,r.kt)("p",null,"\u652f\u6301\u751f\u6210\u6216\u8005\u4fee\u6539\u6a21\u7248\uff0c\u652f\u6301\u7684 API \u5982\u4e0b\uff1a"),(0,r.kt)("h5",{id:"addrendertemplate"},"addRenderTemplate"),(0,r.kt)("p",null,"\u6dfb\u52a0\u6a21\u5757\u751f\u6210\u76ee\u5f55\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ generator }) => {\n    generator.addRenderTemplate({\n      template: '/path/to/template/dir',\n      targetDir: 'router',\n    }, {});\n  },\n});\n")),(0,r.kt)("h5",{id:"addrenderfile"},"addRenderFile"),(0,r.kt)("p",null,"\u6dfb\u52a0\u6a21\u5757\u751f\u6210\u6587\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ generator }) => {\n    generator.addRenderFile('/path/to/file.ts.ejs', 'folder/file.ts', {});\n  },\n});\n")),(0,r.kt)("h5",{id:"addexport"},"addExport"),(0,r.kt)("p",null,"\u5411 ice \u91cc\u6ce8\u518c\u6a21\u5757\uff0c\u5b9e\u73b0 ",(0,r.kt)("inlineCode",{parentName:"p"},"import { request } from 'ice';")," \u7684\u80fd\u529b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ generator }) => {\n    generator.addExport({\n      source: './request/request',\n      exportName: 'request',\n    });\n  },\n});\n")),(0,r.kt)("h5",{id:"addexporttypes"},"addExportTypes"),(0,r.kt)("p",null,"\u5411 ice \u91cc\u6ce8\u518c\u7c7b\u578b\uff0c\u5b9e\u73b0 ",(0,r.kt)("inlineCode",{parentName:"p"},"import type { Request } from 'ice';")," \u7684\u80fd\u529b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ generator }) => {\n    generator.addExportTypes({\n      source: './request/types',\n      specifier: '{ Request }'\n      exportName: 'Request',\n    });\n  },\n});\n")),(0,r.kt)("h4",{id:"watch"},"watch"),(0,r.kt)("p",null,"\u652f\u6301\u7edf\u4e00\u7684 watch \u670d\u52a1"),(0,r.kt)("h5",{id:"addevent"},"addEvent"),(0,r.kt)("p",null,"\u6dfb\u52a0 watch \u4e8b\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ watch }) => {\n    watch.addEvent([\n      /src\\/global.(scss|less|css)/,\n      (event: string, filePath: string) => {},\n      'cssWatch',\n    ]);\n  },\n});\n")),(0,r.kt)("h5",{id:"removeevent"},"removeEvent"),(0,r.kt)("p",null,"\u79fb\u9664 watch \u4e8b\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default () => ({\n  name: 'plugin-test',\n  setup: ({ watch }) => {\n    watch.removeEvent('cssWatch');\n  },\n});\n")),(0,r.kt)("h2",{id:"\u8fd0\u884c\u65f6\u80fd\u529b\u5b9a\u5236"},"\u8fd0\u884c\u65f6\u80fd\u529b\u5b9a\u5236"),(0,r.kt)("p",null,"\u63d2\u4ef6\u8fd0\u884c\u65f6\u53ef\u4ee5\u5b9a\u5236\u6846\u67b6\u7684\u8fd0\u884c\u65f6\u80fd\u529b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import type { Plugin } from '@ice/types';\nconst plugin: Plugin = () => ({\n  name: 'plugin-name'\n  runtime: '/absolute/path/to/runtime',\n});\n\nexport default plugin;\n")),(0,r.kt)("p",null,"\u6846\u67b6\u8fd0\u884c\u65f6\u6307\u5411\u7684\u6587\u4ef6\u5730\u5740\u4e3a\u4e00\u4e2a JS \u6a21\u5757\uff0c\u6e90\u7801\u9636\u6bb5\u63a8\u8350\u7528 TS \u8fdb\u884c\u5f00\u53d1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import type { RuntimePlugin } from '@ice/types';\n\nconst runtime: RuntimePlugin = () => {};\nexport default runtime;\n")),(0,r.kt)("h3",{id:"\u8fd0\u884c\u65f6-api"},"\u8fd0\u884c\u65f6 API"),(0,r.kt)("h4",{id:"appcontext"},"appContext"),(0,r.kt)("p",null,"appContext \u4e0a\u5305\u542b\u6846\u67b6\u76f8\u5173\u4e0a\u4e0b\u6587\u914d\u7f6e\u4fe1\u606f\uff0c\u4e3b\u8981\u5305\u62ec\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"appConfig")," \u5e94\u7528\u914d\u7f6e\uff0c\u8be6\u7ec6\u5185\u5bb9\u53ef\u4ee5\u53c2\u8003 ",(0,r.kt)("a",{parentName:"li",href:"/"},"\u5e94\u7528\u5165\u53e3")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"assetsManifest")," \u5e94\u7528\u8d44\u8baf\u914d\u7f6e\u4fe1\u606f"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"routesData")," \u8def\u7531\u4fe1\u606f")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const runtime = ({ appContext }) => {\n  console.log(appContext);\n}\nexport default runtime;\n")),(0,r.kt)("h4",{id:"addprovider"},"addProvider"),(0,r.kt)("p",null,"\u4e3a\u5e94\u7528\u7edf\u4e00\u6dfb\u52a0 Provider\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export default ({ addProvider }) => {\n  const StoreProvider = ({ children }) => {\n    return <Provider store={store}>{children}</Provider>;\n  };\n  addProvider(StoreProvider);\n};\n")),(0,r.kt)("h4",{id:"addwrapper"},"addWrapper"),(0,r.kt)("p",null,"\u4e3a\u6240\u6709\u8def\u7531\u7ec4\u4ef6\u505a\u4e00\u5c42\u5305\u88f9\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { useEffect } from 'react';\n\nexport default ({ addWrapper }) => {\n  const PageWrapper = (PageComponent) => {\n    const { title } = PageComponent.pageConfig || {};\n\n    if (!title) {\n      return PageComponent;\n    }\n    const TitleWrapperedComponent = () => {\n      useEffect(() => {\n        document.title = title;\n      }, []);\n\n      return <PageComponent />;\n    };\n    return TitleWrapperedComponent;\n  };\n  addWrapper(PageWrapper);\n\n  // \u5982\u679c\u5e0c\u671b\u540c\u6837\u4e3a layout \u7ec4\u4ef6\u6dfb\u52a0\u53ef\u4ee5\u6dfb\u52a0\u7b2c\u4e8c\u4e2a\u53c2\u6570\n  addWrapper(PageWrapper, true);\n};\n")),(0,r.kt)("h4",{id:"setapprouter"},"setAppRouter"),(0,r.kt)("p",null,"\u5b9a\u5236 Router \u6e32\u67d3\u65b9\u5f0f"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"export default ({ setAppRouter }) => {\n  // setAppRouter \u5165\u53c2\u4e3a\u8def\u7531\u6570\u7ec4\n  const renderRouter = (routes) => () => {\n    return <div>route</div>;\n  };\n  setAppRouter(renderRouter);\n};\n")),(0,r.kt)("h4",{id:"setrender"},"setRender"),(0,r.kt)("p",null,"\u81ea\u5b9a\u4e49\u6e32\u67d3\uff0c\u9ed8\u8ba4\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"react-dom")," \u8fdb\u884c\u6e32\u67d3"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import ReactDOM from 'react-dom';\n\nexport default ({ addDOMRender }) => {\n  // App: React \u7ec4\u4ef6\n  // appMountNode: App \u6302\u8f7d\u70b9\n  const DOMRender = ({ App, appMountNode }) => {\n    ReactDOM.render(<App />, appMountNode);\n  };\n  addDOMRender(DOMRender);\n};\n")),(0,r.kt)("h4",{id:"usedata"},"useData"),(0,r.kt)("p",null,"\u83b7\u53d6\u9875\u9762\u7ec4\u4ef6\u7684\u6570\u636e\uff0c\u4e00\u822c\u914d\u5408 addWrapper \u8fdb\u884c\u4f7f\u7528\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { useEffect } from 'react';\n\nexport default ({ addWrapper, useData }) => {\n  const PageWrapper = (PageComponent) => {\n    const pageData = useData();\n    return PageComponent;\n  };\n  addWrapper(PageWrapper);\n};\n")),(0,r.kt)("h4",{id:"useconfig"},"useConfig"),(0,r.kt)("p",null,"\u83b7\u53d6\u9875\u9762\u7ec4\u4ef6\u7684\u914d\u7f6e\uff0c\u4e00\u822c\u914d\u5408 addWrapper \u8fdb\u884c\u4f7f\u7528\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { useEffect } from 'react';\n\nexport default ({ addWrapper, useConfig }) => {\n  const PageWrapper = (PageComponent) => {\n    const pageConfig = useConfig();\n    return PageComponent;\n  };\n  addWrapper(PageWrapper);\n};\n")))}d.isMDXComponent=!0}}]);