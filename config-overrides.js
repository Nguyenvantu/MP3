const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#18b4c9",
      "@link-color": "#18b4c9",
      "@text-color": "rgba(0, 0, 0, .75)",
      "@text-color-secondary": "rgba(0, 0, 0, .55)",
      "@border-radius-base": "5px" 
    },
  }),
);