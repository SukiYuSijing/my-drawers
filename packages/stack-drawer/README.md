```
<template>

  <StackDrawer
    ref="ref1"
    v-model="drawer"
    title="I'm outer Drawer"
    size="60%"
    :modal="false"
    append-to-body
  >
   和eldrawer的使用使用方法一致
  </StackDrawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 引用组件及组件样式
import StackDrawer from "stack-drawer";
import "stack-drawer/style";

const drawer = ref(false);
const ref1 = ref();
</script>


```

