import { InjectionKey } from 'vue';
import { Store, createStore } from 'vuex';

export const Dweb2FAStoreKey: InjectionKey<Store<Dweb2FAStoreType>> = Symbol("Dweb2FAStoreKey");

export interface Dweb2FAStoreType {
  accountList:{
    id:number,
    secret: string,
    account: string,
    token: string,
  }[]
}

export const Dweb2FAStore = createStore<Dweb2FAStoreType>({
  state: {
    accountList: []
  },
  mutations: {
    setAllAccount(state, accountList){
      state.accountList = accountList;
    }
  },
  actions: {
  },
})

