const root = '/static/icons/svg'

const cache = {}
const cacheObj = {}

const iconCodes = {}

let fontFamily

async function loadIcons() {
  const json = await fetch('/static/icons/iconfont.json').then(resp => resp.json())
  fontFamily = json.font_family
  json.glyphs.forEach((icon) => {
    iconCodes[icon.font_class] = String.fromCodePoint(icon.unicode_decimal)
    // iconCodes[icon.font_class] = `&#x${icon.unicode};`
    // iconCodes[icon.font_class] = `\\u${icon.unicode}`
  });
}

function getSvgPath(element, name) {
  const pathItems = element.getElementsByTagName('path')
  for (const item of pathItems) {
    const path = item.getAttribute('d')
    if (!path) {
      continue
    }
    return path
  }
  throw new Error(`SVG 图标 ${name} 无效，找不到包含 d 的 path 节点`)
}

function isAlphabet(ch) {
  ch = ch.toLowerCase()
  if (ch >= 'a' && ch <= 'z') {
    return true
  }

  return false
}

const util = {
  async getSvg(name) {
    if (cache[name]) {
      return cache[name]
    }
    const url = `${root}/${name}.svg`
    const content = await fetch(url).then(resp => resp.text())
    const el = document.createElement('div')
    el.innerHTML = content
    const path = getSvgPath(el, name)
    cache[name] = path
    return path
  },
  getSvgSync(name, decode) {
    const path = cache[name]
    if (!decode) {
      return path
    }
    if (cacheObj[name]) {
      return cacheObj[name]
    }
    const obj = []
    let item
    for (let index = 0; index < path.length; index++) {
      const ch = path[index];
      if (isAlphabet(ch)) {
        if (item && item.length) {
          obj.push(item)
        }
        item = [ch, []]
        continue
      }
      item[1].push(ch)
    }
    if (item && item.length) {
      obj.push(item)
    }

    obj.forEach(item => {
      const value = item[1]
      if (!value.length) {
        item.length = 1
        return
      }
      const temp = value.join('').split(' ')
      temp.forEach((t, i) => {
        item[i + 1] = temp[i]
      })
    })
    cacheObj[name] = obj
    return obj
  },
  loadIcons,
  getIconCode(name) {
    return iconCodes[name] || ''
  },
  getFontFamily() {
    return fontFamily
  }
}

export default util
