<template>
  <div class="g6-editor--contextmenu" v-if="visible" @contextmenu.prevent :style="style" @click.stop>
    <div class="g6-editor--contextmenu-title" v-if="title">{{ title }}</div>
    <ul class="g6-editor--contextmenu-items">
      <li v-for="item in activeMenu" :key="item.command" :title="item.title" @click="onItemClick(item)">
        <i></i>
        <span class="g6-editor--contextmenu-item-label">{{ item.label }}</span>
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
      data: null
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
    async show(x, y, active, data) {
      this.position.x = x
      this.position.y = y

      this.data = data

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
          data: this.data,
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

<style lang="less">
.g6-editor--contextmenu {
  position: absolute;
  user-select: none;
  background-color: #fff;
  box-shadow: 2px 2px 5px 1px #e6e5e5;
  min-width: 160px;
}

.g6-editor--contextmenu-title {
  padding: 5px;
  font-size: small;
  border-bottom: 1px solid #dbdadaaa;
  font-weight: bold;
}

.g6-editor--contextmenu-items {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    cursor: default;
    display: flex;
    font-size: small;

    &:hover {
      color: blue;
      background-color: rgb(215, 239, 247);
    }

    i {
      display: block;
      width: 30px;
      background-color: #dbdada88;
    }

    span {
      display: block;
      flex: 1 1;
      padding: 5px 10px 5px 5px;
    }
  }
}
</style>
