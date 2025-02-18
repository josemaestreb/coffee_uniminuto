window.$docsify = {
  themeColor: '#004875',
  alias: {
    '/((?!cn).)*/_sidebar.md': '/_sidebar.md',
    '/((?!cn).)*/_navbar.md': '/_navbar.md',
    '/cn/.*/_sidebar.md': '/cn/_sidebar.md',
    '/cn/.*/_navbar.md': '/cn/_navbar.md'
  },
  auto2top: true,
  coverpage: false,
  executeScript: true,
  loadSidebar: true,
  loadNavbar: true,
  mergeNavbar: true,
  maxLevel: 4,
  subMaxLevel: 2,
  name: 'Coffee Break',
  search: {
    noData: {
      '/cn/': '没有结果',
      '/': 'Sin Resultados'
    },
    paths: 'auto',
    placeholder: {
      '/cn/': '搜索',
      '/': 'Buscar'
    }
  },
  formatUpdated: '{MM}/{DD} {HH}:{mm}',
  externalLinkTarget: '_self',
  plugins: [
    (hook, vm) => {
      hook.beforeEach(async(content, next) => {
        const path = vm.route.path;
        if (path.indexOf('/editor/math') !== -1) {
          await loadPlugin('mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML');
        } else if (path.indexOf('/editor/diagrams') !== -1) {
          const plugins = [
            'raphael/2.3.0/raphael.min.js',
            'underscore.js/1.11.0/underscore-min.js',
            'js-sequence-diagrams/1.0.6/sequence-diagram-min.js',
            'flowchart/1.15.0/flowchart.min.js',
            'mermaid/8.8.4/mermaid.min.js'
          ];
          for (const src of plugins) {
            await loadPlugin(src);
          }
        }
        next(content);
      });
      hook.doneEach(() => {
        renderMathJax();
        renderDiagrams();
      });
    }
  ]
};

function loadPlugin(path) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/${path}`;
    document.head.appendChild(script);
  });
}