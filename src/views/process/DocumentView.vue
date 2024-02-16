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
          show-clear-search
          show-search
          show-pending
          show-in-progress
          show-import
          show-export
          show-download-template
          show-export-multiple
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
                    {{ $t('document.search.projectNo') }}
                  </span>
                </div>
                <v-text-field
                  v-model="requestSearch.projectNo"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.name') }}
                  </span>
                </div>
                <v-text-field
                  v-model="requestSearch.name"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.status') }}
                  </span>
                </div>
                <v-select
                  v-model="requestSearch.status"
                  density="compact"
                  dense
                  variant="outlined"
                  hide-details
                  :items="lstStatus"
                ></v-select>
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.location') }}
                  </span>
                </div>
                <v-select
                  v-model="requestSearch.location"
                  density="compact"
                  dense
                  variant="outlined"
                  hide-details
                  :items="locations"
                ></v-select>
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.tel') }}
                  </span>
                </div>
                <v-text-field
                  v-model="requestSearch.tel"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <!-- here -->

              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.regDate') }}
                  </span>
                </div>
                <VueDatePicker
                  v-model="requestSearch.regDate"
                  :select-text="$t('datePicker.select')"
                  :cancel-text="$t('datePicker.cancel')"
                  text-input
                  locale="ja"
                  :enable-time-picker="false"
                  format="yyyy/MM/dd"
                ></VueDatePicker>
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.projectType') }}
                  </span>
                </div>
                <v-select
                  v-model="requestSearch.projectType"
                  density="compact"
                  dense
                  variant="outlined"
                  hide-details
                  :items="projectTypes"
                ></v-select>
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.representativeName') }}
                  </span>
                </div>
                <v-text-field
                  v-model="requestSearch.representativeName"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.requestDate') }}
                  </span>
                </div>
                <VueDatePicker
                  v-model="requestSearch.requestDate"
                  :select-text="$t('datePicker.select')"
                  :cancel-text="$t('datePicker.cancel')"
                  text-input
                  locale="ja"
                  :enable-time-picker="false"
                  format="yyyy/MM/dd"
                ></VueDatePicker>
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.category') }}
                  </span>
                </div>
                <v-select
                  v-model="requestSearch.category"
                  density="compact"
                  dense
                  variant="outlined"
                  hide-details
                  :items="categorys"
                ></v-select>
              </v-col>
              <v-col cols="3"
                     md="6"
                     lg="3"
                     sm="12"
              >
                <div class="mb-2">
                  <span class="font-weight-medium text-sm">
                    {{ $t('document.search.email') }}
                  </span>
                </div>
                <v-text-field
                  v-model="requestSearch.email"
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
            </v-row>
          </template>
        </table-title-function>
      </template>
      <template #table>
        <div class="pl-5 mt-2">
          選択中：<span class="font-bold">{{ selected.length }}件</span>
        </div>
        <v-data-table
          v-model="selected"
          v-click-outside="clickOutside"
          :headers="table.headers"
          :items="table.items"
          :items-length="table.totalRecords"
          show-select="true"
          :items-per-page="table.options.itemsPerPage"
          item-value="projectNo"
          :fixed-footer="true"
          :fixed-header="true"
          disable-initial-sort
          height="700px"
          hide-actions
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

          <!-- index-->
          <template #item.index="{ index }">
            <div class="text-center">
              {{ table.options.itemsPerPage * (table.options.page - 1) + index + 1 }}
            </div>
          </template>
          <!-- option -->
          <template #item.action="{ item }">
            <div class="my-1 flex flex-row">
              <v-btn
                icon
                elevation="1"
                :disabled="!arrayStatusShowEdit.includes(Number(item.props.title.numberOfStatus))"
                class="mr-1 btn-data-table"
                :href="'document/' + `${item.value}` + '/edit'"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
              <v-btn
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                :disabled="!arrayStatusShow.includes(Number(item.props.title.numberOfStatus))"
                @click="
                  refDialogConfirmForward.open(
                    item.value,
                    'forward',
                    item.props.title.numberOfStatus
                  )
                "
              >
                <i class="fa-solid fa-forward"></i>
              </v-btn> 
              <v-btn
              v-if="user.role == 0"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="
                  refDialogConfirmDelete.open(
                    item.value,
                    'delete',
                    item.props.title.numberOfStatus,
                    item.props.title.upgradeFrom
                  )
                "
              >
                <i class="fa-solid fa-trash"></i>
              </v-btn>
            </div>
          </template>
          <!-- projectNo -->
          <template #item.projectNo="{ item }">
            <a :href="'document/' + `${item.value}`"
               class="text-blue-500 display-limit-txt-w-150"
            >{{ item.value }}</a>
          </template>
          <!-- status -->
          <template #item.status="{ item }">
            <div class="text-center w-full">
              <v-chip
                :style="
                  'background-color:' + STATUS.get(item.props.title.numberOfStatus).color + ';'
                "
                :color="STATUS.get(item.props.title.numberOfStatus).color"
              >
                <div class="text-center w-48"
                     style="color: #ffffff !important"
                >
                  {{ STATUS.get(item.props.title.numberOfStatus).text }}
                </div>
              </v-chip>
            </div>
          </template>
          <!-- customerNameEn -->
          <template #item.customerNameEn="{ item }">
            <div class="display-limit-txt-w-200"
                 @dblclick="dblclickRow('customerNameEn', item.value)">
              <div
                v-if="
                  item.props.title.customerNameEn &&
                    table.isDbl.customerNameEn &&
                    item.value === table.dblKeyEstateId
                "
                class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.customerNameEn"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.customerNameEn }}
              </div>
            </div>
          </template>
          <!-- customerNameJp -->
          <template #item.customerNameJp="{ item }">
            <div @dblclick="dblclickRow('customerNameJp', item.value)">
              <div
                v-if="
                  item.props.title.customerNameJp &&
                    table.isDbl.customerNameJp &&
                    item.value === table.dblKeyEstateId
                "
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
          <!-- representativeName -->
          <template #item.representativeName="{ item }">
            <div>
              {{ item.props.title.representativeName }}
            </div>
          </template>
          <!-- requestDate -->
          <template #item.requestDate="{ item }">
            <div class="display-limit-txt-date text-right">
              {{ item.props.title.requestDate }}
            </div>
          </template>
          <!-- location -->
          <template #item.location="{ item }">
            <div>
              {{ item.props.title.location }}
            </div>
          </template>
          <!-- projectType -->
          <template #item.projectType="{ item }">
            <div>
              {{ item.props.title.projectType }}
            </div>
          </template>
          <!-- upgradeFrom -->
          <template #item.upgradeFrom="{ item }">
            <a
              :href="'document_cancel/' + `${item.props.title.upgradeFrom}` + '/' + `${item.value}`"
              class="text-blue-500"
            >{{ item.props.title.upgradeFrom }}</a>
          </template>
          <!-- financeType -->
          <template #item.financeName="{ item }">
            <div class="text-center w-full">
              <v-chip
                v-if="item.props.title.financeName === 'Loan'"
                style="background-color: #49a611"
                color="#49A611"
              >
                <div class="text-center w-20"
                     style="color: #ffffff !important"
                >
                  {{ item.props.title.financeName }}
                </div>
              </v-chip>
              <v-chip v-else
                      style="background-color: #f16f67"
                      color="#F16F67"
              >
                <div class="text-center w-20"
                     style="color: #ffffff !important"
                >
                  {{ item.props.title.financeName }}
                </div>
              </v-chip>
            </div>
          </template>
          <!-- regDate -->
          <template #item.regDate="{ item }">
            <div class="display-limit-txt-date text-right">
              {{ item.props.title.regDate }}
            </div>
          </template>
          <!-- remarks -->
          <template #item.remark="{ item }">
            <div @dblclick="dblclickRow('remarks', item.value)">
              <div
                v-if="
                  item.props.title.remark &&
                    table.isDbl.remarks &&
                    item.value === table.dblKeyEstateId
                "
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
          <!-- firstTel -->
          <template #item.firstTel="{ item }">
            <div class="display-limit-txt-w-150">
              {{ item.props.title.firstTel }}
            </div>
          </template>
          <!-- secondTel -->
          <template #item.secondTel="{ item }">
            <div class="display-limit-txt-w-150">
              {{ item.props.title.secondTel }}
            </div>
          </template>
          <!-- thirdTel -->
          <template #item.thirdTel="{ item }">
            <div class="display-limit-txt-w-150">
              {{ item.props.title.thirdTel }}
            </div>
          </template>
          <!-- email -->
          <template #item.email="{ item }">
            <div class="display-limit-txt-w-200"
                 @dblclick="dblclickRow('email', item.value)">
              <div
                v-if="
                  item.props.title.email &&
                    table.isDbl.email &&
                    item.value === table.dblKeyEstateId
                "
                class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.email"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.email }}
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
    <dialog-confirm ref="refDialogConfirmPending"
                    @apply="changeStatus"
    >
      <template #body>
        <p>
          {{ $t('dialogContent.confirmPending') }}
        </p>
      </template>
    </dialog-confirm>
    <dialog-confirm ref="refDialogConfirmInprogress"
                    @apply="changeStatus"
    >
      <template #body>
        <p>
          {{ $t('dialogContent.confirmInprogress') }}
        </p>
      </template>
    </dialog-confirm>
    <dialog-confirm ref="refDialogConfirmForward"
                    @apply="forwardStatus"
    >
      <template #body>
        <p>
          {{ $t('dialogContent.confirmForward') }}
        </p>
      </template>
    </dialog-confirm>
    <dialog-confirm ref="refDialogConfirmDelete"
                    @apply="deleteDocument"
    >
      <template #body>
        <p>
          {{ $t('dialogContent.confirmDeleteDocument') }}
        </p>
      </template>
    </dialog-confirm>
    <dialog-document-download
      ref="refDialogDocumentDownload"
      :project-no="table.selected"
      @apply="search(requestSearch)"
    />
    <dialog-export-multiple      
      ref="refDialogExportMultiple"
      :project-no="table.selected"
      @apply="search(requestSearch)"
      >
    </dialog-export-multiple>
    <dialog-file-error ref="refDialogFileError">
    </dialog-file-error>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import { DataTableHelper } from '@/common/helper'
