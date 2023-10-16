<template>
  <div class="g6-board">
    <div class="g6-board--body" ref="canvas" @contextmenu.prevent></div>

    <fields-dialog :fields="options.nodeFields" :title="dialogs.node.editItem ? '编辑节点' : '添加节点'"
      :visible.sync="dialogs.node.visible" v-model="dialogs.node.form" :graph="graph" @ok="onNodeOk" />

    <fields-dialog :fields="options.edgeFields" title="编辑连接" :visible.sync="dialogs.edge.visible"
      v-model="dialogs.edge.form" :graph="graph" @ok="onEdgeOk" />

    <contextmenu ref="contextmenu" :items="contextmenus"></contextmenu>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import FieldsDialog from './fieldsdialog.vue'
import contextmenu from './contextmenu';
import EventBus from './events';
import './setup'

export default {
  components: { FieldsDialog, contextmenu },
  props: {
    title: {
      type: String,
      default: '图编辑器'
    },
    data: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    /**
     * @type {BoardOptions}
     */
    options: {
      type: Object,
      required: true
    },
  },
  watch: {
    editMode() {
      if (!this.graph) {
        return
      }
      this.updateMode()
    }
  },
  data() {
    return {
      graph: null,
      dialogs: {
        node: {
          editItem: null,
          visible: false,
          form: {},
          position: {
            x: 0,
            y: 0
          }
        },
        edge: {
          visible: false,
          form: {}
        }
      },
      contextmenus: {
        canvas: [{
          label: '添加',
          command: 'add-node',
          handler: (e) => {
            this.dialogs.node.editItem = null
            this.dialogs.node.form = {}
            this.dialogs.node.position.x = e.x
            this.dialogs.node.position.y = e.y

            this.dialogs.node.visible = true
          }
        }],
        node: [{
          label: '编辑',
          command: 'edit-node',
          handler: (e) => {
            this.dialogs.node.editItem = e.data
            this.dialogs.node.form = {
              ...e.data.getModel()
            }
            this.dialogs.node.visible = true
          }
        }, {
          label: '移除',
          command: 'remove-node',
          handler: (e) => {
            this.$confirm('您正在移除节点，此操作会同时移除与此节点相连接的边，是否继续？', '提示').then(() => {
              const data = e.data
              this.graph.removeItem(data)
            }).catch(() => { })
          }
        }],
        edge: [{
          label: '移除',
          command: 'remove-edge',
          handler: (e) => {
            this.$confirm('您正在移除连接，是否继续？', '提示').then(() => {
              const data = e.data
              this.graph.removeItem(data)
            }).catch(() => { })
          }
        }],
      }
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.unbindMethods()
  },
  methods: {
    init() {
      const styles = this.options.styles
      const size = this.getBounds()

      const plugins = []
      if (this.options.tooltipRenderers.node) {
        // 允许出现 tooltip 的 item 类型
        this.options.tooltipRenderers.node.itemTypes = ['node']
        plugins.push(new G6.Tooltip(this.options.tooltipRenderers.node))
      }
      if (this.options.tooltipRenderers.edge) {
        // 允许出现 tooltip 的 item 类型
        this.options.tooltipRenderers.edge.itemTypes = ['edge']
        plugins.push(new G6.Tooltip(this.options.tooltipRenderers.edge))
      }

      // 创建 G6 图实例
      const graph = this.graph = new G6.Graph({
        // 指定图画布的容器 id
        container: this.$refs.canvas,
        enabledStack: true,
        plugins,
        modes: {
          // 支持的 behavior
          default: [
            'zoom-canvas',
            'click-select',
            // 'activate-relations',
            'select-item',
            'drag-canvas',
          ],
          edit: [
            'click-select',
            'select-item',
            'zoom-canvas',
            'drag-node',
            // 'create-edge',
            'add-edge',
            'contextmenu',
            'drag-canvas',
          ]
        },
        // 画布宽高
        width: size.width,
        height: size.height,
        defaultNode: {
          ...styles.node
        },
        defaultEdge: {
          style: {
            lineAppendWidth: 5,
          },
          ...styles.edge
        },
        defaultCombo: {
          type: 'rect',
          // padding: 0,
          // style: {

          // }
          labelCfg: {
            style: {
              fontSize: 24
            }
          },
          ...styles.combo
        },
        nodeStateStyles: {
          ...styles.nodeStates
        },
        edgeStateStyles: {
          ...styles.edgeStates
        },
      });
      graph.data(this.data);
      graph.render()

      window.G6 = graph

      // // 处理多边场景
      // const offsetDiff = 10;
      // const multiEdgeType = 'quadratic';
      // const singleEdgeType = 'polyline-ext';
      // const loopEdgeType = 'loop';
      // G6.Util.processParallelEdges(this.data.edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType);

      this.bindMethods()

      this.updateMode()
    },
    updateMode() {
      const mode = this.editMode ? 'edit' : 'default'
      this.graph.setMode(mode)
    },
    getBounds() {
      const rect = this.$refs.canvas.getClientRects()[0]
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      }
    },
    bindMethods() {
      EventBus.on('canvas:contextmenu', this.onCanvasContextMenu)
      EventBus.on('node:contextmenu', this.onNodeContextMenu)
      EventBus.on('edge:contextmenu', this.onEdgeContextMenu)
    },
    unbindMethods() {
      EventBus.off('canvas:contextmenu', this.onCanvasContextMenu)
      EventBus.off('node:contextmenu', this.onNodeContextMenu)
      EventBus.off('edge:contextmenu', this.onEdgeContextMenu)
    },
    onCanvasContextMenu(e) {
      this.clearSelectedNode()
      this.showContextMenu(e, 'canvas')
    },
    onNodeContextMenu(e) {
      this.clearSelectedNode()
      this.graph.setItemState(e.item, 'selected', true)
      this.showContextMenu(e, 'node')
    },
    onEdgeContextMenu(e) {
      this.clearSelectedNode()
      this.showContextMenu(e, 'edge')
    },
    showContextMenu(e, type) {
      let x = e.canvasX
      let y = e.canvasY
      const data = e.item

      // const bounds = this.getBounds()
      // x += bounds.left
      // y += bounds.top
      this.$refs.contextmenu.show(x, y, type, data)
    },
    async onNodeOk() {
      const editItem = this.dialogs.node.editItem
      let form = this.dialogs.node.form

      // 添加时，要设置节点的位置
      if (!editItem) {
        form.x = this.dialogs.node.position.x
        form.y = this.dialogs.node.position.y
      }
      const e = {
        type: 'node',
        data: form,
        node: editItem
      }

      const editHandler = this.options.editHandler
      if (editHandler) {
        // 如果有返回值，则使用返回值作为节点数据
        let handleResult
        try {
          handleResult = await editHandler(e)
        } catch (e) {
          this.$message.warning(e.message)
          return
        }
        if (handleResult !== undefined) {
          form = handleResult
        }
      }

      if (editItem) {
        const oldData = editItem.getModel()
        // 检查数据是否重复
        if (oldData.id !== form.id && this.data.nodes.some(node => node.id === form.id)) {
          this.$message.warning('编辑失败，此数据已经存在')
          return
        }
        this.graph.updateItem(editItem, form)
      } else {
        // 检查数据是否重复
        if (this.data.nodes.some(node => node.id === form.id)) {
          this.$message.warning('添加失败，此数据已经存在')
          return
        }
        this.graph.addItem('node', form)
      }
      this.dialogs.node.visible = false
    },
    onEdgeOk() {
      const editItem = this.dialogs.node.editItem
      const form = this.dialogs.node.form

      if (editItem) {
        this.graph.updateItem(editItem, form)
      } else {
        this.graph.addItem('node', form)
      }
    },
    clearSelectedNode() {
      const nodes = this.graph.findAllByState('node', 'selected')
      nodes.forEach(node => {
        this.graph.clearItemStates(node, 'selected')
      })
    },
    highlightNode(node) {
      this.graph.setItemState(node, 'highlight', true)
    },
    clearHighlightNodes() {
      const nodes = this.graph.getNodes()
      nodes.forEach(node => {
        this.graph.clearItemStates(node, 'highlight')
      })
    },
    // ---------- 以下是公开接口 --------------
    getData() {
      return this.graph.save()
    },
    getGraph() {
      return this.graph
    },
    undo() {
      this.graph.undo()
    },
    redo() {
      this.graph.redo()
    },
    clearSelection() {
      this.clearHighlightNodes()
    },
    findNode(predicator, highlight) {
      if (highlight) {
        this.clearHighlightNodes()
      }
      return this.graph.findAll('node', node => {
        const data = node.getModel()
        const hit = predicator(data)
        if (hit && highlight) {
          this.highlightNode(node)
        }
        return hit
      })
    }
  }
}
</script>
./setup
