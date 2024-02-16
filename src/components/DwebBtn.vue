<template>
  <div class="dweb-svg-btn" :style="{
    backgroundColor:color
  }">
    <div class="btn-text">
      <span>{{ text }}</span>
    </div>
    <div class="btn-mask">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "DwebSvgBtn",
  props:{
    text:{
      type:String,
      default:"按钮"
    },
    color:{
      type:String,
      default:"#39A9B480"
    }
  },
  setup(props) {
    const text = ref<string>(props.text)


    return {
      text:text
    }
  },
})
</script>

<style scoped>
.dweb-svg-btn {
  position: relative;
  /* background-color: #38a8b368; */
  width: 100%;
  min-height: 45px;
  user-select: none; /* 可选，禁止用户选择元素内容 */
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none; /* Disable image dragging in WebKit browsers */
  -khtml-user-drag: none; /* Disable image dragging in Konqueror browser */
  -moz-user-drag: none; /* Disable image dragging in Firefox browser */
  -o-user-drag: none; /* Disable image dragging in Opera browser */

  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #39A9B480;
}

.btn-mask {
  background-color: #00000000;
  width: 100%;
  min-height: 45px;
  position: absolute;
  top:0px;
  left: 0px;
  width: 100%;
  cursor: pointer;
}
.btn-mask:active {
  background-color: #00000050;
}
</style>