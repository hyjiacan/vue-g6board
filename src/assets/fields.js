import InputTypes from "../components/inputtypes"
import { Fields } from "../components/models"
import storage from '../assets/storage'
import lineTypes from "./lineTypes"

const nodeFields = new Fields([{
  label: '设备类型',
  name: 'deviceType',
  inputType: InputTypes.SELECT,
  options: storage.getDeviceTypes(),
  config: {
    required: true,
    tip: '不同的设备类型，有不同有图标和含义'
  }
}, {
  label: '设备 IP',
  name: 'ip',
  inputType: InputTypes.TEXT,
  config: {
    required: true,
    tip: 'IP 是一个设备的唯一标识'
  }
},{
  label: '设备名称',
  name: 'label',
  inputType: InputTypes.TEXT,
}, {
  label: '速率',
  name: 'speed',
  inputType: InputTypes.NUMBER,
}, {
  label: '可用',
  name: 'enabled',
  inputType: InputTypes.SWITCH,
}, {
  label: '备注',
  name: 'remark',
  inputType: InputTypes.LONGTEXT,
}, {
  label: '连接类型',
  name: 'lineType',
  inputType: InputTypes.RADIO,
  options: lineTypes,
  config: {
    default: lineTypes[0].value
  }
}, {
  label: '多选',
  name: 'checkbox',
  inputType: InputTypes.CHECKBOX,
  options: storage.getDeviceTypes(),
}])

const edgeFields = new Fields()

export default {
  nodeFields,
  edgeFields
}
