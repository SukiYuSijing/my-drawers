<template>
  <el-drawer
    ref="drawerRef"
    v-bind="attrs"
    :class="[
      props.class,
      $style['stackDrawer'],
      Date.now().valueOf() + '-drawer-id',
    ]"
    :modal-class="`${props.modalClass}, ${$style['stackDrawer-modal-class']}`"
  >
    <template #header="header">
      <component :is="$slots.header" v-bind="header" />
    </template>
    <slot>{{ $slots.default }}</slot>
    <template #footer="footer">
      <component :is="$slots.footer" />
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, useAttrs, watch } from "vue";
import { ElDrawer } from "element-plus";
import "element-plus/theme-chalk/el-drawer.css";
import "element-plus/theme-chalk/base.css";
import {
  storeDrawer,
  storeRegisterModule,
  storeUnregisterModule,
} from "../store/index";
import type { Component, Ref } from "vue";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  modalClass: {
    type: String,
    default: "",
  },
});
const attrs = useAttrs();
const closeHandler = (event: MouseEvent) => {
  const existingDrawers = storeDrawer.state.stackDrawer.existingDrawers;
  let offsetParent = event.target as HTMLElement | null;

  while (
    offsetParent != null &&
    !offsetParent.classList.value.includes("-drawer-id")
  ) {
    if (offsetParent.tagName === "svg") {
      offsetParent = offsetParent.parentElement;
    } else {
      offsetParent = offsetParent.offsetParent as HTMLElement | null;
    }
  }

  const index = existingDrawers.findIndex((drawerRef: any) => {
    return drawerRef.value && drawerRef.value.drawerRef === offsetParent;
  });
  while (existingDrawers.length > index + 1) {
    const ref = existingDrawers.pop();
    ref?.value?.close();
  }
};
watch(
  () => attrs.modelValue,
  async (newValue: any) => {
    const isRegister = storeDrawer?.state?.stackDrawer;
    if (!isRegister) await storeRegisterModule("stackDrawer");
    if (newValue === true) {
      storeDrawer.commit("pushExistingDrawers", drawerRef);
    }
    const existingDrawers = storeDrawer.state.stackDrawer.existingDrawers;
    if (existingDrawers.length === 1) {
      document.addEventListener("click", closeHandler, true);
    }
  },
  {
    immediate: true,
  }
);

onBeforeUnmount(async () => {
  const existingDrawers = storeDrawer?.state?.stackDrawer?.existingDrawers;
  const index = existingDrawers.indexOf(drawerRef);
  while (existingDrawers.length > index) {
    const ref = existingDrawers.pop();
    ref?.value?.close();
  }
  if (!existingDrawers || !existingDrawers.length) {
    document.removeEventListener("click", closeHandler, true);
    await storeUnregisterModule("stackDrawer");
  }
});
const drawerRef: Ref<Component | null> = ref(null);
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
