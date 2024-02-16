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
          show-import
          show-search
          show-multi-update
          show-download-template
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
                    {{ $t('recordScheduleAppToHgv.projectNo') }}
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
                    {{ $t('recordScheduleAppToHgv.status') }}
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
                    {{ $t('recordScheduleAppToHgv.returnDate') }}
                  </span>
                </div>
                <VueDatePicker
                  v-model="searchRequest.returnDate"
                  text-input
                  :select-text="$t('datePicker.select')"
                  :cancel-text="$t('datePicker.cancel')"
                  locale="ja"
                  :enable-time-picker="false"
                  :format="CommonFormatDate"
                ></VueDatePicker>
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

          <!--projectNo-->
          <template #item.projectNo="{ item }">
            <div @dblclick="dblclickRow('projectNo', item.value)">
              <div
                v-if="
                  item.props.title.projectNo &&
                    table.isDbl.projectNo &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
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
          <!-- returnDate -->
          <template #item.returnDate="{ item }">
            <div class="text-right">
              {{ item.props.title.returnDate }}
            </div>
          </template>
          <!-- locationName -->
          <template #item.locationName="{ item }">
            <div @dblclick="dblclickRow('locationName', item.value)">
              <div
                v-if="
                  item.props.title.locationName &&
                    table.isDbl.locationName &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
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
          <!-- cancelRegDate -->
          <template #item.cancelRegDate="{ item }">
            <div @dblclick="dblclickRow('cancelRegDate', item.value)">
              <div
                v-if="
                  item.props.title.cancelRegDate &&
                    table.isDbl.cancelRegDate &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.cancelRegDate"
                ></v-textarea>
              </div>
              <div v-else class="text-right"
              >
                {{ item.props.title.cancelRegDate }}
              </div>
            </div>
          </template>
          <!-- fullName -->
          <template #item.fullName="{ item }">
            <div @dblclick="dblclickRow('fullName', item.value)">
              <div
                v-if="
                  item.props.title.fullName &&
                    table.isDbl.fullName &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-52"
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
          <!-- loanAvailable -->
          <template #item.loanAvailable="{ item }">
            <div>
              {{ item.props.title.loanAvailable }}
            </div>
          </template>
          <!-- upgrade -->
          <template #item.upgrade="{ item }">
            <div class="">
              {{ item.props.title.upgrade }}
            </div>
          </template>
          <!-- upgradeFrom -->
          <template #item.upgradeFrom="{ item }">
            <div @dblclick="dblclickRow('upgradeFrom', item.value)">
              <div
                v-if="
                  item.props.title.upgradeFrom &&
                    table.isDbl.upgradeFrom &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >
                <v-text-field
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.upgradeFrom"
                ></v-text-field>
              </div>
              <div v-else
                   class="display-limit-txt-w-150"
              >
                {{ item.props.title.upgradeFrom }}
              </div>
            </div>
          </template>
          <!-- deletedDisplay -->
          <template #item.deletedDisplay="{ item }">
            <div @dblclick="dblclickRow('deletedDisplay', item.value)">
              <div
                v-if="
                  item.props.title.deletedDisplay &&
                    table.isDbl.deletedDisplay &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >

                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.deletedDisplay"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-250"
              >
                {{ item.props.title.deletedDisplay }}
              </div>
            </div>
          </template>
          <!-- groupHgv -->
          <template #item.groupHgv="{ item }">
            <div @dblclick="dblclickRow('groupHgv', item.value)">
              <div
                v-if="
                  item.props.title.groupHgv &&
                    table.isDbl.groupHgv &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.groupHgv"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-100"
              >
                {{ item.props.title.groupHgv }}
              </div>
            </div>
          </template>
          <!-- boxNumber -->
          <template #item.boxNumber="{ item }">
            <div @dblclick="dblclickRow('boxNumber', item.value)">
              <div
                v-if="
                  item.props.title.boxNumber &&
                    table.isDbl.boxNumber &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.boxNumber"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-100 text-right"
              >
                {{ item.props.title.boxNumber }}
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
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
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
          <!-- voidingFloorSpace1 -->
          <template #item.voidingFloorSpace1="{ item }">
            <div @dblclick="dblclickRow('voidingFloorSpace1', item.value)">
              <div
                v-if="
                  item.props.title.voidingFloorSpace1 &&
                    table.isDbl.voidingFloorSpace1 &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.voidingFloorSpace1"
                ></v-textarea>
              </div>
              <div v-else
                   class=""
              >
                {{ item.props.title.voidingFloorSpace1 }}
              </div>
            </div>
          </template>
          <!-- voidingFloorSpace2 -->
          <template #item.voidingFloorSpace2="{ item }">
            <div @dblclick="dblclickRow('voidingFloorSpace2', item.value)">
              <div
                v-if="
                  item.props.title.voidingFloorSpace2 &&
                    table.isDbl.voidingFloorSpace2 &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.voidingFloorSpace2"
                ></v-textarea>
              </div>
              <div v-else
                   class=""
              >
                {{ item.props.title.voidingFloorSpace2 }}
              </div>
            </div>
          </template>
          <!-- voidingFloorSpace3 -->
          <template #item.voidingFloorSpace3="{ item }">
            <div @dblclick="dblclickRow('voidingFloorSpace3', item.value)">
              <div
                v-if="
                  item.props.title.voidingFloorSpace3 &&
                    table.isDbl.voidingFloorSpace3 &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.voidingFloorSpace3"
                ></v-textarea>
              </div>
              <div v-else
                   class=""
              >
                {{ item.props.title.voidingFloorSpace3 }}
              </div>
            </div>
          </template>
          <!-- voidingFloorSpace4 -->
          <template #item.voidingFloorSpace4="{ item }">
            <div @dblclick="dblclickRow('voidingFloorSpace4', item.value)">
              <div
                v-if="
                  item.props.title.voidingFloorSpace4 &&
                    table.isDbl.voidingFloorSpace4 &&
                    item.value === table.dblProjectNo
                "
                class="mt-2 mb-2 w-full"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.voidingFloorSpace4"
                ></v-textarea>
              </div>
              <div v-else
                   class=""
              >
                {{ item.props.title.voidingFloorSpace4 }}
              </div>
            </div>
          </template>
          <!-- memorandumReceiptDate -->
          <template #item.memorandumReceiptDate="{ item }">
            <div class="text-right">
              {{ item.props.title.memorandumReceiptDate }}
            </div>
          </template>
          <!-- memorandumConfirm -->
          <template #item.memorandumConfirm="{ item }">
            <div>
              {{ item.props.title.memorandumConfirm }}
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
          <template #item.action="{ item }">
            <div class="my-1 flex flex-row">
              <v-btn
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                :disabled="(item.props.title.status === STATUS.get(8).key)"
                @click="showDialogUserUpdate(item.props.title.projectNo)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
              <v-btn   
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                :disabled="(item.props.title.status === STATUS.get(7).key) || (item.props.title.status === STATUS.get(99).key && item.props.title.oldStatus >= STATUS.get(7).key)"
                @click="
                  refDialogConfirmForward.open(
                    item.value,
                    'forward',
                    item.props.title.status
                  )
                "
              > 
                <i class="fa-solid fa-forward"></i>
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
    <dialog-record-schedule-app-to-hgv-update
      ref="refDialogRecordScheduleAppToHgvUpdate"
      :project-no="projectNo"
      @apply="search()"
    />
    <dialog-record-schedule-app-to-hgv-multi-update
      ref="refDialogRecordScheduleAppToHgvMultiUpdate"
      :project-no="table.selected"
      @apply="search()"
    />
    <dialog-record-schedule-app-to-hgv-export-excel
      ref="refDialogRecordScheduleAppToHgvExportExcel"
      :project-no="table.selected"
      @apply="search()"
    />
    <dialog-file-error ref="refDialogFileError">
    </dialog-file-error>
    <dialog-confirm ref="refDialogConfirmForward"
                    @apply="forwardStatus"
    >
      <template #body>
        <p>
          {{ $t('dialogContent.confirmForward') }}
        </p>
      </template>
    </dialog-confirm>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { CommonFormatDate, DataTableHelper } from '@/common/helper'
