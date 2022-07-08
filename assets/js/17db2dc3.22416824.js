"use strict";(self.webpackChunkice_website_v3=self.webpackChunkice_website_v3||[]).push([[8858],{8570:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>m});var l=t(79);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,l,a=function(e,n){if(null==e)return{};var t,l,a={},i=Object.keys(e);for(l=0;l<i.length;l++)t=i[l],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(l=0;l<i.length;l++)t=i[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=l.createContext({}),u=function(e){var n=l.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},s=function(e){var n=u(e.components);return l.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},c=l.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=u(t),m=a,k=c["".concat(p,".").concat(m)]||c[m]||d[m]||i;return t?l.createElement(k,r(r({ref:n},s),{},{components:t})):l.createElement(k,r({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,r=new Array(i);r[0]=c;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,r[1]=o;for(var u=2;u<i;u++)r[u]=t[u];return l.createElement.apply(null,r)}return l.createElement.apply(null,t)}c.displayName="MDXCreateElement"},9690:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var l=t(1528),a=(t(79),t(8570));const i={title:"\u6784\u5efa\u914d\u7f6e",order:13},r=void 0,o={unversionedId:"guide/basic/config",id:"guide/basic/config",title:"\u6784\u5efa\u914d\u7f6e",description:"ICE \u652f\u6301\u5e38\u7528\u7684\u6784\u5efa\u914d\u7f6e\u9879\uff0c\u6240\u6709\u7684\u914d\u7f6e\u9879\u5728 ice.config.mts \u4e2d\u8bbe\u7f6e\u3002",source:"@site/docs/guide/basic/config.md",sourceDirName:"guide/basic",slug:"/guide/basic/config",permalink:"/docs/guide/basic/config",draft:!1,editUrl:"https://github.com/ice-lab/ice-next/edit/master/website/docs/guide/basic/config.md",tags:[],version:"current",frontMatter:{title:"\u6784\u5efa\u914d\u7f6e",order:13},sidebar:"docs",previous:{title:"\u5b9a\u5236 HTML",permalink:"/docs/guide/basic/document"},next:{title:"\u73af\u5883\u53d8\u91cf",permalink:"/docs/guide/basic/env"}},p={},u=[{value:"\u914d\u7f6e\u6587\u4ef6",id:"\u914d\u7f6e\u6587\u4ef6",level:2},{value:"\u6784\u5efa\u914d\u7f6e\u6587\u4ef6",id:"\u6784\u5efa\u914d\u7f6e\u6587\u4ef6",level:3},{value:"\u517c\u5bb9\u6027\u914d\u7f6e",id:"\u517c\u5bb9\u6027\u914d\u7f6e",level:3},{value:"\u914d\u7f6e\u9879",id:"\u914d\u7f6e\u9879",level:2},{value:"alias",id:"alias",level:3},{value:"define",id:"define",level:3},{value:"publicPath",id:"publicpath",level:3},{value:"devPublicPath",id:"devpublicpath",level:3},{value:"hash",id:"hash",level:3},{value:"externals",id:"externals",level:3},{value:"outputDir",id:"outputdir",level:3},{value:"proxy",id:"proxy",level:3},{value:"minify",id:"minify",level:3},{value:"dropLogLevel",id:"droploglevel",level:3},{value:"compileDependencies",id:"compiledependencies",level:3},{value:"transform",id:"transform",level:3},{value:"ssr",id:"ssr",level:3},{value:"ssg",id:"ssg",level:3},{value:"server",id:"server",level:3},{value:"routes",id:"routes",level:3},{value:"sourceMap",id:"sourcemap",level:3},{value:"tsChecker",id:"tschecker",level:3},{value:"eslint",id:"eslint",level:3},{value:"mock",id:"mock",level:3},{value:"webpack",id:"webpack",level:3}],s={toc:u};function d(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,l.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"ICE \u652f\u6301\u5e38\u7528\u7684\u6784\u5efa\u914d\u7f6e\u9879\uff0c\u6240\u6709\u7684\u914d\u7f6e\u9879\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"ice.config.mts")," \u4e2d\u8bbe\u7f6e\u3002"),(0,a.kt)("h2",{id:"\u914d\u7f6e\u6587\u4ef6"},"\u914d\u7f6e\u6587\u4ef6"),(0,a.kt)("h3",{id:"\u6784\u5efa\u914d\u7f6e\u6587\u4ef6"},"\u6784\u5efa\u914d\u7f6e\u6587\u4ef6"),(0,a.kt)("p",null,"\u4e3a\u4e86\u83b7\u53d6\u826f\u597d\u7684\u7c7b\u578b\u63d0\u793a\uff0cICE \u63a8\u8350\u4ee5 ",(0,a.kt)("inlineCode",{parentName:"p"},"ice.config.mts")," \u4f5c\u4e3a\u914d\u7f6e\u6587\u4ef6\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  publicPath: '/',\n});\n")),(0,a.kt)("h3",{id:"\u517c\u5bb9\u6027\u914d\u7f6e"},"\u517c\u5bb9\u6027\u914d\u7f6e"),(0,a.kt)("p",null,"\u6784\u5efa\u7684\u517c\u5bb9\u6027\u914d\u7f6e\u63a8\u8350\u914d\u7f6e\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},".browserslistrc")," \u6587\u4ef6\u4e2d\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"chrome 55\n")),(0,a.kt)("p",null,"\u66f4\u591a\u914d\u7f6e\u8bf7\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/browserslist/browserslist#readme"},"browserslist \u6587\u6863")),(0,a.kt)("h2",{id:"\u914d\u7f6e\u9879"},"\u914d\u7f6e\u9879"),(0,a.kt)("h3",{id:"alias"},"alias"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"Record<string, string | false>")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{}"))),(0,a.kt)("p",null,'\u5728 icejs \u9ed8\u8ba4\u914d\u7f6e\u4e86 { "@": "./src/" } \u7684\u89c4\u5219\uff0c\u56e0\u6b64\u9879\u76ee\u5927\u591a\u6570\u65f6\u5019\u4e0d\u9700\u8981\u914d\u7f6e\uff0c\u914d\u7f6e\u5b8c\u6210\u540e\u5219\u53ef\u4ee5\u66f4\u52a0\u7b80\u5355\u7684\u5bfc\u5165\u6a21\u5757\u4e86\uff1a'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-diff"},"-import CustomTips from '../../../components/CustomTips';\n+import CustomTips from '@/components/CustomTips';\n")),(0,a.kt)("p",null,"\u5982\u679c\u9700\u8981\u914d\u7f6e\u522b\u540d\u5bf9 import \u8def\u5f84\u8fdb\u884c\u6620\u5c04\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  alias: {\n    pages: './src/pages',\n  },\n});\n")),(0,a.kt)("h3",{id:"define"},"define"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"Record<string, string | boolean>")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{}"))),(0,a.kt)("p",null,"\u914d\u7f6e\u8fd0\u884c\u65f6\u53d8\u91cf\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  define: {\n    ASSETS_VERSION: '0.1.0',\n    'process.env.TEST': true,\n  },\n});\n")),(0,a.kt)("p",null,"\u5728\u4ee3\u7801\u4e2d\u76f4\u63a5\u4f7f\u7528\u5bf9\u5e94\u5b9a\u4e49\u7684\u53d8\u91cf\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"console.log(ASSETS_VERSION);\nconsole.log(process.env.TEST);\n")),(0,a.kt)("p",null,"\u5bf9\u4e8e\u8fd0\u884c\u65f6\u53d8\u91cf\uff0cICE \u66f4\u52a0\u63a8\u8350\u901a\u8fc7",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/basic/env"},"\u73af\u5883\u53d8\u91cf"),"\u7684\u65b9\u5f0f\u6ce8\u5165\u3002"),(0,a.kt)("h3",{id:"publicpath"},"publicPath"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"string")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"/"))),(0,a.kt)("p",null,"\u914d\u7f6e Webpack \u7684 ",(0,a.kt)("a",{parentName:"p",href:"https://webpack.js.org/configuration/output/#output-publicpath"},"output.publicPath")," \u5c5e\u6027\uff0c\u4ec5\u5728\u8fd0\u884c build \u547d\u4ee4\u65f6\u751f\u6548\u3002"),(0,a.kt)("h3",{id:"devpublicpath"},"devPublicPath"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"string")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"/"))),(0,a.kt)("p",null,"\u540c publicPath \u4ec5\u5728\u6267\u884c start \u65f6\u751f\u6548\u3002"),(0,a.kt)("h3",{id:"hash"},"hash"),(0,a.kt)("p",null,"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"boolean | string"),"\n\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"false")),(0,a.kt)("p",null,"\u5982\u679c\u5e0c\u671b\u6784\u5efa\u540e\u7684\u8d44\u6e90\u5e26 hash \u7248\u672c\uff0c\u53ef\u4ee5\u5c06 hash \u8bbe\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),"\uff0c\u4e5f\u53ef\u4ee5\u8bbe\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"contenthash")," \u6309\u6587\u4ef6\u5185\u5bb9\u751f\u6210 hash \u503c\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  hash: 'contenthash',\n});\n")),(0,a.kt)("h3",{id:"externals"},"externals"),(0,a.kt)("p",null,"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"Record<string, string>"),"\n\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"{}")),(0,a.kt)("p",null,"\u8bbe\u7f6e\u54ea\u4e9b\u6a21\u5757\u4e0d\u6253\u5305\uff0c\u8f6c\u800c\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"<script>")," \u6216\u5176\u4ed6\u65b9\u5f0f\u5f15\u5165\uff0c\u6bd4\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  externals: {\n    react: 'React',\n  },\n});\n")),(0,a.kt)("p",null,"\u5bf9\u5e94\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"document.ts")," \u6216\u8005\u9875\u9762\u6a21\u7248\u91cc\u6dfb\u52a0 CDN \u6587\u4ef6\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-diff"},'import { Main, Scripts } from \'ice\';\n\nfunction Document() {\n  return (\n    <html lang="en">\n      <body>        \n        <Main />\n+    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/cjs/react.production.min.js"><\/script>\n        <Scripts />\n      </body>\n    </html>\n  );\n}\n\nexport default Document;\n')),(0,a.kt)("h3",{id:"outputdir"},"outputDir"),(0,a.kt)("p",null,"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"string"),"\n\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"build")),(0,a.kt)("p",null,"\u6784\u5efa\u4ea7\u7269\u8f93\u51fa\u76ee\u5f55\uff0c\u9ed8\u8ba4\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"build")," \u76ee\u5f55"),(0,a.kt)("h3",{id:"proxy"},"proxy"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"object")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{}"))),(0,a.kt)("p",null,"\u914d\u7f6e dev \u5f00\u53d1\u9636\u6bb5\u7684\u4ee3\u7406\u529f\u80fd"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  proxy: {\n    '/api': {\n      target: 'http://jsonplaceholder.typicode.com/',\n      changeOrigin: true,\n      pathRewrite: { '^/api' : '' },\n    },\n  },\n});\n")),(0,a.kt)("h3",{id:"minify"},"minify"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"boolean")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"true"))),(0,a.kt)("p",null,"\u538b\u7f29\u4ea7\u7269\uff0c\u76ee\u524d\u9ed8\u8ba4\u4ec5\u5728 build \u9636\u6bb5\u751f\u6548"),(0,a.kt)("h3",{id:"droploglevel"},"dropLogLevel"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"'trace' | 'debug' | 'log' | 'warn' | 'error'")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"null"),"\uff0c\u4e0d\u79fb\u9664\u4efb\u4f55 console \u4ee3\u7801")),(0,a.kt)("p",null,"\u538b\u7f29\u4ee3\u7801\u65f6\u79fb\u9664 console.* \u76f8\u5173\u4ee3\u7801\uff0c\u6bd4\u5982\u914d\u7f6e\u4e86 log \u5219\u4f1a\u79fb\u9664 console.trace\n\u3001console.debug\u3001console.log \u4ee3\u7801\u3002"),(0,a.kt)("h3",{id:"compiledependencies"},"compileDependencies"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"array | boolean")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"[]"))),(0,a.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u4e3a\u4e86\u4fdd\u8bc1 dev \u5f00\u53d1\u9636\u6bb5\u7684\u4f53\u9a8c\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"node_modules")," \u4e0b\u6587\u4ef6\u4e0d\u4f1a\u8fdb\u884c\u7f16\u8bd1\uff0c\u800c\u8003\u8651\u5230 build \u9636\u6bb5\u5bf9\u4ee3\u7801\u4f53\u79ef\u7684\u6781\u81f4\u4f18\u5316\u4ee5\u53ca\u517c\u5bb9\u6027\u4fdd\u8bc1\uff0c\u5c06\u4f1a\u5bf9 ",(0,a.kt)("inlineCode",{parentName:"p"},"node_modules")," \u4e0b\u5185\u5bb9\u4e5f\u8fdb\u884c\u7f16\u8bd1\u3002\n\u5982\u679c\u5e0c\u671b\u4fee\u6b63\u9ed8\u8ba4\u884c\u4e3a\u53ef\u4ee5\u8fdb\u884c\u5982\u4e0b\u914d\u7f6e\uff0c\u8bbe\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),"\uff0c\u4e0d\u7ba1 dev \u8fd8\u662f build \u9636\u6bb5\u5747\u7f16\u8bd1 ",(0,a.kt)("inlineCode",{parentName:"p"},"node_modules"),"\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  compileDependencies: true,\n});\n")),(0,a.kt)("p",null,"\u5982\u679c\u660e\u786e\u77e5\u9053\u54ea\u4e9b\u4f9d\u8d56\u9700\u8981\u8fdb\u884c\u7f16\u8bd1\u4e5f\u53ef\u4ee5\u901a\u8fc7\u6b63\u5219\u65b9\u5f0f\u8fdb\u884c\u8bbe\u7f6e\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  compileDependencies: [/@alifd\\/next/, /need-compile/],\n});\n")),(0,a.kt)("h3",{id:"transform"},"transform"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"(code:string, id: string) => string | {code: string; map?: SourceMap | null;}")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"undefined"))),(0,a.kt)("p",null,"\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"transform")," \u914d\u7f6e\u5b9e\u73b0\u4ee3\u7801\u7684\u8f6c\u5316\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\nimport { transformSync } from '@babel/core';\n\nexport default defineConfig({\n  transform: (originalCode, id) => {\n    if (!id.includes('node_modules')) {\n      // \u501f\u52a9 babel \u7f16\u8bd1\n      const { code, map } = transformSync(originalCode, {\n        plugins: ['transform-decorators-legacy'],\n      });\n      return { code, map };\n    }\n  },\n});\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"ICE \u5185\u7f6e\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"swc")," \u63d0\u5347\u7f16\u8bd1\u4f53\u9a8c\uff0c\u5982\u679c\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"transform")," \u914d\u7f6e\u4e0a\u8fc7\u591a\u4f9d\u8d56 babel \u7b49\u5de5\u5177\u5c06\u53ef\u4ee5\u80fd\u9020\u6210\u7f16\u8bd1\u6027\u80fd\u74f6\u9888")),(0,a.kt)("h3",{id:"ssr"},"ssr"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"boolean")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"false"))),(0,a.kt)("p",null,"\u662f\u5426\u5f00\u542f SSR \u80fd\u529b\uff0c\u66f4\u591a SSR \u76f8\u5173\u5185\u5bb9\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"./ssr"},"SSR \u6587\u6863"),"\u3002"),(0,a.kt)("h3",{id:"ssg"},"ssg"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"boolean")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"true"))),(0,a.kt)("p",null,"\u662f\u5426\u5f00\u542f SSG \u80fd\u529b\uff0c\u66f4\u591a SSG \u76f8\u5173\u5185\u5bb9\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"./ssg"},"SSG \u6587\u6863"),"\u3002"),(0,a.kt)("h3",{id:"server"},"server"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{ format: 'esm' | 'cjs'; bundle: boolean }")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{ format: 'esm', bundle: false }"))),(0,a.kt)("p",null,"SSR / SSG \u4ea7\u7269\u6807\u51c6\uff0c\u63a8\u8350\u4ee5 ESM \u6807\u51c6\u8fdb\u884c\u6267\u884c\uff0c\u5982\u679c\u5e0c\u671b\u6253\u5305\u6210\u4e00\u4e2a cjs \u6a21\u5757\uff0c\u53ef\u4ee5\u8fdb\u884c\u5982\u4e0b\u8bbe\u7f6e\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  server: {\n    format: 'cjs',\n    bundle: true,\n  },\n});\n")),(0,a.kt)("h3",{id:"routes"},"routes"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{ignoreFiles: string[]; defineRoutes: (route) => void}")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{}"))),(0,a.kt)("p",null,"\u5b9a\u5236\u8def\u7531\u5730\u5740\uff0c\u5bf9\u4e8e\u7ea6\u5b9a\u5f0f\u8def\u7531\u4e0d\u6ee1\u8db3\u7684\u573a\u666f\uff0c\u53ef\u4ee5\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"routes")," \u65b9\u5f0f\u8fdb\u884c\u81ea\u5b9a\u4e49\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\n\nexport default defineConfig({\n  routes: {\n    // \u5ffd\u7565 pages \u4e0b\u7684 components \u76ee\u5f55\n    ignoreFiles: ['**/components/**'],\n    defineRoutes: (route) => {\n      // \u5c06 /about-me \u8def\u7531\u8bbf\u95ee\u5185\u5bb9\u6307\u5b9a\u4e3a about.tsx\n      route('/about-me', 'about.tsx');\n\n      // \u4e3a /product \u8def\u7531\u6dfb\u52a0 layout.tsx \u4f5c\u4e3a layout\uff0c\u5e76\u6e32\u67d3 products.tsx \u5185\u5bb9\n      route('/', 'layout.tsx', () => {\n        route('/product', 'products.tsx');\n      });\n    },\n  },\n});\n")),(0,a.kt)("h3",{id:"sourcemap"},"sourceMap"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"boolean | string")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"development")," \u6a21\u5f0f\uff1a\u9ed8\u8ba4\u4e3a 'cheap-module-source-map'\uff0c\u652f\u6301\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"li"},"false")," \u5173\u95ed\uff0c\u4e0d\u652f\u6301\u8bbe\u7f6e\u4e3a\u5176\u4ed6\u679a\u4e3e\u503c\u3002",(0,a.kt)("inlineCode",{parentName:"li"},"production")," \u6a21\u5f0f\uff1a\u9ed8\u8ba4 ",(0,a.kt)("inlineCode",{parentName:"li"},"false"),"\u3002")),(0,a.kt)("h3",{id:"tschecker"},"tsChecker"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"boolean")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"false"))),(0,a.kt)("p",null,"\u9ed8\u8ba4\u5173\u95ed TypeScript \u7c7b\u578b\u68c0\u6d4b\uff0c\u5982\u9700\u5f00\u542f\u914d\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," \u5373\u53ef\u3002"),(0,a.kt)("h3",{id:"eslint"},"eslint"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"boolean | object")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"undefined"))),(0,a.kt)("p",null,"\u914d\u7f6e\u8bf4\u660e\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"false"),"\uff1a\u4e0d\u68c0\u6d4b eslint \u9519\u8bef"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"true"),"\uff1a\u5c06 eslint \u9519\u8bef\u5c55\u793a\u5728\u9884\u89c8\u9875\u9762\u4e0a"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"object"),": \u4ec5 Webpack \u6a21\u5f0f\u652f\u6301\uff0c\u8868\u73b0\u7b49\u540c\u4e8e true\uff0c\u652f\u6301\u914d\u7f6e ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/webpack-contrib/eslint-webpack-plugin"},"eslint-webpack-plugin")," \u7684\u66f4\u591a\u53c2\u6570")),(0,a.kt)("h3",{id:"mock"},"mock"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{ exclude: string[] }")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"{}"))),(0,a.kt)("p",null,"\u914d\u7f6e\u5ffd\u7565 mock \u7684\u6587\u4ef6\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { defineConfig } from \'@ice/app\';\n\nexport default defineConfig({\n  mock: {\n    // \u5ffd\u7565 mock \u76ee\u5f55\u4e2d custom \u76ee\u5f55\u4e0b\u7684\u6587\u4ef6\u4ee5\u53ca api.ts \u6587\u4ef6\n    exclude: ["custom/**", "api.ts"]\n  },\n});\n')),(0,a.kt)("h3",{id:"webpack"},"webpack"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u578b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"(config: WebpackConfig, taskConfig: TaskConfig) => WebpackConfig")),(0,a.kt)("li",{parentName:"ul"},"\u9ed8\u8ba4\u503c\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"true"))),(0,a.kt)("p",null,"ICE \u9ed8\u8ba4\u57fa\u4e8e webpack \u8fdb\u884c\u6784\u5efa\uff0c\u5728\u4e0a\u8ff0\u63d0\u4f9b\u7684\u6784\u5efa\u914d\u7f6e\u65e0\u6cd5\u6ee1\u8db3\u7684\u60c5\u51b5\u4e0b\uff0c\u7528\u6237\u53ef\u4ee5\u5b9a\u5236 webpack \u914d\u7f6e\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { defineConfig } from '@ice/app';\nimport SpeedMeasurePlugin from 'speed-measure-webpack-plugin';\n\nexport default defineConfig({\n  webpack: (webpackConfig) => {\n    if (process.env.NODE_ENV !== 'test') {\n      // \u6dfb\u52a0 webpack \u63d2\u4ef6\n      webpackConfig.plugins?.push(new SpeedMeasurePlugin());\n    }\n    return webpackConfig;\n  },\n});\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"ICE \u5bf9 webpack \u6784\u5efa\u914d\u7f6e\u8fdb\u884c\u4e86\u5b9a\u5236\uff0c\u5e76\u501f\u52a9 esbuild \u7b49\u5de5\u5177\u63d0\u5347\u7528\u6237\u5f00\u53d1\u4f53\u9a8c\uff0c\u76f4\u63a5\u4fee\u6539 webpack \u914d\u7f6e\u7684\u65b9\u5f0f\u5e76\u4e0d\u63a8\u8350\u3002\n\u5982\u6709\u5b9a\u5236\u9700\u6c42\u6b22\u8fce\ud83d\udc4f PR \u6216\u53cd\u9988\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alibaba/ice/issues"},"https://github.com/alibaba/ice/issues"))))}d.isMDXComponent=!0}}]);