class EventBus {
  constructor() {

    this.handlers = {}
  }

  on(eventType, handler) {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = []
    }

    this.handlers[eventType].push(handler)
  }

  off(eventType, handler) {
    if (!this.handlers[eventType]) {
      return
    }

    this.handlers[eventType] = this.handlers[eventType].filter(h => h !== handler)
  }

  emit(eventType, eventArgs) {
    if (!this.handlers[eventType]) {
      return
    }

    for (const handler of this.handlers[eventType]) {
      handler(eventArgs)
    }
  }
}

const instance = new EventBus()

EventBus.on = instance.on.bind(instance)
EventBus.off = instance.off.bind(instance)
EventBus.emit = instance.emit.bind(instance)

export default EventBus
