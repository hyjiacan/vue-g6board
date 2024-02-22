import G6 from "@antv/g6";

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
