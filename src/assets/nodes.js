
const nodes = [{
  label: "交换机1",
  ip: "192.168.1.1",
  deviceType: "switch",
  color: 'red',
  group: '第一个域',
  resp_person: '张三',
  dept: '安全运维',
}, {
  label: "防火墙",
  ip: "192.168.1.2",
  deviceType: "firewall",
  color: '#007acc',
  resp_person: '张三',
  dept: '安全运维',
}, {
  label: "服务器A",
  ip: "192.168.1.3",
  deviceType: "server",
  group: '第一个域',
  resp_person: '张三',
  dept: '安全运维',
}, {
  label: "服务器B",
  ip: "192.168.1.4",
  deviceType: "server",
  group: '第一个域',
  resp_person: '张三',
  dept: '安全运维',
}, {
  label: "交换机2",
  ip: "192.168.1.11",
  deviceType: "switch",
  color: 'darkgreen',
  group: '第二个域',
  resp_person: '张三',
  dept: '安全运维',
}, {
  label: "服务器C",
  ip: "192.168.1.13",
  deviceType: "server",
  color: 'blue',
  group: '第二个域',
  resp_person: '张三',
  dept: '安全运维',
}, {
  label: "服务器D",
  ip: "192.168.1.14",
  deviceType: "server",
  color: 'purple',
  group: '第二个域',
  resp_person: '张三',
  dept: '安全运维',
},]

// const nodeSet = [{
//   "id": 4,
//   "nodes": ['192.168.1.3', '192.168.1.4']
// }]

// 默认情况下，使用 ip 作为数据 id
nodes.forEach(node => {
  node.id = node.ip
})

export default nodes
