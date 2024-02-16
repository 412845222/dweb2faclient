<template>
  <DwebWorkbench :data="UI_data"></DwebWorkbench>
</template>

<script lang="ts">
import QrCanvas from "./components/QrCanvas.vue";
import AccountList from "./components/AccountList.vue";
import { Dweb2FAStoreKey, Dweb2FAStore } from "./store";
import { defineComponent, onMounted, provide, ref } from "vue";
import { Panel, resizeWindowUiData, Workbench, UIdataInstantiation } from "dweb-ui/Dweb_workbench/utils/UI_data";
export default defineComponent({
  name: "App",
  setup() {
    provide(Dweb2FAStoreKey, Dweb2FAStore);
    const windowWidth = ref<number>(window.innerWidth);
    const windowHeight = ref<number>(window.innerHeight);

    const UI_data = ref<Workbench>(
      new Workbench({
        styleValue: {
          width: windowWidth.value + "px",
          height: windowHeight.value + "px",
          backgroundColor: "#21252B",
          flexDirection: "column",
        },
        panels: [
          new Panel({
            name: "扫码区域",
            styleValue: {
              width: "100%",
              height: "50%",
              backgroundColor: "#21252B",
            },
            component:QrCanvas
          }),
          new Panel({
            name: "帐号列表",
            styleValue: {
              width: "100%",
              height: "50%",
              backgroundColor: "#282C34",
            },
            component:AccountList
          }),
        ],
      })
    );

    let resizeTimeout: NodeJS.Timeout;

    const onResize = () => {
      windowWidth.value = window.innerWidth;
      windowHeight.value = window.innerHeight;
      UI_data.value.styleValue.width = windowWidth.value + "px";
      UI_data.value.styleValue.height = windowHeight.value + "px";

      resizeWindowUiData(UI_data.value, windowWidth.value, windowHeight.value);

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        UIdataInstantiation(UI_data.value, windowWidth.value, windowHeight.value);
      }, 300);
    };


    onMounted(() => {
      window.addEventListener("resize", onResize);
      //@ts-ignore
      window.electron.setWindowTitleBarStyle('#ff0000');
    });

    return {
      UI_data: UI_data,
    };
  },
});
</script>

<style scoped>
#dweb2fa {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#erweimaCanvas {
  border: 1px solid #fff;
}
#account-list {
  border: 1px solid #fff;
  width: 100%;
  height: 300px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  overflow-y: scroll;
}
.account-item {
  margin: 0 auto;
  width: 80%;
  height: 50px;
  min-height: 50px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: start;
}

.account-item .text {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  color: #000;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.account-item .account {
  width: 60%;
  font-size: 12px;
}
</style>
