/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "1145":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1485");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1485":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "336c":
/***/ (function(module, exports) {

module.exports = @antv/g6;

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__("5f72");
var external_element_ui_default = /*#__PURE__*/__webpack_require__.n(external_element_ui_);

// EXTERNAL MODULE: ./node_modules/element-ui/lib/theme-chalk/index.css
var theme_chalk = __webpack_require__("0fae");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"51a94007-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/App.vue?vue&type=template&id=14dde052&
var Appvue_type_template_id_14dde052_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app"},[_c('div',{staticClass:"toolbar"},[_vm._m(0),_c('div',{staticStyle:{"gap":"20px","display":"flex"}},[_c('div',{staticClass:"search"},[_c('span',[_vm._v("查找节点")]),_c('el-input',{staticStyle:{"width":"200px"},attrs:{"size":"small"},model:{value:(_vm.search.keyword),callback:function ($$v) {_vm.$set(_vm.search, "keyword", $$v)},expression:"search.keyword"}}),_c('el-button',{attrs:{"size":"small"},on:{"click":_vm.onSearch}},[_vm._v("查找")])],1),_c('span',[_c('span',[_vm._v("编辑模式")]),_c('el-switch',{model:{value:(_vm.editMode),callback:function ($$v) {_vm.editMode=$$v},expression:"editMode"}})],1),_c('el-button',{attrs:{"size":"small"},on:{"click":_vm.saveData}},[_vm._v("保存")])],1)]),_c('g6-board',{ref:"board",attrs:{"options":_vm.options,"data":_vm.data,"edit-mode":_vm.editMode},on:{"change":_vm.onGraphChange}})],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"g6-board--title"},[_c('span',[_vm._v("图编辑器")])])}]


// CONCATENATED MODULE: ./src/views/App.vue?vue&type=template&id=14dde052&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// CONCATENATED MODULE: ./src/assets/nodes.js

var nodes_nodes = [{
  label: "交换机1",
  ip: "192.168.1.1",
  deviceType: "switch",
  color: 'red',
  group: '第一个域',
  resp_person: '张三',
  dept: '安全运维'
}, {
  label: "防火墙",
  ip: "192.168.1.2",
  deviceType: "firewall",
  color: '#007acc',
  resp_person: '张三',
  dept: '安全运维'
}, {
  label: "服务器A",
  ip: "192.168.1.3",
  deviceType: "server",
  group: '第一个域',
  resp_person: '张三',
  dept: '安全运维'
}, {
  label: "服务器B",
  ip: "192.168.1.4",
  deviceType: "server",
  group: '第一个域',
  resp_person: '张三',
  dept: '安全运维'
}, {
  label: "交换机2",
  ip: "192.168.1.11",
  deviceType: "switch",
  color: 'darkgreen',
  group: '第二个域',
  resp_person: '张三',
  dept: '安全运维'
}, {
  label: "服务器C",
  ip: "192.168.1.13",
  deviceType: "server",
  color: 'blue',
  group: '第二个域',
  resp_person: '张三',
  dept: '安全运维'
}, {
  label: "服务器D",
  ip: "192.168.1.14",
  deviceType: "server",
  color: 'purple',
  group: '第二个域',
  resp_person: '张三',
  dept: '安全运维'
}]; // const nodeSet = [{
//   "id": 4,
//   "nodes": ['192.168.1.3', '192.168.1.4']
// }]
// 默认情况下，使用 ip 作为数据 id

nodes_nodes.forEach(function (node) {
  node.id = node.ip;
});
/* harmony default export */ var assets_nodes = (nodes_nodes);
// CONCATENATED MODULE: ./src/assets/edges.js
var edges_edges = [{
  "source": '192.168.1.1',
  "target": '192.168.1.2',
  "speed": "100M/s",
  "traffic": "78M/s",
  "state": "正常"
}, {
  "source": '192.168.1.3',
  "target": '192.168.1.1',
  "speed": "100M/s",
  "traffic": "78M/s",
  "state": "正常"
}, {
  "source": '192.168.1.4',
  "target": '192.168.1.1',
  "speed": "100M/s",
  "traffic": "78M/s",
  "state": "正常"
}, {
  "source": '192.168.1.11',
  "target": '192.168.1.1',
  "speed": "100M/s",
  "traffic": "78M/s",
  "state": "正常"
}, {
  "source": '192.168.1.13',
  "target": '192.168.1.11',
  "speed": "10M/s",
  "traffic": "2.5M/s",
  "state": "卡顿"
}, {
  "source": '192.168.1.14',
  "target": '192.168.1.11',
  "speed": "1000M/s",
  "traffic": "0",
  "state": "断开"
}];
/* harmony default export */ var assets_edges = (edges_edges);
// CONCATENATED MODULE: ./src/assets/deviceTypes.js
var deviceTypes = [{
  label: '终端',
  value: 'pc',
  size: 20
}, {
  label: '交换机',
  value: 'switch',
  size: 30
}, {
  label: '防火墙',
  value: 'firewall',
  size: 40
}, {
  label: '服务器',
  value: 'server',
  size: 40
}];
/* harmony default export */ var assets_deviceTypes = (deviceTypes);
// CONCATENATED MODULE: ./src/assets/storage.js







var storeKey = 'graph-data';
var storage_combos = [];

function getData() {
  var store = localStorage.getItem(storeKey);

  if (store) {
    store = JSON.parse(store);
  } else {
    assets_nodes.forEach(function (node) {
      node.type = 'image-ext';
      node.img = getIcon(node.deviceType);
      node.size = getSize(node.deviceType);
    });
    store = {
      nodes: assets_nodes,
      edges: assets_edges,
      combos: storage_combos
    };
  }

  return store;
}

function getIcon(deviceType) {
  return "/static/icons/".concat(deviceType, ".svg");
}

function setData(data) {
  localStorage.setItem(storeKey, JSON.stringify(data));
}

function getDeviceTypes() {
  return assets_deviceTypes.map(function (dt) {
    dt.icon = getIcon(dt.value);
    return dt;
  });
}

function getSize(deviceType) {
  return assets_deviceTypes.filter(function (dt) {
    return dt.value === deviceType;
  })[0].size;
}

/* harmony default export */ var storage = ({
  get: getData,
  set: setData,
  getDeviceTypes: getDeviceTypes,
  getIcon: getIcon,
  getSize: getSize
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.fixed.js
var es_string_fixed = __webpack_require__("c7cd");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js + 1 modules
var objectSpread2 = __webpack_require__("f3f3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// CONCATENATED MODULE: ./src/components/models.js




/**
 * 输入框类型
 */
var InputTypes = {
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
  SWITCH: 7 // /**
  //  * 图片选择器
  //  */
  // IMAGE: 8,

};
var FieldConfig = {
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
   * @type {Boolean | Function(e: {data: Object, fields: Object})}
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
  onchange: function onchange() {}
};
var FieldOption = {
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
};
/**
 * 字段定义
 */

var Field = {
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
  component: null
};
var BoardOptions = {
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
   * 编辑分组时的字段
   * @type {Field[]}
   */
  comboFields: [],

  /**
   * 在编辑节点、分组或边前的数据处理函数
   * @type {Function}
   * @returns {Object|false} 返回 false 可以取消节点的操作
   */
  beforeEditHandler: function beforeEditHandler(e) {
    return e.data;
  },

  /**
   * 在编辑节点、分组或边时的数据处理函数
   * @type {Function}
   * @returns {Object|false} 返回 false 可以取消节点的操作
   */
  editHandler: function editHandler() {},
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
      selected: {}
    },
    comboStates: {
      /**
        * 分组被选中时的样式
        */
      selected: {
        'select-border': {}
      }
    }
  },

  /**
   * Tooltip 渲染器
   */
  tooltipRenderers: {
    /**
     * 节点的 Tooltip 渲染器
     * @type {defineTooltip}
     */
    node: function node() {},

    /**
     * 边的 Tooltip 渲染器
     * @type {defineTooltip}
     */
    edge: function edge() {}
  },
  contextmenu: {
    /**
     * 是否允许打开右键菜单
     * @type {Boolean|Function}
     */
    visible: true
  }
};
/**
 * 定义编辑器的选项
 *
 * @param {BoardOptions} options
 * @returns {BoardOptions}
 */

function defineOptions(options) {
  return options;
}
/**
 * 构造数据的工具函数
 * @param {Field[]} fields
 * @returns {Field[]}
 */


function defineFields(fields) {
  return fields || [];
}
/**
 *
 * @param {Function<object>} renderer
 * @param {{x: number, y: number}} offset
 * @param {string} [trigger=click]
 * @returns
 */


function defineTooltip(renderer, offset, trigger) {
  offset = Object.assign({
    x: 10,
    y: 10
  }, offset);
  return {
    // offsetX 与 offsetY 需要加上父容器的 padding
    offsetX: offset.x,
    offsetY: offset.y,
    trigger: trigger || 'click',
    shouldBegin: function shouldBegin() {
      // 仅在非编辑模式下才允许 tooltip 弹出
      if (this.editMode) {
        return false;
      }

      return true;
    },
    getContent: function getContent(e) {
      // 仅在非编辑模式下才允许 tooltip 弹出
      if (this.editMode) {
        return '';
      }

      var data = e.item.getModel();
      var id = data.id; // 缓存数据

      var cache = window.__g6board_tooltip_cache || {};
      var now = new Date().getTime();

      if (cache[id]) {
        // 状态缓存 10 秒
        if (cache[id].time && now - cache[id].time < 10000) {
          return cache[id].element;
        }
      }

      var container = document.createElement('div');
      cache[id] = {
        time: now,
        element: container
      };
      container.classList.add('g6-board--tooltip');
      var result = renderer(data, container); // 添加对异步的支持

      if (result instanceof Promise) {
        container.innerHTML = '<span>加载中 ...</span>';
        result.then(function (content) {
          if (typeof content === 'string') {
            container.innerHTML = content;
          } else {
            container.innerHTML = '';
            container.appendChild(content);
          }
        });
      } else {
        if (typeof result === 'string') {
          container.innerHTML = result;
        } else {
          container.appendChild(result);
        }
      }

      return container;
    }
  };
}

var BUILTIN_FIELDS = {
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
      value: 'arc' // }, {
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
      isVisible: function isVisible(e) {
        return e.data._lineType === 'arc';
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
};

// CONCATENATED MODULE: ./src/assets/fields.js




 // import lineTypes from "./lineTypes"


var nodeFields = defineFields([{
  label: '设备类型',
  name: 'deviceType',
  inputType: InputTypes.SELECT,
  options: storage.getDeviceTypes(),
  config: {
    required: true,
    tip: '不同的设备类型，有不同有图标和含义',
    onchange: function onchange(e) {
      e.data.device = null;
      e.fields.device.options = [];
    }
  }
}, {
  label: '选择设备',
  name: 'device',
  inputType: InputTypes.SELECT,
  options: [],
  config: {
    tip: '输入 IP 地址以选择设备',
    required: true,
    optionsLoader: function optionsLoader(e, keyword) {
      var deviceType = e.data.deviceType;
      var data = {
        pc: [{
          label: '终端1111',
          value: '192.168.11.11'
        }, {
          label: '终端2222',
          value: '192.168.11.12'
        }, {
          label: '终端3333',
          value: '192.168.11.13'
        }],
        server: [{
          label: '服务器1111',
          value: '192.168.12.11'
        }, {
          label: '服务器2222',
          value: '192.168.12.12'
        }, {
          label: '服务器3333',
          value: '192.168.12.13'
        }]
      };

      if (!deviceType) {
        // console.debug('未选择设备类型')
        this.options = [];
        return;
      }

      var list = data[deviceType];

      if (!list) {
        // console.debug('设备类型下没有设备')
        this.options = [];
        return;
      }

      if (!keyword) {
        // console.debug('关键字为空')
        this.options = list;
        return;
      } // console.debug('有数据')


      this.options = list.filter(function (item) {
        return item.label.indexOf(keyword) !== -1 || item.value.indexOf(keyword) !== -1;
      }); // },
      // onchange(e) {
      //   console.info(e)
    }
  }
}, {
  label: '设备 IP',
  name: 'ip',
  inputType: InputTypes.TEXT,
  config: {
    required: true,
    tip: 'IP 是一个设备的唯一标识'
  }
}, {
  label: '设备名称',
  name: 'label',
  inputType: InputTypes.TEXT // }, {
  //   label: '速率',
  //   name: 'speed',
  //   inputType: InputTypes.NUMBER,
  // }, {
  //   label: '可用',
  //   name: 'enabled',
  //   inputType: InputTypes.SWITCH,

}, {
  label: '标签颜色',
  name: 'labelColor',
  inputType: InputTypes.CUSTOM,
  component: external_element_ui_["ColorPicker"]
}, {
  label: '备注',
  name: 'remark',
  inputType: InputTypes.LONGTEXT // }, {
  //   label: '连接类型',
  //   name: 'lineType',
  //   inputType: InputTypes.RADIO,
  //   options: lineTypes,
  //   config: {
  //     default: lineTypes[0].value
  //   }

}, BUILTIN_FIELDS.EDGE_TYPE, BUILTIN_FIELDS.EDGE_CURVE_OFFSET, BUILTIN_FIELDS.EDGE_STYLE, BUILTIN_FIELDS.EDGE_VISIBLE]);
var edgeFields = defineFields();
var comboFields = defineFields([{
  label: '名称',
  name: 'name',
  inputType: InputTypes.TEXT,
  config: {
    required: true
  }
}, {
  label: '固定大小',
  name: 'fixed',
  inputType: InputTypes.SWITCH,
  config: {
    tip: '当不启用固定大小时，分组会根据包含元素的数量和位置自动计算其大小',
    required: true
  }
}, {
  label: '宽度',
  name: 'width',
  inputType: InputTypes.NUMBER,
  config: {
    tip: '单位为像素',
    minlength: 0,
    maxlength: 2000,
    default: 200,
    isVisible: function isVisible(e) {
      return e.data.fixed;
    }
  }
}, {
  label: '高度',
  name: 'height',
  inputType: InputTypes.NUMBER,
  config: {
    minlength: 0,
    maxlength: 2000,
    default: 200,
    tip: '单位为像素',
    isVisible: function isVisible(e) {
      return e.data.fixed;
    }
  }
}]);
/* harmony default export */ var fields = ({
  nodeFields: nodeFields,
  edgeFields: edgeFields,
  comboFields: comboFields
});
// CONCATENATED MODULE: ./src/assets/options.js






/* harmony default export */ var options = (defineOptions({
  nodeFields: fields.nodeFields,
  edgeFields: fields.edgeFields,
  comboFields: fields.comboFields,
  styles: {
    edge: {
      type: 'polyline',
      style: {
        stroke: 'purple'
      }
    },
    combo: {
      type: 'rect-ext',
      style: {
        stroke: 'red',
        lineDash: [10, 2]
      },
      labelCfg: {
        style: {
          fontSize: 10,
          stroke: 'red',
          fill: 'blue',
          backgroundColor: 'red'
        }
      },
      title: {
        style: {
          stroke: 'blue'
        }
      },
      background: {
        style: {
          fill: 'yellow'
        }
      }
    },
    nodeStates: {
      highlight: {
        'highlight-border': {
          fill: 'green',
          fillOpacity: 0.1,
          stroke: 'green',
          strokeOpacity: 0.3,
          lineWidth: 2
        }
      },
      selected: {
        'select-border': {
          stroke: 'blue',
          lineWidth: 3
        }
      },
      hover: {
        'select-border': {
          stroke: 'green'
        }
      }
    },
    edgeStates: {
      selected: {
        stroke: 'blue',
        lineWidth: 3
      },
      hover: {
        lineWidth: 3
      }
    }
  },
  beforeEditHandler: function beforeEditHandler(e) {
    if (e.type !== 'combo') {
      return;
    }

    var data = Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, e.data), {}, {
      type: 'rect-ext'
    }); // 有个 21 的 padding


    var bounds = e.item.getBBox();
    var padding = 21 * 2;
    data.width = bounds.width - padding;
    data.height = bounds.height - padding;

    if (data.fixSize) {
      data.fixed = true;
    } else {
      data.fixed = false;
    }

    return data;
  },
  editHandler: function editHandler(e) {
    var data = e.data;

    if (e.type === 'node') {
      data.id = data.ip;

      if (!data.type) {
        data.type = 'image-ext';
      }

      data.img = storage.getIcon(data.deviceType);
      data.size = storage.getSize(data.deviceType);
    } else if (e.type === 'combo') {
      data.label = data.name;

      if (data.fixed) {
        data.fixSize = [data.width, data.height];
      } else {
        delete data.fixSize;
      }
    }

    return data;
  },
  tooltipRenderers: {
    node: defineTooltip(function (node) {
      var table = document.createElement('table');
      var data = [['名称', 'IP', '分组', '责任人'], [node.label, node.ip, node.group, node.resp_person + '/' + node.dept]];

      for (var i = 0; i < data[0].length; i++) {
        var row = document.createElement('tr');

        for (var j = 0; j < data.length; j++) {
          var cell = document.createElement('td');
          cell.innerText = data[j][i];
          row.appendChild(cell);
        }

        table.appendChild(row);
      }

      return table;
    }),
    edge: defineTooltip(function (edge) {
      var table = document.createElement('table');
      var data = [['速率', '流量', '状态'], [edge.speed, edge.traffic, edge.state]];

      for (var i = 0; i < data[0].length; i++) {
        var row = document.createElement('tr');

        for (var j = 0; j < data.length; j++) {
          var cell = document.createElement('td');
          cell.innerText = data[j][i];
          row.appendChild(cell);
        }

        table.appendChild(row);
      }

      return table;
    })
  }
}));
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/App.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  data: function data() {
    var _storage$get = storage.get(),
        nodes = _storage$get.nodes,
        edges = _storage$get.edges,
        combos = _storage$get.combos;

    return {
      options: options,
      deviceTypes: storage.getDeviceTypes(),
      data: {
        nodes: nodes,
        combos: combos,
        edges: edges.map(function (edge) {
          if (edge.state === '正常') {
            edge.style = {
              stroke: 'green'
            };
          } else if (edge.state === '断开') {
            edge.style = {
              stroke: 'gray'
            };
          } else if (edge.state === '卡顿') {
            edge.style = {
              stroke: 'red'
            };
          } else {
            edge.style = {
              stroke: 'black'
            };
          } // link.label = meta.state


          return edge;
        }) // combos: Object.values(combos)

      },
      search: {
        keyword: '192.168.1.1'
      },
      editMode: true
    };
  },
  mounted: function mounted() {},
  methods: {
    saveData: function saveData() {
      var data = this.$refs.board.getData();
      storage.set(data);
      this.$message.success('数据已保存');
    },
    onSearch: function onSearch() {
      var keyword = this.search.keyword;

      if (!keyword) {
        this.$refs.board.clearSelection();
        return;
      }

      var nodes = this.$refs.board.findNode(function (node) {
        return node.ip.indexOf(keyword) !== -1 || node.label.indexOf(keyword) !== -1;
      }, true); // eslint-disable-next-line

      console.info(nodes);
    },
    onGraphChange: function onGraphChange(e) {
      // eslint-disable-next-line
      console.info(e);
    }
  }
});
// CONCATENATED MODULE: ./src/views/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/App.vue?vue&type=style&index=0&lang=css&
var Appvue_type_style_index_0_lang_css_ = __webpack_require__("1145");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/App.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Appvue_type_script_lang_js_,
  Appvue_type_template_id_14dde052_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"51a94007-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/board.vue?vue&type=template&id=a27027b2&
