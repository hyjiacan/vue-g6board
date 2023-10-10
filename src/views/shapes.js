import G6 from "@antv/g6";

function registerNode(nodeName, iconUrl) {

  G6.registerNode(nodeName, {

    draw(cfg, group) {
      const { backgroundConfig: backgroundStyle, style, labelCfg: labelStyle } = cfg;

      if (backgroundStyle) {
        group.addShape('circle', {
          attrs: {
            x: 0,
            y: 0,
            r: cfg.size,
            zIndex: 1,
            ...backgroundStyle,
          },
          name: nodeName + '--background',
        });
      }
      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          // 对应css里面的font-family: "iconfont";
          // fontFamily: fontFamily,
          textAlign: 'center',
          textBaseline: 'middle',
          // text: cfg.text,
          text: 'xxx',
          fontSize: cfg.size,
          zIndex: 2,
          ...style,
        },
        name: nodeName + '--icon',
      });

      const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;

      if (cfg.label) {
        group.addShape('text', {
          attrs: {
            x: 0,
            y: labelY,
            textAlign: 'center',
            textBaseline: 'bottom',
            text: cfg.label,
            zIndex: 3,
            ...labelStyle?.style,
          },
          name: nodeName + '--text',
        });
      }
      return keyShape;
    },
  })
}


const icons = {
  server: '/static/icons/server.svg',
  pc: '/static/icons/pc.svg',
  firewall: '/static/icons/firewall.svg',
  'switch': '/static/icons/switch.svg',
  'router': '/static/icons/router.svg',
}

for (const iconName in icons) {
  if (Object.hasOwnProperty.call(icons, iconName)) {
    const iconUrl = icons[iconName];
    registerNode(iconName, iconUrl)
  }
}
