import G6 from "@antv/g6";
import util from "../../assets/util";

const nodeType = 'icon-node'
const edgeType = {
  disconnected: 'edge-disconnected'
}

function register() {
  console.info('Register type', nodeType)
  const fontFamily = util.getFontFamily()
  G6.registerNode(nodeType, {
    draw(cfg, group) {
      const { backgroundConfig: backgroundStyle, style, labelCfg: labelStyle } = cfg;

      // if (backgroundStyle) {
      //   group.addShape('circle', {
      //     attrs: {
      //       x: 0,
      //       y: 0,
      //       r: cfg.size,
      //       zIndex: 1,
      //       ...backgroundStyle,
      //     },
      //     name: nodeType + '--background',
      //   });
      // }
      console.info('font', fontFamily)
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
        name: nodeType + '--icon',
      });

      // const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;

      // if (cfg.label) {
      //   group.addShape('text', {
      //     attrs: {
      //       x: 0,
      //       y: labelY,
      //       textAlign: 'center',
      //       textBaseline: 'bottom',
      //       text: cfg.label,
      //       zIndex: 3,
      //       ...labelStyle?.style,
      //     },
      //     name: nodeType + '--text',
      //   });
      // }
      return keyShape;
    },
  });

  G6.registerEdge(edgeType.disconnected, {
    afterDraw(cfg, group) {
      // 获取图形组中的第一个图形，在这里就是边的路径图形
      const shape = group.get('children')[0];
      // 获取路径图形的中点坐标
      const midPoint = shape.getPoint(0.5);
      // 在中点增加一个矩形，注意矩形的原点在其左上角
      group.addShape('rect', {
        attrs: {
          width: 10,
          height: 10,
          fill: '#f00',
          // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
          x: midPoint.x - 5,
          y: midPoint.y - 5,
        },
      });
    },
    update: undefined,
  }, 'polyline',
  );

  console.info('done!')
}

export default {
  register,
  type: nodeType
}