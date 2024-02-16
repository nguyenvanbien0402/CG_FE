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
                  dense
                  variant="outlined"
                  hide-details
                  :items="lstExportType"
                  @update:modelValue="changeSelection()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row dense v-if="data.request.exportType === 3">
              <v-col lg="4" sm="6" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm-body-2">
                  登記申請月
                </span>
              </v-col>
              <v-col lg="8" sm="12" cols="12">
                <VueDatePicker
                  v-model="data.request.monthRangeReport"
                  :select-text="$t('datePicker.select')"
                  :cancel-text="$t('datePicker.cancel')"
                  text-input
                  locale="ja"
                  month-picker
                  range
                  format="yyyy/MM"
                ></VueDatePicker>
              </v-col>
            </v-row>
            <v-row dense v-if="data.request.exportType === 4">
              <v-col lg="4" sm="6" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm-body-2">
                  登記申請月
                </span>
              </v-col>
              <v-col lg="8" sm="12" cols="12">
                <VueDatePicker
                  v-model="data.request.monthReport"
                  :select-text="$t('datePicker.select')"
                  :cancel-text="$t('datePicker.cancel')"
                  text-input
                  locale="ja"
                  month-picker
                  format="yyyy/MM"
                ></VueDatePicker>
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
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Initial
const RecordRegAppPrintRepository = RepositoryFactory.get('recordRegAppPrint')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const { t } = useI18n()

const lstExportType = reactive([
  { title: '名護法務局提出用抹消登記リスト', value: 1 },
  { title: '完了後謄本リスト', value: 2 },
  { title: '登記受番報告', value: 3 },
  { title: '持分リスト', value: 4 },
  { title: 'HGV宛受領証', value: 5 }
])

const getInitialData = () => ({
  valid: false,
  request: {
    projectNos: null,
    exportType: null,
    monthRangeReport: null,
    monthReport: null
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
    } else if (data.request.exportType === 2) {
      exportExcel2(request)
    } else if (data.request.exportType === 3) {
      exportExcel3()
    } else if (data.request.exportType === 4) {
      exportExcel4()
    } else if (data.request.exportType === 5) {
      exportExcel5(request)
    }
  } else {
    data.showErrorMessage = true
    Toast.showError('テンプレートを選択してください。')
  }
}

const exportExcel1 = (request) => {
  if (request.projectNos.length <= 0) {
    Toast.showError(t('warning.noSelected'))
    return
  }
  RecordRegAppPrintRepository.exportExcel1(request)
}

const exportExcel2 = (request) => {
  if (request.projectNos.length <= 0) {
    Toast.showError(t('warning.noSelected'))
    return
  }
  RecordRegAppPrintRepository.exportExcel2(request)
}

const exportExcel3 = () => {
  if (!data.request.monthRangeReport) {
    Toast.showError('登記申請月を必ず選択してください。')
    return
  }
  if (!data.request.monthRangeReport[1]) {
    Toast.showError('「登記申請月」項目に対しては「from」、「to」を必ず選択してください。')
    return
  }
  const request = {
    monthReport: data.request.monthRangeReport
  }
  RecordRegAppPrintRepository.exportExcel3(request)
}

const exportExcel4 = () => {
  if (!data.request.monthReport) {
    Toast.showError('登記申請月を必ず選択してください。')
    return
  }
  const request = {
    monthReport: data.request.monthReport
  }
  RecordRegAppPrintRepository.exportExcel4(request)
}

const exportExcel5 = (request) => {
  if (request.projectNos.length <= 0) {
    Toast.showError(t('warning.noSelected'))
    return
  }
  RecordRegAppPrintRepository.exportExcel5(request)
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
