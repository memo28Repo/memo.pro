import {defineMemoConfig} from '@memo28.pro/bundler'

export default defineMemoConfig({
    preset: 'browser',
    entry: [
        './src/index.ts',
        './all.d.ts',
        './array.d.ts',
        './base.d.ts',
        './func.d.ts',
        './number.d.ts',
        './object.d.ts',
        './string.d.ts',
    ],
    minify: true,
})
