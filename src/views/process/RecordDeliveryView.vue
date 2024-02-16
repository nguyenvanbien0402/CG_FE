<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          show-clear-search
          show-search
          show-multi-update
          show-export
          @action="handleAction($event)"
        >
          <template #form>
            <v-row class="mg-5">
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('recordRegApp.projectNo') }}
                  </span>
                </div>
                <v-text-field
                  v-model="searchRequest.projectNo"
                  hide-details
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('recordDelivery.deliveryCode') }}
                  </span>
                </div>
                <v-text-field
                  v-model="searchRequest.deliveryCode"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                  @keyup.enter="search(true)"
                />
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('recordDelivery.returnLp') }}
                  </span>
                </div>
                <v-text-field
                  v-model="searchRequest.returnLp"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                  @keyup.enter="search(true)"
                />
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('recordDelivery.status') }}
                  </span>
                </div>
                <v-select
                  v-model="searchRequest.status"
                  density="compact"
                  dense
                  variant="outlined"
                  hide-details
                  :items="statusList"
                  @change="search(true)"
                ></v-select>
              </v-col>
            </v-row>
          </template>
        </table-title-function>
      </template>

      <template #table>
        <div class="pl-5 mt-2">
          選択中：<span class="font-bold">{{ table.selected.length }}件</span>
        </div>
        <v-data-table
          v-model="table.selected"
          v-click-outside="clickOutside"
          :headers="table.headers"
          :items="table.items"
          :items-length="table.totalRecords"
          :items-per-page="table.options.itemsPerPage"
          item-value="projectNo"
          :fixed-footer="true"
          :fixed-header="true"
          disable-initial-sort
          height="700px"
          hide-actions
          show-select
          class="relative h-process elevation-1 h-full py-3 row-height-50 table-border"
          @click:row="clickRow"
          @update:options="table.options"
        >
          <template #no-data>
            <tr>
              <td :colspan="table.headers.length + 1"
                  class="text-center opacity-70 italic py-2"
              >
                {{ $t('table.noDataText') }}
              </td>
            </tr>
          </template>

          <!--index-->
          <template #item.index="{ index }">
            <div class="text-center">
              {{ table.options.itemsPerPage * (table.options.page - 1) + index + 1 }}
            </div>
          </template>

          <template #item.projectNo="{ item }">
            <div @dblclick="dblclickRow('projectNo', item.value)">
              <div
                v-if="
                  item.props.title.projectNo &&
                    table.isDbl.projectNo &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2"
              >
                <v-text-field
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.projectNo"
                ></v-text-field>
              </div>
              <div v-else
                   class="display-limit-txt-w-150"
              >
                {{ item.props.title.projectNo }}
              </div>
            </div>
          </template>

          <template #item.deliveryDate="{ item }">
            <div class="text-right">
              {{ item.props.title.deliveryDate }}
            </div>
          </template>

          <template #item.deliveryCode="{ item }">
            <div @dblclick="dblclickRow('deliveryCode', item.value)">
              <div
                v-if="
                  item.props.title.deliveryCode &&
                    table.isDbl.deliveryCode &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.deliveryCode"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.deliveryCode }}
              </div>
            </div>
          </template>

          <template #item.returnLp="{ item }">
            <div @dblclick="dblclickRow('returnLp', item.value)">
              <div
                v-if="
                  item.props.title.returnLp &&
                    table.isDbl.returnLp &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.returnLp"
                ></v-textarea>
              </div>
              <div v-else

                   class="text-right"
              >
                {{ item.props.title.returnLp }}
              </div>
            </div>
          </template>

          <template #item.purchaser="{ item }">
            <div @dblclick="dblclickRow('purchaser', item.value)">
              <div
                v-if="
                  item.props.title.purchaser &&
                    table.isDbl.purchaser &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.purchaser"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.purchaser }}
              </div>
            </div>
          </template>

          <template #item.status="{ item }">
            <div class="text-center w-full">
              <v-chip
                :style="'background-color:' + STATUS.get(item.props.title.status).color + ';'"
                :color="STATUS.get(item.props.title.status).color"
              >
                <div class="text-center w-48"
                     style="color: #ffffff !important"
                >
                  {{ STATUS.get(item.props.title.status).text }}
                </div>
              </v-chip>
            </div>
          </template>
          <template #item.action="{ item }">
            <div class="my-1 text-center">
              <v-btn
                v-if="
                  item.props.title.status === STATUS.get(3).key ||
                    (item.props.title.status === STATUS.get(99).key &&
                      item.props.title.oldStatus >= STATUS.get(3).key)
                "
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogUserUpdate(item.props.title.projectNo)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
            </div>
          </template>

          <template #item.deliveryRemarks="{ item }">
            <div @dblclick="dblclickRow('deliveryRemarks', item.value)">
              <div
                v-if="
                  item.props.title.deliveryRemarks &&
                    table.isDbl.deliveryRemarks &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.deliveryRemarks"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.deliveryRemarks }}
              </div>
            </div>
          </template>
          <template #bottom>
            <pagination-common @changeData="changeData">
            </pagination-common>
          </template>
        </v-data-table>
      </template>
    </card-data-table>
    <dialog-record-delivery-update
      ref="refDialogRecordDeliveryUpdate"
      :project-no="projectNo"
      @apply="search()"
    />
    <dialog-record-delivery-multi-update
      ref="refDialogRecordDeliveryMultiUpdate"
      :project-no="table.selected"
      @apply="search()"
    />
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { DataTableHelper } from '@/common/helper'
import { STATUS, TOOLBAR_TABLE } from '@/constants/constant'
import CardDataTable from '@/components/card/CardDataTable.vue'
import TableTitleFunction from '@/components/table/TableTitleFunction.vue'
import PaginationCommon from '@/components/table/PaginationCommon.vue'
import DialogRecordDeliveryUpdate from '@/components/dialog/process/recorddelivery/DialogRecordDeliveryUpdate.vue'
import DialogRecordDeliveryMultiUpdate from '@/components/dialog/process/recorddelivery/DialogRecordDeliveryMultiUpdate.vue'
import { useI18n } from 'vue-i18n'
import Toast from '@/common/toast'
import ScannerDetector from 'js-scanner-detection'
import {useCookies} from "vue3-cookies";

