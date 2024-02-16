<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          show-clear-search
          show-search
          show-multi-update
          @action="handleAction($event)"
        >
          <template #form>
            <v-row class="mg-5">
              <v-col
                cols="3"
                md="6"
                lg="3"
                sm="12"
              >
                <div class="mb-2">
                  <span
                    class="font-weight-medium text-sm"
                  >
                    {{ $t('recordCallLog.projectNo') }}
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
              <v-col
                cols="3"
                md="6"
                lg="3"
                sm="12"
              >
                <div class="mb-2">
                  <span
                    class="font-weight-medium text-sm"
                  >
                    {{ $t('recordRegApp.status') }}
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
            <div
              @dblclick="dblclickRow('projectNo', item.value)"
            >
              <div v-if="item.props.title.projectNo && table.isDbl.projectNo && item.value === table.dblProjectNo"
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

          <template #item.customerNameJp="{ item }">
            <div
              @dblclick="dblclickRow('customerNameJp', item.value)"
            >
              <div v-if="item.props.title.customerNameJp && table.isDbl.customerNameJp && item.value === table.dblProjectNo"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.customerNameJp"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.customerNameJp }}
              </div>
            </div>
          </template>

          <template #item.fullName="{ item }">
            <div
              @dblclick="dblclickRow('fullName', item.value)"
            >
              <div v-if="item.props.title.fullName && table.isDbl.fullName && item.value === table.dblProjectNo"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.fullName"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.fullName }}
              </div>
            </div>
          </template>

          <template #item.firstTel="{ item }">
            <div
              @dblclick="dblclickRow('firstTel', item.value)"
            >
              <div v-if="item.props.title.firstTel && table.isDbl.firstTel && item.value === table.dblProjectNo"
                   class="mt-2 mb-2"
              >
                <v-text-field
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.firstTel"
                ></v-text-field>
              </div>
              <div v-else
                   class="display-limit-txt-phone"
              >
                {{ item.props.title.firstTel }}
              </div>
            </div>
          </template>

          <template #item.contactDate="{ item }">
            <div class="text-right">
              {{ item.props.title.contactDate }}
            </div>
          </template>

          <template #item.pic="{ item }">
            <div
              @dblclick="dblclickRow('pic', item.value)"
            >
              <div v-if="item.props.title.pic && table.isDbl.pic && item.value === table.dblProjectNo"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.pic"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.pic }}
              </div>
            </div>
          </template>

          <template #item.estShipDocDate="{ item }">
            <div class="text-right">
              {{ item.props.title.estShipDocDate }}
            </div>
          </template>

          <template #item.remarks="{ item }">
            <div
              @dblclick="dblclickRow('remarks', item.value)"
            >
              <div v-if="item.props.title.remarks && table.isDbl.remarks && item.value === table.dblProjectNo"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.remarks"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.remarks }}
              </div>
            </div>
          </template>

          <template #item.receiptDate="{ item }">
            <div class="text-right">
              {{ item.props.title.receiptDate }}
            </div>
          </template>

          <template #item.status="{ item }">
            <div class="text-center w-48">
              <v-chip
                :style="'background-color:' + STATUS.get(item.props.title.status).color + ';'"
                :color="STATUS.get(item.props.title.status).color"
              >
                <div class="text-center w-48" style="color: #ffffff!important;">
                  {{ STATUS.get(item.props.title.status).text }}
                </div>
              </v-chip>
            </div>
          </template>
          <template #item.action="{ item }">
            <div
              class="my-1 text-right"
            >
              <v-btn
                v-if="(item.props.title.status === STATUS.get(2).key) || (item.props.title.status === STATUS.get(99).key && item.props.title.oldStatus >= STATUS.get(2).key)"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogUserUpdate(item.props.title.projectNo)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
            </div>
          </template>
          <template #bottom>
            <pagination-common
              @changeData="changeData"
            >
            </pagination-common>
          </template>
        </v-data-table>
      </template>
    </card-data-table>
    <dialog-record-call-log-update
      ref="refDialogRecordCallLogUpdate"
      :project-no="projectNo"
      @apply="search()"
    />
    <dialog-record-call-log-multi-update
      ref="refDialogRecordCallLogMultiUpdate"
      :project-no="table.selected"
      @apply="search()"
    />
  </div>
</template>
<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import {useCommonStore} from "@/store/commonStore";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {DataTableHelper} from "@/common/helper";
import {STATUS, TOOLBAR_TABLE} from "@/constants/constant";
import CardDataTable from '@/components/card/CardDataTable.vue';
import TableTitleFunction from '@/components/table/TableTitleFunction.vue';
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import DialogRecordCallLogUpdate from '@/components/dialog/process/recordcalllog/DialogRecordCallLogUpdate.vue'
import DialogRecordCallLogMultiUpdate
  from '@/components/dialog/process/recordcalllog/DialogRecordCallLogMultiUpdate.vue'
import {useI18n} from 'vue-i18n'
import Toast from "@/common/toast";
import ScannerDetector from "js-scanner-detection";
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const store = useCommonStore()