import { STATUS, TOOLBAR_TABLE } from '@/constants/constant'
import CardDataTable from '@/components/card/CardDataTable.vue'
import TableTitleFunction from '@/components/table/TableTitleFunction.vue'
import DialogRecordScheduleAppToHgvUpdate from '@/components/dialog/process/recordscheduleapptohgv/DialogRecordScheduleAppToHgvUpdate.vue'
import DialogRecordScheduleAppToHgvMultiUpdate from '@/components/dialog/process/recordscheduleapptohgv/DialogRecordScheduleAppToHgvMultiUpdate.vue'
import DialogRecordScheduleAppToHgvExportExcel from '@/components/dialog/process/recordscheduleapptohgv/DialogRecordScheduleAppToHgvExportExcel.vue'
import DialogFileError from '@/components/dialog/DialogFileError.vue'
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import DialogConfirm from '@/components/dialog/DialogConfirm.vue'
import { useI18n } from 'vue-i18n'
import { DownloadTemplate } from '@/common/helper'
import Toast from '@/common/toast'
import ScannerDetector from 'js-scanner-detection'
import VueDatePicker from '@vuepic/vue-datepicker';
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const store = useCommonStore()
const RecordScheduleAppToHgvRepository = RepositoryFactory.get('recordScheduleAppToHgv')
const refDialogRecordScheduleAppToHgvUpdate = ref(null)
const refDialogRecordScheduleAppToHgvMultiUpdate = ref(null)
const refDialogRecordScheduleAppToHgvExportExcel = ref(null)
const uploadFileRef = ref(null)
const refDialogFileError = ref(null)
const refDialogConfirmForward = ref(null)
const DocumentRepository = RepositoryFactory.get('document')
const { t } = useI18n()
store.setBreadcrumb(store, {"name": t('nav.screen.recordScheduleAppToHgv'),
  path: 'record-schedule-app-to-hgv'
})
const statusList = reactive([
  { value: 100, title: ''},
  { value: 7, title: '申請書作成済'},
  { value: 8, title: '申請書確認済'},
  { value: 99, title: 'ペンディング'},

])

