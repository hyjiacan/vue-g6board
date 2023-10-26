import G6 from "@antv/g6";
import EventBus from "./events";

G6.registerNode('image-ext', {
  afterDraw(cfg, group, img) {
    // 获取图形组中的第一个图形
    // 获取路径图形的中点坐标
    const { x, y, height, width } = img.attr()

    // 选择框
    const offset = 8
    group.addShape('rect', {
      attrs: {
        width: width + offset,
        height: height + offset,
        x: x - offset / 2,
        y: y - offset / 2,
        radius: 4,
      },
      name: 'select-border'
    })

    // 高亮框
    const size = Math.max(height, width)
    group.addShape('circle', {
      attrs: {
        r: size,
        x: 0,
        y: 0,
      },
      name: 'highlight-border'
    })
  }
}, 'image')

G6.registerEdge('polyline-ext', {
  // afterDraw(cfg, group, line) {
  //   line.at
  // }
}, 'polyline')

G6.registerCombo('rect-ext', {
  drawShape(cfg, group) {
    const style = this.getShapeStyle(cfg);
    const rect = group.addShape('rect', {
      attrs: {
        ...style,
      },
      name: 'key-shape'
    })
    const titleKey = 'title'
    const titleCfg = cfg[titleKey]
    if (titleCfg) {
      const { width, height } = style
      group.addShape('rect', {
        attrs: {
          width: width,
          height: 30,
          x: -width / 2,
          y: -height / 2 - 5,
          ...titleCfg.style
        },
        draggable: titleCfg.draggable,
        name: titleKey
      })
    }
    const bgKey = 'background'
    const bgCfg = cfg[bgKey]
    if (cfg[bgKey]) {
      const { width, height } = style
      group.addShape(bgCfg.shape || 'rect', {
        attrs: {
          x: -width / 2,
          y: -height / 2 - 5 + 30,
          width: width,
          height: height - 30,
          ...bgCfg.style
        },
        draggable: bgCfg.draggable,
        name: bgKey
      })
    }

    return rect
  },
  afterUpdate(cfg, item) {
    const group = item.get('group')
    const shapes = group.getChildren()
    const style = this.getShapeStyle(cfg);
    const { width, height } = style

    shapes.forEach(shape => {
      const shapeName = shape.get('name')
      if (shapeName === 'title') {
        shape.attr({
          width: width,
          x: -width / 2,
          y: -height / 2 - 5,
        });
        return
      }
      if (shapeName === 'background') {
        shape.attr({
          x: -width / 2,
          y: -height / 2 - 5 + 30,
          width: width,
          height: height - 30,
        });
        return
      }
    })
  }
}, 'rect');
// G6.registerCombo('rect-ext', {
//   afterDraw(cfg, group, combo) {
//     let { width, height } = cfg
//     const handleSize = 50
//     const handleHeight = 2
//     const padding = 40
//     const color = 'green'

//     width += padding
//     height += padding

//     const origin = {
//       x: -width / 2,
//       y: -height / 2
//     }

//     const offset = {
//       x: (width - handleSize) / 2,
//       y: (height - handleSize) / 2,
//     }

//     // 允许分组拖动以调整大小
//     // top
//     const top = group.addShape('rect', {
//       attrs: {
//         x: origin.x + offset.x,
//         y: origin.y - 6,
//         height: handleHeight,
//         width: handleSize,
//         fill: color,
//         cursor: 'ns-resize'
//       },
//       name: 'resize-handle-top'
//     })

//     // right
//     const right = group.addShape('rect', {
//       attrs: {
//         x: origin.x + width - 1,
//         y: origin.y + offset.y,
//         width: handleHeight,
//         height: handleSize,
//         fill: color,
//         cursor: 'ew-resize'
//       },
//       name: 'resize-handle-right'
//     })
//     // bottom
//     const bottom = group.addShape('rect', {
//       attrs: {
//         x: origin.x + offset.x,
//         y: origin.y + height - 6,
//         height: handleHeight,
//         width: handleSize,
//         fill: color,
//         cursor: 'ns-resize'
//       },
//       name: 'resize-handle-bottom'
//     })
//     // left
//     const left = group.addShape('rect', {
//       attrs: {
//         x: origin.x - 1,
//         y: origin.y + offset.y,
//         width: handleHeight,
//         height: handleSize,
//         fill: color,
//         cursor: 'ew-resize'
//       },
//       name: 'resize-handle-left'
//     })

//     // 事件设定
//     let mouseDown = false
//     let resizeDir = ''
//     const pos = {
//       x: 0,
//       y: 0
//     }

//     function onMouseUp(e) {
//       window.removeEventListener('mouseup', onMouseUp)

//       if (!mouseDown) {
//         return
//       }
//       mouseDown = false

//       const { x, y } = e

//       const attrs = combo.getBBox()
//       console.info(attrs)
//       const bounds = {
//         x: attrs.canvasX,
//         y: attrs.canvasY,
//         width: attrs.width,
//         height: attrs.height,
//       }
//       const boundsOffset = {
//         x: x - pos.x,
//         y: y - pos.y
//       }
//       if (resizeDir === 'top' || resizeDir === 'bottom') {
//         bounds.y += boundsOffset.y
//         bounds.height += boundsOffset.y
//       } else {
//         bounds.x += boundsOffset.x
//         bounds.width += boundsOffset.x
//       }

//       console.info(boundsOffset, bounds)
//       const graph = window.G6
//       window.G6.updateItem(graph.findById(cfg.id), bounds)
//     }

//     function onMouseDown(dir, e) {
//       e.preventDefault();
//       resizeDir = dir
//       const { x, y } = e

