import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import template from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';

import babelConfig from './babel.config';

import pkg from '../package.json';


const extensions = [
    '.js', '.ts'
];

export default {
    input: [ './samples/index.ts' ],
    external: [],
    output: [
        {
            sourcemap: true,
            // dir: './dist/',
            file: './dist/index.bundle.js',
            format: 'umd',
            name: 'ScAuth',
        },
    ],
    watch: {
        include: [ 'src/**', 'samples/**', 'libs/**' ]
    },
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
        template({
            template: './samples/index.html',
            target: './dist/index.html',
        }),
        copy({
            targets: [
                { src: 'samples/ws-console.js', dest: 'dist' },
            ]
        }),
        serve({
            open: false,
            contentBase: ['dist'],
            port: 5050,
        }),
        livereload('dist'),
    ]
};
