import G6 from "@antv/g6";

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
