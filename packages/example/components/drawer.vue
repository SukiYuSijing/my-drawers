<template>
  <el-button
    type="primary"
    style="margin-left: 16px; transform: translateX(-300px)"
    @click="handleClick1"
  >
    open
  </el-button>
  drawer:{{ drawer }}
  <StackDrawer
    ref="ref1"
    :before-close="handleClose"
    v-model="drawer"
    title="I'm outer Drawer"
    size="60%"
    :modal="false"
    append-to-body
  >
    <div>
      <el-button @click="handleClick2">Click me!</el-button>
      <StackDrawer
        :before-close="handleClose"
        ref="ref2"
        v-model="innerDrawer"
        :modal="false"
        size="40%"
        append-to-body
        title="I'm inner Drawer"
      >
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
          <el-button type="danger" @click="close"> </el-button>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">cancel</el-button>
            <el-button type="primary" @click="confirmClick">confirm</el-button>
          </div>
        </template>
        <p>_(:зゝ∠)_</p>
        <div>
          <el-button @click="handleClick3">Click me!</el-button>
          <StackDrawer
            :before-close="handleClose"
            ref="ref3"
            v-model="innerDrawer1"
            :modal="false"
            size="30%"
            append-to-body
            title="I'm inner Drawer"
          >
            <p>_(:зゝ∠)_</p>
          </StackDrawer>
        </div>
      </StackDrawer>
    </div>
  </StackDrawer>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { ElButton, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-button.css';
import 'element-plus/theme-chalk/base.css';
import StackDrawer from '../../stack-drawer/src/components/stack-drawer.vue';
// import 'stack-drawer/style';
const drawer = ref(false);
const innerDrawer = ref(false);
const innerDrawer1 = ref(false);
const handleClose = (done: () => void, cancel: () => {}) => {
  ElMessageBox.confirm('You still have unsaved data, proceed?')
    .then(() => {
      done();
    })
    .catch(() => {
      cancel();
    });
};
const ref1 = ref();
const ref2 = ref();
const ref3 = ref();
const cancelClick = () => {};
const confirmClick = () => {};
const handleClick1 = () => {
  if (drawer.value === true) {
    drawer.value = false;
    nextTick(() => {
      drawer.value = true;
    });
  } else {
    drawer.value = true;
  }
};
const handleClick2 = () => {
  if (innerDrawer.value === true) {
    innerDrawer.value = false;
    nextTick(() => {
      innerDrawer.value = true;
    });
  } else {
    innerDrawer.value = true;
  }
};
const handleClick3 = () => {
  if (innerDrawer1.value === true) {
    innerDrawer1.value = false;
    nextTick(() => {
      innerDrawer1.value = true;
    });
  } else {
    innerDrawer1.value = true;
  }
};
</script>

<style></style>
