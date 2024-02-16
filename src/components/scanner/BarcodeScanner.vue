<template>
  <v-dialog
    scrollable
    no-click-animation
    max-width="30%"
    @click:outside="close"
    @keydown.esc="close"
  >
  </v-dialog>
  <div>
    <h2>Vue Barcode Scanner Demo</h2>
  </div>
  <vue-barcode value="Hello, World!" :options="{ displayValue: false }"></vue-barcode>
</template>

<script setup>
import { reactive, ref } from 'vue'
import VueBarcode from '@chenfengyuan/vue-barcode'

const dialog = ref(false)
const data = reactive({
  scannedCode: null
})

const onLoaded = () => {
  console.log('load')
}

const onDecode = (result) => {
  data.scannedCode = result
}

const close = () => {
  dialog.value = false
}

const open = () => {
  dialog.value = true
}
defineExpose({
  open
})
</script>
