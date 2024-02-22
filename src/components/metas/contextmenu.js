import G6 from "@antv/g6";
import EventBus from "./events";

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
