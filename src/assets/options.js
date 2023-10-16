import fields from '@/assets/fields'
import { defineOptions, defineTooltip } from '../components/models'
import storage from '@/assets/storage'

export default defineOptions({
  nodeFields: fields.nodeFields,
  edgeFields: fields.edgeFields,
  styles: {
    edge: {
      type: 'polyline'
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
  editHandler(e) {
    const data = e.data
    if (e.type === 'node') {
      data.id = data.ip
      if (!data.type) {
        data.type = 'image-ext'
      }
      data.img = storage.getIcon(data.deviceType)
      data.size = storage.getSize(data.deviceType)
    }
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
