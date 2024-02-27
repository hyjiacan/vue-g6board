import G6 from "@antv/g6";

const offset = 8

G6.registerNode('image-ext', {
  afterDraw(cfg, group, img) {
    // 获取图形组中的第一个图形
    // 获取路径图形的中点坐标
    const { x, y, height, width } = img.attr()

    // 选择框
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

    // 渲染锚点
    // const bbox = group.getBBox();
    // const anchorPoints = this.getAnchorPoints(cfg)
    // anchorPoints.forEach((anchorPos, i) => {
    //   group.addShape('circle', {
    //     attrs: {
    //       r: 5,
    //       x: bbox.x + bbox.width * anchorPos[0],
    //       y: bbox.y + bbox.height * anchorPos[1],
    //       fill: '#fff',
    //       stroke: '#5F95FF'
    //     },
    //     name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
    //     anchorPointIdx: i, // flag the idx of the anchor-point circle
    //     links: 0, // cache the number of edges connected to this shape
    //     visible: true, // invisible by default, shows up when links > 1 or the node is in showAnchors state
    //     draggable: true // allow to catch the drag events on this shape
    //   })
    // })
  },
  afterUpdate(cfg, item) {
    // 获取图形组中的第一个图形
    // 获取路径图形的中点坐标
    const img = item.getKeyShape()
    const { x, y, height, width } = img.attr()
    const group = item.getContainer()

    const children = group.getChildren()

    const selectBorder = children.filter(item => item.get('name') === 'select-border')[0]

    if (selectBorder) {
      // 选中框
      selectBorder.attr({
        width: width + offset,
        height: height + offset,
        x: x - offset / 2,
        y: y - offset / 2,
      })
    }

    // 高亮框
    const highlightBorder = children.filter(item => item.get('name') === 'highlight-border')[0]
    if (highlightBorder) {
      const size = Math.max(height, width)
      highlightBorder.attr({
        r: size
      })
    }
  }
}, 'image')
