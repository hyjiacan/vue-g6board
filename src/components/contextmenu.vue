<template>
  <div class="g6-board--contextmenu" v-if="visible" @contextmenu.prevent :style="style" @click.stop>
    <div class="g6-board--contextmenu-title" v-if="title">{{ title }}</div>
    <ul class="g6-board--contextmenu-items">
      <li v-for="(item, i) in activeMenu" :key="i" :title="item.title" @click="onItemClick(item)"
        :class="{ 'g6-board--contextmenu-separator': !Object.keys(item).length }">
        <i></i>
        <span class="g6-board--contextmenu-item-label">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '操作'
    },
    /**
     * 数组表示菜单不复用
     * 对象表示菜单要复用，此时对象的每个 value 为数组
     * 空对象表示为分隔线
     * {
     * key1: [{
     *  command: 'xxx',
     *  label: 'xxx',
     *  title: 'xxx',
     * }],
     * key2: [{
     *
     * }]
     * }
     */
    items: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      visible: false,
      style: {
        left: 0,
        top: 0
      },
      active: null,
      position: {
        x: 0,
        y: 0
      },
      item: null
    }
  },
  mounted() {
    window.addEventListener('click', this.hide)
    window.addEventListener('keydown', this.hide)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.hide)
    window.removeEventListener('keydown', this.hide)
  },
  computed: {
    activeMenu() {
      if (Array.isArray(this.items)) {
        return this.items
      }
      return this.items[this.active]
    }
  },
  methods: {
    getBounds() {
      const rect = this.$el.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      }
    },
    async show(e, active, item) {
      let x = e.canvasX
      let y = e.canvasY
      this.position.x = e.x
      this.position.y = e.y

      this.item = item

      if (this.visible) {
        this.visible = false
        await this.$nextTick()
      }

      this.style.left = `${x}px`
      this.style.top = `${y}px`

      this.active = active
      this.visible = true

      this.$nextTick(() => {
        // 修正位置
        const bounds = this.getBounds()
        const winBounds = {
          width: window.innerWidth,
          height: window.innerHeight,
        }

        let fixRequired = false

        if ((bounds.left + bounds.width) > winBounds.width) {
          x = winBounds.width - bounds.width
          fixRequired = true
        }
        if ((bounds.top + bounds.height) > winBounds.height) {
          y = winBounds.height - bounds.height
          fixRequired = true
        }

        if (!fixRequired) {
          return
        }

        this.style.left = `${x}px`
        this.style.top = `${y}px`
      })
    },
    hide(e) {
      if (e instanceof KeyboardEvent) {
        // ESC 关闭
        if (e.keyCode !== 27) {
          return
        }
      }
      this.visible = false
    },
    onItemClick(item) {
      this.hide()

      this.$nextTick(() => {
        const e = {
          active: this.active,
          command: item.command,
          x: this.position.x,
          y: this.position.y,
          item: this.item,
        }
        this.$emit(`command`, e)
        if (item.handler) {
          item.handler(e)
        }
      })
    }
  },
}
</script>
