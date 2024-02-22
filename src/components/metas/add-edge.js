import G6 from "@antv/g6";

// TODO 添加连线到分组的支持
G6.registerBehavior('add-edge', {
  getEvents() {
    return {
      'node:click': 'onClick',
      'combo:click': 'onClick',
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
      // 仅在按下了 Ctrl 时才允许连续线
      if (!ev.originalEvent.ctrlKey) {
        return
      }
      const option = {
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

      // 避免边被图形遮挡
      this.edge.toFront()
    }

    // const item = ev.item
    // if (item) {
    //   // 显示锚点
    //   item.setState('showAnchors', true)
    // }
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
    if (!targetItem) {
      const combos = graph.getCombos()
      for (const combo of combos) {
        const bbox = combo.getBBox();
        if (x >= bbox.minX && x <= bbox.maxX && y >= bbox.minY && y <= bbox.maxY) {
          targetItem = combo;
          break
        }
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
