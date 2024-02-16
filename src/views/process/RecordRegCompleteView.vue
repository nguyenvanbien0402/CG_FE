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
                    {{ $t('recordRegComplete.projectNo') }}
                  </span>
                </div>
                <v-text-field
                  v-model="searchRequest.projectNo"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
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
                    {{ $t('recordRegComplete.customerNameJp') }}
                  </span>
                </div>
                <v-text-field
                  v-model="searchRequest.customerNameJp"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                  @keyup.enter="search(true)"
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
                    {{ $t('recordRegComplete.returnNumber') }}
                  </span>
                </div>
                <v-text-field
                  v-model="searchRequest.returnNumber"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                  @keyup.enter="search(true)"
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
                    {{ $t('recordRegComplete.status') }}
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
              <div
                v-if="item.props.title.customerNameJp && table.isDbl.customerNameJp && item.value === table.dblProjectNo"
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
                   class="display-limit-txt-w-150"
              >
                {{ item.props.title.customerNameJp }}
              </div>
            </div>
          </template>
          <!-- regDate -->
          <template #item.regDate="{ item }">
            <div class="text-right">
              {{ item.props.title.regDate }}
            </div>
          </template>
          <!-- ownerReturnDate		 -->
          <template #item.ownerReturnDate="{ item }">
            <div class="text-right">
              {{ item.props.title.ownerReturnDate }}
            </div>
          </template>
          <!-- hgvReturnDate		 -->
          <template #item.hgvReturnDate="{ item }">
            <div class="text-right">
              {{ item.props.title.hgvReturnDate }}
            </div>
          </template>
          <!-- returnNumber		 -->
          <template #item.returnNumber="{ item }">
            <div class="display-limit-txt-w-200 text-right">
              {{ item.props.title.returnNumber }}
            </div>
          </template>
          <!-- ownerArrivalDate		 -->
          <template #item.ownerArrivalDate="{ item }">
            <div class="text-right">
              {{ item.props.title.ownerArrivalDate }}
            </div>
          </template>

          <template #item.status="{ item }">
            <div class="text-center w-full">
              <v-chip
                :style="'background-color:' + STATUS.get(item.props.title.status).color + ';'"
                :color="STATUS.get(item.props.title.status).color"
              >
                <div class="text-center w-48"
                     style="color: #ffffff!important;"
                >
                  {{ STATUS.get(item.props.title.status).text }}
                </div>
              </v-chip>
            </div>
          </template>

          <template #item.oldStatus="{ item }">
            <div v-if="item.props.title.status === 99" class="text-center w-full">
              <v-chip
                :style="'background-color:' + STATUS.get(item.props.title.oldStatus).color + ';'"
                :color="STATUS.get(item.props.title.oldStatus).color"
              >
                <div class="text-center w-48"
                     style="color: #ffffff!important;"
                >
                  {{ STATUS.get(item.props.title.oldStatus).text }}
                </div>
              </v-chip>
            </div>
          </template>
          <template #item.action="{ item }">
            <div
              class="my-1 text-center"
            >
              <v-btn
                v-if="(item.props.title.status === STATUS.get(11).key || item.props.title.status === STATUS.get(12).key || item.props.title.status === STATUS.get(13).key)
                  || (item.props.title.status === STATUS.get(99).key &&
                    item.props.title.oldStatus >= STATUS.get(11).key)"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogUserUpdate(item.props.title.projectNo, item.props.title.status, item.props.title.oldStatus)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
            </div>
          </template>

          <template #item.remark="{ item }">
            <div
              @dblclick="dblclickRow('remark', item.value)"
            >
              <div
                v-if="item.props.title.remark && table.isDbl.remark && item.value === table.dblProjectNo"
                class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.remark"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.remark }}
              </div>
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
    <dialog-record-reg-complete-update
      ref="refDialogRecordRegCompleteUpdate"
      :project-no="projectNo"
      @apply="search()"
    />
    <dialog-record-reg-complete-multi-update
      ref="refDialogRecordRegCompleteMultiUpdate"
      :project-no="table.selected"
      @apply="search()"
    />
  </div>
</template>
<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {useCommonStore} from '@/store/commonStore';
import {RepositoryFactory} from '@/repositories/repositoryFactory';
import {DataTableHelper} from '@/common/helper';
import {MAX_NUMBER_20_CHAR, STATUS, TOOLBAR_TABLE} from '@/constants/constant';
import CardDataTable from '@/components/card/CardDataTable.vue';
import TableTitleFunction from '@/components/table/TableTitleFunction.vue';
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import DialogRecordRegCompleteUpdate
  from '@/components/dialog/process/recordregcomplete/DialogRecordRegCompleteUpdate.vue'
import DialogRecordRegCompleteMultiUpdate
  from '@/components/dialog/process/recordregcomplete/DialogRecordRegCompleteMultiUpdate.vue'
