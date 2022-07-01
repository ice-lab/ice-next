/** @type {import('@docusaurus/types').DocusaurusConfig} */
const navbar = require('./config/navbar');
const footer = require('./config/footer');

const config = {
  title: '飞冰 ICE ',
  tagline: ' 基于 React 的应用研发框架',
  url: 'https://v3.ice.work',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'alibaba',
  projectName: 'ice',
  themeConfig: {
    announcementBar: {
      id: 'announcementBar-2',
      content: 'ICE 3 已开始 Beta，不仅是 PC，更适配移动端能力，<a href="/docs/guide/upgrade">快速升级</a>',
      isCloseable: true,
    },
    navbar,
    footer,
    // algolia: {
    //   apiKey: '01f284e7e1c13eac3dc14beb6d8b153d',
    //   indexName: 'ice',
    // },
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: [
      'zh-CN',
      'en',
    ],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./config/sidebars.js'),
          // TODO
          editUrl:
            'https://github.com/ice-lab/ice-next/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // TODO
        // gtag: {
        //   trackingID: 'G-QZ0FEKY38G',
        // },
      },
    ],
  ],
  plugins: [
    require.resolve('./plugins/redirect.js'),
  ],
};

// if (process.env.USE_LOCAL_SEARCH) {
// 内部站点无法使用 algolia
delete config.themeConfig.algolia;
config.plugins.push([
  require.resolve('@easyops-cn/docusaurus-search-local'),
  {
    hashed: true,
    language: ['zh', 'en'],
  },
]);
// }

module.exports = config;
