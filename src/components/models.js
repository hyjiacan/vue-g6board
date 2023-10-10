import InputTypes from "./inputtypes"

const FieldConfig = {
  /**
   * 默认值
   */
  default: null,
  /**
   * 输入提示文本
   */
  tip: '',
  /**
   * 字段校验器，见 Element-UI 的 表单校验
   */
  validators: [],
  /**
   * 对于数值或文本输入类型，限制其输入的最小长度
   */
  minlength: 0,
  /**
   * 对于数值或文本输入类型，限制其输入的最大长度
   */
  maxlength: 255,
  /**
   * 是否只读
   */
  readonly: false,
  /**
   * 是否为隐藏域
   */
  hidden: false,
  /**
   * 是否必填
   */
  required: false,
  /**
   * 占位文本
   */
  placeholder: '',
  render: function () { }
}

const FieldOption = {
  /**
   * 名称
   */
  label: '',
  /**
   * 值
   */
  value: null,
  /**
   * 图标，目前仅支持图片
   */
  icon: null
}

/**
 * 字段的样式
 */
const FieldStyle = {}

/**
 * 字段定义
 */
const Field = {
  /**
   * 字段标签
   */
  label: '',
  /**
   * 字段名
   */
  name: '',
  /**
   * 输入控件的类型，参考 G6Editor.InputTypes
   * 默认值 G6Editor.InputTypes.TEXT: 1
   */
  inputType: 1,
  /**
   * 当 inputType 为 select/checkbox/radio 时的选项
   * @type {FieldOption}
   */
  options: [],
  /**
   * 选项
   * @type {FieldConfig}
   */
  config: {},
  /**
   * 控件样式
   * @type {FieldStyle}
   */
  style: {},
}

/**
 * @type {Field[]}
 */
class Fields extends Array {
  /**
   *
   * @param {Field[]} fields
   * @returns {Fields}
   */
  constructor(fields) {
    super()
    if (!fields) {
      return
    }
    fields.forEach(field => {
      field.config = Object.assign({}, FieldConfig, field.config)
      field.style = Object.assign({}, FieldStyle, field.style)

      if (field.inputType === InputTypes.CHECKBOX) {
        // 当输入类型为 checkbox 时，默认值应当为 []
        if (!field.config.default) {
          field.config.default = []
        }
      } else if (field.inputType === InputTypes.SWITCH) {
        // 当输入类型为 switch 时，默认值应当为 false
        if (!field.config.default) {
          field.config.default = false
        }
      }

      this.push(field)
    })
  }
}

const GraphStyleConfig = {
  node: {},
  edge: {},
  combo: {},
  nodeStates: {},
  edgeStates: {},
}

/**
 * 图形的样式定义
 */
class GraphStyle {
  /**
   * @param {GraphStyleConfig} options
   */
  constructor(options) {
    this.node = options.node
    this.edge = options.edge
    this.combo = options.combo
    this.nodeStates = options.nodeStates
    this.edgeStates = options.edgeStates
  }
}

export {
  InputTypes,
  FieldConfig,
  FieldOption,
  Field,
  Fields,
  GraphStyle,
  GraphStyleConfig
}
