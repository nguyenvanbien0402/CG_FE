<template>
  <v-dialog
    v-model="dialog"
    scrollable
    width="400"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg">
      <v-toolbar dark
                 color="info"
                 :title="$t('dialogName.confirm')"
      >
        <v-spacer />
        <v-btn icon="mdi-close"
               @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card flat
              class="px-4 pt-4 rounded-0"
      >
        <slot name="body" />
      </v-card>
      <v-card-actions
        class="flex-row-reverse mt-3"
      >
        <v-btn
          color="info"
          class="text-sm mb-2"
          variant="flat"
          @click="apply()"
        >
          {{ $t('btn.apply') }}
        </v-btn>
        <v-btn
          color="info"
          class="text-sm mb-2 mr-2"
          variant="outlined"
          @click="close"
        >
          {{ $t('btn.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

// Initial
const emit = defineEmits(['apply'])
const dialog = ref(false)
const ids = ref([])
const status = ref(null)
const actionChange = ref(null)
const projectNoRef = ref(null)

// Function
const open = (id, action, oldStatus, upgradeFrom) => {
  ids.value = id
  actionChange.value = action
  status.value = oldStatus
  projectNoRef.value = upgradeFrom
  return (dialog.value = true)
}

const apply = () => {
  emit('apply', { item: ids.value, action: actionChange.value, oldStatus: status.value, projectNoRef: projectNoRef.value})
  dialog.value = false
}

const close = () => {
  return (dialog.value = false)
}

defineExpose({
  open
})
</script>

<style scoped></style>
