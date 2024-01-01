import { createStore } from 'vuex'
import type { Component, Ref } from 'vue'
import type { Store } from 'vuex'

export const storeDrawer: Store<Record<string, any>> = createStore({})
const obj = {
  state: {
    existingDrawers: [],
  },
  mutations: {
    pushExistingDrawers: (
      state: Record<string, Ref<Component | null>[]>,
      val: Ref<Component | null>
    ) => {
      state.existingDrawers.push(val)
    },
    setExistingDrawers: (
      state: Record<string, Ref<Component | null>[]>,
      val: Ref<Component | null>[]
    ) => {
      if (Array.isArray(val)) state.existingDrawers = val
    },
  },
}
export function storeRegisterModule(name: string) {
  storeDrawer.registerModule(name, obj)
}

export function storeUnregisterModule(name: string) {
  storeDrawer.unregisterModule(name, obj)
}
