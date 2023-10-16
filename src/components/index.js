import G6Board from './board.vue'
import './board.less'
import {
  defineFields,
  defineTooltip,
  defineOptions,
  InputTypes
} from './models'

function install(Vue) {
  Vue.component('G6Board', G6Board)
}

export default {
  install,
}

export {
  defineFields,
  defineTooltip,
  defineOptions,
  InputTypes
}
