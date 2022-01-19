<template>
  <slot v-if="isLoaded"></slot>
  <Skeletor v-else :width="width" :height="height" :size="size" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Skeletor } from "vue-skeletor";

export default defineComponent({
  components: {
    Skeletor,
  },
  props: {
    isLoaded: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    size: {
      type: [String, Number],
    },
  },
});
</script>
