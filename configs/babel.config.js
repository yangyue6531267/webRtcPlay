
export default {
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    // babelHelpers: 'runtime',
    presets: [
        [
            '@babel/preset-env',
            {
                // modules: false,
                // spec: true,
                // forceAllTransforms: true,
                targets: {
                    browsers: '> 1%, iOS >= 11, Chrome >= 69, not op_mini all, not dead',
                },
                useBuiltIns: 'usage',
                corejs: 3,
            }
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        // '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
    ],
};
