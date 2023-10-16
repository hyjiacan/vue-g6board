/**
 * 输入框类型
 */
const InputTypes = {
  /**
   * 文本
   */
  TEXT: 1,
  /**
   * 长文本(多行)
   */
  LONGTEXT: 2,
  /**
   * 下拉选择框
   */
  SELECT: 3,
  /**
   * 复选
   */
  CHECKBOX: 4,
  /**
   * 单选
   */
  RADIO: 5,
  /**
   * 数值输入
   */
  NUMBER: 6,
  /**
   * 开关样式
   */
  SWITCH: 7
}

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
  render: function () { },
  /**
   * 远程数据加载函数
   */
  optionLoader: null,
  /**
   * 选项变更事件
   */
  optionChange: () => { },
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
   * 输入控件的类型，参考 G6Board.InputTypes
   * 默认值 G6Board.InputTypes.TEXT: 1
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


const BoardOptions = {
  /**
   * 编辑节点时的字段
   * @type {Field[]}
   */
  nodeFields: [],
  /**
   * 编辑边时的字段
   * @type {Field[]}
   */
  edgeFields: [],
  /**
   * 在编辑节点或边时的数据处理函数
   * @type {Function}
   */
  editHandler: () => { },
  styles: {
    /**
     * 节点的样式
     */
    node: {},
    /**
     * 边的样式
     */
    edge: {},
    /**
     * 分组的样式
     */
    combo: {},
    /**
     * 节点不同状态的样式
     */
    nodeStates: {
      /**
       * 节点被选中时的样式
       */
      selected: {
        'select-border': {}
      },
      /**
       * 节点高亮时的样式（在搜索节点命中时生效）
       */
      highlight: {
        'highlight-border': {}
      }
    },
    edgeStates: {
      /**
       * 边被选中时的样式
       */
      selected: {
      },
    },
  },
  /**
   * Tooltip 渲染器
   */
  tooltipRenderers: {
    /**
     * 节点的 Tooltip 渲染器
     * @type {defineTooltip}
     */
    node: () => { },
    /**
     * 边的 Tooltip 渲染器
     * @type {defineTooltip}
     */
    edge: () => { },
  }
}

/**
 * 定义编辑器的选项
 *
 * @param {BoardOptions} options
 * @returns {BoardOptions}
 */
function defineOptions(options) {
  return options
}

/**
 * 构造数据的工具函数
 * @param {Field[]} fields
 * @returns {Field[]}
 */
function defineFields(fields) {
  return fields || []
}

/**
 *
 * @param {Function<object>} renderer
 * @param {{x: number, y: number}} offset
 * @returns
 */
function defineTooltip(renderer, offset) {
  offset = Object.assign({
    x: 10,
    y: 10
  }, offset)
  return {
    // offsetX 与 offsetY 需要加上父容器的 padding
    offsetX: offset.x,
    offsetY: offset.y,
    getContent: (e) => {
      const data = e.item.getModel()
      return renderer(data)
    }
  }
}

export {
  InputTypes,
  FieldConfig,
  FieldOption,
  Field,
  BoardOptions,
  defineFields,
  defineOptions,
  defineTooltip
}
