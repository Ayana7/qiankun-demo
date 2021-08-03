<template>
  <div id="container"></div>
</template>

<script>
import { Graph } from '@antv/x6'
import { DagreLayout } from '@antv/layout'
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
        nodes: [],
        edges: [],
      }
      const edges = [
        ['1', '2'],
        ['2', '3'],
        ['2', '4'],
        ['4', '5'],
        ['4', '6'],
        ['4', '7'],
        ['4', '8'],
        ['5', '9'],
        ['6', '10'],
        ['6', '13'],
        ['13', '14'],
        ['8', '11'],
        ['8', '12'],
        ['8', 'exemple data']
      ]

      for (let i = 1; i <= 14; i++) {
        data.nodes.push({
          id: `${i}`,
          shape: 'rect',
          width: 60,
          height: 30,
          label: i,
          attrs: {
            body: {
              fill: '#fff',
              stroke: '#808080',
            },
            label: {
              fill: '#000',
            },
          },
        })
      }
      data.nodes.push({
        id: `exemple data`,
          shape: 'rect',
          width: this.getTextWidth('IT sol-implementation M6666', 'normal 14px Arial'),
          height: 30,
          label: 'IT sol-implementation M666634343',
          attrs: {
            body: {
              fill: '#fff',
              stroke: '#808080',
            },
            label: {
              fill: '#000',
            },
          },
      })

      edges.forEach((edge) => {
        data.edges.push({
          source: edge[0],
          target: edge[1],
          attrs: {
            line: {
              stroke: '#808080',
              strokeWidth: 1,
            },
          },
        })
      })

      const graph = new Graph({
        container: document.getElementById('container'),
        grid: true,
      })

      const dagreLayout = new DagreLayout({
        type: 'dagre',
        rankdir: 'LR',
        align: 'UL',
        ranksep: 35,
        nodesep: 15,
      })
      const model = dagreLayout.layout(data)

      graph.fromJSON(model)

    },
    getTextWidth(text, font) {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      context.font = font
      const metrics = context.measureText(text)
      console.log(metrics.width)
      return metrics.width
    }
 
  }
  
}
</script>
