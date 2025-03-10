
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://naveen9688.github.io/pr-generate/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 23757, hash: 'ba58405e6494a1f66a00631b19ee98bbe975c2081faa0f94a287ec7694aba0ee', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17244, hash: '2315f7bc969a3858487d0d8202f28b0a27bfd3dd70b2e800d8ee237cccae9ec7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-PL2CEQYO.css': {size: 7066, hash: 'cyYNwhyMQWA', text: () => import('./assets-chunks/styles-PL2CEQYO_css.mjs').then(m => m.default)}
  },
};