import {useI18n} from 'vue-i18n'
import Toast from '@/common/toast';
import ScannerDetector from "js-scanner-detection";
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const store = useCommonStore()
const RecordRegCompleteRepository = RepositoryFactory.get('recordRegComplete')
const refDialogRecordRegCompleteUpdate = ref(null)
const refDialogRecordRegCompleteMultiUpdate = ref(null)
const {t} = useI18n()
store.setBreadcrumb(store, {"name": t('nav.screen.recordRegComplete'), "path": "record-reg-complete"})

const statusList = reactive([
  {value: '', title: ''},
  {value: 11, title: '請求済'},
  {value: 12, title: '返却書類発送済'},
  {value: 13, title: '返却書類到着確認済'},
  {value: 99, title: 'ペンディング'}
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
      title: t('recordRegComplete.projectNo'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'projectNo'
    },
    {
      title: t('recordRegComplete.customerNameJp'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'customerNameJp'
    },
    {
      title: t('recordRegComplete.regDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'regDate'
    },
    {
      title: t('recordRegComplete.ownerReturnDate'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'ownerReturnDate'
    },
    {
      title: t('recordRegComplete.hgvReturnDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'hgvReturnDate'
    },
    {
      title: t('recordRegComplete.returnNumber'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'returnNumber'
    },
    {
      title: t('recordRegComplete.ownerArrivalDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'ownerArrivalDate'
    },
    {
      title: t('recordRegComplete.oldStatus'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'oldStatus'
    },
    {
      title: t('recordRegComplete.status'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'status'
    },
    {
      title: t('recordRegComplete.remark'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'remark'
    },
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
    remark: false
  },
  dblProjectNo: null,
  isExistedManyStatus: false,
  statusIsAllowedList: [11, 12, 13, 99]
})

const searchRequest = reactive({
  projectNo: null,
  customerNameJp: null,
  returnNumber: null,
  status: null
})

// Function
const showDialogUserUpdate = (projectNo, status, oldStatus) => {
  refDialogRecordRegCompleteUpdate.value.open(projectNo, status, oldStatus)
}

const validateInputNumberReturnNumber = () => {
  if (Number(searchRequest.returnNumber) > MAX_NUMBER_20_CHAR) {
    searchRequest.returnNumber = searchRequest.returnNumber.substring(0, 20)
  }
}

const handleInput = (e) => {
  if (e.key === 'e') {
    e.preventDefault()
  }
}

const dblclickRow = (fieldName, projectNo) => {
  switch (fieldName) {
    case 'projectNo':
      table.isDbl.projectNo = true
      break
    case 'customerNameJp':
      table.isDbl.customerNameJp = true
      break
    case 'remark':
      table.isDbl.remark = true
      break
  }
  table.dblProjectNo = projectNo
}

const clickOutside = () => {
  table.isDbl.projectNo = false
  table.isDbl.customerNameJp = false
  table.isDbl.remark = false
  table.dblProjectNo = null
}

const clickRow = (item, row) => {
  if (table.dblProjectNo !== row.item.value &&
    (table.isDbl.projectNo === true || table.isDbl.customerNameJp === true)) {
    table.isDbl.projectNo = false
    table.isDbl.customerNameJp = false
    table.isDbl.remark = false
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

  RecordRegCompleteRepository.searchAll(request).then((function (response) {
    table.items = response.data.recordRegCompleteList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.recordRegCompleteList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.recordRegCompleteList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const checkStatusMultiUpdateAndOpenDialog = () => {

  RecordRegCompleteRepository.checkStatusMultiUpdate(table.selected).then((function (response) {
      if (Object.keys(response.data).length > 1) {
        Toast.showError("同じステータスのプロジェクトを選択してください。")
      }
      if (Object.keys(response.data).length === 1) {
        let nowStatus = Number(Object.keys(response.data)[0])
        let oldStatus = null
        if (nowStatus === 99) {
          let listStatusIfPending = response.data[nowStatus]
          if (listStatusIfPending.length > 1) {
            Toast.showError("同一の旧ステータスをPENDINGしてください。")
          } else {
            oldStatus = listStatusIfPending[0]
            refDialogRecordRegCompleteMultiUpdate.value.open(table.selected, nowStatus, oldStatus)
          }
        } else {
          refDialogRecordRegCompleteMultiUpdate.value.open(table.selected, nowStatus, null)
        }
      }

  }))
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.MULTI_UPDATE) {
    if (!table.selected.length) {
      Toast.showError(t('warning.noSelected'))
    } else {
      checkStatusMultiUpdateAndOpenDialog()
    }
  }
  if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(true)
  }
  if (actionId === TOOLBAR_TABLE.BARCODE_SCANNER) {
  }
  if (actionId === TOOLBAR_TABLE.CLEAR_SEARCH) {
    searchRequest.projectNo = null
    searchRequest.customerNameJp = null
    searchRequest.returnNumber = null
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
<style scoped>

</style>
