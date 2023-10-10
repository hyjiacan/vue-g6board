# g6editor

G6 图库的编辑器。

## 安装

```shell
npm i @wangankeji/vue-g6editor
```

## 用法

```vue

<template>
  <g6-editor />
</template>
<script>
import G6Editor from '@wangankeji/vue-g6editor'

export default {
  components: {G6Editor},
  data() {
    return {
    }
  }
}
</script>
```

## 属性

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |

## 属性编辑器

### 数据结构

此节描述 `node-props` 属性 和 `edge-props` 的数据结构。

```js
import G6Editor from '@wangankeji/vue-g6editor'

const props = [{
  // 展示名称
  "label": "",
  // 字段名称
  "field": "",
  // 默认值
  "default": null,
  // 提示文本
  "tip": "",
  // 参考 Element-UI 的 表单校验
  "validators": [{}],
  // 输入类型，参考类型 G6Editor.InputTypes
  "input": "",
  // 是否必填
  "required": false,
  // 允许输入的最大长度
  "maxlength": 0
}]
```

## 内置事件

| 名称  | 参数                         | 描述                                                                                  |
| ----- | ---------------------------- | ------------------------------------------------------------------------------------- |
| ready | {id: String, chart: echarts} | 组件首次渲染完成后触发。`id` 为 `ECharts` 组件实例的 id，并非 `echarts` 图表实例的 id |

> 仅当 `options` 不为空，并且其内的数据有效时才会渲染图表，在其后才会触发 `ready` 事件。
> `ready` 事件仅在首次渲染后会触发一次。

## 函数

### get

`ECharts.get(id)` 获取组件的 echarts 实例，`id` 为 `ready` 事件的参数， 也可以通过 `$el.getAttribute('data-echarts-id')` 获取到。

## 插槽

| 名称 | 参数 | 描述 |
| ---- | ---- | ---- |

## 参考

- 主题和附加参数 [echarts.init](https://echarts.apache.org/zh/api.html#echarts.init)
