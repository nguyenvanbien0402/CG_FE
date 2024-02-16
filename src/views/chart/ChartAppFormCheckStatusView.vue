<template>
  <div class="pa-2">
    <card-data-table>
      <template #toolbar>
        <table-title-function show-draw @action="handleAction($event)">
          <template #form>
            <v-row class="mg-5">
              <v-col cols="3" md="6" lg="4" sm="12">
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('chart.callStatus.dateDraw1') }}
                  </span>
                </div>
                <VueDatePicker
                  v-model="date"
                  :select-text="$t('datePicker.select')"
                  :cancel-text="$t('datePicker.cancel')"
                  text-input
                  locale="ja"
                  format="yyyy/MM/dd"
                  range
                  multi-calendars
                ></VueDatePicker>
              </v-col>
            </v-row>

            <v-row class="mg-5">
              <v-col cols="3" md="6" lg="4" sm="12">
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('chart.callStatus.pic') }}
                  </span>
                </div>
                <v-select
                  v-model="labels"
                  density="compact"
                  dense
                  variant="outlined"
                  hide-details
                  multiple
                  :items="userNames"
                  @update:modelValue="onChangeSelection"
                >
                  <template #item="{ props }">
                    <v-list-item v-bind="props" />
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </template>
        </table-title-function>
      </template>
      <template #table>
        <div class="p-5">
          <canvas id="myChart"></canvas>
        </div>
      </template>
    </card-data-table>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { onMounted } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import { useI18n } from 'vue-i18n'
import CardDataTable from '@/components/card/CardDataTable.vue'
import TableTitleFunction from '@/components/table/TableTitleFunction.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Toast from '@/common/toast'
import { TOOLBAR_TABLE } from '@/constants/constant'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { useDocumentStore } from '@/store/process/documentStore'
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const documentStore = useDocumentStore()
const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, { name: '申請書一次チェック状況', path: 'chart-app-form-check-status' })
const ChartRepository = RepositoryFactory.get('chart')

const date = ref()
const userNames = computed(() => documentStore.getAllUserName)
const labels = ref([])
const data = {
  labels: [],
  datasets: []
}
const onChangeSelection = (e) => {
  if (e.length > 8) {
    e.pop()
  }
}
const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.DRAW) {
    let chart = Chart.getChart('myChart')
    if (!chart) {
      chart = new Chart(document.getElementById('myChart'), config)
    }
    if (!date.value || !date.value[1]) {
      Toast.showError('開始日と終了日を選択してください。')
      return
    }
    let fromDate = new Date(date.value[0].getTime())
    fromDate.setMonth(fromDate.getMonth() + 1)
    let toDate = date.value[1]
    if (fromDate.getTime() < toDate.getTime()) {
      Toast.showError('表示期間は1か月を超えることはできません。')
      return
    }
    if (labels.value.length <= 0) {
      Toast.showError('担当者を選択してください。')
      return
    }
    const request = {
      fromDate: date.value[0],
      toDate: date.value[1],
      labels: labels.value
    }
    ChartRepository.getAppFormCheckStatus(request).then((response) => {
      let listLabel = []
      if (response.data.length > 0) {
        labels.value.forEach((s) => {
          userNames.value.forEach((x) => {
            if (s === x.value) {
              listLabel.push(x.title)
            }
          })
        })
      }
      chart.data.labels = listLabel
      chart.data.datasets = response.data
      chart.update()
    })
  }
}

const onClickLegend = () => {}

const config = {
  type: 'bar',
  data: data,
  plugins: [ChartDataLabels],
  options: {
    plugins: {
      legend: {
        display: true,
        align: 'start',
        position: 'right',
        onClick: onClickLegend
      },
      datalabels: {
        anchor: 'end',
        align: 'center',
        formatter: (value, context) => {
          const datasetArray = []
          context.chart.data.datasets.forEach((dataset) => {
            if (dataset.data[context.dataIndex] != undefined) {
              datasetArray.push(dataset.data[context.dataIndex])
            }
          })
          function totalSum(total, datapoint) {
            return total + datapoint
          }
          let sum = datasetArray.reduce(totalSum, 0)
          if (context.datasetIndex === datasetArray.length - 1) {
            return sum
          } else {
            return ''
          }
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  }
}
onMounted(() => {
  cookies.remove('documentPrev')
  cookies.remove('recordRegAppPrev')
  cookies.remove('keyPrev')
  cookies.remove('recordRegFinalPrev')
  documentStore.fetchUserManage()
  new Chart(document.getElementById('myChart'), config)
  const endDate = new Date()
  const startDate = new Date(new Date().setMonth(endDate.getMonth() - 1))
  date.value = [startDate, endDate]
})
</script>
