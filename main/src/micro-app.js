const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    // entry: '//127.0.0.1:8081/',
    container: '#subapp-viewport',
    activeRule: '/sub-vue'
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    // entry: '//127.0.0.1:3000/',
    container: '#subapp-viewport',
    activeRule: '/sub-react'
  }
]
export default microApps;