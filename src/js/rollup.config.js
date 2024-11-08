import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/js/ifcJesp.js',
  output: {
    file: './src/bundle1.js',
    format: 'esm'
  },
  plugins: [resolve()]
};
