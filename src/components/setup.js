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
      name: 'select-box'
    })

    // 高亮框
    const size = Math.max(height, width)
    group.addShape('circle', {
      attrs: {
        r: size,
        x: 0,
        y: 0,
      },
      name: 'highlight-box'
    })
  }
}, 'image')

G6.registerEdge('polyline-ext', {
  // afterDraw(cfg, group, line) {
  //   line.at
  // }
}, 'polyline')

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
    // const graph = this.graph
    const edge = e.item
    // const states = edge.getStates()
    // if (states.indexOf('selected') !== -1) {
    //   graph.clearItemStates(edge, 'selected')
    // } else {
    edge.setState('selected', true)
    // }
  },
  onHover(e) {
    const edge = e.item
    edge.setState('hover', true)
  },
  onLeave(e) {
    const graph = this.graph
    const edge = e.item
    const states = edge.getStates()
    if (states.indexOf('hover') !== -1) {
      graph.clearItemStates(edge, 'hover')
    }
  }
})

const events = new EventBus()

G6.registerBehavior('contextmenu', {
  getEvents() {
    return {
      'canvas:contextmenu': 'onCanvasContextMenu',
      'node:contextmenu': 'onNodeContextMenu',
      'edge:contextmenu': 'onEdgeContextMenu',
    }
  },
  onCanvasContextMenu(e) {
    events.emit('canvas:contextmenu', e)
  },
  onNodeContextMenu(e) {
    events.emit('node:contextmenu', e)
  },
  onEdgeContextMenu(e) {
    events.emit('edge:contextmenu', e)
  },
})

export default {
  events
}
