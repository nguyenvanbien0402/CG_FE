<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <input
          ref="uploadFileRef"
          type="file"
          class="d-none"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="onFileChange($event)"
        />
        <table-title-function
          show-download-template
          show-search
          show-multi-update
          show-clear-search
          show-import
          show-export
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
                    {{ $t('recordRegApp.customerNameJp') }}
                  </span>
                </div>
                <v-text-field
                  v-model="searchRequest.customerNameJp"
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
                    {{ $t('recordRegApp.regDate') }}
                  </span>
                </div>
                <VueDatePicker v-model="searchRequest.regDate"
                               text-input
                               :select-text="$t('datePicker.select')"
                               :cancel-text="$t('datePicker.cancel')"
                               locale="ja"
                               :enable-time-picker="false"
                               :format="CommonFormatDate"
                ></VueDatePicker>
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
                    {{ $t('recordRegApp.cancelRegDate') }}
                  </span>
                </div>
                <VueDatePicker v-model="searchRequest.cancelRegDate"
                               text-input
                               :select-text="$t('datePicker.select')"
                               :cancel-text="$t('datePicker.cancel')"
                               locale="ja"
                               :enable-time-picker="false"
                               :format="CommonFormatDate"
                ></VueDatePicker>
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
          :item-props="item"
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

          <!-- Project No -->
          <template #item.projectNo="{ item }">
            <div
              @dblclick="dblclickRow('projectNo', item.value)"
            >
              <div v-if="item.props.title.projectNo && table.isDbl.projectNo && item.value === table.dblProjectNo"
                   class="mt-2 mb-2"
              >
                <v-text-field
                  hide-details
                  variant="outlined"
                  density="compact"
                  readonly
                  :model-value="item.props.title.projectNo"
                ></v-text-field>
              </div>
              <div v-else
                   class="display-limit-txt-w-150"
              >
                <a
                  class="text-blue-500"
                  @click="directToRegisDetail(item.props.title.projectNo, item.props.title.category)"
                >{{ item.props.title.projectNo }}</a>
              </div>
            </div>
          </template>
          <!-- customerNameJp -->
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
          <!-- cancelRegDate -->
          <template #item.cancelRegDate="{ item }">
            <div class="text-right">
              {{ item.props.title.cancelRegDate }}
            </div>
          </template>
          <!-- category -->
          <template #item.category="{ item }">
            {{ item.props.title.category }}
          </template>

          <template #item.status="{ item }">
            <div class="text-center w-full">
              <v-chip
                :style="'background-color:' + STATUS.get(item.props.title.status).color + ';'"
                :color="STATUS.get(item.props.title.status).color"
              >
                <div class="text-center w-32" style="color: #ffffff!important;">
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
                v-if="(item.props.title.status === STATUS.get(9).key) || (item.props.title.status === STATUS.get(99).key && item.props.title.oldStatus >= STATUS.get(9).key)"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogUpdate(item.props.title.projectNo, item.props.title.category)"
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
    <dialog-record-reg-app-regis-update
      ref="refDialogRecordRegAppRegisUpdate"
      @apply="search()"
    />
    <dialog-record-reg-app-cancel-update
      ref="refDialogRecordRegAppCancelUpdate"
      @apply="search()"
    />
    <dialog-record-reg-app-regis-multi-update
      ref="refDialogRecordRegAppRegisMultiUpdate"
      :project-no="table.selected"
      @apply="search()"
    />
    <dialog-record-reg-app-cancel-multi-update
      ref="refDialogRecordRegAppCancelMultiUpdate"
      :project-no="table.selected"
      @apply="search()"
    />
    <dialog-record-reg-app-export-excel
      ref="refDialogRecordRegAppExportExcel"
      :project-no="table.selected"
      @apply="search()"
    />
    <dialog-file-error ref="refDialogFileError"> </dialog-file-error>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref, watch} from 'vue';
