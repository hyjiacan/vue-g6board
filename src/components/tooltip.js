import G6 from "@antv/g6"


const nodeTooltip = new G6.Tooltip({
  // offsetX and offsetY include the padding of the parent container
  // offsetX 与 offsetY 需要加上父容器的 padding
  offsetX: 10,
  offsetY: 10,
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const node = e.item.getModel()

    const table = document.createElement('table')

    const data = [
      ['名称', 'IP', '分组', '责任人'],
      [node.label, node.ip, node.group, node.resp_person + '/' + node.dept]
    ]

    for (let i = 0; i < data[0].length; i++) {
      const row = document.createElement('tr')
      for (let j = 0; j < data.length; j++) {
        const cell = document.createElement('td')
        cell.innerText = data[j][i]
        row.appendChild(cell)
      }
      table.appendChild(row)
    }
    return table
  }
})

const edgeTooltip = new G6.Tooltip({
  // offsetX and offsetY include the padding of the parent container
  // offsetX 与 offsetY 需要加上父容器的 padding
  offsetX: 10,
  offsetY: 10,
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['edge'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const node = e.item.getModel()
    const table = document.createElement('table')

    const data = [
      ['速率', '流量', '状态'],
      [node.speed, node.traffic, node.state]
    ]

    for (let i = 0; i < data[0].length; i++) {
      const row = document.createElement('tr')
      for (let j = 0; j < data.length; j++) {
        const cell = document.createElement('td')
        cell.innerText = data[j][i]
        row.appendChild(cell)
      }
      table.appendChild(row)
    }
    return table
  }
})

export default {
  nodeTooltip,
  edgeTooltip
}
