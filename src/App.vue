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
import { LAppLive2DManager } from './lapplive2dmanager';

@Component
export default class App extends Vue {
  public live2dmanager: LAppLive2DManager | null = null;
  public mounted() {
    let lappdelegate = LAppDelegate.getInstance();
    if (lappdelegate.initialize() == false) {
      return;
    }
    this.live2dmanager = LAppLive2DManager.getInstance();
    lappdelegate.run();
    this.live2dmanager.addModel({path: '/resource/momo/', modelName: 'momo'});
  }
  public beforeDestroy() {
    if (this.live2dmanager) {
      this.live2dmanager.releaseAllModel();
    }
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