var boardvue_type_template_id_a27027b2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"g6-board"},[_c('div',{ref:"canvas",staticClass:"g6-board--body",on:{"contextmenu":function($event){$event.preventDefault();}}}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.zoom.visible),expression:"zoom.visible"}],staticClass:"g6-board--zoom-tip"},[_vm._v(_vm._s(_vm.zoom.value))]),_c('fields-dialog',{attrs:{"fields":_vm.options.nodeFields,"title":_vm.dialogs.node.editItem ? '编辑节点' : '添加节点',"visible":_vm.dialogs.node.visible,"graph":_vm.graph},on:{"update:visible":function($event){return _vm.$set(_vm.dialogs.node, "visible", $event)},"ok":_vm.onNodeOk},model:{value:(_vm.dialogs.node.form),callback:function ($$v) {_vm.$set(_vm.dialogs.node, "form", $$v)},expression:"dialogs.node.form"}}),_c('fields-dialog',{attrs:{"fields":_vm.options.edgeFields,"title":"编辑连接","visible":_vm.dialogs.edge.visible,"graph":_vm.graph},on:{"update:visible":function($event){return _vm.$set(_vm.dialogs.edge, "visible", $event)},"ok":_vm.onEdgeOk},model:{value:(_vm.dialogs.edge.form),callback:function ($$v) {_vm.$set(_vm.dialogs.edge, "form", $$v)},expression:"dialogs.edge.form"}}),_c('fields-dialog',{attrs:{"fields":_vm.options.comboFields,"title":_vm.dialogs.combo.editItem ? '编辑分组' : '添加分组',"visible":_vm.dialogs.combo.visible,"graph":_vm.graph},on:{"update:visible":function($event){return _vm.$set(_vm.dialogs.combo, "visible", $event)},"ok":_vm.onComboOk},model:{value:(_vm.dialogs.combo.form),callback:function ($$v) {_vm.$set(_vm.dialogs.combo, "form", $$v)},expression:"dialogs.combo.form"}}),_c('contextmenu',{ref:"contextmenu",attrs:{"items":_vm.contextmenus,"title":_vm.contextmenuTitle}})],1)}
var boardvue_type_template_id_a27027b2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/board.vue?vue&type=template&id=a27027b2&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
var es_array_some = __webpack_require__("45fc");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("c964");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("d0ff");

