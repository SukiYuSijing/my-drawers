import { createStore } from 'vuex'
import type { Component, Ref } from 'vue'
import type { Store } from 'vuex'

export const storeDrawer: Store<Record<string, any>> = createStore({})
const obj = {
  state: {
    existingDrawers: [],
    doneCallbacks: [],
    existingDrawersQty: 0
  },
  mutations: {
    pushExistingDrawers: (
      state: Record<string, any>[],
      val: Ref<Component | null>
    ) => {
      state.existingDrawers.push(val)
    },
    pushExistingDone: (
      state: Record<string, any>,
      done: () => void | undefined
    ) => {
      if (done) state.doneCallbacks.push(done)
      else {
        state.doneCallbacks.length = 0
      }
    },
    setQty: (
      state: Record<string, any>,
      existingDrawersQty: number
    ) => {
      state.existingDrawersQty = existingDrawersQty
    },
  },
}
export function storeRegisterModule(name: string) {
  storeDrawer.registerModule(name, obj)
}

export function storeUnregisterModule(name: string) {
  storeDrawer.unregisterModule(name, obj)
}
