<template>
  <div class="g6-board">
    <div class="g6-board--body" ref="canvas" @contextmenu.prevent></div>

    <div class="g6-board--zoom-tip" v-show="zoom.visible">{{ zoom.value }}</div>

    <fields-dialog :fields="options.nodeFields" :title="dialogs.node.editItem ? '编辑节点' : '添加节点'"
      :visible.sync="dialogs.node.visible" v-model="dialogs.node.form" :graph="graph" @ok="onNodeOk" />

    <fields-dialog :fields="options.edgeFields" title="编辑连接" :visible.sync="dialogs.edge.visible"
      v-model="dialogs.edge.form" :graph="graph" @ok="onEdgeOk" />

    <fields-dialog :fields="options.comboFields" :title="dialogs.combo.editItem ? '编辑分组' : '添加分组'"
      :visible.sync="dialogs.combo.visible" v-model="dialogs.combo.form" :graph="graph" @ok="onComboOk" />

    <contextmenu ref="contextmenu" :items="contextmenus" :title="contextmenuTitle"></contextmenu>
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
      /**
       * @type {G6.Graph}
       */
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
        },
        combo: {
          editItem: null,
          visible: false,
          form: {},
          position: {
            x: 0,
            y: 0
          }
        }
      },
      contextmenuTitle: '操作',
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
        }, {
          label: '添加分组',
          command: 'add-combo',
          handler: (e) => {
            this.dialogs.combo.editItem = null
            this.dialogs.combo.form = {}
            this.dialogs.combo.position.x = e.x
            this.dialogs.combo.position.y = e.y

            this.dialogs.combo.visible = true
          }
        }],
        node: [{
          label: '编辑节点',
          command: 'edit-node',
          handler: (e) => {
            const item = e.item
            const data = item.getModel()

            const e1 = {
              type: 'node',
              data: data,
              item: item,
              graph: this.graph
            }

            let form

            const handler = this.options.beforeEditHandler
            if (handler) {
              // 如果有返回值，则使用返回值作为节点数据
              const handleResult = handler(e1)
              // 返回 false 取消编辑
              if (handleResult === false) {
                return
              }
              if (handleResult === undefined) {
                form = {
                  ...data
                }
              } else {
                form = handleResult
              }
            } else {
              form = {
                ...data
              }
            }

            this.dialogs.node.form = form
            this.dialogs.node.editItem = item
            this.dialogs.node.visible = true
          }
        }, {
          label: '移除节点',
          command: 'remove-node',
          handler: (e) => {
            this.$confirm('您正在移除节点，此操作会同时移除与此节点相连接的边，是否继续？', '提示').then(() => {
              const item = e.item
              const data = item.getModel()
              this.graph.removeItem(item)
              this.emitChangeEvent('node-remove', {
                item: item,
                data: data
              })
            }).catch(() => { })
          }
        }],
        edge: [{
          label: '移除边',
          command: 'remove-edge',
          handler: (e) => {
            this.$confirm('您正在移除连接，是否继续？', '提示').then(() => {
              const item = e.item
              const data = item.getModel()
              this.graph.removeItem(item)
              this.emitChangeEvent('edge-remove', {
                item: item,
                data: data
              })
            }).catch(() => { })
          }
        }],
        combo: [{
          label: '添加节点',
          command: 'add-node',
          handler: (e) => {
            const comboId = e.item.getID()
            this.dialogs.node.editItem = null
            this.dialogs.node.form = {
              comboId
            }
            this.dialogs.node.position.x = e.x
            this.dialogs.node.position.y = e.y

            this.dialogs.node.visible = true
          }
        }, {
          label: '添加分组',
          command: 'add-combo',
          handler: (e) => {
            const comboId = e.item.getID()
            this.dialogs.combo.editItem = null
            this.dialogs.combo.form = {
              parentId: comboId
            }
            this.dialogs.combo.position.x = e.x
            this.dialogs.combo.position.y = e.y

            this.dialogs.combo.visible = true
          }
        }, {}, {
          label: '编辑分组',
          command: 'edit-combo',
          handler: (e) => {
            const item = e.item
            const data = item.getModel()

            const e1 = {
              type: 'combo',
              data: data,
              item: item,
              graph: this.graph
            }

            let form

            const handler = this.options.beforeEditHandler
            if (handler) {
              // 如果有返回值，则使用返回值作为节点数据
              const handleResult = handler(e1)
              // 返回 false 取消编辑
              if (handleResult === false) {
                return
              }
              if (handleResult !== undefined) {
                form = handleResult
              }
            } else {
              form = {
                ...data
              }
            }

            this.dialogs.combo.form = form
            this.dialogs.combo.editItem = item

            this.dialogs.combo.visible = true
          }
        }, {
          label: '解散分组',
          command: 'remove-combo',
          handler: (e) => {
            this.$confirm('您正在解散分组，是否继续？', '提示').then(() => {
              const item = e.item
              const data = item.getModel()
              this.graph.uncombo(item)
              this.emitChangeEvent('combo-remove', {
                item: item,
                data: data
              })
            }).catch(() => { })
          }
        }]
      },
      zoom: {
        handleTimer: -1,
        visibleTimer: -1,
        value: 100,
        visible: false
      },
      tooltipPlugins: [],
      gridPlugin: null,
      snapLinePlugin: null
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
      // const tc = document.createElement('div');
      // tc.id = 'toolbarContainer';
      // tc.style.position = 'absolute'
      // tc.style.top = '60px'
      // tc.style.right = '20px'
      // tc.style.width = '400px'
      // document.body.appendChild(tc);
      // const toolbar = new G6.ToolBar({
      //   container: tc,
      //   getContent: () => {
      //     return `
      //       <ul>
      //         <li code='add'>增加节点</li>
      //         <li code='undo'>撤销</li>
      //       </ul>
      //     `
      //   },
      //   handleClick: (code, graph) => {
      //     if (code === 'add') {
      //       graph.addItem('node', {
      //         id: 'node2',
      //         label: 'node2',
      //         x: 300,
      //         y: 150
      //       })
      //     } else if (code === 'undo') {
      //       toolbar.undo()
      //     }
      //   }
      // })

      const plugins = []
      if (this.options.tooltipRenderers.node) {
        // 允许出现 tooltip 的 item 类型
        this.options.tooltipRenderers.node.itemTypes = ['node']
        const tooltipOption = this.options.tooltipRenderers.node
        tooltipOption.shouldBegin = tooltipOption.shouldBegin.bind(this)
        tooltipOption.getContent = tooltipOption.getContent.bind(this)
        this.tooltipPlugins.push(new G6.Tooltip(this.options.tooltipRenderers.node))
      }
      if (this.options.tooltipRenderers.edge) {
        // 允许出现 tooltip 的 item 类型
        this.options.tooltipRenderers.edge.itemTypes = ['edge']
        const tooltipOption = this.options.tooltipRenderers.edge
        tooltipOption.shouldBegin = tooltipOption.shouldBegin.bind(this)
        tooltipOption.getContent = tooltipOption.getContent.bind(this)
        this.tooltipPlugins.push(new G6.Tooltip(this.options.tooltipRenderers.edge))
      }

      plugins.push(...this.tooltipPlugins)

      // 创建 G6 图实例
      const graph = this.graph = new G6.Graph({
        // 指定图画布的容器 id
        container: this.$refs.canvas,
        enabledStack: true,
        groupByTypes: false,
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
            // 'zoom-canvas',
            'drag-node',
            'drag-combo',
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
            lineAppendWidth: 5
          },
          ...styles.edge
        },
        defaultCombo: {
          type: 'rect-ext',
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

      this.$emit('ready', {
        graph
      })
    },
    updateMode() {
      const mode = this.editMode ? 'edit' : 'default'
      this.graph.setMode(mode)

      if (!this.editMode) {
        this.$refs.contextmenu.hide()
      }

      // 网格插件
      if (this.editMode) {
        this.gridPlugin = new G6.Grid()
        this.graph.addPlugin(this.gridPlugin)
        this.snapLinePlugin = new G6.SnapLine()
        this.graph.addPlugin(this.snapLinePlugin)
      } else {
        if (this.gridPlugin) {
          this.graph.removePlugin(this.gridPlugin)
        }
        if (this.snapLinePlugin) {
          this.graph.removePlugin(this.snapLinePlugin)
        }
      }

      // tooltip 插件，在编辑模式下禁用
      const tooltipEnabled = !this.editMode
      this.tooltipPlugins.forEach(tooltip => {
        tooltip.set('enabled', tooltipEnabled)
      })

      // 更新连线的箭头：
      // 在编辑模式时展示，预览模式时隐藏
      const showEndArrow = this.editMode
      this.data.edges.forEach(edge => {
        if (!edge.style) {
          edge.style = {}
        }
        edge.style.endArrow = showEndArrow
      })
      this.graph.render()
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
      EventBus.on('combo:contextmenu', this.onComboContextMenu)
      this.graph.on('wheelzoom', this.onCanvasZoom)
      this.graph.on('custom:add-edge', this.onEdgeAdded)
      this.graph.on('node:dragend', this.onDragEnd)
      this.graph.on('combo:dragend', this.onDragEnd)
    },
    unbindMethods() {
      EventBus.off('canvas:contextmenu', this.onCanvasContextMenu)
      EventBus.off('node:contextmenu', this.onNodeContextMenu)
      EventBus.off('edge:contextmenu', this.onEdgeContextMenu)
      EventBus.off('combo:contextmenu', this.onComboContextMenu)
      this.graph.off('wheelzoom', this.onCanvasZoom)
      this.graph.off('custom:add-edge', this.onEdgeAdded)
      this.graph.off('node:dragend', this.onDragEnd)
      this.graph.off('combo:dragend', this.onDragEnd)
    },
    onEdgeAdded(e) {
      this.emitChangeEvent('edge-add', {
        item: e.item,
        data: e.item.getModel()
      })
    },
    onDragEnd(e) {
      this.emitChangeEvent('location', {
        item: e.item,
        data: e.item.getModel()
      })
    },
    onCanvasZoom(e) {
      clearTimeout(this.zoom.handleTimer)
      clearTimeout(this.zoom.visibleTimer)

      this.zoom.handleTimer = requestAnimationFrame(() => {
        const zoom = this.graph.getZoom()
        this.zoom.value = (Math.round(zoom * 100))
        this.zoom.visible = true

        this.$emit('zoom', {
          type: 'zoom',
          value: zoom,
          event: e,
          graph: this.graph
        })

        this.zoom.visibleTimer = setTimeout(() => {
          this.zoom.visible = false
        }, 1000)
      })
    },
    onCanvasContextMenu(e) {
      this.contextmenuTitle = '操作'
      this.clearSelectedNode()
      this.showContextMenu(e, 'canvas')
    },
    onNodeContextMenu(e) {
      this.contextmenuTitle = '节点操作'
      this.clearSelectedNode()
      this.graph.setItemState(e.item, 'selected', true)
      this.showContextMenu(e, 'node')
    },
    onComboContextMenu(e) {
      this.contextmenuTitle = '分组操作'
      this.graph.setItemState(e.item, 'selected', true)
      this.showContextMenu(e, 'combo')
    },
    onEdgeContextMenu(e) {
      this.contextmenuTitle = '边操作'
      this.clearSelectedNode()
      this.showContextMenu(e, 'edge')
    },
    showContextMenu(e, type) {
      let x = e.canvasX
      let y = e.canvasY
      const item = e.item

      // 检查是否允许打开
      if (this.options.contextmenu) {
        let visible = this.options.contextmenu.visible
        if (visible !== undefined) {
          if (typeof visible === 'function') {
            visible = visible.call(this.graph, { type, item, data: item?.getModel(), graph: this.graph })
          }

          if (!visible) {
            this.$refs.contextmenu.hide()
            return
          }
        }
      }

      // const bounds = this.getBounds()
      // x += bounds.left
      // y += bounds.top
      this.$refs.contextmenu.show(x, y, type, item)
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
        item: editItem,
        graph: this.graph
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
        // 返回 false 取消编辑
        if (handleResult === false) {
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
        this.emitChangeEvent('node-update', {
          item: editItem,
          data: form
        })
      } else {
        // 检查数据是否重复
        if (this.data.nodes.some(node => node.id === form.id)) {
          this.$message.warning('添加失败，此数据已经存在')
          return
        }
        const newItem = this.graph.addItem('node', form)
        newItem.toFront()
        this.emitChangeEvent('node-add', {
          item: null,
          data: form
        })
      }
      this.dialogs.node.visible = false
    },
    emitChangeEvent(type, e) {
      if (!this.editMode) {
        // 非编辑模式下，不触发变更事件
        return
      }
      this.$nextTick(() => {
        e.type = type
        e.graph = this.graph
        this.$emit(type, e)
        this.$emit('change', e)
      })
    },
    onEdgeOk() {
    },
    async onComboOk() {
      const editItem = this.dialogs.combo.editItem
      let form = this.dialogs.combo.form
      // form.type = 'rect-ext'
      // form.type = 'rect'

      // 添加时，要设置分组的位置
      if (!editItem) {
        form.x = this.dialogs.combo.position.x
        form.y = this.dialogs.combo.position.y
      }
      const e = {
        type: 'combo',
        data: form,
        item: editItem,
        graph: this.graph
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
        // 返回 false 取消编辑
        if (handleResult === false) {
          return
        }
        if (handleResult !== undefined) {
          form = handleResult
        }
      }

      if (editItem) {
        // const oldData = editItem.getModel()
        // // 检查数据是否重复
        // if (oldData.id !== form.id && this.data.combos.some(node => node.id === form.id)) {
        //   this.$message.warning('编辑失败，此数据已经存在')
        //   return
        // }
        this.graph.updateItem(editItem, form)
        this.emitChangeEvent('combo-update', {
          item: editItem,
          data: form
        })
      } else {
        // // 检查数据是否重复
        // if (this.data.combos.some(combo => combo.id === form.id)) {
        //   this.$message.warning('添加失败，此数据已经存在')
        //   return
        // }
        const item = this.graph.addItem('combo', form)
        this.emitChangeEvent('combo-add', {
          item: item,
          data: form
        })
      }
      this.dialogs.combo.visible = false
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
    },
    /**
     * 将图导出为图片
     * @param {String} [name=graph] 图片的名称
     * @param {'image/png'|'image/jpeg'|'image/webp'|'image/bmp'} [type] 图片的类型。图的 renderer 为默认的 'canvas' 时生效，图的 renderer 为 'svg' 时将导出 svg 文件
     * @param {Object} [imageConfig] 图片的配置项，可选，具体字段见下方
     * @param {String} [imageConfig.backgroundColor] 图片的背景色，可选，不传值时将导出透明背景的图片
     * @param {Number|Number[]} [imageConfig.padding] 导出图片的上左下右 padding 值。当 padding 为 number 类型时，四周 padding 相等
     * @param {Number} [pixelRatio=window.devicePixelRatio] 控制导出图片的清晰度。默认使用 window.devicePixelRatio
     */
    exportImage(name, type, imageConfig, pixelRatio) {
      // 处理导出清晰度
      // 参考 https://github.com/antvis/G6/issues/2979
      let oldRatio
      if (pixelRatio) {
        oldRatio = window.devicePixelRatio;
        window.devicePixelRatio = pixelRatio;
      }
      this.graph.downloadFullImage(name, type, imageConfig)
      if (pixelRatio) {
        setTimeout(() => {
          window.devicePixelRatio = oldRatio;
        }, 100);
      }
    },
    /**
     * 将画布上元素生成为图片的 URL
     * @param {'image/png'|'image/jpeg'|'image/webp'|'image/bmp'} [type] 图片的类型。图的 renderer 为默认的 'canvas' 时生效，图的 renderer 为 'svg' 时将导出 svg 文件
     * @param {Object} [imageConfig] 图片的配置项，可选，具体字段见下方
     * @param {String} [imageConfig.backgroundColor] 图片的背景色，可选，不传值时将导出透明背景的图片
     * @param {Number|Number[]} [imageConfig.padding] 导出图片的上左下右 padding 值。当 padding 为 number 类型时，四周 padding 相等
     * @param {Number} [pixelRatio=window.devicePixelRatio] 控制导出图片的清晰度。默认使用 window.devicePixelRatio
     */
    async exportImageURL(type, imageConfig, pixelRatio) {
      return new Promise(resolve => {
        // 处理导出清晰度
        // 参考 https://github.com/antvis/G6/issues/2979
        let oldRatio
        if (pixelRatio) {
          oldRatio = window.devicePixelRatio;
          window.devicePixelRatio = pixelRatio;
        }
        this.graph.toFullDataURL((response) => {
          if (pixelRatio) {
            setTimeout(() => {
              window.devicePixelRatio = oldRatio;
            }, 100);
          }
          resolve(response)
        }, type, imageConfig)
      })
    }
  }
}
</script>
./setup
