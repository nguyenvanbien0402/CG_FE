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
        <table-title-function show-clear-search
                              show-search
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
          <!-- projectNo -->
          <template #item.projectNo="{ item }">
            <a :href="'record-reg-final/' + `${item.value}`"
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
            <div @dblclick="dblclickRow('customerNameEn', item.value)">
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
            <div class="display-limit-txt-phone">
              {{ item.props.title.firstTel }}
            </div>
          </template>
          <!-- secondTel -->
          <template #item.secondTel="{ item }">
            <div class="display-limit-txt-phone">
              {{ item.props.title.secondTel }}
            </div>
          </template>
          <!-- thirdTel -->
          <template #item.thirdTel="{ item }">
            <div class="display-limit-txt-phone">
              {{ item.props.title.thirdTel }}
            </div>
          </template>
          <!-- email -->
          <template #item.email="{ item }">
            <div @dblclick="dblclickRow('email', item.value)">
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
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import { DataTableHelper } from '@/common/helper'
import { STATUS, TOOLBAR_TABLE } from '@/constants/constant'
import CardDataTable from '@/components/card/CardDataTable.vue'
import TableTitleFunction from '@/components/table/TableTitleFunction.vue'
import PaginationCommon from '@/components/table/PaginationCommon.vue'
import { useI18n } from 'vue-i18n'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { useDocumentStore } from '@/store/process/documentStore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ScannerDetector from 'js-scanner-detection'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()
const arrayStatusShow = ref([0, 1, 5, 6, 8, 10])
const arrayStatusShowEdit = ref([0, 1, 6, 99])
const store = useCommonStore()
const { t } = useI18n()
store.setBreadcrumb(store, { name: t('nav.screen.recordRegFinal'), path: 'recordRegFinal' })
const DocumentRepository = RepositoryFactory.get('document')
const documentStore = useDocumentStore()

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
    email: false
  },
  dblKeyEstateId: null
})

const requestSearch = reactive({
  projectNo: null,
  status: 14,
  name: null,
  tel: null,
  location: null,
  regDate: null,
  projectType: null,
  representativeName: null,
  requestDate: null,
  category: null,
  email: null
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
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.documentResponseList.length
    }
    store.setPagination(store, pagination)
  })
  cookies.set('recordRegFinalPrev', {
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
    email: requestSearch.email,
    page: table.options.page,
    itemsPerPage: table.options.itemsPerPage,
    sortBy: table.options.sortBy,
    sortDesc: table.options.sortDesc
  })
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(requestSearch)
  } else if (actionId === TOOLBAR_TABLE.CLEAR_SEARCH) {
    clearSearch()
    cookies.remove('recordRegFinalPrev')
  }
}

const clearSearch = () => {
  requestSearch.projectNo = null
  requestSearch.status = 14
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
      table.isDbl.email === true)
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
  store.setActiveMenu(store, 'recordRegFinal')

  if (cookies.get('recordRegFinalPrev') && cookies.get('recordRegFinalPrev') !== 'undefined') {
    requestSearch.projectNo = cookies.get('recordRegFinalPrev').projectNo
    requestSearch.status = cookies.get('recordRegFinalPrev').status
    requestSearch.name = cookies.get('recordRegFinalPrev').name
    requestSearch.tel = cookies.get('recordRegFinalPrev').tel
    requestSearch.location = cookies.get('recordRegFinalPrev').location
    requestSearch.regDate = cookies.get('recordRegFinalPrev').regDate
    requestSearch.projectType = cookies.get('recordRegFinalPrev').projectType
    requestSearch.representativeName = cookies.get('recordRegFinalPrev').representativeName
    requestSearch.requestDate = cookies.get('recordRegFinalPrev').requestDate
    requestSearch.category = cookies.get('recordRegFinalPrev').category
    requestSearch.email = cookies.get('recordRegFinalPrev').email
    if (
      cookies.get('recordRegFinalPrev').page === 1 &&
      cookies.get('recordRegFinalPrev').itemsPerPage === 20
    ) {
      search(requestSearch)
    }
  } else {
    search(requestSearch)
  }
  cookies.remove('documentPrev')
  cookies.remove('recordRegAppPrev')
  cookies.remove('keyPrev')
})
</script>
