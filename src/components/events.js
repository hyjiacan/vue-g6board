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

export default EventBus
