<template>
  <div class="layout-wrapper">
    <a
      style="
        display: inline-block;
        width: 80px;
        height: 80px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
      "
      href="https://github.com/Ayana7/qiankun-demo"
      class="github-corner"
      aria-label="View source on GitHub"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style="
          fill: #151513;
          color: #fff;
          position: absolute;
          top: 0;
          border: 0;
          right: 0;
        "
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px"
          class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          class="octo-body"
        ></path>
      </svg>
    </a>
    <div class="layout-header">
      <div class="logo">QIANKUN-EXAMPLE</div>
      <ul class="sub-apps">
        <li
          v-for="item in microApps"
          :class="{ active: item.activeRule === current }"
          :key="item.name"
          @click="goto(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>
import microApps from './micro-app'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      microApps,
      current: location.pathname || '/sub-vue',
    }
  },
  created(){
    // 默认跳转到
    if(location.pathname == '/'){
      this.goto(this.microApps[0])
    }
  },
  methods: {
    goto(item) {
      this.current = item.name
      window.location.href = location.origin +item.activeRule
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style>
html,
body {
  margin: 0 !important;
  padding: 0;
}
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}

.layout-wrapper .layout-header {
  height: 50px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 50px;
  position: relative;
}
.layout-wrapper .layout-header .logo {
  float: left;
  margin: 0 50px;
}
.layout-wrapper .layout-header .sub-apps {
  list-style: none;
  margin: 0;
}
.layout-wrapper .layout-header .sub-apps li {
  list-style: none;
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
}
.layout-wrapper .layout-header .sub-apps li.active {
  color: #42b983;
  text-decoration: underline;
}
.layout-wrapper .layout-header .userinfo {
  position: absolute;
  right: 100px;
  top: 0;
}
</style>