let projectNo = []
const table = reactive({
  options: DataTableHelper.optionBuilder(['created_date_number'], [true]),
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
      title: t('recordScheduleAppToHgv.projectNo'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'projectNo'
    },
    {
      title: t('recordScheduleAppToHgv.returnDate'),
      align: 'center',
      width: 130,
      sortable: false,
      key: 'returnDate'
    },
    {
      title: t('recordScheduleAppToHgv.locationName'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'locationName'
    },
    {
      title: t('recordScheduleAppToHgv.cancelRegDate'),
      align: 'center',
      width: 130,
      sortable: false,
      key: 'cancelRegDate'
    },
    {
      title: t('recordScheduleAppToHgv.fullName'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'fullName'
    },
    {
      title: t('recordScheduleAppToHgv.loanAvailable'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'loanAvailable'
    },
    {
      title: t('recordScheduleAppToHgv.upgrade'),
      align: 'center',
      width: 140,
      sortable: false,
      key: 'upgrade'
    },
    {
      title: t('recordScheduleAppToHgv.upgradeFrom'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'upgradeFrom'
    },
    {
      title: t('recordScheduleAppToHgv.deletedDisplay'),
      align: 'center',
      width: 250,
      sortable: false,
      key: 'deletedDisplay'
    },
    {
      title: t('recordScheduleAppToHgv.groupHgv'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'groupHgv'
    },
    {
      title: t('recordScheduleAppToHgv.boxNumber'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'boxNumber'
    },
    {
      title: t('recordScheduleAppToHgv.customerNameJp'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'customerNameJp'
    },
    {
      title: t('recordScheduleAppToHgv.voidingFloorSpace1'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'voidingFloorSpace1'
    },
    {
      title: t('recordScheduleAppToHgv.voidingFloorSpace2'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'voidingFloorSpace2'
    },
    {
      title: t('recordScheduleAppToHgv.voidingFloorSpace3'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'voidingFloorSpace3'
    },
    {
      title: t('recordScheduleAppToHgv.voidingFloorSpace4'),
      align: 'center',
      width: 100,
      sortable: false,
      key: 'voidingFloorSpace4'
    },
    {
      title: t('recordScheduleAppToHgv.memorandumReceiptDate'),
      align: 'center',
      width: 130,
      sortable: false,
      key: 'memorandumReceiptDate'
    },
    {
      title: t('recordScheduleAppToHgv.memorandumConfirm'),
      align: 'center',
      width: 90,
      sortable: false,
      key: 'memorandumConfirm'
    },
    {
      title: t('recordScheduleAppToHgv.status'),
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
    locationName: false,
    cancelRegDate: false,
    fullName: false,
    deletedDisplay: false,
    groupHgv: false,
    boxNumber: false,
    customerNameJp: false,
    voidingFloorSpace1: false,
    voidingFloorSpace2: false,
    voidingFloorSpace3: false,
    voidingFloorSpace4: false,
    upgradeFrom: false
  },
  dblProjectNo: null
})

const searchRequest = reactive({
  projectNo: null,
  status: null,
  returnDate: null
})

// Function
const showDialogUserUpdate = (projectNo) => {
  refDialogRecordScheduleAppToHgvUpdate.value.open(projectNo)
}

const dblclickRow = (fieldName, projectNo) => {
  switch (fieldName) {
    case 'projectNo':
      table.isDbl.projectNo = true
      break
    case 'locationName':
      table.isDbl.locationName = true
      break
    case 'cancelRegDate':
      table.isDbl.cancelRegDate = true
      break
    case 'fullName':
      table.isDbl.fullName = true
      break
    case 'deletedDisplay':
      table.isDbl.deletedDisplay = true
      break
    case 'groupHgv':
      table.isDbl.groupHgv = true
      break
    case 'boxNumber':
      table.isDbl.boxNumber = true
      break
    case 'customerNameJp':
      table.isDbl.customerNameJp = true
      break
    case 'voidingFloorSpace1':
      table.isDbl.voidingFloorSpace1 = true
      break
    case 'voidingFloorSpace2':
      table.isDbl.voidingFloorSpace2 = true
      break
    case 'voidingFloorSpace3':
      table.isDbl.voidingFloorSpace3 = true
      break
    case 'voidingFloorSpace4':
      table.isDbl.voidingFloorSpace4 = true
      break
    case 'upgradeFrom':
      table.isDbl.upgradeFrom = true
      break
  }
  table.dblProjectNo = projectNo
}

const clickOutside = () => {
  table.isDbl.projectNo = false
  table.isDbl.locationName = false
  table.isDbl.cancelRegDate = false
  table.isDbl.fullName = false
  table.isDbl.deletedDisplay = false
  table.isDbl.groupHgv = false
  table.isDbl.boxNumber = false
  table.isDbl.customerNameJp = false
  table.isDbl.voidingFloorSpace1 = false
  table.isDbl.voidingFloorSpace2 = false
  table.isDbl.voidingFloorSpace3 = false
  table.isDbl.voidingFloorSpace4 = false
  table.isDbl.upgradeFrom = false
  table.dblProjectNo = null
}

const clickRow = (item, row) => {
  if (
    table.dblProjectNo !== row.item.value &&
    (table.isDbl.projectNo === true ||
      table.isDbl.locationName === true ||
      table.isDbl.cancelRegDate === true ||
      table.isDbl.fullName === true ||
      table.isDbl.deletedDisplay === true ||
      table.isDbl.groupHgv === true ||
      table.isDbl.boxNumber === true ||
      table.isDbl.customerNameJp === true ||
      table.isDbl.voidingFloorSpace1 === true ||
      table.isDbl.voidingFloorSpace2 === true ||
      table.isDbl.voidingFloorSpace3 === true ||
      table.isDbl.upgradeFrom === true ||
      table.isDbl.voidingFloorSpace4 === true)
  ) {
    table.isDbl.projectNo = false
    table.isDbl.locationName = false
    table.isDbl.cancelRegDate = false
    table.isDbl.fullName = false
    table.isDbl.deletedDisplay = false
    table.isDbl.groupHgv = false
    table.isDbl.boxNumber = false
    table.isDbl.customerNameJp = false
    table.isDbl.voidingFloorSpace1 = false
    table.isDbl.voidingFloorSpace2 = false
    table.isDbl.voidingFloorSpace3 = false
    table.isDbl.voidingFloorSpace4 = false
    table.isDbl.upgradeFrom = false
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

  RecordScheduleAppToHgvRepository.searchAll(request).then(function (response) {
    table.items = response.data.recordScheduleAppToHgvList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.recordScheduleAppToHgvList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.recordScheduleAppToHgvList.length,
    }
    store.setPagination(store, pagination)
  })
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.MULTI_UPDATE) {
    if (!table.selected.length) {
      Toast.showError('案件を選択してください。')
    } else {
      refDialogRecordScheduleAppToHgvMultiUpdate.value.open(table.selected)
    }
  }
  if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(true)
  }
  if (actionId === TOOLBAR_TABLE.DOWNLOAD_TEMPLATE) {
    let path = '/cg/api/File/template/record-schedule-app-to-hgv/'
    let fileName = 'Template_07_Import.xlsx'
    let fileNameDownload = 'HGV宛申請予定報告_Import.xlsx'
    DownloadTemplate(path, fileName, fileNameDownload)
  }
  if (actionId === TOOLBAR_TABLE.IMPORT) {
    uploadFileRef.value.click()
  }
  if (actionId === TOOLBAR_TABLE.CLEAR_SEARCH) {
    searchRequest.projectNo = null
    searchRequest.status = null
    searchRequest.returnDate = null
    table.selected = []
  }
  if (actionId === TOOLBAR_TABLE.EXPORT) {
    if (!table.selected.length) {
      Toast.showError(t('errorMessage.pleaseSelectProject'))
    } else {
      refDialogRecordScheduleAppToHgvExportExcel.value.open(table.selected)
    }
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
  RecordScheduleAppToHgvRepository.upload(formData)
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
    let projectNoSearchOld = searchRequest.projectNo.slice(0, lengthOld)
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

const forwardStatus = (value) => {
  let request = {}
  if (value.action === 'forward') {
    request = { projectNos: [value.item], oldStatus: value.oldStatus }
    DocumentRepository.forwardStatus(request).then(() => {
      search(searchRequest)
    })
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
