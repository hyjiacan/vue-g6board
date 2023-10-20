<template>
  <div class="app">
    <div class="toolbar">
      <div class="g6-board--title">
        <span>图编辑器</span>
      </div>

      <div style="gap: 20px;display: flex;">
        <div class="search">
          <span>查找节点</span>
          <el-input size="small" v-model="search.keyword" style="width: 200px" />
          <el-button size="small" @click="onSearch">查找</el-button>
        </div>

        <span>
          <span>编辑模式</span>
          <el-switch v-model="editMode"></el-switch>
        </span>

        <el-button size="small" @click="saveData">保存</el-button>
      </div>

    </div>
    <g6-board ref="board" :options="options" :data="data" :edit-mode="editMode" />
  </div>
</template>
<script>
import storage from '../assets/storage'
import options from '../assets/options'

export default {
  data() {
    const { nodes, edges, combos } = storage.get()
    return {
      options,
      deviceTypes: storage.getDeviceTypes(),
      data: {
        nodes,
        combos,
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
      editMode: true
    }
  },
  mounted() {
  },
  methods: {
    saveData() {
      const data = this.$refs.board.getData()
      storage.set(data)
      this.$message.success('数据已保存')
    },
    onSearch() {
      const keyword = this.search.keyword
      if (!keyword) {
        this.$refs.board.clearSelection()
        return
      }
      const nodes = this.$refs.board.findNode(node => {
        return node.ip.indexOf(keyword) !== -1 || node.label.indexOf(keyword) !== -1
      }, true)
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

.toolbar {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 5px 10px;
  box-sizing: border-box;
}
</style>
