# G6Board

G6 图库的渲染与编辑器。

## 安装

```shell
npm i @wangankeji/vue-g6board
```

## 用法

```vue
<template>
  <g6-board ref="board" :options="options" :data="data" :edit-mode="editMode" />
</template>
<script>
import {defineOptions} from '@wangankeji/vue-g6board'

export default {
  components: {G6Board},
  data() {
    return {
      options: defineOptions({

      }),
      data: {
        nodes: [],
        edges: []
      },
      editMode: false
    }
  }
}
</script>
```

## 属性

| 名称      | 类型    | 必填 | 默认值 | 描述                                            |
| --------- | ------- | ---- | ------ | ----------------------------------------------- |
| options   | Object  | 是   | -      | 绘制的选项，使用 `defineOptions()` 定义 |
| data      | Object  | 是   | -      | 绘制的数据，结构见上方示例的 `data`             |
| edit-mode | boolean | 是   | -      | 是否启用编辑模式                                |

## 配置

配置是指需要传给属性 `options` 的数据，其由 `defineOptions` 定义。

## 函数

函数通过引用调用 `this.$refs.board`。

### getGraph

获取当前图的实例。

### getData

获取当前图的数据。

### findNode

`findNode(predicator, highlight)` 在图中查找节点，返回命中的项。

- `predicator` 判定函数，返回 `true` 表示命中
- `highlight` 是否在命中时高亮节点

### clearSelection

清除节点的查找命中状态。

### exportImage

`exportImage(name, type, config)`

导出图片。

### exportImageURL

`exportImageURL(name, type, config): Promise<String>`

导出图片为 Data URL。

## 事件

### ready

图形准备就绪时触发。

参数:

```json
{
  "graph": G6.Graph
}
```

### zoom

图形缩放时触发。

参数:

```json
{
  value: 100,
  event: MouseWhellEvent,
  graph: G6.Graph
}
```

## 样式

### 右键菜单

组件提供了以下样式变量

```css
--contextmenu-color: #000;
--contextmenu-background: #fff;
--contextmenu-shadow: 2px 2px 5px 1px #e6e5e5;

--contextmenu-title-color: #000;
--contextmenu-title-background: none;
--contextmenu-title-border-color: #dbdadaaa;

--contextmenu-hover-color: blue;
--contextmenu-hover-background: rgb(215, 239, 247);

--contextmenu-gutter-background: #dbdada88;

--contextmenu-separeator-color: #ebebeb transparent #fffefec7 transparent;
```

### 编辑弹框样式

可以通过全局样式 `g6-board--dialog` 来调整属性编辑框样式。

## 附录

### 数据结构

- 节点数据 [nodes](./src/assets/nodes.js)
- 边数据 [edges](./src/assets/edges.js)
- 配置 [options](./src/assets/options.js)

### 节点图标

现支持图片、SVG格式作为节点图标。
