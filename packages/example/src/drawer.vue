<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    open
  </el-button>

  <StackDrawer
    ref="ref1"
    v-model="drawer"
    title="I'm outer Drawer"
    size="60%"
    :modal="false"
    append-to-body
  >
    <div>
      <el-button @click="innerDrawer = true">Click me!</el-button>
      <StackDrawer
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
          <el-button @click="innerDrawer1 = true">Click me!</el-button>
          <StackDrawer
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
import { ref } from "vue";
import { ElButton } from "element-plus";
import "element-plus/theme-chalk/el-button.css";
import "element-plus/theme-chalk/base.css";
import StackDrawer from "stack-drawer";
import "stack-drawer/style";
const drawer = ref(false);
const innerDrawer = ref(false);
const innerDrawer1 = ref(false);

const ref1 = ref();
const ref2 = ref();
const ref3 = ref();
const cancelClick = () => {};
const confirmClick = () => {};
</script>

<style>
</style>
