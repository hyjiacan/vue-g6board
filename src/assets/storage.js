import nodes from "./nodes"
import edges from "./edges"
import deviceTypes from "./deviceTypes"

const storeKey = 'graph-data'

const combos = []

function getData() {
  let store = localStorage.getItem(storeKey)
  if (store) {
    store = JSON.parse(store)
  } else {
    nodes.forEach(node => {
      node.type = 'image-ext'
      node.img = getIcon(node.deviceType)
      node.size = getSize(node.deviceType)
    })
    store = {
      nodes,
      edges,
      combos
    }
  }
  return store
}

function getIcon(deviceType) {
  return `/static/icons/${deviceType}.svg`
}

function setData(data) {
  localStorage.setItem(storeKey, JSON.stringify(data))
}

function getDeviceTypes() {
  return deviceTypes.map(dt => {
    dt.icon = getIcon(dt.value)
    return dt
  })
}

function getSize(deviceType) {
  return deviceTypes.filter(dt => dt.value === deviceType)[0].size
}

export default {
  get: getData,
  set: setData,
  getDeviceTypes,
  getIcon,
  getSize
}
