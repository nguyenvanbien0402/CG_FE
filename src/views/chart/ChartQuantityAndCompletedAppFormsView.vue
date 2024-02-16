<template>
  <div class="pa-2">
    <card-data-table>
      <template #toolbar>
        <table-title-function show-draw @action="handleAction($event)">
          <template #form>
            <v-row class="mg-5">
              <v-col cols="3" md="6" lg="3" sm="12">
                <div class="mb-2">
                  <span class="font-weight-medium text-sm"> 書類受領日 </span>
                </div>
                <VueDatePicker
                  v-model="date"
                  :select-text="$t('datePicker.select')"
                  :cancel-text="$t('datePicker.cancel')"
                  text-input
                  locale="ja"
                  :enable-time-picker="false"
                  format="yyyy/MM/dd"
                ></VueDatePicker>
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
import { ref } from 'vue'
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
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { TOOLBAR_TABLE } from '@/constants/constant'
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const { t } = useI18n()
const ChartRepository = RepositoryFactory.get('chart')
const store = useCommonStore()
store.setBreadcrumb(store, {
  name: '申請数と申請書作成済み',
  path: 'chart-quantity-and-completed-app-form'
})

const date = ref(null)
const data = {
  labels: ['申請数', '申請書作成総計'],
  datasets: []
}
const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.DRAW) {
    let chart = Chart.getChart('myChart')
    if (!chart) {
      chart = new Chart(document.getElementById('myChart'), config)
    }
    if (!date.value) {
      Toast.showError('書類受領日を選択してください。 ')
      return
    }
    const request = {
      contactDate: date.value
    }
    ChartRepository.getQuantityAndCompletedAppForms(request).then((response) => {
      let dataResponse = []
      if (response.data) {
        dataResponse = [
          {
            data: [response.data[0].numberOfApplications, response.data[0].applicationFormTotal]
          }
        ]
      }
      chart.data.datasets = dataResponse
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
        display: false,
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
  new Chart(document.getElementById('myChart'), config)
  date.value = new Date()
})
</script>