import {useCommonStore} from '@/store/commonStore';
import {RepositoryFactory} from '@/repositories/repositoryFactory';
import {CommonFormatDate, DataTableHelper} from '@/common/helper';
import {STATUS, TOOLBAR_TABLE} from '@/constants/constant';
import CardDataTable from '@/components/card/CardDataTable.vue';
import TableTitleFunction from '@/components/table/TableTitleFunction.vue';
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import DialogRecordRegAppRegisUpdate from '@/components/dialog/process/recordregapp/DialogRecordRegAppRegisUpdate.vue';
import DialogRecordRegAppRegisMultiUpdate
  from '@/components/dialog/process/recordregapp/DialogRecordRegAppRegisMultiUpdate.vue';
import DialogRecordRegAppCancelMultiUpdate
  from '@/components/dialog/process/recordregapp/DialogRecordRegAppCancelMultiUpdate.vue';
import DialogRecordRegAppCancelUpdate
  from "@/components/dialog/process/recordregapp/DialogRecordRegAppCancelUpdate.vue";
import DialogRecordRegAppExportExcel from '@/components/dialog/process/recordregapp/DialogRecordRegAppExportExcel.vue'
import DialogFileError from '@/components/dialog/DialogFileError.vue'
import {useI18n} from 'vue-i18n';
import Toast from '@/common/toast';
import router from "@/router";
import ScannerDetector from "js-scanner-detection";
import VueDatePicker from '@vuepic/vue-datepicker';
import {useCookies} from "vue3-cookies";

// Initial
const store = useCommonStore()
const {cookies} = useCookies();
const RecordRegAppRepository = RepositoryFactory.get('recordRegApp')
const refDialogRecordRegAppRegisUpdate = ref(null)
const refDialogRecordRegAppCancelUpdate = ref(null)
const refDialogRecordRegAppRegisMultiUpdate = ref(null)
const refDialogRecordRegAppCancelMultiUpdate = ref(null)
const refDialogRecordRegAppExportExcel = ref(null)
const uploadFileRef = ref(null)
const refDialogFileError = ref(null)
const {t} = useI18n()
store.setBreadcrumb(store, {"name": t('nav.screen.recordRegApp'), "path": "record-reg-app"})

const statusList = reactive([
  { value: '', title: ''},
  { value: 9, title: 'HGV申請報告済'},
  { value: 99, title: 'ペンディング'}
])

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
      title: t('recordRegApp.projectNo'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'projectNo'
    },
    {
      title: t('recordRegApp.customerNameJp'),
      align: 'center',
      width: 500,
      sortable: false,
      key: 'customerNameJp'
    },
    {
      title: t('recordRegApp.regDate'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'regDate'
    },
    {
      title: t('recordRegApp.cancelRegDate'),
      align: 'center',
      width: 110,
      sortable: false,
      key: 'cancelRegDate'
    },
    {
      title: t('recordRegApp.category'),
      align: 'center',
      width: 80,
      sortable: false,
      key: 'category'
    },
    {
      title: t('recordRegApp.status'),
      align: 'center',
      width: 100,
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
    customerNameJp: false
  },
  dblProjectNo: null,
  categoryMultiUpdate: []
})


const searchRequest = reactive({
  projectNo: null,
  customerNameJp: null,
  regDate: null,
  cancelRegDate: null,
  status: null
})

// Function
const showDialogUpdate = (projectNo, category) => {
  switch (category) {
    case '無':
      refDialogRecordRegAppRegisUpdate.value.open(projectNo, category)
      break
    case '有':
      refDialogRecordRegAppCancelUpdate.value.open(projectNo, category)
      break
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
  }
  table.dblProjectNo = projectNo
}

const clickOutside = () => {
  table.isDbl.projectNo = false
  table.isDbl.customerNameJp = false
  table.dblProjectNo = null
}

const clickRow = (item, row) => {
  if (table.dblProjectNo !== row.item.value &&
    (table.isDbl.projectNo === true
      || table.isDbl.customerNameJp === true
    )) {
    table.isDbl.projectNo = false
    table.isDbl.customerNameJp = false
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
  RecordRegAppRepository.searchAll(request).then((function (response) {
    table.items = response.data.recordRegAppList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.recordRegAppList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.recordRegAppList.length,
    }
    store.setPagination(store, pagination)
  }))

  cookies.set('recordRegAppPrev', {
    projectNo: searchRequest.projectNo,
    customerNameJp: searchRequest.customerNameJp,
    regDate: searchRequest.regDate,
    cancelRegDate: searchRequest.cancelRegDate,
    status: searchRequest.status,
    page: table.options.page,
    itemsPerPage: table.options.itemsPerPage,
    sortBy: table.options.sortBy,
    sortDesc: table.options.sortDesc
  })
}

