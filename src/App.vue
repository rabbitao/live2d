<template>
  <div id="app">
    <canvas id="SAMPLE" width="1400" height="800">
        このブラウザは
        <code>&lt;canvas&lt;</code>要素をサポートしていません。
    </canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LAppDelegate } from './lappdelegate';

@Component
export default class App extends Vue {
  public mounted() {
    let lappdelegate = LAppDelegate.getInstance({path: '/resource/momo/', modelName: 'momo'});
    if (lappdelegate.initialize() == false) {
      return;
    }

    lappdelegate.run();
  }
  public beforeDestroy() {
    LAppDelegate.releaseInstance();
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