// Initial
const RecordRegAppPrintRepository = RepositoryFactory.get('recordRegAppPrint')
const store = useCommonStore()
const {cookies} = useCookies()
const RecordDeliveryRepository = RepositoryFactory.get('recordDelivery')
const refDialogRecordDeliveryUpdate = ref(null)
const refDialogRecordDeliveryMultiUpdate = ref(null)
const { t } = useI18n()
store.setBreadcrumb(store, { name: t('nav.screen.recordDelivery'), path: 'record-delivery' })

const statusList = reactive([
  { value: '', title: '' },
  { value: 3, title: '本人確認済' },
  { value: 99, title: 'ペンディング' }
])

let projectNo = []
const table = reactive({
  options: DataTableHelper.optionBuilder(['created_date'], [true]),
  headers: [
    {
      title: t('table.ordinalNumbers'),
      align: 'center',
      sortable: false,
      width: 50,
      key: 'index',
      disable: true
    },
    {
      title: t('table.option'),
      align: 'center',
      sortable: false,
      width: 50,
      key: 'action'
    },
    {
      title: t('recordDelivery.projectNo'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'projectNo'
    },
    {
      title: t('recordDelivery.deliveryDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'deliveryDate'
    },
    {
      title: t('recordDelivery.deliveryCode'),
      align: 'center',
      width: 250,
      sortable: false,
      key: 'deliveryCode'
    },
    {
      title: t('recordDelivery.returnLp'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'returnLp'
    },
    {
      title: t('recordDelivery.purchaser'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'purchaser'
    },
    {
      title: t('recordDelivery.status'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'status'
    },
    {
      title: t('recordDelivery.remarks'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'deliveryRemarks'
    }
  ],
  totalPages: null,
  totalElements: null,
  displayPageNums: 5,
  amountOfDataDisplay: null,
  idDelete: null,
  selected: [],
  tempSelected: [],
  isDbl: {
    projectNo: false,
    returnLp: false,
    deliveryCode: false,
    purchaser: false,
    pic: false,
    deliveryRemarks: false
  },
  dblProjectNo: null
})

const searchRequest = reactive({
  projectNo: null,
  deliveryCode: null,
  returnLp: null,
  status: null
})

// Function
const showDialogUserUpdate = (projectNo) => {
  refDialogRecordDeliveryUpdate.value.open(projectNo)
}

const dblclickRow = (fieldName, projectNo) => {
  switch (fieldName) {
    case 'projectNo':
      table.isDbl.projectNo = true
      break
    case 'returnLp':
      table.isDbl.returnLp = true
      break
    case 'deliveryCode':
      table.isDbl.deliveryCode = true
      break
    case 'purchaser':
      table.isDbl.purchaser = true
      break
    case 'pic':
      table.isDbl.pic = true
      break
    case 'deliveryRemarks':
      table.isDbl.deliveryRemarks = true
  }
  table.dblProjectNo = projectNo
}

const clickOutside = () => {
  table.isDbl.projectNo = false
  table.isDbl.returnLp = false
  table.isDbl.deliveryCode = false
  table.isDbl.purchaser = false
  table.isDbl.pic = false
  table.isDbl.deliveryRemarks = false
  table.dblProjectNo = null
}

const clickRow = (item, row) => {
  if (
    table.dblProjectNo !== row.item.value &&
    (table.isDbl.projectNo === true ||
      table.isDbl.returnLp === true ||
      table.isDbl.deliveryCode === true ||
      table.isDbl.purchaser === true ||
      table.isDbl.deliveryRemarks === true ||
      table.isDbl.pic === true)
  ) {
    table.isDbl.projectNo = false
    table.isDbl.returnLp = false
    table.isDbl.deliveryCode = false
    table.isDbl.purchaser = false
    table.isDbl.deliveryRemarks = false
    table.isDbl.pic = false
    table.dblProjectNo = null
  }
}

const search = (isClick, isRemoveSelected = true) => {
  // if (isRemoveSelected) {
  //   table.selected = []
  // }
  let request = {}
  if (isClick && table.options.page !== 1) {
    table.options.page = 1
    return
  }
  request = DataTableHelper.buildRequest(table.options, searchRequest)

  RecordDeliveryRepository.searchAll(request).then(function (response) {
    if (response.data) {
      table.items = response.data.recordDeliveryList
      table.totalElements = response.data.totalElements
      table.totalPages = response.data.totalPage
      table.amountOfDataDisplay = response.data.recordDeliveryList.length

      let pagination = {
      page: table.options.page,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPage,
        amountOfDataDisplay: response.data.recordDeliveryList.length
      }
      store.setPagination(store, pagination)
    }
  })
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.MULTI_UPDATE) {
    if (!table.selected.length) {
      Toast.showError(t('warning.noSelected'))
    } else {
      refDialogRecordDeliveryMultiUpdate.value.open(table.selected)
    }
  }
  if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(true)
  }
  if (actionId === TOOLBAR_TABLE.CLEAR_SEARCH) {
    searchRequest.projectNo = null
    searchRequest.deliveryCode = null
    searchRequest.returnLp = null
    searchRequest.status = null
    table.selected = []
  }
  if (actionId === TOOLBAR_TABLE.EXPORT) {
    if (table.selected.length <= 0) {
      Toast.showError(t('warning.noSelected'))
      return
    }
    const request = {
      projectNos: table.selected
    }
    RecordRegAppPrintRepository.exportExcelM05(request)
  }
}

const changeData = (e) => {
  table.options.page = e.page
  table.options.itemsPerPage = e.perPage
}

watch(table.options, () => search(false, false))

const onComplete = (barcode) => {
  if (
    searchRequest.projectNo &&
    searchRequest.projectNo.length &&
    searchRequest.projectNo.includes(barcode)
  ) {
    let lengthOld = searchRequest.projectNo.length - barcode.length
    searchRequest.projectNo = searchRequest.projectNo.slice(0, lengthOld)

    if (!searchRequest.projectNo.includes(barcode)) {
      if (searchRequest.projectNo && searchRequest.projectNo.trim().length > 0) {
        searchRequest.projectNo = searchRequest.projectNo.trim()
        let endChar = searchRequest.projectNo.length
        if (searchRequest.projectNo.slice(endChar - 1, endChar) === ';') {
          searchRequest.projectNo = searchRequest.projectNo + barcode
        } else {
          searchRequest.projectNo = searchRequest.projectNo + ';' + barcode
        }
      } else {
        searchRequest.projectNo = barcode + ';'
      }
    }
  }
}

const options = {
  onComplete: onComplete,
  onError: false,
  onReceive: false,
  timeBeforeScanTest: 100,
  avgTimeByChar: 30,
  minLength: 6,
  endChar: [13],
  stopPropagation: true,
  preventDefault: false
}
const scannerDetector = new ScannerDetector(options)

onMounted(() => {
  cookies.remove('documentPrev')
  cookies.remove('recordRegAppPrev')
  cookies.remove('keyPrev')
  cookies.remove('recordRegFinalPrev')
  search(false)
})
</script>
<style scoped></style>