const checkCategoryAndOpenDialog = async () => {
  let request = {
    projectNos: table.selected
  }
  await RecordRegAppRepository.checkCategory(request).then((function (response) {
    table.categoryMultiUpdate = response.data
  }))
  if (table.categoryMultiUpdate && table.categoryMultiUpdate.length === 1) {
    switch (table.categoryMultiUpdate[0]) {
      case '無':
        refDialogRecordRegAppRegisMultiUpdate.value.open(table.selected)
        break
      case '有':
        refDialogRecordRegAppCancelMultiUpdate.value.open(table.selected)
        break
    }
  } else {
    Toast.showError(t('errorMessage.multipleCategory'))
  }
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.MULTI_UPDATE) {
    if (!table.selected.length) {
      Toast.showError(t('warning.noSelected'))
    } else {
      checkCategoryAndOpenDialog()
    }
  }
  if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(true)
  }
  if (actionId === TOOLBAR_TABLE.CLEAR_SEARCH) {
    searchRequest.projectNo = null
    searchRequest.customerNameJp = null
    searchRequest.regDate = null
    searchRequest.cancelRegDate = null
    searchRequest.status = null
    cookies.remove('recordRegAppPrev')
    table.selected = []
  }
  if (actionId === TOOLBAR_TABLE.IMPORT) {
    uploadFileRef.value.click()
  }
  if (actionId === TOOLBAR_TABLE.DOWNLOAD_TEMPLATE) {
    let request = {
      projectNo: searchRequest.projectNo,
      regDate: searchRequest.regDate,
      cancelRegDate: searchRequest.cancelRegDate,
      customerNameJp: searchRequest.customerNameJp,
      status: searchRequest.status
    }

    request = DataTableHelper.buildRequest(table.options, request);

    RecordRegAppRepository.downloadRegApp(request)
  }
  if (actionId === TOOLBAR_TABLE.EXPORT) {
    refDialogRecordRegAppExportExcel.value.open(table.selected)
  }
}
const onFileChange = (e) => {
  let files = e.target.files
  if (!files) {
    return
  }
  if (files[0].size > 10240000) {
    Toast.showError(t('errorMessage.fileBiggerThan10Mb'))
    uploadFileRef.value.value = ''
    return
  }
  let formData = new FormData()
  formData.append('file', files[0])
  RecordRegAppRepository.upload(formData)
    .then((response) => {
      uploadFileRef.value.value = null
      if (response.code !== 'ES200') {
        if (response.message && (response.message === t('file.templateInvalid') || response.message === t('file.dataEmpty'))) {
          return
        } else {
          refDialogFileError.value.open(response.data)
          return
        }
      }
      search()
    })
    .catch(() => {
      uploadFileRef.value.value = null
    })
}

const directToRegisDetail = (projectNo, category) => {
  if (category === '無') {
    router.push({
      path: '/record-reg-app-detail/regis',
      query: {
        projectNo: projectNo,
        category: category
      }
    })
  }
  if (category === '有') {
    router.push({
      path: '/record-reg-app-detail/cancel',
      query: {
        projectNo: projectNo,
        category: category
      }
    })
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

  if (cookies.get('recordRegAppPrev') && cookies.get('recordRegAppPrev') !== 'undefined') {
    searchRequest.projectNo = cookies.get('recordRegAppPrev').projectNo
    searchRequest.customerNameJp = cookies.get('recordRegAppPrev').customerNameJp
    searchRequest.regDate = cookies.get('recordRegAppPrev').regDate
    searchRequest.cancelRegDate = cookies.get('recordRegAppPrev').cancelRegDate
    searchRequest.status = cookies.get('recordRegAppPrev').status
    if (cookies.get('recordRegAppPrev').page === 1 &&
      cookies.get('recordRegAppPrev').itemsPerPage === 20
    ) {
      search(false)
    }
  } else {
    search(false)
  }
  cookies.remove('documentPrev')
  cookies.remove('keyPrev')
  cookies.remove('recordRegFinalPrev')
})

</script>
<style scoped>

</style>
