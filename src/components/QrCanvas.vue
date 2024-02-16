<template>
  <div id="dweb-qr-canvas">
    <div id="erweima-info">
      <canvas ref="erweimaCanvas" id="erweimaCanvas" width="300" height="300"></canvas>
      <div id="erweima-info-text">
        
        <DwebInput :label="'帐号'" :inputValue="accountInfo.account" ></DwebInput>
        <DwebInput :label="'验证码'" :inputValue="accountInfo.token"></DwebInput>
        <div v-if="accountInfo.token!='000000'" style="border:1px solid #38A8B5;width: 100%;text-align: center;">如果使用,记得保存</div>
      </div>
    </div>

    <div id="img-select-scan">
      <div class="btn">
        <DwebBtn @click="clickQrBtn" :text="'二维码'"></DwebBtn>
        <input ref="erweimaInputDom" @change="erweimaImage" style="display: none" type="file" />
      </div>
      <div class="btn">
        <DwebBtn @click="scanErweima" :text="'扫描'"></DwebBtn>
      </div>
      <div class="btn">
        <DwebBtn @click="saveToAccountList" :text="'保存'"></DwebBtn>
      </div>
      <div class="btn">
        <DwebBtn :text="'B站ID:九弓子'"></DwebBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DwebBtn from "./DwebBtn.vue";
import DwebInput from "./DwebInput.vue";
import { defineComponent, inject, onMounted, ref } from "vue";
import { DwebCanvas } from "../utils/DwebCanvas";
import { Dweb2FAStoreKey } from "../store";

export default defineComponent({
  name: "QrCanvas",
  components: {
    DwebBtn: DwebBtn,
    DwebInput:DwebInput
  },
  setup() {
    const store = inject(Dweb2FAStoreKey)
    const dweb2faIPC = window.dweb2fa;
    const erweimaCanvas = ref();
    const erweimaInputDom = ref<HTMLInputElement>();
    const accountInfo = ref<{ account: string; token: string,secret:string }>({
      account: "尚未扫码",
      token: "000000",
      secret:""
    });

    let dwebcanvas: DwebCanvas | null = null;

    onMounted(() => {
      dwebcanvas = new DwebCanvas({
        width: 300,
        height: 300,
        canvas: erweimaCanvas.value,
      });
    });


    const saveToAccountList = ()=>{
      if (accountInfo.value.account=='尚未扫码' || accountInfo.value.token=='000000') {
        alert('请先扫描二维码');
        return;
      }

      let msg = {
        event: "saveAccount",
        data: {
          account: accountInfo.value.account,
          secret: accountInfo.value.secret
        },
      };
      dweb2faIPC.onec("query-all", (data: any) => {
        console.log("----page query-all----");
        console.log(data);
        store?.commit("setAllAccount", data);
      });
      dweb2faIPC.send(msg);
    }

    const clickQrBtn = () => {
      console.log("clickQrBtn");
      erweimaInputDom.value?.click();
    };

    const erweimaImage = (e: Event) => {
      console.log(e);
      let input = e.target as HTMLInputElement;
      let file = input.files?.[0];
      if (file) {
        dwebcanvas?.drawImage(file);
      }
    };

    const scanErweima = () => {
      let ret = dwebcanvas?.scanErweima();
      console.log("二维码内容解析:", ret);
      let msg = {
        event: "totp",
        data: {
          account: ret?.username,
          secret: ret?.secret,
        },
      };
      dweb2faIPC.onec(
        "totp",
        (data: {
          data:{
                account: string;
                token: string;
              }
            | false;
        }) => {
          console.log(data);
          let otpAuth = data.data;
          if (otpAuth != false) {
            console.log(otpAuth);
            accountInfo.value = {
              account: otpAuth.account,
              token: otpAuth.token,
              secret:ret?.secret!
            }
          }
        }
      );
      dweb2faIPC.send(msg);
    };

    return {
      erweimaCanvas: erweimaCanvas,
      erweimaInputDom: erweimaInputDom,
      accountInfo:accountInfo,
      clickQrBtn: clickQrBtn,
      erweimaImage: erweimaImage,
      scanErweima:scanErweima,
      saveToAccountList:saveToAccountList
    };
  },
});
</script>

<style scoped>
#dweb-qr-canvas {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: #fff;
}
#erweima-info {
  width: 50%;
  text-shadow: 0px 0px 2px #38a9b69d, 0px 0px 4px #38a9b69d, 0px 0px 6px #38a9b69d;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
#erweimaCanvas {
  width: 120px;
  height: 120px;
  border: 5px solid #37a8b5;
  box-shadow: 0px 0px 10px #38a9b69d, 0px 0px 10px #38a9b69d;
}
#img-select-scan {
  width: 40%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
#img-select-scan .btn {
  width: 100px;
  margin: 5px;
}
</style>
