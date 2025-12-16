// 初始化扩展方法
import {stringExtensions, objectExtensions, arrayExtensions, numberExtensions, optionalExtensions} from '../src';
import {beforeAll, afterAll} from 'vitest'

// 保存原始原型方法
const originalPrototypes = {
    string: {...String.prototype},
    array: {...Array.prototype},
    number: {...Number.prototype},
    object: {...Object.prototype},
};

const originalGlobalOptional = (globalThis as typeof globalThis & {Optional?: unknown}).Optional;

beforeAll(() => {
    stringExtensions();
    arrayExtensions();
    numberExtensions();
    objectExtensions();
    optionalExtensions();
});

afterAll(() => {
    // 恢复原始原型
    Object.assign(String.prototype, originalPrototypes.string);
    Object.assign(Array.prototype, originalPrototypes.array);
    Object.assign(Number.prototype, originalPrototypes.number);
    Object.assign(Object.prototype, originalPrototypes.object);

    if (originalGlobalOptional === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete (globalThis as typeof globalThis & {Optional?: unknown}).Optional;
    } else {
        (globalThis as typeof globalThis & {Optional?: unknown}).Optional = originalGlobalOptional;
    }
});

// // 处理第三方库冲突
// declare global {
//     interface Window {
//         __originalPrototypes: typeof originalPrototypes;
//     }
// }
//
// window.__originalPrototypes = originalPrototypes;