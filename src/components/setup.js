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

G6.registerBehavior('add-edge', {
  getEvents() {
    return {
      'node:click': 'onClick',
      mousemove: 'onMousemove',
      // 点击空白处，取消边
      'edge:click': 'onEdgeClick'
    };
  },
  onClick(ev) {
    const node = ev.item;
    const graph = this.graph;
    const point = {
      x: ev.x,
      y: ev.y
    };
    const model = node.getModel();
    if (this.addingEdge && this.edge) {
      graph.updateItem(this.edge, {
        target: model.id,
      });
      // graph.setItemState(this.edge, 'selected', true);
      this.edge = null;
      this.addingEdge = false;
    } else {
      this.edge = graph.addItem('edge', {
        type: 'polyline-ext',
        source: model.id,
        target: point
      });
      this.addingEdge = true;
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
    const currentEdge = ev.item;
    // 拖拽过程中，点击会点击到新增的边上
    if (this.addingEdge && this.edge == currentEdge) {
      this.graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
    }
  }
});

G6.registerBehavior('contextmenu', {
  getEvents() {
    return {
      'canvas:contextmenu': 'onCanvasContextMenu',
      'node:contextmenu': 'onNodeContextMenu',
      'edge:contextmenu': 'onEdgeContextMenu',
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
})
