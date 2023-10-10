import G6 from "@antv/g6";
import { v4 } from 'uuid'

G6.registerBehavior('click-add-edge', {
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
        target: model.id
      });
      graph.setItemState(this.edge, 'selected', true);
      this.edge = null;
      this.addingEdge = false;
    } else {
      this.edge = graph.addItem('edge', {
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

// Register a custom behavior to add node
G6.registerBehavior('click-add-node', {
  getEvents() {
    return {
      'canvas:click': 'onClick'
    };
  },
  onClick(ev) {
    const graph = this.graph;
    if (!graph._addData) {
      return
    }
    const data = graph._addData
    graph._addData = null
    graph.addItem('node', {
      x: ev.canvasX,
      y: ev.canvasY,
      id: v4(),
      type: 'image',
      img: '/static/images/star.png',
      label: data.deviceName
    });
  }
});

const edgeType = 'egde-base'

G6.registerEdge(edgeType, {
  afterDraw(cfg, group) {
    const edge = cfg

    const children = group.getChildren()

    // 获取图形组中的第一个图形，在这里就是边的路径图形
    const shape = children[0];

    // 获取路径图形的中点坐标
    const midPoint = shape.getPoint(0.5);

    // 速率
    group.addShape('text', {
      attrs: {
        fill: '#000',
        text: edge.speed,
        textAlign: 'center',
        fontSize: 12,
        // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
        x: midPoint.x,
        y: midPoint.y - 30,
      },
      name: edgeType + '-speed',
    })
    // 流量
    group.addShape('text', {
      attrs: {
        fill: '#000',
        text: edge.traffic,
        textAlign: 'center',
        fontSize: 12,
        // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
        x: midPoint.x,
        y: midPoint.y - 10,
      },
      name: edgeType + '-traffic',
    })
    // 状态
    if (edge.state === '断开') {
      // 在中点增加一个矩形，注意矩形的原点在其左上角
      group.addShape('text', {
        attrs: {
          fill: '#f00',
          text: 'x',
          textAlign: 'center',
          fontSize: 20,
          // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
          x: midPoint.x,
          y: midPoint.y + 10,
        },
        name: edgeType + '-mark',
      });
    } else {
      // // 数据流通状态
      // // 卡顿时为红色，否则为绿色
      // const color = meta.state === '卡顿' ? 'red' : 'green'
      // const length = shape.getTotalLength()
      // // 速度
      // // 卡顿时为 10px/ms，否则为 40px/ms
      // const speed = meta.state === '卡顿' ? 10 : 40
      // const duration = Math.round((length / speed) * 1000)
      // const startPoint = shape.getPoint(0)
      // const state = group.addShape('circle', {
      //   attrs: {
      //     r: 3,
      //     fill: color,
      //     x: startPoint.x,
      //     y: startPoint.y,
      //   },
      //   name: edgeType + '-state',
      // })
      // state.animate(ratio => {
      //   const point = shape.getPoint(ratio)
      //   if (!point) {
      //     return {
      //       x: 0,
      //       y: 0
      //     }
      //   }
      //   return {
      //     x: point.x,
      //     y: point.y
      //   }
      // }, {
      //   repeat: true,
      //   duration
      // })
    }
  },
}, 'polyline')

G6.registerBehavior('select-edge', {
  getEvents() {
    return {
      'edge:click': 'onClick'
    }
  },
  onClick(e) {
    const graph = this.graph
    const edge = e.item
    const states = edge.getStates()
    if (states.indexOf('selected')) {
      graph.clearItemsStates(edge, 'selected')
    } else {
      edge.setState('selected', true)
    }
  }
})
