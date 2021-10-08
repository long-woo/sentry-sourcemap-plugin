import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

/**
 * 文件头说明
 * @param {*} name 包名
 * @param {*} fileName 文件名
 * @param {*} version 版本号
 */
const generateBanner = (name, fileName, version) => {
  return `/*! **************************************************
** ${name}(${fileName}) version ${version}
** (c) long.woo
** https://github.com/long-woo/sentry-sourcemap-plugin
*************************************************** */\n`;
};

const buildFormat = fileName => ({
  cjs: {
    outFile: `${fileName}.js`,
    format: 'cjs',
    mode: 'development'
  },
  'cjs-prod': {
    outFile: `${fileName}.min.js`,
    format: 'cjs',
    mode: 'production'
  },
  es: {
    outFile: `${fileName}.es.js`,
    format: 'esm',
    mode: 'development'
  },
  'es-prod': {
    outFile: `${fileName}.es.min.js`,
    format: 'esm',
    mode: 'production'
  }
});

/**
 * 获取配置
 * @param {*} param
 * outFile 输出文件名
 * format 编译文件类型
 * mode 编译环境
 */
const getConfig = ({ outFile, format, mode }) => {
  const isProduction = mode === 'production';

  const version = pkg.version;
  const external = Object.keys({ ...pkg.dependencies || ''});

  const globals = external.reduce((prev, current) => {
    prev[current] = current;

    return prev;
  }, {});

  return {
    input: 'src/index.ts',
    output: {
      file: `dist/${outFile}`,
      banner: generateBanner(pkg.name, outFile, version),
      globals,
      format,
      exports: 'auto'
    },
    plugins: [
      typescript({
        exclude: 'node_modules/**',
        typescript: require('typescript'),
        useTsconfigDeclarationDir: true
      }),
      resolve(),
      json(),
      isProduction && terser({
        format: {
          comments: /long\.woo/
        }
      })
    ],
    external
  };
};

const build = () => {
  const format = buildFormat(pkg.displayName);
  return Object.keys(format).map(key => getConfig(format[key]));
};

const buildConfig = build();

export default buildConfig;
