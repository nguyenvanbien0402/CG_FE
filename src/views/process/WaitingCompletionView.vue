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
                    {{ $t('waitingCompletion.projectNo') }}
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

          <template #item.customerNameJp="{ item }">
            <div
              @dblclick="dblclickRow('customerNameJp', item.value)"
            >
              <div v-if="item.props.title.customerNameJp && table.isDbl.customerNameJp && item.value === table.dblProjectNo"
                   class="mt-2 mb-2"
              >
                <v-text-field
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.customerNameJp"
                ></v-text-field>
              </div>
              <div v-else
                   class="display-limit-txt-w-150"
              >
                {{ item.props.title.customerNameJp }}
              </div>
            </div>
          </template>

          <template #item.locationName="{ item }">
            <div
              @dblclick="dblclickRow('locationName', item.value)"
            >
              <div v-if="item.props.title.locationName && table.isDbl.locationName && item.value === table.dblProjectNo"
                   class="mt-2 mb-2"
              >
                <v-text-field
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.locationName"
                ></v-text-field>
              </div>
              <div v-else
                   class=""
              >
                {{ item.props.title.locationName }}
              </div>
            </div>
          </template>

          <template #item.datePaymentEmail="{ item }">
            <div class="text-right">
              {{ item.props.title.datePaymentEmail }}
            </div>
          </template>

          <template #item.memorandumReceiptDate="{ item }">
            <div class="text-right">
              {{ item.props.title.memorandumReceiptDate }}
            </div>
          </template>

          <template #item.regDate="{ item }">
            <div class="text-right">
              {{ item.props.title.regDate }}
            </div>
          </template>

          <template #item.status="{ item }">
            <div class="text-center w-full">
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
              class="my-1 text-center"
            >
              <v-btn
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
    <dialog-waiting-completion-update
      ref="refDialogWaitingCompletionUpdate"
      :project-no="projectNo"
      @apply="search()"
    />
    <dialog-waiting-completion-multi-update
      ref="refDialogWaitingCompletionMultiUpdate"
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
import {STATUS, TOOLBAR_TABLE} from '@/constants/constant';
import CardDataTable from '@/components/card/CardDataTable.vue';
import TableTitleFunction from '@/components/table/TableTitleFunction.vue';
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import DialogWaitingCompletionUpdate
  from '@/components/dialog/process/waitingcompletion/DialogWaitingCompletionUpdate.vue'
import DialogWaitingCompletionMultiUpdate
  from '@/components/dialog/process/waitingcompletion/DialogWaitingCompletionMultiUpdate.vue'
import {useI18n} from 'vue-i18n'
import Toast from '@/common/toast';
import ScannerDetector from "js-scanner-detection";
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const store = useCommonStore()
const WaitingCompletionRepository = RepositoryFactory.get('waitingCompletion')
const refDialogWaitingCompletionUpdate = ref(null)
const refDialogWaitingCompletionMultiUpdate = ref(null)
const {t} = useI18n()
const statusList = reactive([
  { value: '', title: ''},
  { value: 0, title: '依頼受託済'},
  { value: 1, title: '捺印書類データ入力済'},
  { value: 2, title: '捺印書類出力済'},
  { value: 3, title: '本人確認済'},
  { value: 4, title: '捺印書類発送済'},
  { value: 5, title: '捺印書類返送済'},
  { value: 6, title: '捺印書類確認済'},
  { value: 7, title: '申請書作成済'},
  { value: 8, title: '申請書確認済'},
  { value: 9, title: 'HGV申請報告済'},
  { value: 10, title: '申請済'},
  { value: 11, title: '請求済'},
  { value: 12, title: '返却書類発送済'},
  { value: 13, title: '返却書類到着確認済'},
  { value: 14, title: 'HGV納品済'},
  { value: 99, title: 'ペンディング'}
])


store.setBreadcrumb(store, {"name": t('nav.screen.waitingCompletion'), "path": "waiting-completion"})

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
      title: t('waitingCompletion.projectNo'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'projectNo'
    },
    {
      title: t('waitingCompletion.fullName'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'fullName'
    },
    {
      title: t('waitingCompletion.customerNameJp'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'customerNameJp'
    },
    {
      title: t('waitingCompletion.locationName'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'locationName'
    },
    {
      title: t('waitingCompletion.datePaymentEmail'),
      align: 'center',
      width: 170,
      sortable: false,
      key: 'datePaymentEmail'
    },
    {
      title: t('waitingCompletion.memorandumReceiptDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'memorandumReceiptDate'
    },
    {
      title: t('waitingCompletion.regDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'regDate'
    },
    {
      title: t('waitingCompletion.status'),
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
    fullName: false,
    customerNameJp: false,
    locationName: false
  },
  dblProjectNo: null
})

const searchRequest = reactive({
  projectNo: null
})

// Function
const showDialogUserUpdate = (projectNo) => {
  refDialogWaitingCompletionUpdate.value.open(projectNo)
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
    case 'locationName':
      table.isDbl.locationName = true
      break
  }
  table.dblProjectNo = projectNo
}

const clickOutside = () => {
  table.isDbl.projectNo = false
  table.isDbl.fullName = false
  table.isDbl.customerNameJp = false
  table.isDbl.locationName = false
  table.dblProjectNo = null
}

const clickRow = (item, row) => {
  if (table.dblProjectNo !== row.item.value &&
    (table.isDbl.projectNo === true ||
      table.isDbl.fullName === true ||
      table.isDbl.customerNameJp === true ||
      table.isDbl.locationName === true
    )) {
    table.isDbl.projectNo = false
    table.isDbl.fullName = false
    table.isDbl.customerNameJp = false
    table.isDbl.locationName = false
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

  WaitingCompletionRepository.searchAll(request).then((function (response) {
    table.items = response.data.waitingCompletionList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.waitingCompletionList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.waitingCompletionList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.MULTI_UPDATE) {
    if (!table.selected.length) {
      Toast.showError(t('warning.noSelected'))
    } else {
      refDialogWaitingCompletionMultiUpdate.value.open(table.selected)
    }
  }
  if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(true)
  }
  if (actionId === TOOLBAR_TABLE.CLEAR_SEARCH) {
    searchRequest.projectNo = null
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
