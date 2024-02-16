<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="30%"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg" style="overflow: inherit !important">
      <v-toolbar dark color="info" dense>
        <v-toolbar-title>
          {{ $t('dialogName.downloadDoc') }}
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
              <v-col lg="3" sm="6" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm-body-2">
                  {{ $t('document.downloadDoc') }}
                </span>
              </v-col>
              <v-col lg="9" sm="12" cols="12">
                <v-select
                  v-model="data.request.exportType"
                  density="compact"
                  :error="data.showErrorMessage"
                  @update:modelValue="changeSelection()"
                  dense
                  variant="outlined"
                  hide-details
                  :items="lstDownloadDocType"
                ></v-select>
              </v-col>
            </v-row>
            <v-row dense v-if="data.request.exportType === 18">
              <v-col lg="3" sm="6" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm-body-2">
                  {{ $t('document.requestDateExport') }}
                </span>
              </v-col>
              <v-col lg="9" sm="12" cols="12">
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
            <v-row dense v-if="data.request.exportType === 18">
              <v-col lg="3" sm="6" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm-body-2">
                  {{ $t('document.locationName') }}
                </span>
              </v-col>
              <v-col lg="9" sm="12" cols="12">
                <v-select
                  v-model="data.request.location"
                  density="compact"
                  dense
                  variant="outlined"
                  hide-details
                  :items="locations"
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
import { computed, reactive, ref, watch } from 'vue'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { useI18n } from 'vue-i18n'
import Toast from '@/common/toast'
import { useDocumentStore } from '@/store/process/documentStore'

// Initial
const DocumentRepository = RepositoryFactory.get('document')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const { t } = useI18n()
const documentStore = useDocumentStore()
const locations = computed(() => documentStore.getLocations)

const lstDownloadDocType = reactive([
  { title: 'ご請求書', value: 18 },
  { title: '登記原因証明情報（移転）', value: 1 },
  { title: '登記原因証明情報（所有権抹消）', value: 2 },
  { title: '登記原因証明情報（分割払い）', value: 3 },
  { title: '登記原因証明情報（管理費）', value: 4 },
  { title: '所有権抹消用委任状', value: 5 },
  { title: '委任状', value: 6 },
  { title: '捺印書類送付状', value: 7 },
  { title: '【記入例】法人_原因証明', value: 8 },
  { title: '【記入例】個人_原因証明', value: 9 },
  { title: '【記入例】法人_委任状', value: 10 },
  { title: '【記入例】個人_委任状', value: 11 },
  { title: 'スキャンカバーシート', value: 12 },
  { title: '返送書類チェックリスト', value: 13 },
  { title: '発送ラベル', value: 14 },
  { title: '完了後お客様宛送付状', value: 15 },
  { title: '顧客宛返却書類発送ラベル', value: 16 },
  { title: 'キャスト返送ラベル', value: 17 }
])

const getInitialData = () => ({
  valid: false,
  request: {
    projectNos: null,
    exportType: null,
    location: null,
    monthReport: null
  },
  showErrorMessage: false
})

const data = reactive(getInitialData())

// Function
const open = (projectNo) => {
  data.request.projectNos = projectNo
  data.request.exportType = null
  data.request.location = null
  data.request.monthReport = null
  data.showErrorMessage = false
  return (dialog.value = true)
}

const apply = () => {
  if (!data.request.exportType) {
    data.showErrorMessage = true
    Toast.showError('テンプレートを選択してください。')
    return
  } else if (
    !data.request.projectNos ||
    (data.request.projectNos.length <= 0 && data.request.exportType !== 18)
  ) {
    Toast.showError(t('warning.noSelected'))
    return
  } else if (
    data.request.projectNos.length > 1 &&
    (data.request.exportType === 1 ||
      data.request.exportType === 2 ||
      data.request.exportType === 3 ||
      data.request.exportType === 4 ||
      data.request.exportType === 5 ||
      data.request.exportType === 6 ||
      data.request.exportType === 7 ||
      data.request.exportType === 8 ||
      data.request.exportType === 9 ||
      data.request.exportType === 10 ||
      data.request.exportType === 11 ||
      data.request.exportType === 13 ||
      data.request.exportType === 15)
  ) {
    Toast.showError('案件を１つだけ選択してください。')
    return
  }

  if (data.request.exportType === 18) {
    if (!data.request.monthReport || !data.request.location) {
      Toast.showError('登記申請日と場所は必須項目です。必ず情報を入力してください。')
      return
    }
    const request = {
      monthReport: data.request.monthReport,
      locationId: data.request.location
    }
    downloadExcel(request)
  } else {
    let request = {
      projectNo: data.request.projectNos[0],
      projectNoList: data.request.projectNos,
      downloadType: data.request.exportType
    }
    downloadDoc(request)
  }
}

const downloadDoc = (request) => {
  DocumentRepository.downloadDoc(request)
  dialog.value = false
  emit('apply')
}

const downloadExcel = (request) => {
  DocumentRepository.downloadExcel(request)
  dialog.value = false
  emit('apply')
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

<style></style>
