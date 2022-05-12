/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const getDocsFromDir = require('../scripts/getDocsFromDir');

module.exports = {
  docs: [
    'guide/about',
    'guide/start',
    'guide/practice',
    {
      type: 'category',
      label: '基础指南',
      collapsed: false,
      items: getDocsFromDir('guide/basic'),
    },
    {
      type: 'category',
      label: '进阶指南',
      collapsed: false,
      items: getDocsFromDir('guide/advanced'),
    },
    'guide/upgrade',
    'guide/plugin',
  ],
  examples: getDocsFromDir('examples'),
};