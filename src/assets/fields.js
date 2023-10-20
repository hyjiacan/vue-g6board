import { BUILTIN_FIELDS, InputTypes, defineFields } from "../components/models"
import storage from '../assets/storage'
// import lineTypes from "./lineTypes"
import { ColorPicker } from "element-ui"

const nodeFields = defineFields([{
  label: '设备类型',
  name: 'deviceType',
  inputType: InputTypes.SELECT,
  options: storage.getDeviceTypes(),
  config: {
    required: true,
    tip: '不同的设备类型，有不同有图标和含义',
    onchange(e) {
      e.data.device = null
      e.fields.device.options = []
    },
  }
}, {
  label: '选择设备',
  name: 'device',
  inputType: InputTypes.SELECT,
  options: [],
  config: {
    tip: '输入 IP 地址以选择设备',
    required: true,
    optionsLoader: function (e, keyword) {
      const deviceType = e.data.deviceType

      const data = {
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
        }],
      }

      if (!deviceType) {
        console.debug('未选择设备类型')
        this.options = []
        return
      }

      const list = data[deviceType]

      if (!list) {
        console.debug('设备类型下没有设备')
        this.options = []
        return
      }

      if (!keyword) {
        console.debug('关键字为空')
        this.options = list
        return
      }

      console.debug('有数据')

      this.options = list.filter(item => {
        return item.label.indexOf(keyword) !== -1 || item.value.indexOf(keyword) !== -1
      })
      // },
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
  inputType: InputTypes.TEXT,
  // }, {
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
  component: ColorPicker
}, {
  label: '备注',
  name: 'remark',
  inputType: InputTypes.LONGTEXT,
  // }, {
  //   label: '连接类型',
  //   name: 'lineType',
  //   inputType: InputTypes.RADIO,
  //   options: lineTypes,
  //   config: {
  //     default: lineTypes[0].value
  //   }
},
BUILTIN_FIELDS.EDGE_TYPE,
BUILTIN_FIELDS.EDGE_CURVE_OFFSET,
BUILTIN_FIELDS.EDGE_STYLE,
BUILTIN_FIELDS.EDGE_VISIBLE,
])

const edgeFields = defineFields()

const comboFields = defineFields([{
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
    isVisible(e) {
      return e.data.fixed
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
    isVisible(e) {
      return e.data.fixed
    }
  }
}])

export default {
  nodeFields,
  edgeFields,
  comboFields
}