import { STATUS, TOOLBAR_TABLE } from '@/constants/constant'
import CardDataTable from '@/components/card/CardDataTable.vue'
import TableTitleFunction from '@/components/table/TableTitleFunction.vue'
import DialogConfirm from '@/components/dialog/DialogConfirm.vue'
import DialogFileError from '@/components/dialog/DialogFileError.vue'
import PaginationCommon from '@/components/table/PaginationCommon.vue'
import DialogDocumentDownload from '@/components/dialog/process/document/DialogDocumentDownload.vue'
import DialogExportMultiple from '@/components/dialog/process/document/DialogExportMultiple.vue'
import { useI18n } from 'vue-i18n'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { useDocumentStore } from '@/store/process/documentStore'
import Toast from '@/common/toast'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ScannerDetector from 'js-scanner-detection'
import { DownloadTemplate } from '@/common/helper'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()
const arrayStatusShow = ref([0, 1, 5, 6, 8, 10])
const arrayStatusShowEdit = ref([0, 1, 6, 99])
const refDialogConfirmPending = ref(null)
const refDialogConfirmInprogress = ref(null)
const refDialogConfirmForward = ref(null)
const refDialogFileError = ref(null)
const refDialogConfirmDelete = ref(null)
const refDialogDocumentDownload = ref(null)
const refDialogExportMultiple = ref(null)
const store = useCommonStore()
const { t } = useI18n()
store.setBreadcrumb(store, { name: t('nav.screen.document'), path: 'document' })
const DocumentRepository = RepositoryFactory.get('document')
const documentStore = useDocumentStore()
const user = JSON.parse(localStorage.getItem('user'))

