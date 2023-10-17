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
  SWITCH: 7,
  // /**
  //  * 图片选择器
  //  */
  // IMAGE: 8,
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
   * 数值的精度
   */
  precision: 0,
  /**
   * 是否只读
   */
  readonly: false,
  /**
   * 是否可见
   */
  isVisible: true,
  /**
   * 是否必填
   */
  required: false,
  /**
   * 占位文本
   */
  placeholder: '',
  /**
   * 远程数据加载函数
   */
  optionsLoader: null,
  /**
   * 是否正在从远程加载数据
   */
  optionsLoading: false,
  /**
   * 变更事件
   */
  onchange: () => { },
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
  icon: null,
  /**
   * 选项上展示的提示文本
   */
  title: ''
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
  /**
   * 自定义渲染组件
   */
  component: null,
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
   * @returns {Object|false} 返回 false 可以取消节点的操作
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
    shouldBegin() {
      // 仅在非编辑模式下才允许 tooltip 弹出
      if (this.editMode) {
        return false
      }
      return true
    },
    getContent(e) {
      // 仅在非编辑模式下才允许 tooltip 弹出
      if (this.editMode) {
        return ''
      }
      const data = e.item.getModel()
      const container = document.createElement('div')
      container.classList.add('g6-board--tooltip')

      const result = renderer(data, container)

      // 添加对异步的支持
      if (result instanceof Promise) {
        container.innerHTML = '<span>加载中 ...</span>'
        result.then(content => {
          if (typeof content === 'string') {
            container.innerHTML = content
          } else {
            container.innerHTML = ''
            container.appendChild(content)
          }
        })
      } else {
        if (typeof result === 'string') {
          container.innerHTML = result
        } else {
          container.appendChild(result)
        }
      }
      return container
    }
  }
}

const BUILTIN_FIELDS = {
  /**
   * 节点间连接边的绘制类型
   * @type {Field}
   */
  EDGE_TYPE: {
    label: '边类型',
    name: '_lineType',
    inputType: InputTypes.RADIO,
    options: [{
      label: '直线',
      value: 'line'
    }, {
      label: '折线',
      value: 'polyline'
    }, {
      label: '圆弧线',
      value: 'arc'
      // }, {
      //   label: '二阶贝塞尔曲线',
      //   value: 'quadratic'
      // }, {
      //   label: '三阶贝塞尔曲线',
      //   value: 'cubic'
      // }, {
      //   label: '垂直方向的三阶贝塞尔曲线',
      //   value: 'cubic-vertical'
      // }, {
      //   label: '水平方向的三阶贝塞尔曲线',
      //   value: 'cubic-horizontal'
      // }, {
      //   label: '自环',
      //   value: 'loop'
    }],
    config: {
      default: 'polyline'
    }
  },
  /**
   * 节点间连接边的绘制类型为圆弧时，调整其弧度
   * @type {Field}
   */
  EDGE_CURVE_OFFSET: {
    label: '边弧度',
    name: '_curveOffset',
    inputType: InputTypes.NUMBER,
    config: {
      tip: '指定弧的弯曲程度，其正负影响弧弯曲的方向。取值范围 -100 ~ 100',
      maxlength: 100,
      minlength: -100,
      default: 20,
      isVisible(e) {
        return e.data._lineType === 'arc'
      }
    }
  },
  EDGE_STYLE: {
    label: '边样式',
    name: '_lineStyle',
    inputType: InputTypes.RADIO,
    options: [{
      label: '实线',
      value: 'solid',
      title: '节点间使用实线连接'
    }, {
      label: '点线',
      value: 'dotted',
      title: '节点间使用点线连接'
    }, {
      label: '虚线',
      value: 'dashed',
      title: '节点间使用虚线连接'
    }],
    config: {
      default: 'solid'
    }
  },
  EDGE_VISIBLE: {
    label: '边可见',
    name: 'lineVisible',
    inputType: InputTypes.SWITCH,
    config: {
      default: true,
      tip: '在预览图时，边是否可见'
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
  defineTooltip,
  BUILTIN_FIELDS
}
