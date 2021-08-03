<template>
  <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6'
import insertCss from 'insert-css';
insertCss(`
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);
export default {
  data() {
    return {
      data: {}, //
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      G6.registerNode('card-node', {
        draw: function drawShape(cfg, group) {
          const r = 2;
          const color = '#5B8FF9';
          const w = cfg.size[0];
          const h = cfg.size[1];
          const shape = group.addShape('rect', {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, //200,
              height: h, // 60
              stroke: color,
              radius: r,
              fill: '#fff',
            },
            name: 'main-box',
            draggable: true,
          });

          group.addShape('rect', {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, //200,
              height: h / 2, // 60
              fill: color,
              radius: [r, r, 0, 0],
            },
            name: 'title-box',
            draggable: true,
          });

          // title text
          group.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: -w / 2 + 8,
              y: -h / 2 + 2,
              lineHeight: 20,
              text: cfg.id,
              fill: '#fff',
            },
            name: 'title',
          });
          cfg.children &&
            group.addShape('marker', {
              attrs: {
                x: w / 2,
                y: 0,
                r: 6,
                cursor: 'pointer',
                symbol: G6.Marker.collapse,
                stroke: '#666',
                lineWidth: 1,
                fill: '#fff',
              },
              name: 'collapse-icon',
            });
          group.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: -w / 2 + 8,
              y: -h / 2 + 24,
              lineHeight: 20,
              text: 'description',
              fill: 'rgba(0,0,0, 1)',
            },
            name: `description`,
          });
          return shape;
        },
        setState(name, value, item) {
          if (name === 'collapsed') {
            const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
            const icon = value ? G6.Marker.expand : G6.Marker.collapse;
            marker.attr('symbol', icon);
          }
        },
      });
      var data = {
        id: 'Modeling Methods',
        isYES: true,
        children: [
          {
            id: 'Classification',
            children: [
              { id: 'Logistic regression',isYES: true,},
              { id: 'Linear discriminant analysis' },
              { id: 'Rules' },
              { id: 'Decision trees' },
              { id: 'Naive Bayes' },
              { id: 'K nearest neighbor' },
              { id: 'Probabilistic neural network' },
              { id: 'Support vector machine' },
            ],
          },
          {
            id: 'Consensus',
            children: [
              {
                id: 'Models diversity',
                children: [
                  { id: 'Different initializations' },
                  { id: 'Different parameter choices' },
                  { id: 'Different architectures' },
                  { id: 'Different modeling methods' },
                  { id: 'Different training sets' },
                  { id: 'Different feature sets' },
                ],
              },
              {
                id: 'Methods',
                children: [
                  { id: 'Classifier selection' },
                  { id: 'Classifier fusion' },
                ],
              },
              {
                id: 'Common',
                children: [
                  { id: 'Bagging' },
                  { id: 'Boosting' },
                  { id: 'AdaBoost' },
                ],
              },
            ],
          },
          {
            id: 'Regression',
            children: [
              { id: 'Multiple linear regression' },
              { id: 'Partial least squares' },
              { id: 'Multi-layer feedforward neural network' },
              { id: 'General regression neural network' },
              { id: 'Support vector regression' },
            ],
          },
        ],
      }
      const container = document.getElementById('container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      
      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        modes: {
          default: [
            {
              type: 'collapse-expand',
              onChange: function onChange(item, collapsed) {
                const data = item.getModel()
                data.collapsed = collapsed
                return true
              },
            },
            'drag-canvas',
            'zoom-canvas',
            {
              type: 'tooltip',
              formatText: function formatText(model) {
                const text = `Export Value: ${model.id}(1000USD)<br/>Region`;
                return text;
              },

              shouldUpdate: function shouldUpdate() {
                return true;
              },
            },
          ],
        },
        defaultNode: {
          // size: 26,
          // anchorPoints: [
          //   [0, 0.5],
          //   [1, 0.5],
          // ],
          type: 'card-node',
          size: [100, 40],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
        },
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId: function getId(d) {
            return d.id
          },
          getHeight: function getHeight() {
            return 16
          },
          getWidth: function getWidth() {
            return 16
          },
          getVGap: function getVGap() {
            return 10
          },
          getHGap: function getHGap() {
            return 100
          },
        },
      })

      graph.node(function (node) {
        return {
          label: node.id + (node.isYES ? '是' : ''),
          labelCfg: {
            offset: 10,
            position:
              node.children && node.children.length > 0 ? 'left' : 'right',
          },
        }
      })

      graph.data(data)
      graph.render()
      graph.fitView()

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
    },
  },
}
</script>
