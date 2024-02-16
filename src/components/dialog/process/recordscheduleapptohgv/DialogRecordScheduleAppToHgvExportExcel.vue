<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="25%"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg" style="overflow: inherit !important">
      <v-toolbar dark color="info" dense>
        <v-toolbar-title>
          {{ $t('dialogName.exportExcel') }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card
        flat
        class="py-2 px-2 rounded-0 overflow-y-scroll"
        style="height: calc(100% - 48px); overflow: inherit"
      >
        <v-form ref="form" v-model="data.valid" @submit.prevent>
          <v-container class="mt-2 flex flex-col">
            <v-row dense>
              <v-col lg="4" sm="6" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm-body-2">
                  {{ $t('recordScheduleAppToHgv.exportExcel') }}
                </span>
              </v-col>
              <v-col lg="8" sm="12" cols="12">
                <v-select
                  v-model="data.request.exportType"
                  density="compact"
                  :error="data.showErrorMessage"
                  @update:modelValue="changeSelection()"
                  dense
                  variant="outlined"
                  hide-details
                  :items="lstExportType"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions class="flex-row-reverse mt-2">
          <v-btn color="info" class="text-sm mb-2" variant="elevated" @click="apply">
            {{ $t('btn.export') }}
          </v-btn>
          <v-btn color="info" class="text-sm mb-2 mr-2" variant="outlined" @click="close">
            {{ $t('btn.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { useI18n } from 'vue-i18n'
import Toast from '@/common/toast'

// Initial
const RecordScheduleAppToHgvRepository = RepositoryFactory.get('recordScheduleAppToHgv')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const { t } = useI18n()

const lstExportType = reactive([
  { title: '【社内用】登記申請のお客様', value: 1 },
  { title: '登記申請のお客様', value: 2 }
])

const getInitialData = () => ({
  valid: false,
  request: {
    projectNos: null,
    exportType: null
  },
  showErrorMessage: false
})

const data = reactive(getInitialData())

// Function
const open = (projectNo) => {
  data.request.projectNos = projectNo
  data.request.exportType = null
  data.showErrorMessage = false
  return (dialog.value = true)
}

const apply = () => {
  if (data.request.exportType) {
    let request = {
      projectNos: data.request.projectNos
    }
    if (data.request.exportType === 1) {
      exportExcel1(request)
    } else {
      exportExcel2(request)
    }
  } else {
    data.showErrorMessage = true
    Toast.showError(t('errorMessage.pleaseSelectExport'))
  }
}

const exportExcel1 = (request) => {
  RecordScheduleAppToHgvRepository.exportExcel1(request)
}

const exportExcel2 = (request) => {
  RecordScheduleAppToHgvRepository.exportExcel2(request)
}

const close = () => {
  Object.assign(data, getInitialData())
  dialog.value = false
}

const changeSelection = () => {
  data.showErrorMessage = false
}

watch(data, () => console.log('watch'))
defineExpose({
  open
})
</script>

<style scoped></style>
