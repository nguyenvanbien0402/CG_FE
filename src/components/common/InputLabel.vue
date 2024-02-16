<script setup>

import {onMounted, ref} from "vue";

const props = defineProps({
  label: String,
  value: String,
  rules: [Array, Function],
  hideDetails: [String, Boolean]
})

defineEmits([
  'update:value'
])

onMounted(() => {
})

const inputLabel = ref(null)
const stateInput = () => {
}

</script>

<template>
  <v-row
    v-bind="$attrs"
    justify="end"
    align="center"
    :style="$attrs.style ? $attrs.style : 'max-width: 250px'"
    class="pa-2"
  >
    <slot name="label">
      <label class="mx-2">
        {{ label }}
      </label>
    </slot>
    <slot name="input">
      <v-text-field
        ref="inputLabel"
        :model-value="value"
        variant="outlined"
        single-line
        density="compact"
        :hide-details="hideDetails ? hideDetails : 'auto'"
        :rules="[rules]"
        @update:model-value="$emit('update:value', $event)"
      />
    </slot>
  </v-row>
</template>

<style scoped>

</style>