const RecordCallLogRepository = RepositoryFactory.get('recordCallLog')
const refDialogRecordCallLogUpdate = ref(null)
const refDialogRecordCallLogMultiUpdate = ref(null)
const {t} = useI18n()
store.setBreadcrumb(store, {"name": t('nav.screen.recordCallLog'), "path": "record-call-log"})

const statusList = reactive([
    { value: '', title: ''},
    { value: 2, title: '捺印書類出力済'},
    { value: 99, title: 'ペンディング'}
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
      disable: true,
    },
    {
      title: t('table.option'),
      align: 'center',
      sortable: false,
      width: 50,
      key: 'action'
    },
    {
      title: t('recordCallLog.projectNo'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'projectNo'
    },
    {
      title: t('recordCallLog.customerNameJp'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'customerNameJp'
    },
    {
      title: t('recordCallLog.fullName'),
      align: 'center',
      width: 250,
      sortable: false,
      key: 'fullName'
    },
    {
      title: t('recordCallLog.firstTel'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'firstTel'
    },
    {
      title: t('recordCallLog.contactDate'),
      align: 'center',
      width: 133,
      sortable: false,
      key: 'contactDate'
    },
    {
      title: t('recordCallLog.pic'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'pic'
    },
    {
      title: t('recordCallLog.estShipDocDate'),
      align: 'center',
      width: 130,
      sortable: false,
      key: 'estShipDocDate'
    },
    {
      title: t('recordCallLog.remarks'),
      align: 'center',
      width: 250,
      sortable: false,
      key: 'remarks'
    },
    {
      title: t('recordCallLog.receiptDate'),
      align: 'center',
      width: 133,
      sortable: false,
      key: 'receiptDate'
    },
    {
      title: t('recordCallLog.status'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'status'
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
    customerNameJp: false,
    remarks: false,
    fullName: false,
    firstTel: false,
    pic: false
  },
  dblProjectNo: null
})

const searchRequest = reactive({
  projectNo: null,
  status: null
})

// Function
const showDialogUserUpdate = (projectNo) => {
  refDialogRecordCallLogUpdate.value.open(projectNo)
}

const dblclickRow = (fieldName, projectNo) => {
  switch (fieldName) {
    case 'projectNo':
      table.isDbl.projectNo = true
      break
    case 'fullName':
      table.isDbl.fullName = true
      break
    case 'customerNameJp':
      table.isDbl.customerNameJp = true
      break
    case 'firstTel':
      table.isDbl.firstTel = true
      break
    case 'pic':
      table.isDbl.pic = true
      break
    case 'remarks':
      table.isDbl.remarks = true
      break
  }
  table.dblProjectNo = projectNo
}

const clickOutside = () => {
  table.isDbl.projectNo = false
  table.isDbl.remarks = false
  table.isDbl.fullName = false
  table.isDbl.customerNameJp = false
  table.isDbl.firstTel = false
  table.isDbl.pic = false
  table.dblProjectNo = null
}

const clickRow = (item, row) => {
  if (table.dblProjectNo !== row.item.value &&
    (table.isDbl.remarks === true ||
      table.isDbl.fullName === true ||
      table.isDbl.customerNameJp === true ||
      table.isDbl.firstTel === true ||
      table.isDbl.pic === true ||
      table.isDbl.projectNo === true
    )) {
    table.isDbl.remarks = false
    table.isDbl.fullName = false
    table.isDbl.customerNameJp = false
    table.isDbl.firstTel = false
    table.isDbl.pic = false
    table.isDbl.projectNo = false
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

  request = DataTableHelper.buildRequest(table.options, searchRequest);

  RecordCallLogRepository.searchAll(request).then((function (response) {
    table.items = response.data.recordCallLogList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.recordCallLogList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.recordCallLogList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.MULTI_UPDATE) {
    if (!table.selected.length) {
      Toast.showError(t('warning.noSelected'))
    } else {
      refDialogRecordCallLogMultiUpdate.value.open(table.selected)
    }
  }
  if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(true)
  }
  if (actionId === TOOLBAR_TABLE.CLEAR_SEARCH) {
    searchRequest.projectNo = null
    searchRequest.status = null
    table.selected = []
  }
}

const changeData = (e) => {
  table.options.page = e.page
  table.options.itemsPerPage = e.perPage
}

watch(table.options, () => (
  search(false, false)
))

const onComplete = (barcode) => {
  if (searchRequest.projectNo && searchRequest.projectNo.length && searchRequest.projectNo.includes(barcode)) {
    let lengthOld = searchRequest.projectNo.length - barcode.length
    let projectNoSearchOld = searchRequest.projectNo.slice(0, lengthOld);
    searchRequest.projectNo = projectNoSearchOld

    if (!searchRequest.projectNo.includes(barcode)) {
      if (searchRequest.projectNo && searchRequest.projectNo.trim().length > 0 ) {
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
<style scoped>

</style>

