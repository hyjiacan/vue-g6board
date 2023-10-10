
const edges = [{
  "source": '192.168.1.1',
  "target": '192.168.1.2',
  "speed": "100M/s",
  "traffic": "78M/s",
  "state": "正常"
},
{
  "source": '192.168.1.3',
  "target": '192.168.1.1',
  "speed": "100M/s",
  "traffic": "78M/s",
  "state": "正常"
},
{
  "source": '192.168.1.4',
  "target": '192.168.1.1',
  "speed": "100M/s",
  "traffic": "78M/s",
  "state": "正常"
},
{
  "source": '192.168.1.11',
  "target": '192.168.1.1',
  "speed": "100M/s",
  "traffic": "78M/s",
  "state": "正常"
},
{
  "source": '192.168.1.13',
  "target": '192.168.1.11',
  "speed": "10M/s",
  "traffic": "2.5M/s",
  "state": "卡顿"
},
{
  "source": '192.168.1.14',
  "target": '192.168.1.11',
  "speed": "1000M/s",
  "traffic": "0",
  "state": "断开"
},]

export default edges
