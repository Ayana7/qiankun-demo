import { createApp } from 'vue'
import App from './App.vue'
// import Vue from 'vue'
function render (props = {}) {
  const { container } = props
 
  // new Vue({
  //   render: (h) => h(App)
  // }).$mount(container ? container.querySelector('#app') : '#app')
  createApp(App).mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
}

export async function unmount () {
}
// createApp(App).mount('#app')
