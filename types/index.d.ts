import Vue from "vue/types/umd";
import { ModelStyle, StateStyles, Graph } from "@antv/g6";

/**
 * 输入框类型
 */
export type InputTypes = {
  /**
   * 文本
   */
  TEXT: 1;
  /**
   * 长文本(多行)
   */
  LONGTEXT: 2;
  /**
   * 下拉选择框
   */
  SELECT: 3;
  /**
   * 复选
   */
  CHECKBOX: 4;
  /**
   * 单选
   */
  RADIO: 5;
  /**
   * 数值输入
   */
  NUMBER: 6;
  /**
   * 开关样式
   */
  SWITCH: 7;
};

export function FieldVisibleFunction(e: {
  data: Object;
  fields: Map<String, Field>;
}): Boolean;

export interface FieldChangeEventArgs {
  type: "change";
  field: Field;
  value: any;
  data: Object;
  fields: Map<String, Field>;
  graph: Graph;
}

export interface FieldConfig {
  /**
   * 默认值
   */
  default?: any;
  /**
   * 输入提示文本
   */
  tip?: String;
  /**
   * 字段校验器，见 Element-UI 的 表单校验
   */
  validators?: Array<Object>;
  /**
   * 对于数值或文本输入类型，限制其输入的最小长度
   */
  minlength?: Number;
  /**
   * 对于数值或文本输入类型，限制其输入的最大长度
   */
  maxlength?: Number;
  /**
   * 数值的精度
   */
  precision?: Number;
  /**
   * 是否只读
   */
  readonly?: Boolean;
  /**
   * 是否可见
   */
  isVisible?: Boolean | FieldVisibleFunction;
  /**
   * 是否必填
   */
  required?: Boolean;
  /**
   * 占位文本
   */
  placeholder?: String;
  /**
   * 远程数据加载函数
   */
  optionsLoader?: (keyword: string) => void;
  /**
   * 是否正在从远程加载数据
   */
  optionsLoading?: boolean;
  /**
   * 变更事件
   */
  onchange?: (e: FieldChangeEventArgs) => void;
}

export interface FieldOption {
  /**
   * 名称
   */
  label: String;
  /**
   * 值
   */
  value: any;
  /**
   * 图标，目前仅支持图片
   */
  icon: String;
  /**
   * 选项上展示的提示文本
   */
  title: String;
}

/**
 * 加载字段的选项数据
 * @param keyword
 */
export declare function fieldOptionGetter(keyword: String): Array<Object>;

/**
 * 字段定义
 */
export interface Field {
  /**
   * 字段标签
   */
  label: String;
  /**
   * 字段名
   */
  name: String;
  /**
   * 输入控件的类型，参考 G6Board.InputTypes
   * 默认值 G6Board.InputTypes.TEXT: 1
   */
  inputType?: Number;
  /**
   * 当 inputType 为 select/checkbox/radio 时的选项
   */
  options?: FieldOption | typeof fieldOptionGetter;
  /**
   * 选项
   */
  config?: FieldConfig;
  /**
   * 控件样式
   */
  style?: Object;
  /**
   * 自定义渲染组件
   */
  component: Vue;
}

export interface EditHandlerEventArgs {
  type: "node" | "edge" | "combo";
  data: Object;
  item?: Object;
  graph?: Graph;
}

export type CustomComboStyle = Partial<{
  [key: String]: {
    shape: "rect" | "circle" | "image";
    draggable: Boolean;
    style: ModelStyle;
  };
}>;

export interface BoardOptions {
  /**
   * 编辑节点时的字段
   */
  nodeFields: Array<Field>;
  /**
   * 编辑边时的字段
   */
  edgeFields?: Array<Field>;
  /**
   * 编辑分组时的字段
   */
  comboFields?: Array<Field>;
  /**
   * 在编辑节点、分组或边前的数据处理函数
   * @type {Function}
   * @returns {Object|false} 返回 false 可以取消节点的操作
   */
  beforeEditHandler: (e: EditHandlerEventArgs) => Object | false;
  /**
   * 在编辑节点、分组或边时的数据处理函数
   * @returns {Object|false} 返回 false 可以取消节点的操作
   */
  editHandler?: (e: EditHandlerEventArgs) => Object | false;
  styles: {
    /**
     * 节点的样式
     */
    node: Partial<{
      type: String;
      size: Number | Number[];
      color: String;
    }> &
      ModelStyle;
    /**
     * 边的样式
     */
    edge: Partial<{
      type: String;
      size: Number | Number[];
      color: String;
    }> &
      ModelStyle;
    /**
     * 分组的样式
     */
    combo?: Partial<{
      type: String;
      size: Number | Number[];
      color: String;
    }> &
      ModelStyle &
      CustomComboStyle;
    /**
     * 节点不同状态的样式
     */
    nodeStates: {
      /**
       * 节点被选中时的样式
       */
      selected: {
        "select-border": StateStyles;
      };
      /**
       * 节点高亮时的样式（在搜索节点命中时生效）
       */
      highlight: {
        "highlight-border": StateStyles;
      };
    };
    edgeStates: {
      /**
       * 边被选中时的样式
       */
      selected: StateStyles;
    };
    comboStates: {
      /**
       * 分组被选中时的样式
       */
      selected: {
        "select-border": {};
      };
    };
  };
  /**
   * Tooltip 渲染器
   */
  tooltipRenderers: {
    /**
     * 节点的 Tooltip 渲染器
     */
    node: typeof defineTooltip;
    /**
     * 边的 Tooltip 渲染器
     */
    edge: typeof defineTooltip;
  };
}

/**
 * 定义编辑器的选项
 */
export function defineOptions(options: BoardOptions): BoardOptions {}

/**
 * 定义字段集合
 */
export function defineFields(fields: Array<Field>): Array<Field> {}

/**
 * 定义提示框的渲染器
 */
export function defineTooltip(
  renderer: (model: Object, container: HTMLDivElement) => {},
  offset?: { x: Number; y: Number },
  trigger?: String
): Object {}