const lstStatus = reactive([
  { title: '', value: null },
  { title: '依頼受託済', value: 0 },
  { title: '捺印書類データ入力済', value: 1 },
  { title: '捺印書類出力済', value: 2 },
  { title: '本人確認済', value: 3 },
  { title: '捺印書類発送済', value: 4 },
  { title: '捺印書類返送済', value: 5 },
  { title: '捺印書類確認済', value: 6 },
  { title: '申請書作成済', value: 7 },
  { title: '申請書確認済', value: 8 },
  { title: 'HGV申請報告済', value: 9 },
  { title: '申請済', value: 10 },
  { title: '請求済', value: 11 },
  { title: '返却書類発送済', value: 12 },
  { title: '返却書類到着確認済', value: 13 },
  { title: 'HGV納品済', value: 14 },
  { title: 'ペンディング', value: 99 }
])
const categorys = reactive(['', '有', '無'])
const locations = computed(() => documentStore.getLocations)
const projectTypes = computed(() => documentStore.getProjectTypes)
const uploadFileRef = ref(null)
const selected = ref([])
const table = reactive({
  options: DataTableHelper.optionBuilder(),
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
      title: t('document.projectNo'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'projectNo'
    },
    {
      title: t('document.status'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'status'
    },
    {
      title: t('document.customerNameEn'),
      align: 'center',
      width: 50,
      sortable: false,
      key: 'customerNameEn'
    },
    {
      title: t('document.customerNameJp'),
      align: 'center',
      sortable: false,
      width: 250,
      key: 'customerNameJp'
    },
    {
      title: t('document.representativeName'),
      align: 'center',
      sortable: false,
      width: 250,
      key: 'representativeName'
    },
    {
      title: t('document.requestDate'),
      align: 'center',
      sortable: false,
      width: 100,
      key: 'requestDate'
    },
    {
      title: t('document.location'),
      align: 'center',
      sortable: false,
      width: 90,
      key: 'locationName'
    },
    {
      title: t('document.projectType'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'projectTypeName'
    },
    {
      title: t('document.upgradeFrom'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'upgradeFrom'
    },
    {
      title: t('document.financeType'),
      align: 'center',
      sortable: false,
      width: 100,
      key: 'financeName'
    },
    {
      title: t('document.regDate'),
      align: 'center',
      sortable: false,
      width: 100,
      key: 'regDate'
    },
    {
      title: t('document.remarks'),
      align: 'center',
      sortable: false,
      width: 250,
      key: 'remark'
    },
    {
      title: t('document.firstTel'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'firstTel'
    },
    {
      title: t('document.secondTel'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'secondTel'
    },
    {
      title: t('document.thirdTel'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'thirdTel'
    },
    {
      title: t('document.email'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'email'
    }
  ],
  totalPages: null,
  totalElements: null,
  displayPageNums: 5,
  amountOfDataDisplay: null,
  idDelete: null,
  isDbl: {
    remarks: false,
    customerNameEn: false,
    customerNameJp: false,
    email:false
  },
  dblKeyEstateId: null
})

const requestSearch = reactive({
  projectNo: null,
  status: null,
  name: null,
  tel: null,
  location: null,
  regDate: null,
  projectType: null,
  representativeName: null,
  requestDate: null,
  category: null,
  email:null
})

const search = (requestSearch, isClick = true, isRemoveSelected = true) => {
  // if (isRemoveSelected) {
  //   selected.value = []
  // }
  let request = {}
  if (isClick && table.options.page !== 1) {
    table.options.page = 1
    return
  }
  request = DataTableHelper.buildRequest(table.options, requestSearch)

  DocumentRepository.searchAll(request).then(function (response) {
    table.items = response.data.documentResponseList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.documentResponseList.length

    let pagination = {
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.documentResponseList.length,
      page: table.options.page
    }
    store.setPagination(store, pagination)
  })

  cookies.set('documentPrev', {
    projectNo: requestSearch.projectNo,
    status: requestSearch.status,
    name: requestSearch.name,
    tel: requestSearch.tel,
    location: requestSearch.location,
    regDate: requestSearch.regDate,
    projectType: requestSearch.projectType,
    representativeName: requestSearch.representativeName,
    requestDate: requestSearch.requestDate,
    category: requestSearch.category,
    email:requestSearch.email,
    page: table.options.page,
    itemsPerPage: table.options.itemsPerPage,
    sortBy: table.options.sortBy,
    sortDesc: table.options.sortDesc
  })
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.PENDING) {
    if (selected.value.length <= 0) {
      Toast.showError(t('warning.noSelected'))
      return
    }
    refDialogConfirmPending.value.open(selected, actionId)
  } else if (actionId === TOOLBAR_TABLE.IMPORT) {
    uploadFileRef.value.click()
  } else if (actionId === TOOLBAR_TABLE.INPROGRESS) {
    if (selected.value.length <= 0) {
      Toast.showError(t('warning.noSelected'))
      return
    }
    refDialogConfirmInprogress.value.open(selected, actionId)
  } else if (actionId === TOOLBAR_TABLE.EXPORT) {
    refDialogDocumentDownload.value.open(selected, actionId)
  } else if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(requestSearch)
  } else if (actionId === TOOLBAR_TABLE.CLEAR_SEARCH) {
    clearSearch()
    cookies.remove('documentPrev')
  } else if (actionId === TOOLBAR_TABLE.DOWNLOAD_TEMPLATE) {
    let path = '/cg/api/File/template/document/'
    let fileName = 'template_import.xlsx'
    DownloadTemplate(path, fileName)
  } else if(actionId === TOOLBAR_TABLE.EXPORT_MULTIPLE){
    if (selected.value.length <= 0) {
      Toast.showError(t('warning.noSelected'))
      return
    }
    refDialogExportMultiple.value.open(selected, actionId)
  }
}

const clearSearch = () => {
  requestSearch.projectNo = null
  requestSearch.status = null
  requestSearch.name = null
  requestSearch.tel = null
  requestSearch.location = null
  requestSearch.regDate = null
  requestSearch.projectType = null
  requestSearch.representativeName = null
  requestSearch.requestDate = null
  requestSearch.category = null
  requestSearch.email = null
  selected.value = []
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
  DocumentRepository.upload(formData)
    .then((response) => {
      uploadFileRef.value.value = null
      if (response.code === 'ES400') {
        refDialogFileError.value.open(response.data)
        return
      }
   
      search(requestSearch)
    })
    .catch(() => {
      uploadFileRef.value.value = null
    })
}

const changeStatus = (value) => {
  let request = {}
  if (value.action === 'pending') {
    request = { projectNos: value.item.value, newStatus: 99 }
    DocumentRepository.checkPendingStatusOfRecord(request)
      .then(async () => {
        await DocumentRepository.pendingStatus(request)
        const response = {
          code: 'ES200',
          message: 'SUCCESS'
        }
        Toast.show(response)
        search(requestSearch)
      })
      .catch((error) => {
        Toast.show(error.response.data)
      })
  } else {
    request = { projectNos: value.item.value, oldStatus: 99, newStatus: 100 }
    DocumentRepository.inProgressStatus(request).then(() => {
      search(requestSearch)
    })
  }
}
const forwardStatus = (value) => {
  let request = {}
  if (value.action === 'forward') {
    request = { projectNos: [value.item], oldStatus: value.oldStatus }
    DocumentRepository.forwardStatus(request).then(() => {
      search(requestSearch)
    })
  }
}
const deleteDocument= (value) => {
  let request = {}
  if (value.action === 'delete') {
    request = { projectNo: value.item, projectNoRef: value.projectNoRef}
    DocumentRepository.delete(request).then(() => {
      search(requestSearch)
    })
  }
}

const changeData = (e) => {
  table.options.page = e.page
  table.options.itemsPerPage = e.perPage
}

watch(table.options, () => search(requestSearch, false, false))

const onComplete = (barcode) => {
  if (
    requestSearch.projectNo &&
    requestSearch.projectNo.length &&
    requestSearch.projectNo.includes(barcode)
  ) {
    let lengthOld = requestSearch.projectNo.length - barcode.length
    let projectNoSearchOld = requestSearch.projectNo.slice(0, lengthOld)
    requestSearch.projectNo = projectNoSearchOld

    if (!requestSearch.projectNo.includes(barcode)) {
      if (requestSearch.projectNo && requestSearch.projectNo.trim().length > 0) {
        requestSearch.projectNo = requestSearch.projectNo.trim()
        let endChar = requestSearch.projectNo.length
        if (requestSearch.projectNo.slice(endChar - 1, endChar) === ';') {
          requestSearch.projectNo = requestSearch.projectNo + barcode
        } else {
          requestSearch.projectNo = requestSearch.projectNo + ';' + barcode
        }
      } else {
        requestSearch.projectNo = barcode + ';'
      }
    }
  }
}

const dblclickRow = (fieldName, realEstateDisplayKey) => {
  switch (fieldName) {
    case 'remarks':
      table.isDbl.remarks = true
      break
    case 'customerNameEn':
      table.isDbl.customerNameEn = true
      break
    case 'customerNameJp':
      table.isDbl.customerNameJp = true
      break
      case 'email':
      table.isDbl.email = true
      break  
  }
  table.dblKeyEstateId = realEstateDisplayKey
}

const clickOutside = () => {
  table.isDbl.remarks = false
  table.isDbl.customerNameEn = false
  table.isDbl.customerNameJp = false
  table.isDbl.email = false
  table.dblKeyEstateId = null
}

const clickRow = (item, row) => {
  if (
    table.dblKeyEstateId !== row.item.value &&
    (table.isDbl.remarks === true ||
      table.isDbl.customerNameEn === true ||
      table.isDbl.customerNameJp === true ||
      table.isDbl.email===true)
  ) {
    table.isDbl.remarks = false
    table.isDbl.customerNameEn = false
    table.isDbl.customerNameJp = false
    table.isDbl.email = false
    table.dblKeyEstateId = null
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

onMounted(async () => {
  documentStore.fetchLocation(true)
  documentStore.fetchProjectType()
  store.setActiveMenu(store, 'document')
  if (cookies.get('documentPrev') && cookies.get('documentPrev') !== 'undefined') {
    requestSearch.projectNo = cookies.get('documentPrev').projectNo
    requestSearch.status = cookies.get('documentPrev').status
    requestSearch.name = cookies.get('documentPrev').name
    requestSearch.tel = cookies.get('documentPrev').tel
    requestSearch.location = cookies.get('documentPrev').location
    requestSearch.regDate = cookies.get('documentPrev').regDate
    requestSearch.projectType = cookies.get('documentPrev').projectType
    requestSearch.representativeName = cookies.get('documentPrev').representativeName
    requestSearch.requestDate = cookies.get('documentPrev').requestDate
    requestSearch.category = cookies.get('documentPrev').category
    requestSearch.email = cookies.get('documentPrev').email
    if (cookies.get('documentPrev').page === 1 && cookies.get('documentPrev').itemsPerPage === 20) {
      search(requestSearch)
    }
  } else {
    search(requestSearch)
  }
  cookies.remove('recordRegAppPrev')
  cookies.remove('keyPrev')
  cookies.remove('recordRegFinalPrev')
})
</script>