// EXTERNAL MODULE: external "@antv/g6"
var g6_ = __webpack_require__("336c");
var g6_default = /*#__PURE__*/__webpack_require__.n(g6_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"51a94007-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/fieldsdialog.vue?vue&type=template&id=3cac5a0d&
var fieldsdialogvue_type_template_id_3cac5a0d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-dialog',{attrs:{"title":_vm.title,"visible":_vm.isVisible,"width":_vm.width,"close-on-click-modal":false,"close-on-press-escape":false,"custom-class":"g6-board--dialog","append-to-body":""},on:{"update:visible":function($event){_vm.isVisible=$event},"closed":_vm.onClose},scopedSlots:_vm._u([{key:"footer",fn:function(){return [_c('el-button',{on:{"click":_vm.onCancel}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.onOk}},[_vm._v("确定")])]},proxy:true}])},[_c('el-form',{ref:"form",style:(_vm.styles),attrs:{"size":"small","model":_vm.form,"rules":_vm.rules,"label-width":"100px"}},[_vm._l((_vm.data),function(field){return [_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(field.config.isVisible()),expression:"field.config.isVisible()"}],key:field._id,attrs:{"label":field.label,"prop":field.name}},[(field.inputType === _vm.InputTypes.TEXT)?_c('el-input',{style:(field.style),attrs:{"minlength":field.config.minlength,"maxlength":field.config.maxlength,"placeholder":field.config.placeholder,"readonly":field.config.readonly},on:{"change":function($event){return _vm.onChange(field)}},model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"form[field.name]"}}):(field.inputType === _vm.InputTypes.LONGTEXT)?_c('el-input',{style:(field.style),attrs:{"type":"textarea","minlength":field.config.minlength,"maxlength":field.config.maxlength,"rows":5,"placeholder":field.config.placeholder,"readonly":field.config.readonly,"show-word-limit":""},on:{"change":function($event){return _vm.onChange(field)}},model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"form[field.name]"}}):(field.inputType === _vm.InputTypes.NUMBER)?_c('el-input-number',{style:(field.style),attrs:{"max":field.config.maxlength,"min":field.config.minlength,"precision":field.config.precision,"placeholder":field.config.placeholder,"readonly":field.config.readonly,"controls":false},on:{"change":function($event){return _vm.onChange(field)}},model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, _vm._n($$v))},expression:"form[field.name]"}}):(field.inputType === _vm.InputTypes.SWITCH)?_c('el-switch',{style:(field.style),attrs:{"readonly":field.config.readonly,"active-text":"","inactive-text":""},on:{"change":function($event){return _vm.onChange(field)}},model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, _vm._n($$v))},expression:"form[field.name]"}}):(field.inputType === _vm.InputTypes.SELECT &&
          field.config.optionsLoader
          )?_c('el-select',{style:(field.style),attrs:{"placeholder":field.config.placeholder,"loading":field.config.optionsLoading,"remote-method":field.config.optionsLoader.bind(field, {
            data: _vm.form,
            fields: _vm.fieldsMap,
          }),"disabled":field.config.readonly,"popper-class":"g6-board--dialog-select-opions","filterable":"","remote":""},on:{"change":function($event){return _vm.onChange(field)}},scopedSlots:_vm._u([(_vm.getSelectIcon(field))?{key:"prefix",fn:function(){return [_c('img',{staticClass:"select-icon",attrs:{"src":_vm.getSelectIcon(field)}})]},proxy:true}:null],null,true),model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, $$v)},expression:"form[field.name]"}},_vm._l((field.options),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value,"title":item.title}},[(item.icon)?_c('img',{staticClass:"select-icon",attrs:{"src":item.icon}}):_vm._e(),_c('span',[_vm._v(_vm._s(item.label))])])}),1):(field.inputType === _vm.InputTypes.SELECT)?_c('el-select',{style:(field.style),attrs:{"placeholder":field.config.placeholder,"disabled":field.config.readonly,"popper-class":"g6-board--dialog-select-opions","filterable":""},on:{"change":function($event){return _vm.onChange(field)}},scopedSlots:_vm._u([(_vm.getSelectIcon(field))?{key:"prefix",fn:function(){return [_c('img',{staticClass:"select-icon",attrs:{"src":_vm.getSelectIcon(field)}})]},proxy:true}:null],null,true),model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, $$v)},expression:"form[field.name]"}},_vm._l((field.options),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value,"title":item.title}},[(item.icon)?_c('img',{staticClass:"select-icon",attrs:{"src":item.icon}}):_vm._e(),_c('span',[_vm._v(_vm._s(item.label))])])}),1):(field.inputType === _vm.InputTypes.CHECKBOX)?_c('el-checkbox-group',{style:(field.style),attrs:{"disabled":field.config.readonly},on:{"change":function($event){return _vm.onChange(field)}},model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, $$v)},expression:"form[field.name]"}},_vm._l((field.options),function(item){return _c('el-checkbox',{key:item.value,attrs:{"label":item.label,"title":item.title,"value":item.value}})}),1):(field.inputType === _vm.InputTypes.RADIO)?_c('el-radio-group',{style:(field.style),attrs:{"disabled":field.config.readonly},on:{"change":function($event){return _vm.onChange(field)}},model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, $$v)},expression:"form[field.name]"}},_vm._l((field.options),function(item){return _c('el-radio',{key:item.value,attrs:{"label":item.value,"title":item.title}},[_vm._v(_vm._s(item.label))])}),1):(field.inputType === _vm.InputTypes.CUSTOM && field.component)?_c(field.component,{tag:"component",style:(field.style),attrs:{"disabled":field.config.readonly},on:{"change":function($event){return _vm.onChange(field)}},model:{value:(_vm.form[field.name]),callback:function ($$v) {_vm.$set(_vm.form, field.name, $$v)},expression:"form[field.name]"}}):_vm._e(),(field.config.tip)?_c('div',{staticClass:"input-tip"},[_vm._v(" "+_vm._s(field.config.tip)+" ")]):_vm._e()],1)]})],2)],1)}
