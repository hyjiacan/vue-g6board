import fields from '@/assets/fields'
import { defineOptions, defineTooltip } from '../components/models'
import storage from '@/assets/storage'

export default defineOptions({
  nodeFields: fields.nodeFields,
  edgeFields: fields.edgeFields,
  comboFields: fields.comboFields,
  styles: {
    edge: {
      type: 'polyline',
      style: {
        stroke: 'purple'
      }
    },
    combo: {
      type: 'rect-ext',
      style: {
        stroke: 'red',
        lineDash: [10, 2]
      },
      labelCfg: {
        style: {
          fontSize: 10,
          stroke: 'red',
          fill: 'blue',
          backgroundColor: 'red'
        }
      },
      title: {
        style: {
          stroke: 'blue'
        }
      },
      background: {
        style: {
          fill: 'yellow'
        }
      }
    },
    nodeStates: {
      highlight: {
        'highlight-border': {
          fill: 'green',
          fillOpacity: 0.1,
          stroke: 'green',
          strokeOpacity: 0.3,
          lineWidth: 2,
        }
      },
      selected: {
        'select-border': {
          stroke: 'blue',
          lineWidth: 3
        }
      },
      hover: {
        'select-border': {
          stroke: 'green'
        }
      }
    },
    edgeStates: {
      selected: {
        stroke: 'blue',
        lineWidth: 3
      },
      hover: {
        lineWidth: 3
      }
    }
  },
  beforeEditHandler(e) {
    if (e.type !== 'combo') {
      return
    }
    const data = {
      ...e.data,
      type: 'rect-ext',
    }
    // 有个 21 的 padding
    const bounds = e.item.getBBox()
    const padding = 21 * 2
    data.width = bounds.width - padding
    data.height = bounds.height - padding
    if (data.fixSize) {
      data.fixed = true
    } else {
      data.fixed = false
    }
    return data
  },
  editHandler(e) {
    const data = e.data
    if (e.type === 'node') {
      data.id = data.ip
      if (!data.type) {
        data.type = 'image-ext'
      }
      data.img = storage.getIcon(data.deviceType)
      data.size = storage.getSize(data.deviceType)
    } else if (e.type === 'combo') {
      data.label = data.name
      if (data.fixed) {
        data.fixSize = [data.width, data.height]
      } else {
        delete data.fixSize
      }
    }
    return data
  },
  tooltipRenderers: {
    node: defineTooltip(node => {
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
    }),

    edge: defineTooltip(edge => {
      const table = document.createElement('table')
      const data = [
        ['速率', '流量', '状态'],
        [edge.speed, edge.traffic, edge.state]
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
    })
  }
})
