import G6Editor from './editor.vue'
import './editor.less'
import * as models from './models'

function install(Vue) {
  Vue.component('G6Editor', G6Editor)
}

G6Editor.InputTypes = models.InputTypes

G6Editor.Fields = models.Fields
G6Editor.GraphStyle = models.GraphStyle

export default {
  install
}

export {
  G6Editor,
}
