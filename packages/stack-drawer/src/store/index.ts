import { createStore } from 'vuex'
import type { Component, Ref } from 'vue'
import type { Store } from 'vuex'
type IObj = {
  // 当前打开抽屉的个数
  existingDrawers: Ref<Component | null>[],
  // beforeClose的回调方法，需要执行几个
  doneCallbacks: (() => void)[],
  // 存在的抽屉数量
  existingDrawersQty: number,
  // 在第几个抽屉点击关闭
  clickIndex: number,
  // 需不需要响应关闭抽屉的事件
  shouldExecute: boolean
}
export const storeDrawer: Store<Record<string, any>> = createStore({})
const obj = {
  state: {
    existingDrawers: [],
    doneCallbacks: [],
    existingDrawersQty: 0,
    clickIndex: 0,
    shouldExecute: false
  } as IObj,
  mutations: {
    pushExistingDrawers: (
      state: IObj,
      val: Ref<Component | null>
    ) => {
      state.existingDrawers.push(val)
    },
    pushExistingDone: (
      state: IObj,
      done: () => void | undefined
    ) => {
      if (done) state.doneCallbacks.push(done)
      else {
        state.doneCallbacks.length = 0
      }
    },
    setQty: (
      state: IObj,
      existingDrawersQty: number
    ) => {
      state.existingDrawersQty = existingDrawersQty
    },
    setIndex: (
      state: IObj,
      clickIndex: number
    ) => {
      state.clickIndex = clickIndex
    },
    setFlag: (
      state: IObj,
      shouldExecute: boolean
    ) => {
      state.shouldExecute = shouldExecute
    },
  },
}
export function storeRegisterModule(name: string) {
  storeDrawer.registerModule(name, obj)
}

export function storeUnregisterModule(name: string) {
  storeDrawer.unregisterModule(name)
}
