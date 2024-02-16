<template>
  <div class="h-80 w-80 rounded">
    <label class="typo__label">名前</label>
    <multiselect
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="選ぶ"
      label="name"
      track-by="name"
    >
      <template #selection="{ values, isOpen }">
        <span v-if="values.length" v-show="!isOpen" class="multiselect__single">{{
          values.length
        }}</span>
      </template>
    </multiselect>
  </div>
  <div class="h-96">
    <canvas id="myChart"></canvas>
  </div>
</template>
<script setup>
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue3-multiselect.css'
import { onMounted, ref } from 'vue'
import { useCommonStore } from '@/store/commonStore'

const store = useCommonStore()
store.setBreadcrumb(store, { name: 'Chart', path: 'chart-call-status' })

const value = ref([])
const options = [
  { name: '沼田', language: '1' },
  { name: '高柳', language: '2' },
  { name: '工藤', language: '3' },
  { name: '尾藤', language: '4' },
  { name: '駒津', language: '5' }
]
const labels = ['沼田', '高柳', '工藤', '尾藤', '駒津']
const data = {
  labels: labels,
  datasets: [
    {
      label: '2023/01/05',
      data: [10, 20, 3, 20, 1]
    },
    {
      label: '2023/01/06',
      data: [5, 7, 4, 9, 10]
    },
    {
      label: '2023/01/07',
      data: [5, 20, 20, 5, 3]
    },
    {
      label: '2023/01/08',
      data: [2, 20, 1, 12, 14]
    },
    {
      label: '2023/01/09',
      data: [3, 2, 4, 3, 4]
    },
    {
      label: '2023/01/10',
      data: [9, 8, 1, 3, 5]
    },
    {
      label: '2023/01/11',
      data: [1, 9, 3, 5, 11]
    },
    {
      label: '2023/01/12',
      data: [2, 11, 4, 6, 9]
    }
  ]
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
        align: 'top',
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
  new Chart(document.getElementById('myChart'), config)
})
</script>
