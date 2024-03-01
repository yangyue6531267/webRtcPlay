
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

import babelConfig from './babel.config';

import pkg from '../package.json';


const extensions = [
    '.js', '.ts'
];

export default {
    input: './src/index.ts',
    output: [
        {
            sourcemap: false,
            file: './dist/index.min.js',
            format: 'umd',
            name: 'ScSoftHandler',
            plugins: [ terser({
                format: {
                    preamble: `/* Version: ${pkg.version} */`,
                },
            }) ],
        },
        {
            sourcemap: true,
            file: './dist/index.umd.js',
            format: 'umd',
            name: 'ScSoftHandler'
        },
        {
            sourcemap: true,
            file: './dist/index.esm.js',
            format: 'es',
        }
    ],
    watch: false,
    plugins: [
        // Allows node_modules resolution
        nodeResolve({ extensions }),
        // Allow bundling cjs modules. Rollup doesn't understand cjs
        commonjs(),
        json(),
        replace({
            __VERSION__: pkg.version,
            preventAssignment: true,
        }),
        // Compile ts/js files
        babel({
            ...babelConfig,
            extensions,
        }),
    ]
};
