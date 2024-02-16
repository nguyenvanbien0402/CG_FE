<template>
  <v-dialog
    v-model="dialog"
    scrollable
    width="30%"
    no-click-animation
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg">
      <v-toolbar dark
                 color="info"
      >
        <h1 class="pa-5 delete-dialog-title v-toolbar-title__placeholder">{{ data.dialogName }}</h1>
        <v-spacer />
        <v-btn icon="mdi-close"
               @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card
        flat
        class="py-1 px-7 rounded-0 overflow-y-scroll mt-3"
        style="height: calc(100% - 48px);"
      >
        <slot name="body" />
        <v-card-actions
          class="flex-row-reverse mt-3 overflow-auto"
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
    </v-card>
  </v-dialog>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useI18n} from "vue-i18n";

// Initial
const { t } = useI18n()
const emit = defineEmits(['apply'])
const dialog = ref(false)
const props = defineProps({
  idDelete: Number
})

const getInitialData = () => ({
  dialogName: '',
  screen: null
});

const data = reactive(getInitialData())

// Function
const open = (nameScreen) => {
  switch (nameScreen) {
    case "postCode":
      data.dialogName = t('dialogName.master.postCode.delete')
      break
    case "financeType":
      data.dialogName = t('dialogName.master.financeType.delete')
      break
    case "contractType":
      data.dialogName = t('dialogName.master.contractType.delete')
      break
    case "location":
      data.dialogName = t('dialogName.master.location.delete')
      break
    case "projectType":
      data.dialogName = t('dialogName.master.projectType.delete')
      break
    case "user":
      data.dialogName = t('dialogName.master.user.delete')
      break
    case "settingType":
      data.dialogName = t('dialogName.master.settingType.delete')
      data.screen = 'settingType'
      break
    case "registrationType":
      data.dialogName = t('dialogName.master.registrationType.delete')
      data.screen = 'registrationType'
      break
    case "keyEstate":
      data.dialogName = t('dialogName.master.keyEstate.delete')
      break
    case "equity":
      data.dialogName = t('dialogName.master.equity.delete')
      break
    default:
      break
  }
  return (dialog.value = true)
}

const apply = (id) => {
  emit('apply', { item: id })
  dialog.value = false
}

const close = () => {
  return (dialog.value = false)
}

defineExpose({
  open
})
</script>

<style scoped>
.delete-dialog-title {
  min-width: 0;
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.75rem;
  text-transform: none;
}
</style>