var fieldsdialogvue_type_template_id_3cac5a0d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/fieldsdialog.vue?vue&type=template&id=3cac5a0d&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/fieldsdialog.vue?vue&type=script&lang=js&












//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var fieldsdialogvue_type_script_lang_js_ = ({
  props: {
    // 属性列表，使用类型 Fields 传入
    fields: {
      type: Array,
      required: true
    },
    // 标题
    title: {
      type: String,
      required: true
    },
    // 是否可见
    visible: {
      type: Boolean,
      required: true
    },
    // 表单数据
    value: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      default: "600px"
    },
    styles: {
      type: [Object, String],
      default: function _default() {
        return {
          padding: "0 40px 0 0"
        };
      }
    },
    graph: Object
  },
  data: function data() {
    return {
      InputTypes: InputTypes,
      isVisible: false,
      data: [],
      form: {},
      rules: {},
      // 标记量，用于在触发事件时，不执行 watch，以避免数据被循环处理
      noWatch: false,
      fieldsMap: {}
    };
  },
  watch: {
    value: {
      deep: true,
      handler: function handler() {
        if (this.noWatch) {
          this.noWatch = false;
          return;
        }

        this.processFields();
      }
    },
    visible: function visible(val) {
      this.isVisible = val;
    }
  },
  mounted: function mounted() {
    this.processFields();
  },
  computed: {},
  methods: {
    processFields: function processFields() {
      var _this = this;

      // 处理校验规则和表单字段
      var rules = {};
      var form = {
        id: "g6-data-".concat(new Date().getTime(), "-").concat(Math.round(Math.random() * 10000))
      };
      var map = {};
      this.fields.forEach(function (field) {
        field.config = Object.assign({}, FieldConfig, field.config);
        field.style = Object.assign({}, field.style);
        field._id = "g6-".concat(new Date().getTime(), "-").concat(Math.round(Math.random() * 10000));
        map[field.name] = field;
        var isVisible = field.config.isVisible;

        field.config.isVisible = function () {
          if (typeof isVisible === 'boolean') {
            return isVisible;
          }

          return isVisible({
            data: _this.form,
            fields: _this.fieldsMap
          });
        };

        var config = field.config;
        var defaultValue = config.default;

        if (field.inputType === InputTypes.CHECKBOX) {
          // 当输入类型为 checkbox 时，默认值应当为 []
          if (!defaultValue) {
            defaultValue = [];
          }
        } else if (field.inputType === InputTypes.SWITCH) {
          // 当输入类型为 switch 时，默认值应当为 false
          if (!defaultValue) {
            defaultValue = false;
          }
        } else if (field.inputType === InputTypes.NUMBER) {
          if (!field.config.minlength) {
            field.config.minlength = 0;
          }

          if (!field.config.maxlength) {
            field.config.maxlength = Infinity;
          }
        }

        form[field.name] = defaultValue;
        var validators = [];

        if (config.validators) {
          validators.push.apply(validators, Object(toConsumableArray["a" /* default */])(config.validators));
        }

        if (config.required) {
          validators.push({
            required: true,
            message: "不能为空"
          });
        }

        if (validators.length) {
          rules[field.name] = validators;
        }
      });
      this.fieldsMap = map;
      this.data = this.fields;
      this.form = Object.assign({}, form, this.value);
      this.rules = rules;
    },
    onClose: function onClose() {
      this.$emit("update:visible", this.isVisible);
    },
    getSelectIcon: function getSelectIcon(field) {
      var value = this.form[field.name];

      if (!value) {
        return "";
      }

      var item = field.options.filter(function (opt) {
        return opt.value === value;
      })[0];

      if (!item) {
        return "";
      }

      return item.icon || "";
    },
    onCancel: function onCancel() {
      this.isVisible = false;
      this.form = {};
      this.data = [];
    },
    onOk: function onOk() {
      var _this2 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var form;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  _this2.$refs.form.validate(function (result) {
                    if (result) {
                      resolve();
                    } else {
                      reject();
                    }
                  });
                });

              case 3:
                _context.next = 8;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return");

              case 8:
                form = Object(objectSpread2["a" /* default */])({}, _this2.form);
                _this2.noWatch = true;

                _this2.$emit("input", form);

                _this2.$emit("ok", form);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 5]]);
      }))();
    },
    onChange: function onChange(field) {
      field.config.onchange.call(field, {
        type: 'change',
        field: field,
        value: this.form[field.name],
        data: this.form,
        fields: this.fieldsMap,
        graph: this.graph
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/fieldsdialog.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_fieldsdialogvue_type_script_lang_js_ = (fieldsdialogvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/fieldsdialog.vue





/* normalize component */

var fieldsdialog_component = Object(componentNormalizer["a" /* default */])(
  components_fieldsdialogvue_type_script_lang_js_,
  fieldsdialogvue_type_template_id_3cac5a0d_render,
  fieldsdialogvue_type_template_id_3cac5a0d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var fieldsdialog = (fieldsdialog_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"51a94007-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/contextmenu.vue?vue&type=template&id=65551966&
var contextmenuvue_type_template_id_65551966_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.visible)?_c('div',{staticClass:"g6-board--contextmenu",style:(_vm.style),on:{"contextmenu":function($event){$event.preventDefault();},"click":function($event){$event.stopPropagation();}}},[(_vm.title)?_c('div',{staticClass:"g6-board--contextmenu-title"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_c('ul',{staticClass:"g6-board--contextmenu-items"},_vm._l((_vm.activeMenu),function(item,i){return _c('li',{key:i,class:{ 'g6-board--contextmenu-separator': !Object.keys(item).length },attrs:{"title":item.title},on:{"click":function($event){return _vm.onItemClick(item)}}},[_c('i'),_c('span',{staticClass:"g6-board--contextmenu-item-label"},[_vm._v(_vm._s(item.label))])])}),0)]):_vm._e()}
var contextmenuvue_type_template_id_65551966_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/contextmenu.vue?vue&type=template&id=65551966&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/contextmenu.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var contextmenuvue_type_script_lang_js_ = ({
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
  data: function data() {
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
    };
  },
  mounted: function mounted() {
    window.addEventListener('click', this.hide);
    window.addEventListener('keydown', this.hide);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('click', this.hide);
    window.removeEventListener('keydown', this.hide);
  },
  computed: {
    activeMenu: function activeMenu() {
      if (Array.isArray(this.items)) {
        return this.items;
      }

      return this.items[this.active];
    }
  },
  methods: {
    getBounds: function getBounds() {
      var rect = this.$el.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      };
    },
    show: function show(x, y, active, item) {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.position.x = x;
                _this.position.y = y;
                _this.item = item;

                if (!_this.visible) {
                  _context.next = 7;
                  break;
                }

                _this.visible = false;
                _context.next = 7;
                return _this.$nextTick();

              case 7:
                _this.style.left = "".concat(x, "px");
                _this.style.top = "".concat(y, "px");
                _this.active = active;
                _this.visible = true;

                _this.$nextTick(function () {
                  // 修正位置
                  var bounds = _this.getBounds();

                  var winBounds = {
                    width: window.innerWidth,
                    height: window.innerHeight
                  };
                  var fixRequired = false;

                  if (bounds.left + bounds.width > winBounds.width) {
                    x = winBounds.width - bounds.width;
                    fixRequired = true;
                  }

                  if (bounds.top + bounds.height > winBounds.height) {
                    y = winBounds.height - bounds.height;
                    fixRequired = true;
                  }

                  if (!fixRequired) {
                    return;
                  }

                  _this.style.left = "".concat(x, "px");
                  _this.style.top = "".concat(y, "px");
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    hide: function hide(e) {
      if (e instanceof KeyboardEvent) {
        // ESC 关闭
        if (e.keyCode !== 27) {
          return;
        }
      }

      this.visible = false;
    },
    onItemClick: function onItemClick(item) {
      var _this2 = this;

      this.hide();
      this.$nextTick(function () {
        var e = {
          active: _this2.active,
          command: item.command,
          x: _this2.position.x,
          y: _this2.position.y,
          item: _this2.item
        };

        _this2.$emit("command", e);

        if (item.handler) {
          item.handler(e);
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/contextmenu.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_contextmenuvue_type_script_lang_js_ = (contextmenuvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/contextmenu.vue





/* normalize component */

var contextmenu_component = Object(componentNormalizer["a" /* default */])(
  components_contextmenuvue_type_script_lang_js_,
  contextmenuvue_type_template_id_65551966_render,
  contextmenuvue_type_template_id_65551966_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var contextmenu = (contextmenu_component.exports);
// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("54f8");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("276c");

// EXTERNAL MODULE: ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("e954");

// CONCATENATED MODULE: ./src/components/events.js





var events_EventBus = /*#__PURE__*/function () {
  function EventBus() {
    Object(classCallCheck["a" /* default */])(this, EventBus);

    this.handlers = {};
  }

  Object(createClass["a" /* default */])(EventBus, [{
    key: "on",
    value: function on(eventType, handler) {
      if (!this.handlers[eventType]) {
        this.handlers[eventType] = [];
      }

      this.handlers[eventType].push(handler);
    }
  }, {
    key: "off",
    value: function off(eventType, handler) {
      if (!this.handlers[eventType]) {
        return;
      }

      this.handlers[eventType] = this.handlers[eventType].filter(function (h) {
        return h !== handler;
      });
    }
  }, {
    key: "emit",
    value: function emit(eventType, eventArgs) {
      if (!this.handlers[eventType]) {
        return;
      }

      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.handlers[eventType]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;
          handler(eventArgs);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return EventBus;
}();

var instance = new events_EventBus();
events_EventBus.on = instance.on.bind(instance);
events_EventBus.off = instance.off.bind(instance);
events_EventBus.emit = instance.emit.bind(instance);
/* harmony default export */ var events = (events_EventBus);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// CONCATENATED MODULE: ./src/components/setup.js









g6_default.a.registerNode('image-ext', {
  afterDraw: function afterDraw(cfg, group, img) {
    // 获取图形组中的第一个图形
    // 获取路径图形的中点坐标
    var _img$attr = img.attr(),
        x = _img$attr.x,
        y = _img$attr.y,
        height = _img$attr.height,
        width = _img$attr.width; // 选择框


    var offset = 8;
    group.addShape('rect', {
      attrs: {
        width: width + offset,
        height: height + offset,
        x: x - offset / 2,
        y: y - offset / 2,
        radius: 4
      },
      name: 'select-border'
    }); // 高亮框

    var size = Math.max(height, width);
    group.addShape('circle', {
      attrs: {
        r: size,
        x: 0,
        y: 0
      },
      name: 'highlight-border'
    });
  }
}, 'image');
g6_default.a.registerEdge('polyline-ext', {// afterDraw(cfg, group, line) {
  //   line.at
  // }
}, 'polyline');
g6_default.a.registerCombo('rect-ext', {
  drawShape: function drawShape(cfg, group) {
    var style = this.getShapeStyle(cfg);
    var rect = group.addShape('rect', {
      attrs: Object(objectSpread2["a" /* default */])({}, style),
      name: 'key-shape'
    });
    var titleKey = 'title';
    var titleCfg = cfg[titleKey];

    if (titleCfg) {
      var width = style.width,
          height = style.height;
      group.addShape('rect', {
        attrs: Object(objectSpread2["a" /* default */])({
          width: width,
          height: 30,
          x: -width / 2,
          y: -height / 2 - 5
        }, titleCfg.style),
        draggable: titleCfg.draggable,
        name: titleKey
      });
    }

    var bgKey = 'background';
    var bgCfg = cfg[bgKey];

    if (cfg[bgKey]) {
      var _width = style.width,
          _height = style.height;
      group.addShape(bgCfg.shape || 'rect', {
        attrs: Object(objectSpread2["a" /* default */])({
          x: -_width / 2,
          y: -_height / 2 - 5 + 30,
          width: _width,
          height: _height - 30
        }, bgCfg.style),
        draggable: bgCfg.draggable,
        name: bgKey
      });
    }

    return rect;
  },
  afterUpdate: function afterUpdate(cfg, item) {
    var group = item.get('group');
    var shapes = group.getChildren();
    var style = this.getShapeStyle(cfg);
    var width = style.width,
        height = style.height;
    shapes.forEach(function (shape) {
      var shapeName = shape.get('name');

      if (shapeName === 'title') {
        shape.attr({
          width: width,
          x: -width / 2,
          y: -height / 2 - 5
        });
        return;
      }

      if (shapeName === 'background') {
        shape.attr({
          x: -width / 2,
          y: -height / 2 - 5 + 30,
          width: width,
          height: height - 30
        });
        return;
      }
    });
  }
}, 'rect'); // G6.registerCombo('rect-ext', {
//   afterDraw(cfg, group, combo) {
//     let { width, height } = cfg
//     const handleSize = 50
//     const handleHeight = 2
//     const padding = 40
//     const color = 'green'
//     width += padding
//     height += padding
//     const origin = {
//       x: -width / 2,
//       y: -height / 2
//     }
//     const offset = {
//       x: (width - handleSize) / 2,
//       y: (height - handleSize) / 2,
//     }
//     // 允许分组拖动以调整大小
//     // top
//     const top = group.addShape('rect', {
//       attrs: {
//         x: origin.x + offset.x,
//         y: origin.y - 6,
//         height: handleHeight,
//         width: handleSize,
//         fill: color,
//         cursor: 'ns-resize'
//       },
//       name: 'resize-handle-top'
//     })
//     // right
//     const right = group.addShape('rect', {
//       attrs: {
//         x: origin.x + width - 1,
//         y: origin.y + offset.y,
//         width: handleHeight,
//         height: handleSize,
//         fill: color,
//         cursor: 'ew-resize'
//       },
//       name: 'resize-handle-right'
//     })
//     // bottom
//     const bottom = group.addShape('rect', {
//       attrs: {
//         x: origin.x + offset.x,
//         y: origin.y + height - 6,
//         height: handleHeight,
//         width: handleSize,
//         fill: color,
//         cursor: 'ns-resize'
//       },
//       name: 'resize-handle-bottom'
//     })
//     // left
//     const left = group.addShape('rect', {
//       attrs: {
//         x: origin.x - 1,
//         y: origin.y + offset.y,
//         width: handleHeight,
//         height: handleSize,
//         fill: color,
//         cursor: 'ew-resize'
//       },
//       name: 'resize-handle-left'
//     })
//     // 事件设定
//     let mouseDown = false
//     let resizeDir = ''
//     const pos = {
//       x: 0,
//       y: 0
//     }
//     function onMouseUp(e) {
//       window.removeEventListener('mouseup', onMouseUp)
//       if (!mouseDown) {
//         return
//       }
//       mouseDown = false
//       const { x, y } = e
//       const attrs = combo.getBBox()
//       console.info(attrs)
//       const bounds = {
//         x: attrs.canvasX,
//         y: attrs.canvasY,
//         width: attrs.width,
//         height: attrs.height,
//       }
//       const boundsOffset = {
//         x: x - pos.x,
//         y: y - pos.y
//       }
//       if (resizeDir === 'top' || resizeDir === 'bottom') {
//         bounds.y += boundsOffset.y
//         bounds.height += boundsOffset.y
//       } else {
//         bounds.x += boundsOffset.x
//         bounds.width += boundsOffset.x
//       }
//       console.info(boundsOffset, bounds)
//       const graph = window.G6
//       window.G6.updateItem(graph.findById(cfg.id), bounds)
//     }
//     function onMouseDown(dir, e) {
//       e.preventDefault();
//       resizeDir = dir
//       const { x, y } = e
//       mouseDown = true
//       pos.x = x
//       pos.y = y
//       window.addEventListener('mouseup', onMouseUp)
//     }
//     top.on('mousedown', onMouseDown.bind(null, 'top'))
//     right.on('mousedown', onMouseDown.bind(null, 'right'))
//     bottom.on('mousedown', onMouseDown.bind(null, 'bottom'))
//     left.on('mousedown', onMouseDown.bind(null, 'left'))
//   }
// }, 'rect')

g6_default.a.registerBehavior('select-item', {
  getEvents: function getEvents() {
    return {
      'edge:click': 'onClick',
      'edge:mouseover': 'onHover',
      'edge:mouseleave': 'onLeave',
      'node:click': 'onClick',
      'node:mouseover': 'onHover',
      'node:mouseleave': 'onLeave'
    };
  },
  onClick: function onClick(e) {
    var item = e.item; // 在连线时，如果点击空白处取消会报错

    try {
      item.setState('selected', true);
    } catch (e) {// ignore
    }
  },
  onHover: function onHover(e) {
    var item = e.item;
    item.setState('hover', true);
  },
  onLeave: function onLeave(e) {
    var graph = this.graph;
    var item = e.item;
    var states = item.getStates();

    if (states.indexOf('hover') !== -1) {
      graph.clearItemStates(item, 'hover');
    }
  }
}); // TODO 添加连线到分组的支持

g6_default.a.registerBehavior('add-edge', {
  getEvents: function getEvents() {
    return {
      'node:click': 'onClick',
      mousemove: 'onMousemove',
      // 点击空白处，取消边
      'edge:click': 'onEdgeClick'
    };
  },
  onEnd: function onEnd(model) {
    var graph = this.graph;
    var source = this.edge.getModel().source;
    var target = model.id; // 不允许连线自环

    if (source === target) {
      // eslint-disable-next-line
      console.debug("The edge is a loop, abort!");
      graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
      return;
    } // 如果边已经存在，则取消此操作
    // 禁止两个节点间连接多条线


    if (graph.find('edge', function (item) {
      var itemModel = item.getModel();
      return itemModel.source === source && itemModel.target === target || itemModel.source === target && itemModel.target === source;
    })) {
      // eslint-disable-next-line
      console.debug("The edge from ".concat(source, " to ").concat(target, " is duplicated, abort!"));
      graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
      return;
    }

    var defaultStyle = graph.cfg.defaultEdge.style;
    graph.updateItem(this.edge, {
      target: target,
      style: Object(objectSpread2["a" /* default */])({}, defaultStyle)
    });
    this.edge.toFront();
    graph.emit('custom:add-edge', {
      item: this.edge
    }); // graph.setItemState(this.edge, 'selected', true);

    this.edge = null;
    this.addingEdge = false;
  },
  onClick: function onClick(ev) {
    var node = ev.item;
    var graph = this.graph;
    var point = {
      x: ev.x,
      y: ev.y
    }; // function cancel(e) {
    //   if (e.keyCode === 27) {
    //     window.removeEventListener('keydown', cancel)
    //     // ESC 取消连线
    //     graph.removeItem(this.edge);
    //     this.edge = null;
    //     this.addingEdge = false;
    //   }
    // }

    var model = node.getModel();

    if (this.addingEdge && this.edge) {
      this.onEnd(model);
    } else {
      var option = {
        source: model.id,
        target: point,
        style: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.graph.cfg.defaultEdge.style), {}, {
          endArrow: true
        })
      };

      if (model._lineType) {
        option.type = model._lineType;
      }

      if (model._lineStyle === 'dotted') {
        option.style.lineDash = [2, 2];
      } else if (model._lineStyle === 'dashed') {
        option.style.lineDash = [10, 2];
      }

      this.edge = graph.addItem('edge', option);
      this.addingEdge = true; // window.addEventListener('keydown', cancel)
    }
  },
  onMousemove: function onMousemove(ev) {
    var point = {
      x: ev.x,
      y: ev.y
    };

    if (this.addingEdge && this.edge) {
      this.graph.updateItem(this.edge, {
        target: point
      });
    }
  },
  onEdgeClick: function onEdgeClick(ev) {
    // 拖拽过程中，点击会点击到新增的边上
    if (!this.addingEdge || this.edge !== ev.item) {
      return;
    } // 突然出现鼠标始终会点击在线上的问题，在此添加代码片段以处理


    var graph = this.graph;

    var _graph$getPointByClie = graph.getPointByClient(ev.clientX, ev.clientY),
        x = _graph$getPointByClie.x,
        y = _graph$getPointByClie.y;

    var targetItem;
    var nodes = graph.getNodes();

    var _iterator = Object(createForOfIteratorHelper["a" /* default */])(nodes),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        var bbox = node.getBBox();

        if (x >= bbox.minX && x <= bbox.maxX && y >= bbox.minY && y <= bbox.maxY) {
          targetItem = node;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (targetItem) {
      this.onEnd(targetItem.getModel());
      return;
    } // eslint-disable-next-line


    console.debug("The edge adding is canceled!");
    this.graph.removeItem(this.edge);
    this.edge = null;
    this.addingEdge = false;
  }
});
g6_default.a.registerBehavior('contextmenu', {
  getEvents: function getEvents() {
    return {
      'canvas:contextmenu': 'onCanvasContextMenu',
      'node:contextmenu': 'onNodeContextMenu',
      'edge:contextmenu': 'onEdgeContextMenu',
      'combo:contextmenu': 'onComboContextMenu'
    };
  },
  onCanvasContextMenu: function onCanvasContextMenu(e) {
    events.emit('canvas:contextmenu', e);
  },
  onNodeContextMenu: function onNodeContextMenu(e) {
    events.emit('node:contextmenu', e);
  },
  onEdgeContextMenu: function onEdgeContextMenu(e) {
    events.emit('edge:contextmenu', e);
  },
  onComboContextMenu: function onComboContextMenu(e) {
    events.emit('combo:contextmenu', e);
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/board.vue?vue&type=script&lang=js&









//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var boardvue_type_script_lang_js_ = ({
  components: {
    FieldsDialog: fieldsdialog,
    contextmenu: contextmenu
  },
  props: {
    title: {
      type: String,
      default: '图编辑器'
    },
    data: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },

    /**
     * @type {BoardOptions}
     */
    options: {
      type: Object,
      required: true
    }
  },
  watch: {
    editMode: function editMode() {
      if (!this.graph) {
        return;
      }

      this.updateMode();
    }
  },
  data: function data() {
    var _this = this;

    return {
      /**
       * @type {G6.Graph}
       */
      graph: null,
      dialogs: {
        node: {
          editItem: null,
          visible: false,
          form: {},
          position: {
            x: 0,
            y: 0
          }
        },
        edge: {
          visible: false,
          form: {}
        },
        combo: {
          editItem: null,
          visible: false,
          form: {},
          position: {
            x: 0,
            y: 0
          }
        }
      },
      contextmenuTitle: '操作',
      contextmenus: {
        canvas: [{
          label: '添加节点',
          command: 'add-node',
          handler: function handler(e) {
            _this.dialogs.node.editItem = null;
            _this.dialogs.node.form = {};
            _this.dialogs.node.position.x = e.x;
            _this.dialogs.node.position.y = e.y;
            _this.dialogs.node.visible = true;
          }
        }, {
          label: '添加分组',
          command: 'add-combo',
          handler: function handler(e) {
            _this.dialogs.combo.editItem = null;
            _this.dialogs.combo.form = {};
            _this.dialogs.combo.position.x = e.x;
            _this.dialogs.combo.position.y = e.y;
            _this.dialogs.combo.visible = true;
          }
        }],
        node: [{
          label: '编辑节点',
          command: 'edit-node',
          handler: function handler(e) {
            var item = e.item;
            var data = item.getModel();
            var e1 = {
              type: 'node',
              data: data,
              item: item,
              graph: _this.graph
            };
            var form;
            var handler = _this.options.beforeEditHandler;

            if (handler) {
              // 如果有返回值，则使用返回值作为节点数据
              var handleResult = handler(e1); // 返回 false 取消编辑

              if (handleResult === false) {
                return;
              }

              if (handleResult === undefined) {
                form = Object(objectSpread2["a" /* default */])({}, data);
              } else {
                form = handleResult;
              }
            } else {
              form = Object(objectSpread2["a" /* default */])({}, data);
            }

            _this.dialogs.node.form = form;
            _this.dialogs.node.editItem = item;
            _this.dialogs.node.visible = true;
          }
        }, {
          label: '移除节点',
          command: 'remove-node',
          handler: function handler(e) {
            _this.$confirm('您正在移除节点，此操作会同时移除与此节点相连接的边，是否继续？', '提示').then(function () {
              var item = e.item;
              var data = item.getModel();

              _this.graph.removeItem(item);

              _this.emitChangeEvent('node-remove', {
                item: item,
                data: data
              });
            }).catch(function () {});
          }
        }],
        edge: [{
          label: '移除边',
          command: 'remove-edge',
          handler: function handler(e) {
            _this.$confirm('您正在移除连接，是否继续？', '提示').then(function () {
              var item = e.item;
              var data = item.getModel();

              _this.graph.removeItem(item);

              _this.emitChangeEvent('edge-remove', {
                item: item,
                data: data
              });
            }).catch(function () {});
          }
        }],
        combo: [{
          label: '添加节点',
          command: 'add-node',
          handler: function handler(e) {
            var comboId = e.item.getID();
            _this.dialogs.node.editItem = null;
            _this.dialogs.node.form = {
              comboId: comboId
            };
            _this.dialogs.node.position.x = e.x;
            _this.dialogs.node.position.y = e.y;
            _this.dialogs.node.visible = true;
          }
        }, {
          label: '添加分组',
          command: 'add-combo',
          handler: function handler(e) {
            var comboId = e.item.getID();
            _this.dialogs.combo.editItem = null;
            _this.dialogs.combo.form = {
              parentId: comboId
            };
            _this.dialogs.combo.position.x = e.x;
            _this.dialogs.combo.position.y = e.y;
            _this.dialogs.combo.visible = true;
          }
        }, {}, {
          label: '编辑分组',
          command: 'edit-combo',
          handler: function handler(e) {
            var item = e.item;
            var data = item.getModel();
            var e1 = {
              type: 'combo',
              data: data,
              item: item,
              graph: _this.graph
            };
            var form;
            var handler = _this.options.beforeEditHandler;

            if (handler) {
              // 如果有返回值，则使用返回值作为节点数据
              var handleResult = handler(e1); // 返回 false 取消编辑

              if (handleResult === false) {
                return;
              }

              if (handleResult !== undefined) {
                form = handleResult;
              }
            } else {
              form = Object(objectSpread2["a" /* default */])({}, data);
            }

            _this.dialogs.combo.form = form;
            _this.dialogs.combo.editItem = item;
            _this.dialogs.combo.visible = true;
          }
        }, {
          label: '解散分组',
          command: 'remove-combo',
          handler: function handler(e) {
            _this.$confirm('您正在解散分组，是否继续？', '提示').then(function () {
              var item = e.item;
              var data = item.getModel();

              _this.graph.uncombo(item);

              _this.emitChangeEvent('combo-remove', {
                item: item,
                data: data
              });
            }).catch(function () {});
          }
        }]
      },
      zoom: {
        handleTimer: -1,
        visibleTimer: -1,
        value: 100,
        visible: false
      },
      tooltipPlugins: [],
      gridPlugin: null,
      snapLinePlugin: null
    };
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.unbindMethods();
  },
  methods: {
    init: function init() {
      var styles = this.options.styles;
      var size = this.getBounds(); // const tc = document.createElement('div');
      // tc.id = 'toolbarContainer';
      // tc.style.position = 'absolute'
      // tc.style.top = '60px'
      // tc.style.right = '20px'
      // tc.style.width = '400px'
      // document.body.appendChild(tc);
      // const toolbar = new G6.ToolBar({
      //   container: tc,
      //   getContent: () => {
      //     return `
      //       <ul>
      //         <li code='add'>增加节点</li>
      //         <li code='undo'>撤销</li>
      //       </ul>
      //     `
      //   },
      //   handleClick: (code, graph) => {
      //     if (code === 'add') {
      //       graph.addItem('node', {
      //         id: 'node2',
      //         label: 'node2',
      //         x: 300,
      //         y: 150
      //       })
      //     } else if (code === 'undo') {
      //       toolbar.undo()
      //     }
      //   }
      // })

      var plugins = [];

      if (this.options.tooltipRenderers.node) {
        // 允许出现 tooltip 的 item 类型
        this.options.tooltipRenderers.node.itemTypes = ['node'];
        var tooltipOption = this.options.tooltipRenderers.node;
        tooltipOption.shouldBegin = tooltipOption.shouldBegin.bind(this);
        tooltipOption.getContent = tooltipOption.getContent.bind(this);
        this.tooltipPlugins.push(new g6_default.a.Tooltip(this.options.tooltipRenderers.node));
      }

      if (this.options.tooltipRenderers.edge) {
        // 允许出现 tooltip 的 item 类型
        this.options.tooltipRenderers.edge.itemTypes = ['edge'];
        var _tooltipOption = this.options.tooltipRenderers.edge;
        _tooltipOption.shouldBegin = _tooltipOption.shouldBegin.bind(this);
        _tooltipOption.getContent = _tooltipOption.getContent.bind(this);
        this.tooltipPlugins.push(new g6_default.a.Tooltip(this.options.tooltipRenderers.edge));
      }

      plugins.push.apply(plugins, Object(toConsumableArray["a" /* default */])(this.tooltipPlugins)); // 创建 G6 图实例

      var graph = this.graph = new g6_default.a.Graph({
        // 指定图画布的容器 id
        container: this.$refs.canvas,
        enabledStack: true,
        groupByTypes: false,
        plugins: plugins,
        modes: {
          // 支持的 behavior
          default: ['zoom-canvas', 'click-select', // 'activate-relations',
          'select-item', 'drag-canvas'],
          edit: ['click-select', 'select-item', // 'zoom-canvas',
          'drag-node', 'drag-combo', // 'create-edge',
          'add-edge', 'contextmenu', 'drag-canvas']
        },
        // 画布宽高
        width: size.width,
        height: size.height,
        defaultNode: Object(objectSpread2["a" /* default */])({}, styles.node),
        defaultEdge: Object(objectSpread2["a" /* default */])({
          style: {
            lineAppendWidth: 5
          }
        }, styles.edge),
        defaultCombo: Object(objectSpread2["a" /* default */])({
          type: 'rect-ext',
          // padding: 0,
          // style: {
          // }
          labelCfg: {
            style: {
              fontSize: 24
            }
          }
        }, styles.combo),
        nodeStateStyles: Object(objectSpread2["a" /* default */])({}, styles.nodeStates),
        edgeStateStyles: Object(objectSpread2["a" /* default */])({}, styles.edgeStates)
      });
      graph.data(this.data);
      graph.render();
      window.G6 = graph; // // 处理多边场景
      // const offsetDiff = 10;
      // const multiEdgeType = 'quadratic';
      // const singleEdgeType = 'polyline-ext';
      // const loopEdgeType = 'loop';
      // G6.Util.processParallelEdges(this.data.edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType);

      this.bindMethods();
      this.updateMode();
      this.$emit('ready', {
        graph: graph
      });
    },
    updateMode: function updateMode() {
      var mode = this.editMode ? 'edit' : 'default';
      this.graph.setMode(mode);

      if (!this.editMode) {
        this.$refs.contextmenu.hide();
      } // 网格插件


      if (this.editMode) {
        this.gridPlugin = new g6_default.a.Grid();
        this.graph.addPlugin(this.gridPlugin);
        this.snapLinePlugin = new g6_default.a.SnapLine();
        this.graph.addPlugin(this.snapLinePlugin);
      } else {
        if (this.gridPlugin) {
          this.graph.removePlugin(this.gridPlugin);
        }

        if (this.snapLinePlugin) {
          this.graph.removePlugin(this.snapLinePlugin);
        }
      } // tooltip 插件，在编辑模式下禁用


      var tooltipEnabled = !this.editMode;
      this.tooltipPlugins.forEach(function (tooltip) {
        tooltip.set('enabled', tooltipEnabled);
      }); // 更新连线的箭头：
      // 在编辑模式时展示，预览模式时隐藏

      var showEndArrow = this.editMode;
      this.data.edges.forEach(function (edge) {
        if (!edge.style) {
          edge.style = {};
        }

        edge.style.endArrow = showEndArrow;
      });
      this.graph.render();
    },
    getBounds: function getBounds() {
      var rect = this.$refs.canvas.getClientRects()[0];
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      };
    },
    bindMethods: function bindMethods() {
      events.on('canvas:contextmenu', this.onCanvasContextMenu);
      events.on('node:contextmenu', this.onNodeContextMenu);
      events.on('edge:contextmenu', this.onEdgeContextMenu);
      events.on('combo:contextmenu', this.onComboContextMenu);
      this.graph.on('wheelzoom', this.onCanvasZoom);
      this.graph.on('custom:add-edge', this.onEdgeAdded);
      this.graph.on('node:dragend', this.onDragEnd);
      this.graph.on('combo:dragend', this.onDragEnd);
    },
    unbindMethods: function unbindMethods() {
      events.off('canvas:contextmenu', this.onCanvasContextMenu);
      events.off('node:contextmenu', this.onNodeContextMenu);
      events.off('edge:contextmenu', this.onEdgeContextMenu);
      events.off('combo:contextmenu', this.onComboContextMenu);
      this.graph.off('wheelzoom', this.onCanvasZoom);
      this.graph.off('custom:add-edge', this.onEdgeAdded);
      this.graph.off('node:dragend', this.onDragEnd);
      this.graph.off('combo:dragend', this.onDragEnd);
    },
    onEdgeAdded: function onEdgeAdded(e) {
      this.emitChangeEvent('edge-add', {
        item: e.item,
        data: e.item.getModel()
      });
    },
    onDragEnd: function onDragEnd(e) {
      this.emitChangeEvent('location', {
        item: e.item,
        data: e.item.getModel()
      });
    },
    onCanvasZoom: function onCanvasZoom(e) {
      var _this2 = this;

      clearTimeout(this.zoom.handleTimer);
      clearTimeout(this.zoom.visibleTimer);
      this.zoom.handleTimer = requestAnimationFrame(function () {
        var zoom = _this2.graph.getZoom();

        _this2.zoom.value = Math.round(zoom * 100);
        _this2.zoom.visible = true;

        _this2.$emit('zoom', {
          type: 'zoom',
          value: zoom,
          event: e,
          graph: _this2.graph
        });

        _this2.zoom.visibleTimer = setTimeout(function () {
          _this2.zoom.visible = false;
        }, 1000);
      });
    },
    onCanvasContextMenu: function onCanvasContextMenu(e) {
      this.contextmenuTitle = '操作';
      this.clearSelectedNode();
      this.showContextMenu(e, 'canvas');
    },
    onNodeContextMenu: function onNodeContextMenu(e) {
      this.contextmenuTitle = '节点操作';
      this.clearSelectedNode();
      this.graph.setItemState(e.item, 'selected', true);
      this.showContextMenu(e, 'node');
    },
    onComboContextMenu: function onComboContextMenu(e) {
      this.contextmenuTitle = '分组操作';
      this.graph.setItemState(e.item, 'selected', true);
      this.showContextMenu(e, 'combo');
    },
    onEdgeContextMenu: function onEdgeContextMenu(e) {
      this.contextmenuTitle = '边操作';
      this.clearSelectedNode();
      this.showContextMenu(e, 'edge');
    },
    showContextMenu: function showContextMenu(e, type) {
      var x = e.canvasX;
      var y = e.canvasY;
      var item = e.item; // 检查是否允许打开

      if (this.options.contextmenu) {
        var visible = this.options.contextmenu.visible;

        if (visible !== undefined) {
          if (typeof visible === 'function') {
            visible = visible.call(this.graph, {
              type: type,
              item: item,
              data: item === null || item === void 0 ? void 0 : item.getModel(),
              graph: this.graph
            });
          }

          if (!visible) {
            this.$refs.contextmenu.hide();
            return;
          }
        }
      } // const bounds = this.getBounds()
      // x += bounds.left
      // y += bounds.top


      this.$refs.contextmenu.show(x, y, type, item);
    },
    onNodeOk: function onNodeOk() {
      var _this3 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var editItem, form, e, editHandler, handleResult, oldData, newItem;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                editItem = _this3.dialogs.node.editItem;
                form = _this3.dialogs.node.form; // 添加时，要设置节点的位置

                if (!editItem) {
                  form.x = _this3.dialogs.node.position.x;
                  form.y = _this3.dialogs.node.position.y;
                }

                e = {
                  type: 'node',
                  data: form,
                  item: editItem,
                  graph: _this3.graph
                };
                editHandler = _this3.options.editHandler;

                if (!editHandler) {
                  _context.next = 19;
                  break;
                }

                _context.prev = 6;
                _context.next = 9;
                return editHandler(e);

              case 9:
                handleResult = _context.sent;
                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](6);

                _this3.$message.warning(_context.t0.message);

                return _context.abrupt("return");

              case 16:
                if (!(handleResult === false)) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return");

              case 18:
                if (handleResult !== undefined) {
                  form = handleResult;
                }

              case 19:
                if (!editItem) {
                  _context.next = 28;
                  break;
                }

                oldData = editItem.getModel(); // 检查数据是否重复

                if (!(oldData.id !== form.id && _this3.data.nodes.some(function (node) {
                  return node.id === form.id;
                }))) {
                  _context.next = 24;
                  break;
                }

                _this3.$message.warning('编辑失败，此数据已经存在');

                return _context.abrupt("return");

              case 24:
                _this3.graph.updateItem(editItem, form);

                _this3.emitChangeEvent('node-update', {
                  item: editItem,
                  data: form
                });

                _context.next = 34;
                break;

              case 28:
                if (!_this3.data.nodes.some(function (node) {
                  return node.id === form.id;
                })) {
                  _context.next = 31;
                  break;
                }

                _this3.$message.warning('添加失败，此数据已经存在');

                return _context.abrupt("return");

              case 31:
                newItem = _this3.graph.addItem('node', form);
                newItem.toFront();

                _this3.emitChangeEvent('node-add', {
                  item: null,
                  data: form
                });

              case 34:
                _this3.dialogs.node.visible = false;

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 12]]);
      }))();
    },
    emitChangeEvent: function emitChangeEvent(type, e) {
      var _this4 = this;

      if (!this.editMode) {
        // 非编辑模式下，不触发变更事件
        return;
      }

      this.$nextTick(function () {
        e.type = type;
        e.graph = _this4.graph;

        _this4.$emit(type, e);

        _this4.$emit('change', e);
      });
    },
    onEdgeOk: function onEdgeOk() {},
    onComboOk: function onComboOk() {
      var _this5 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var editItem, form, e, editHandler, handleResult, item;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                editItem = _this5.dialogs.combo.editItem;
                form = _this5.dialogs.combo.form; // form.type = 'rect-ext'
                // form.type = 'rect'
                // 添加时，要设置分组的位置

                if (!editItem) {
                  form.x = _this5.dialogs.combo.position.x;
                  form.y = _this5.dialogs.combo.position.y;
                }

                e = {
                  type: 'combo',
                  data: form,
                  item: editItem,
                  graph: _this5.graph
                };
                editHandler = _this5.options.editHandler;

                if (!editHandler) {
                  _context2.next = 19;
                  break;
                }

                _context2.prev = 6;
                _context2.next = 9;
                return editHandler(e);

              case 9:
                handleResult = _context2.sent;
                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](6);

                _this5.$message.warning(_context2.t0.message);

                return _context2.abrupt("return");

              case 16:
                if (!(handleResult === false)) {
                  _context2.next = 18;
                  break;
                }

                return _context2.abrupt("return");

              case 18:
                if (handleResult !== undefined) {
                  form = handleResult;
                }

              case 19:
                if (editItem) {
                  // const oldData = editItem.getModel()
                  // // 检查数据是否重复
                  // if (oldData.id !== form.id && this.data.combos.some(node => node.id === form.id)) {
                  //   this.$message.warning('编辑失败，此数据已经存在')
                  //   return
                  // }
                  _this5.graph.updateItem(editItem, form);

                  _this5.emitChangeEvent('combo-update', {
                    item: editItem,
                    data: form
                  });
                } else {
                  // // 检查数据是否重复
                  // if (this.data.combos.some(combo => combo.id === form.id)) {
                  //   this.$message.warning('添加失败，此数据已经存在')
                  //   return
                  // }
                  item = _this5.graph.addItem('combo', form);

                  _this5.emitChangeEvent('combo-add', {
                    item: item,
                    data: form
                  });
                }

                _this5.dialogs.combo.visible = false;

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 12]]);
      }))();
    },
    clearSelectedNode: function clearSelectedNode() {
      var _this6 = this;

      var nodes = this.graph.findAllByState('node', 'selected');
      nodes.forEach(function (node) {
        _this6.graph.clearItemStates(node, 'selected');
      });
    },
    highlightNode: function highlightNode(node) {
      this.graph.setItemState(node, 'highlight', true);
    },
    clearHighlightNodes: function clearHighlightNodes() {
      var _this7 = this;

      var nodes = this.graph.getNodes();
      nodes.forEach(function (node) {
        _this7.graph.clearItemStates(node, 'highlight');
      });
    },
    // ---------- 以下是公开接口 --------------
    getData: function getData() {
      return this.graph.save();
    },
    getGraph: function getGraph() {
      return this.graph;
    },
    undo: function undo() {
      this.graph.undo();
    },
    redo: function redo() {
      this.graph.redo();
    },
    clearSelection: function clearSelection() {
      this.clearHighlightNodes();
    },
    findNode: function findNode(predicator, highlight) {
      var _this8 = this;

      if (highlight) {
        this.clearHighlightNodes();
      }

      return this.graph.findAll('node', function (node) {
        var data = node.getModel();
        var hit = predicator(data);

        if (hit && highlight) {
          _this8.highlightNode(node);
        }

        return hit;
      });
    },

    /**
     * 将图导出为图片
     * @param {String} [name=graph] 图片的名称
     * @param {'image/png'|'image/jpeg'|'image/webp'|'image/bmp'} [type] 图片的类型。图的 renderer 为默认的 'canvas' 时生效，图的 renderer 为 'svg' 时将导出 svg 文件
     * @param {Object} [imageConfig] 图片的配置项，可选，具体字段见下方
     * @param {String} [imageConfig.backgroundColor] 图片的背景色，可选，不传值时将导出透明背景的图片
     * @param {Number|Number[]} [imageConfig.padding] 导出图片的上左下右 padding 值。当 padding 为 number 类型时，四周 padding 相等
     * @param {Number} [pixelRatio=window.devicePixelRatio] 控制导出图片的清晰度。默认使用 window.devicePixelRatio
     */
    exportImage: function exportImage(name, type, imageConfig, pixelRatio) {
      // 处理导出清晰度
      // 参考 https://github.com/antvis/G6/issues/2979
      var oldRatio;

      if (pixelRatio) {
        oldRatio = window.devicePixelRatio;
        window.devicePixelRatio = pixelRatio;
      }

      this.graph.downloadFullImage(name, type, imageConfig);

      if (pixelRatio) {
        setTimeout(function () {
          window.devicePixelRatio = oldRatio;
        }, 100);
      }
    },

    /**
     * 将画布上元素生成为图片的 URL
     * @param {'image/png'|'image/jpeg'|'image/webp'|'image/bmp'} [type] 图片的类型。图的 renderer 为默认的 'canvas' 时生效，图的 renderer 为 'svg' 时将导出 svg 文件
     * @param {Object} [imageConfig] 图片的配置项，可选，具体字段见下方
     * @param {String} [imageConfig.backgroundColor] 图片的背景色，可选，不传值时将导出透明背景的图片
     * @param {Number|Number[]} [imageConfig.padding] 导出图片的上左下右 padding 值。当 padding 为 number 类型时，四周 padding 相等
     * @param {Number} [pixelRatio=window.devicePixelRatio] 控制导出图片的清晰度。默认使用 window.devicePixelRatio
     */
    exportImageURL: function exportImageURL(type, imageConfig, pixelRatio) {
      var _this9 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve) {
                  // 处理导出清晰度
                  // 参考 https://github.com/antvis/G6/issues/2979
                  var oldRatio;

                  if (pixelRatio) {
                    oldRatio = window.devicePixelRatio;
                    window.devicePixelRatio = pixelRatio;
                  }

                  _this9.graph.toFullDataURL(function (response) {
                    if (pixelRatio) {
                      setTimeout(function () {
                        window.devicePixelRatio = oldRatio;
                      }, 100);
                    }

                    resolve(response);
                  }, type, imageConfig);
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/components/board.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_boardvue_type_script_lang_js_ = (boardvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/board.vue





/* normalize component */

var board_component = Object(componentNormalizer["a" /* default */])(
  components_boardvue_type_script_lang_js_,
  boardvue_type_template_id_a27027b2_render,
  boardvue_type_template_id_a27027b2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var board = (board_component.exports);
// EXTERNAL MODULE: ./src/components/board.less
var components_board = __webpack_require__("d521");

// CONCATENATED MODULE: ./src/components/index.js




function install(Vue) {
  Vue.component('G6Board', board);
}

/* harmony default export */ var components = ({
  install: install
});

// CONCATENATED MODULE: ./src/main.js









vue_runtime_esm["a" /* default */].use(external_element_ui_default.a);
vue_runtime_esm["a" /* default */].use(components);
new vue_runtime_esm["a" /* default */]({
  render: function render(h) {
    return h(App);
  }
}).$mount('#app');

/***/ }),

/***/ "5f72":
/***/ (function(module, exports) {

module.exports = element-ui;

/***/ }),

/***/ "d521":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.js.map