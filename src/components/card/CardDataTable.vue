<template>
  <v-card class="white elevation-1 mt-2">
    <slot name="toolbar"></slot>
    <slot name="table"></slot>
  </v-card>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: "CardDataTable",
  props: {
    wrapClass: {
      type: String,
      default: 'white elevation-1 mt-2'
    }
  }
})
</script>

<style scoped>

</style>