//       mouseDown = true
//       pos.x = x
//       pos.y = y

//       window.addEventListener('mouseup', onMouseUp)
//     }

//     top.on('mousedown', onMouseDown.bind(null, 'top'))
//     right.on('mousedown', onMouseDown.bind(null, 'right'))
//     bottom.on('mousedown', onMouseDown.bind(null, 'bottom'))
//     left.on('mousedown', onMouseDown.bind(null, 'left'))
//   }
// }, 'rect')

G6.registerBehavior('select-item', {
  getEvents() {
    return {
      'edge:click': 'onClick',
      'edge:mouseover': 'onHover',
      'edge:mouseleave': 'onLeave',
      'node:click': 'onClick',
      'node:mouseover': 'onHover',
      'node:mouseleave': 'onLeave'
    }
  },
  onClick(e) {
    const item = e.item

    // 在连线时，如果点击空白处取消会报错
    try {
      item.setState('selected', true)
    } catch (e) {
      // ignore
    }
  },
  onHover(e) {
    const item = e.item
    item.setState('hover', true)
  },
  onLeave(e) {
    const graph = this.graph
    const item = e.item
    const states = item.getStates()
    if (states.indexOf('hover') !== -1) {
      graph.clearItemStates(item, 'hover')
    }
  }
})

// TODO 添加连线到分组的支持
G6.registerBehavior('add-edge', {
  getEvents() {
    return {
      'node:click': 'onClick',
      mousemove: 'onMousemove',
      // 点击空白处，取消边
      'edge:click': 'onEdgeClick'
    };
  },
  onEnd(model) {
    const graph = this.graph
    const source = this.edge.getModel().source
    const target = model.id
    // 不允许连线自环
    if (source === target) {
      // eslint-disable-next-line
      console.debug(`The edge is a loop, abort!`)
      graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
      return
    }
    // 如果边已经存在，则取消此操作
    // 禁止两个节点间连接多条线
    if (graph.find('edge', item => {
      const itemModel = item.getModel()
      return (itemModel.source === source && itemModel.target === target) ||
        (itemModel.source === target && itemModel.target === source)
    })) {
      // eslint-disable-next-line
      console.debug(`The edge from ${source} to ${target} is duplicated, abort!`)
      graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
      return
    }
    const defaultStyle = graph.cfg.defaultEdge.style
    graph.updateItem(this.edge, {
      target: target,
      style: {
        ...defaultStyle
      }
    });
    this.edge.toFront()
    graph.emit('custom:add-edge', {
      item: this.edge
    })
    // graph.setItemState(this.edge, 'selected', true);
    this.edge = null;
    this.addingEdge = false;
  },
  onClick(ev) {
    const node = ev.item;
    const graph = this.graph;
    const point = {
      x: ev.x,
      y: ev.y
    };
    // function cancel(e) {
    //   if (e.keyCode === 27) {
    //     window.removeEventListener('keydown', cancel)
    //     // ESC 取消连线
    //     graph.removeItem(this.edge);
    //     this.edge = null;
    //     this.addingEdge = false;
    //   }
    // }
    const model = node.getModel();
    if (this.addingEdge && this.edge) {
      this.onEnd(model)
    } else {
      const option = {
        type: 'polyline-ext',
        source: model.id,
        target: point,
        style: {
          ...this.graph.cfg.defaultEdge.style,
          endArrow: true
        }
      }
      if (model._lineType) {
        option.type = model._lineType
      }
      if (model._lineStyle === 'dotted') {
        option.style.lineDash = [2, 2]
      } else if (model._lineStyle === 'dashed') {
        option.style.lineDash = [10, 2]
      }
      this.edge = graph.addItem('edge', option);
      this.addingEdge = true;
      // window.addEventListener('keydown', cancel)
    }
  },
  onMousemove(ev) {
    const point = {
      x: ev.x,
      y: ev.y
    };
    if (this.addingEdge && this.edge) {
      this.graph.updateItem(this.edge, {
        target: point
      });
    }
  },
  onEdgeClick(ev) {
    // 拖拽过程中，点击会点击到新增的边上
    if (!this.addingEdge || this.edge !== ev.item) {
      return
    }

    // 突然出现鼠标始终会点击在线上的问题，在此添加代码片段以处理
    const graph = this.graph
    const { x, y } = graph.getPointByClient(ev.clientX, ev.clientY);

    let targetItem
    const nodes = graph.getNodes()
    for (const node of nodes) {
      const bbox = node.getBBox();
      if (x >= bbox.minX && x <= bbox.maxX && y >= bbox.minY && y <= bbox.maxY) {
        targetItem = node;
        break
      }
    }

    if (targetItem) {
      this.onEnd(targetItem.getModel())
      return
    }

    // eslint-disable-next-line
    console.debug(`The edge adding is canceled!`)
    this.graph.removeItem(this.edge);
    this.edge = null;
    this.addingEdge = false;
  }
});

G6.registerBehavior('contextmenu', {
  getEvents() {
    return {
      'canvas:contextmenu': 'onCanvasContextMenu',
      'node:contextmenu': 'onNodeContextMenu',
      'edge:contextmenu': 'onEdgeContextMenu',
      'combo:contextmenu': 'onComboContextMenu',
    }
  },
  onCanvasContextMenu(e) {
    EventBus.emit('canvas:contextmenu', e)
  },
  onNodeContextMenu(e) {
    EventBus.emit('node:contextmenu', e)
  },
  onEdgeContextMenu(e) {
    EventBus.emit('edge:contextmenu', e)
  },
  onComboContextMenu(e) {
    EventBus.emit('combo:contextmenu', e)
  },
})
