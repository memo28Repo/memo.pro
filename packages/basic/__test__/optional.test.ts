import {describe, it, expect, vi} from 'vitest'
import './globalSetup'
import {Optional, optionalExtensions} from '../src'

describe('Optional 可选值工具', () => {
    it('of 应拒绝空值并抛出友好错误', () => {
        expect(() => Optional.of(null as any)).toThrowError(/不接受 null/)
        expect(() => Optional.of(undefined as any)).toThrowError(/不接受 null/)
    })

    it('ofNullable 应正确构建空与非空实例', () => {
        const nonEmpty = Optional.ofNullable('test')
        const emptyOpt = Optional.ofNullable(undefined)

        expect(nonEmpty.isPresent()).toBe(true)
        expect(nonEmpty.get()).toBe('test')
        expect(emptyOpt.isEmpty()).toBe(true)
        expect(() => emptyOpt.get()).toThrowError(/Optional 为空/)
    })

    it('map 与 filter 应保持链式语义', () => {
        const result = Optional.of(2)
            .filter(v => v > 1)
            .map(v => v * 2)
            .map(v => v.toString())

        expect(result.isPresent()).toBe(true)
        expect(result.get()).toBe('4')

        const filteredOut = Optional.of(1).filter(v => v > 10)
        expect(filteredOut.isEmpty()).toBe(true)
    })

    it('flatMap 应校验返回值类型', () => {
        const doubled = Optional.of(3).flatMap(v => Optional.of(v * 2))
        expect(doubled.get()).toBe(6)

        const invalid = () => Optional.of(1).flatMap(() => 123 as any)
        expect(invalid).toThrowError(/Optional 实例/)
    })

    it('orElse 与 orElseGet 应提供回退值', () => {
        const value = Optional.ofNullable<number>(null)
        expect(value.orElse(10)).toBe(10)

        const supplier = vi.fn(() => 20)
        expect(value.orElseGet(supplier)).toBe(20)
        expect(supplier).toHaveBeenCalledTimes(1)
    })

    it('orElseThrow 应抛出自定义错误', () => {
        const errorOpt = Optional.empty<string>()
        expect(() => errorOpt.orElseThrow(() => new TypeError('缺少值'))).toThrow(TypeError)

        const defaultError = Optional.empty<string>()
        expect(() => defaultError.orElseThrow()).toThrowError(/没有可用的值/)
    })

    it('or 应在缺失值时调用 supplier', () => {
        const fallback = Optional.empty<number>().or(() => Optional.of(42))
        expect(fallback.get()).toBe(42)

        const invalid = () => Optional.empty<number>().or(() => 1 as any)
        expect(invalid).toThrowError(/返回 Optional 实例/)
    })

    it('ifPresent 与 ifPresentOrElse 应正确处理分支', () => {
        const consumer = vi.fn()
        Optional.of('hi').ifPresent(consumer)
        expect(consumer).toHaveBeenCalledWith('hi')

        const fallback = vi.fn()
        Optional.empty<string>().ifPresentOrElse(consumer, fallback)
        expect(fallback).toHaveBeenCalledTimes(1)
    })

    it('toNullable 应方便地回退到 null', () => {
        expect(Optional.of('abc').toNullable()).toBe('abc')
        expect(Optional.empty<string>().toNullable()).toBeNull()
    })

    it('empty 应返回同一个共享实例', () => {
        const a = Optional.empty<number>()
        const b = Optional.empty<number>()
        expect(a).toBe(b)
    })

    it('已有 Optional 时应复用原实现并给出提示', () => {
        class LegacyOptional {}
        const globalScope = globalThis as typeof globalThis & {Optional?: unknown}
        const previous = globalScope.Optional
        globalScope.Optional = LegacyOptional as any

        try {
            const reused = optionalExtensions()
            expect(reused).toBe(LegacyOptional)
            expect(globalScope.Optional).toBe(LegacyOptional)
        } finally {
            globalScope.Optional = previous
            optionalExtensions() // 恢复为本包的实现，避免其他用例受影响
        }
    })
})
