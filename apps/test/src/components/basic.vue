<template>
  <div class="basic-demo">
    <h2>Basic 扩展方法演示</h2>
    
    <!-- 字符串扩展方法演示 -->
    <section class="demo-section">
      <h3>String 扩展方法</h3>
      <div class="demo-item">
        <p>字符串: "{{ testString }}"</p>
        <p>isEmpty(): {{ stringResults.isEmpty }}</p>
        <p>isNotEmpty(): {{ stringResults.isNotEmpty }}</p>
        <p>firstOrNull(): {{ stringResults.firstOrNull }}</p>
        <p>lastOrNull(): {{ stringResults.lastOrNull }}</p>
        <p>eq("hello"): {{ stringResults.eq }}</p>
      </div>
    </section>

    <!-- 数组扩展方法演示 -->
    <section class="demo-section">
      <h3>Array 扩展方法</h3>
      <div class="demo-item">
        <p>数组: [{{ testArray.join(', ') }}]</p>
        <p>isEmpty(): {{ arrayResults.isEmpty }}</p>
        <p>isNotEmpty(): {{ arrayResults.isNotEmpty }}</p>
        <p>contains(2): {{ arrayResults.contains }}</p>
        <p>firstOrNull(): {{ arrayResults.firstOrNull }}</p>
        <p>lastOrNull(): {{ arrayResults.lastOrNull }}</p>
      </div>
    </section>

    <!-- 数字扩展方法演示 -->
    <section class="demo-section">
      <h3>Number 扩展方法</h3>
      <div class="demo-item">
        <p>数字: {{ testNumber }}</p>
        <p>isEmpty(): {{ numberResults.isEmpty }}</p>
        <p>isNotEmpty(): {{ numberResults.isNotEmpty }}</p>
        <p>isZero(): {{ numberResults.isZero }}</p>
        <p>isNotZero(): {{ numberResults.isNotZero }}</p>
        <p>greaterThan(5): {{ numberResults.greaterThan }}</p>
        <p>lessThan(15): {{ numberResults.lessThan }}</p>
      </div>
    </section>

    <!-- 对象扩展方法演示 -->
    <section class="demo-section">
      <h3>Object 扩展方法</h3>
      <div class="demo-item">
        <p>对象: {{ JSON.stringify(testObject) }}</p>
        <p>isEmpty(): {{ objectResults.isEmpty }}</p>
        <p>isNotEmpty(): {{ objectResults.isNotEmpty }}</p>
        <p>contains('name'): {{ objectResults.contains }}</p>
        <p>firstOrNull(): {{ objectResults.firstOrNull }}</p>
        <p>lastOrNull(): {{ objectResults.lastOrNull }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

/**
 * 测试数据
 */
const testString = 'hello'
const testArray = [1, 2, 3, 4, 5]
const testNumber = 10
const testObject = { name: 'Vue', version: '3.0', type: 'framework' }

/**
 * 字符串扩展方法结果
 */
const stringResults = computed(() => ({
  isEmpty: testString.isEmpty(),
  isNotEmpty: testString.isNotEmpty(),
  firstOrNull: testString.firstOrNull(),
  lastOrNull: testString.lastOrNull(),
  eq: testString.eq('hello')
}))

/**
 * 数组扩展方法结果
 */
const arrayResults = computed(() => ({
  isEmpty: testArray.isEmpty(),
  isNotEmpty: testArray.isNotEmpty(),
  contains: testArray.contains(2),
  firstOrNull: testArray.firstOrNull(),
  lastOrNull: testArray.lastOrNull()
}))

/**
 * 数字扩展方法结果
 */
const numberResults = computed(() => ({
  isEmpty: testNumber.isEmpty(),
  isNotEmpty: testNumber.isNotEmpty(),
  isZero: testNumber.isZero(),
  isNotZero: testNumber.isNotZero(),
  greaterThan: testNumber.greaterThan(5),
  lessThan: testNumber.lessThan(15)
}))

/**
 * 对象扩展方法结果
 */
const objectResults = computed(() => ({
  isEmpty: testObject.isEmpty(),
  isNotEmpty: testObject.isNotEmpty(),
  contains: testObject.contains('name'),
  firstOrNull: testObject.firstOrNull(),
  lastOrNull: testObject.lastOrNull()
}))
</script>

<style lang="scss" scoped>
.basic-demo {
  padding: 20px;
  font-family: Arial, sans-serif;

  h2 {
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .demo-section {
    margin-bottom: 30px;
    border: 1px solid #e1e8ed;
    border-radius: 8px;
    padding: 15px;
    background-color: #f8f9fa;

    h3 {
      color: #34495e;
      margin-bottom: 15px;
      border-bottom: 2px solid #3498db;
      padding-bottom: 5px;
    }

    .demo-item {
      p {
        margin: 8px 0;
        padding: 5px 10px;
        background-color: white;
        border-radius: 4px;
        border-left: 3px solid #3498db;
        
        &:first-child {
          font-weight: bold;
          background-color: #ecf0f1;
        }
      }
    }
  }
}
</style>