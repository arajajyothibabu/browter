import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';


export default {
    input: './src/index.js',
    moduleName: 'Browter',
    sourcemap: true,
    output: [
        {
            file: './dist/browter.js',
            name: "Browter",
            format: 'umd'
        }/*,
        {
            file: './lib/browter.js',
            format: 'es'
        }*/
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        resolve(),
        commonjs()
    ]
};