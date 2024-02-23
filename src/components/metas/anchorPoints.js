/**
 * 默认的锚点数据
 * 注意顺序： g6 内部可能是按 上下左右 在处理索引，而不是按此处的描述顺序
 */
const anchors = [{
  label: '上',
  anchor: [0.5, 0],
}, {
  label: '下',
  anchor: [0.5, 1],
}, {
  label: '左',
  anchor: [0, 0.5],
}, {
  label: '右',
  anchor: [1, 0.5],
},]

export default {
  getPoints() {
    return anchors.map(item => item.anchor)
  },
  getAnchors() {
    const data = [{
      label: '自动',
      value: null
    }]

    anchors.forEach((item, index) => {
      data.push({
        label: item.label,
        value: index
      })
    })

    return data
  }
}
