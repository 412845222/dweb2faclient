<template>
  <div id="account-list">
    <div v-for="item in accountList" class="account-item">
      <div class="account">
        {{ item.account }}
      </div>
      <div class="token">
        {{ item.token }}
      </div>
      <div class="btn">
        <DwebBtn @click="deleteItem(item.id)" :text="'删除'" :color="'#D64F4EBE'"></DwebBtn>
      </div>
      <div class="btn">
        <DwebBtn @click="refreshAll" :text="'刷新'" :color="'#D6AB3EBE'"></DwebBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Dweb2FAStoreKey } from '../store';
import DwebBtn from './DwebBtn.vue';
import { computed, defineComponent, inject } from 'vue';
export default defineComponent({
  name: 'AccountList',
  components: {
    DwebBtn: DwebBtn
  },
  setup() {
    const store = inject(Dweb2FAStoreKey)
    const dweb2faIPC = window.dweb2fa;
    const accountList = computed(() => {
      return store?.state.accountList
    })

    const deleteItem = (id:number)=>{
      console.log('删除')
      let msg = {
        event: "deleteAccount",
        data: {
          id:id
        },
      };
      dweb2faIPC.onec("query-all", (data: any) => {
        console.log("----page query-all----");
        console.log(data);
        store?.commit("setAllAccount", data);
      });
      dweb2faIPC.send(msg);
    }

    const refreshAll =()=>{
      let msg = {
        event: "queryAll",
        data: {},
      };
      dweb2faIPC.onec("query-all", (data: any) => {
        console.log("----page query-all----");
        console.log(data);
        store?.commit("setAllAccount", data);
      });
      dweb2faIPC.send(msg);
    }

    return {
      accountList:accountList,
      deleteItem:deleteItem,
      refreshAll:refreshAll
    }
  }
})
</script>

<style scoped>
#account-list {
  width: 100%;
  height: 100%;
  background-color: #373D4D;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow-y: scroll;
  border: 1px solid #37a8b5;
  box-shadow: 0px 0px 10px #38a9b69d, 0px 0px 10px #38a9b69d;
  /* 隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;

}
#account-list::-webkit-scrollbar {
  display: none; /* 隐藏滚动条在webkit (Chrome, Safari, etc.) */
}
.account-item {
  color: #fff;
  margin: 0 auto;
  width: 100%;
  height: 50px;
  min-height: 50px;
  border: 1px solid #51B7C3;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 10px;
  box-shadow: 0px 0px 10px #38a9b69d, 0px 0px 10px #38a9b69d;
}
.account {
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px #38a9b69d, 0px 0px 10px #38a9b69d;
}
.token {
  width: 20%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px #38a9b69d, 0px 0px 10px #38a9b69d;
}
.btn {
  width: 15%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px #38a9b69d, 0px 0px 10px #38a9b69d;
  cursor: pointer;
}
</style>