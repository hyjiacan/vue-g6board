import G6Board from './board.vue'
import './board.less'
import {
  defineFields,
  defineTooltip,
  defineOptions,
  InputTypes,
  BUILTIN_FIELDS
} from './models'
import anchorPoints from './metas/anchorPoints'

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
  InputTypes,
  BUILTIN_FIELDS,
  anchorPoints
}
