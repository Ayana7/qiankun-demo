<template>
  <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6'
export default{
  data(){
    return {
      data: {}, //
    }
  },
  created(){
      
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      const data = {
        id: 'A',
        children: [
          {
            id: 'A1',
            children: [{ id: 'A11' }, { id: 'A12' }, { id: 'A13' }, { id: 'A14' }],
          },
          {
            id: 'A2',
            children: [
              {
                id: 'A21',
                children: [{ id: 'A211' }, { id: 'A212' }],
              },
              {
                id: 'A22',
              },
            ],
          },
        ],
      };

      const container = document.getElementById('container');
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;

      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        modes: {
          default: ['drag-canvas',
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
          type: 'card-node',
          size: [100, 40],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            endArrow: true,
          },
        },
        layout: {
          type: 'indented',
          direction: 'LR',
          dropCap: false,
          indent: 200,
          getHeight: () => {
            return 60;
          },
        },
      });

      graph.data(data);
      graph.render();
      graph.fitView();
      graph.on('node:click', (e) => {
        if (e.target.get('name') === 'collapse-icon') {
          e.item.getModel().collapsed = !e.item.getModel().collapsed;
          graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed);
          graph.layout();
        }
      });

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    }
 
  }
  
}
</script>
