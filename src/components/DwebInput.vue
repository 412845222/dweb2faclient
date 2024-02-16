<template>
  <div class="dweb-input">
    <label :style="{
      fontSize:labelFontSize+'px'
    }">{{ label }}</label>
    <input v-model="inputValue" readonly type="text"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: "DwebInput",
  props:{
    label:{
      type:String,
      default:"用户名"
    },
    inputValue:{
      type:String,
      default:''
    }
  },
  setup(props,context) {
    const labelFontSize = ref<number>(14)

    onMounted(() => {
      if (props.label.length>=4) {
        labelFontSize.value = 12
      }
    })

    return {
      labelFontSize:labelFontSize,
    }
  }
})
</script>

<style scoped>
.dweb-input {
  width: 100%;
  height:45px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  
}
.dweb-input label {
  width: 20%;
}

.dweb-input input {
  padding: 5px;
  text-align: left;
  font-size: 16px;
  background-color: #373d4d;
  border: 2px solid #39a9b4;
  caret-color: #39a9b4;
  text-align: center;
  width: 92%;
  height: auto;
  overflow: hidden; /* 防止出现垂直滚动条 */
  color: #e6e9f0;
  box-sizing: border-box; /* 调整盒模型，确保padding和border不会影响计算高度 */
}
</style>