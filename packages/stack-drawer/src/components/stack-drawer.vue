<template>
  <el-drawer
    ref="drawerRef"
    v-bind="attrs"
    :class="[props.class, $style['stackDrawer'], timestamp + '-drawer-id']"
    :modal-class="`${props.modalClass}, ${$style['stackDrawer-modal-class']}`"
    :before-close="beforeClose"
  >
    <template #header="header">
      <component :is="$slots.header" v-bind="header" />
    </template>
    <slot>{{ $slots.default }}</slot>
    <template #footer="footer">
      <component :is="$slots.footer" v-bind="footer" />
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, useAttrs, watch } from 'vue';
import { ElDrawer } from 'element-plus';
import 'element-plus/theme-chalk/el-drawer.css';
import 'element-plus/theme-chalk/base.css';
import {
  storeDrawer,
  storeRegisterModule,
  storeUnregisterModule,
} from '../store/index';
import type { Component, Ref } from 'vue';
const drawerRef: Ref<Component | null> = ref(null);
const timestamp = Date.now().valueOf();
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  modalClass: {
    type: String,
    default: '',
  },
  beforeClose: {
    type: Function,
    required: false,
  },
});
const attrs = useAttrs();
let existingDrawersQty = 0;
const closeHandler = (event: MouseEvent) => {
  const shouldExecute = storeDrawer.state.stackDrawer.shouldExecute;
  if (shouldExecute) {
    storeDrawer.commit('setFlag', false);
    return;
  }
  const existingDrawers = storeDrawer.state.stackDrawer.existingDrawers;
  existingDrawersQty = existingDrawers?.length;
  storeDrawer.commit('setQty', existingDrawersQty);
  let offsetParent = event.target as HTMLElement | null;
  while (
    offsetParent != null &&
    !offsetParent.classList.value.includes('-drawer-id')
  ) {
    if (offsetParent.tagName === 'svg') {
      offsetParent = offsetParent.parentElement;
    } else {
      offsetParent = offsetParent.offsetParent as HTMLElement | null;
    }
  }

  let index = existingDrawers.findIndex((drawerRef: any) => {
    return drawerRef.value && drawerRef.value.drawerRef === offsetParent;
  });
  storeDrawer.commit('setIndex', index);
  while (existingDrawers.length > index + 1) {
    const ref = existingDrawers.pop();
    ref?.value?.handleClose();
  }
};
watch(
  () => attrs.modelValue,
  async (newValue: any) => {
    const isRegister = storeDrawer?.state?.stackDrawer;
    if (!isRegister) {
      await storeRegisterModule('stackDrawer');
      document.addEventListener('click', closeHandler, true);
    }
    if (newValue === true) {
      storeDrawer.commit('pushExistingDrawers', drawerRef);
    }
  },
  {
    immediate: true,
  }
);
onBeforeUnmount(async () => {
  const existingDrawers = storeDrawer?.state?.stackDrawer?.existingDrawers;
  if (existingDrawers) {
    let index = (existingDrawers && existingDrawers.indexOf(drawerRef)) || -1;
    while (existingDrawers.length > index + 1) {
      const ref = existingDrawers.pop();
      ref?.value?.handleClose();
    }
  } else if (!existingDrawers || !existingDrawers.length) {
    document.removeEventListener('click', closeHandler, true);
    await storeUnregisterModule('stackDrawer');
  }
});
async function beforeClose(done: () => void) {
  storeDrawer.commit('setFlag', true);
  const doneCallbacks = storeDrawer?.state?.stackDrawer?.doneCallbacks;
  const existingDrawersQty =
    storeDrawer?.state?.stackDrawer?.existingDrawersQty;
  const index = storeDrawer?.state?.stackDrawer?.clickIndex;
  if (doneCallbacks?.length + (index + 1) < existingDrawersQty - 1) {
    storeDrawer.commit('pushExistingDone', done);
  } else {
    storeDrawer.commit('pushExistingDone', done);
    const done1 = () =>
      new Promise(() => {
        done();
        doneCallbacks.forEach((doneCallback: unknown) => {
          if (typeof doneCallback === 'function') doneCallback();
        });
        storeDrawer.commit('pushExistingDone');
      }).finally(() => {
        storeDrawer.commit('setFlag', false);
      });
    const cancelCallback = () => {};
    props.beforeClose?.(done1, cancelCallback);
  }
}
</script>

<style module>
.stackDrawer-modal-class {
  pointer-events: none;
  background-color: transparent;
}

.stackDrawer {
  pointer-events: auto;
}
</style>
