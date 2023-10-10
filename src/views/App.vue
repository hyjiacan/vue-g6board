<template>
  <div class="app">
    <g6-editor ref="editor" :styles="graphStyle" :data="data" :node-fields="fields.nodeFields"
      :edge-fields="fields.edgeFields" :edit-handler="editHandler" :edit-mode="editMode">
      <template #toolbar>
        <div class="g6-editor--title">
          <span>图编辑器</span>
        </div>

        <div class="search">
          <span>查找节点</span>
          <el-input size="small" v-model="search.keyword" style="width: 200px" />
          <el-button size="small" @click="onSearch">查找</el-button>
        </div>

        <div style="gap: 20px;display: flex;">
          <span>

            <span>编辑模式</span>
            <el-switch v-model="editMode"></el-switch>
          </span>
          <el-button size="small" @click="saveData">保存</el-button>
        </div>

      </template>
    </g6-editor>
  </div>
</template>
<script>
import storage from '../assets/storage'
import fields from '@/assets/fields'
import { GraphStyle } from '../components/models'

export default {
  data() {
    const { nodes, edges } = storage.get()
    return {
      fields,
      graphStyle: new GraphStyle({
        nodeStates: {
          highlight: {
            'highlight-box': {
              fill: 'green',
              fillOpacity: 0.1,
              stroke: 'green',
              strokeOpacity: 0.3,
              lineWidth: 2,
            }
          },
          selected: {
            'select-box': {
              stroke: 'blue',
              lineWidth: 3
            }
          },
          hover: {
            'select-box': {
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
      }),
      deviceTypes: storage.getDeviceTypes(),
      data: {
        nodes,
        edges: edges.map(edge => {
          if (edge.state === '正常') {
            edge.style = {
              stroke: 'green'
            }
          } else if (edge.state === '断开') {
            edge.style = {
              stroke: 'gray'
            }
          } else if (edge.state === '卡顿') {
            edge.style = {
              stroke: 'red'
            }
          } else {
            edge.style = {
              stroke: 'black'
            }
          }
          // link.label = meta.state
          return edge
        }),
        // combos: Object.values(combos)
      },
      search: {
        keyword: '192.168.1.1'
      },
      editMode: false
    }
  },
  mounted() {
  },
  methods: {
    saveData() {
      const data = this.$refs.editor.getData()
      storage.set(data)
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
    onSearch() {
      const keyword = this.search.keyword
      if (!keyword) {
        this.$refs.editor.clearSelection()
        return
      }
      const nodes = this.$refs.editor.findNode(node => {
        return node.ip.indexOf(keyword) !== -1 || node.label.indexOf(keyword) !== -1
      })
      console.info(nodes)
    }
  },
}
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
}

.app {
  height: 100vh;
}
</style>
