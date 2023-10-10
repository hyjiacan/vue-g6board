<template>
  <div class="g6-editor">
    <div class="g6-editor--toolbar">
      <slot name="toolbar"></slot>
    </div>
    <div class="g6-editor--body" ref="canvas" @contextmenu.prevent></div>
    <fields-dialog :fields="nodeFields" :title="dialogs.node.editItem ? '编辑节点' : '添加节点'"
      :visible.sync="dialogs.node.visible" v-model="dialogs.node.form" :graph="graph" @ok="onNodeOk" />
    <fields-dialog :fields="edgeFields" title="编辑连接" :visible.sync="dialogs.edge.visible" v-model="dialogs.edge.form"
      :graph="graph" @ok="onEdgeOk" />
    <contextmenu ref="contextmenu" :items="contextmenus"></contextmenu>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import FieldsDialog from './fieldsdialog.vue'
import contextmenu from './contextmenu';
import { GraphStyle } from './models';
import setup from './setup'

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
    nodeFields: {
      type: Array,
      required: true
    },
    edgeFields: {
      type: Array,
      required: true
    },
    editHandler: {
      type: Function
    },
    styles: {
      type: GraphStyle
    },
    editMode: {
      type: Boolean,
      default: false
    }
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
          label: '添加节点',
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
          // }, {
          //   label: '连线',
          //   command: 'add-edge',
          //   handler: (e) => {
          //     this.$confirm('您正在移除节点，此操作会同时移除与此节点相连接的边，是否继续？', '提示').then(() => {
          //       const data = e.data
          //       this.graph.removeItem(data)
          //     }).catch(() => { })
          //   }
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
      const styles = this.styles
      const size = this.getBounds()
      // 创建 G6 图实例
      const graph = this.graph = new G6.Graph({
        // 指定图画布的容器 id
        container: this.$refs.canvas,
        enabledStack: true,
        // plugins: [tooltip.edgeTooltip, tooltip.nodeTooltip],
        modes: {
          // 支持的 behavior
          default: [
            'zoom-canvas',
            'click-select',
            // 'activate-relations',
            'select-item'
          ],
          edit: [
            'drag-node',
            'create-edge',
            'contextmenu'
          ]
          // edge: [
          //   'create-edge'
          // ]
          // edit: ['click-add-node', 'click-add-edge', 'drag-combo', 'collapse-expand-combo', 'drag-node'],
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
          }
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

      window.G = graph

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
      setup.events.on('canvas:contextmenu', this.onCanvasContextMenu)
      setup.events.on('node:contextmenu', this.onNodeContextMenu)
      setup.events.on('edge:contextmenu', this.onEdgeContextMenu)
    },
    unbindMethods() {
      setup.events.off('canvas:contextmenu', this.onCanvasContextMenu)
      setup.events.off('node:contextmenu', this.onNodeContextMenu)
      setup.events.off('edge:contextmenu', this.onEdgeContextMenu)
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

      const bounds = this.getBounds()
      x += bounds.left
      y += bounds.top
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

      if (this.editHandler) {
        // 如果有返回值，则使用返回值作为节点数据
        let handleResult
        try {
          handleResult = await this.editHandler(e)
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
      console.info('edge oooooooook')
      const editItem = this.dialogs.node.editItem
      const form = this.dialogs.node.form

      console.info(form)

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
    undo() {
      this.graph.undo()
    },
    redo() {
      this.graph.redo()
    },
    clearSelection() {
      this.clearHighlightNodes()
    },
    findNode(predicator) {
      this.clearHighlightNodes()
      return this.graph.findAll('node', node => {
        const data = node.getModel()
        const hit = predicator(data)
        if (hit) {
          this.highlightNode(node)
        }
        return hit
      })
    }
  }
}
</script>
./setup
