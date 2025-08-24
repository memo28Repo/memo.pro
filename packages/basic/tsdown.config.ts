import {defineConfig} from 'tsdown'

export default defineConfig({
    entry: [
        "./src/index.ts",
        "./all.d.ts",
        "./array.d.ts",
        "./base.d.ts",
        "./func.d.ts",
        "./number.d.ts",
        "./object.d.ts",
        "./string.d.ts",
    ],
})