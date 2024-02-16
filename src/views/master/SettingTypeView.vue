<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          title="setting-type"
          show-add-new
          @action="handleAction($event)"
        >
        </table-title-function>
      </template>

      <template #table>
        <v-data-table
          v-click-outside="clickOutside"
          :headers="table.headers"
          :items="table.items"
          :items-length="table.totalRecords"
          :items-per-page="table.options.itemsPerPage"
          item-value="key"
          :fixed-footer="true"
          :fixed-header="true"
          disable-initial-sort
          height="700px"
          hide-actions
          class="relative h-master elevation-1 h-full py-5 row-height-50 table-border"
          @click:row="clickRow"
          @update:options="table.options"
        >
          <template #no-data>
            <tr>
              <td :colspan="table.headers.length"
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
          <!-- settingType -->
          <template #item.settingType="{ item }">
            <div
              @dblclick="dblclickRow('settingType', item.value)"
            >
              <div v-if="item.props.title.settingType && table.isDbl.settingType && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2 "
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.settingType"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.settingType }}
              </div>
            </div>
          </template>
          <!-- delegatedDuty -->
          <template #item.delegatedDuty="{ item }">
            <div
              @dblclick="dblclickRow('delegatedDuty', item.value)"
            >
              <div v-if="item.props.title.delegatedDuty && table.isDbl.delegatedDuty && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.delegatedDuty"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.delegatedDuty }}
              </div>
            </div>
          </template>
          <!-- delegatedDutyExample -->
          <template #item.delegatedDutyExample="{ item }">
            <div
              @dblclick="dblclickRow('delegatedDutyExample', item.value)"
            >
              <div v-if="item.props.title.delegatedDutyExample && table.isDbl.delegatedDutyExample && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.delegatedDutyExample"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.delegatedDutyExample }}
              </div>
            </div>
          </template>
          <!-- purposeOfRegistration -->
          <template #item.purposeOfRegistration="{ item }">
            <div
              @dblclick="dblclickRow('purposeOfRegistration', item.value)"
            >
              <div v-if="item.props.title.purposeOfRegistration && table.isDbl.purposeOfRegistration && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.purposeOfRegistration"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.purposeOfRegistration }}
              </div>
            </div>
          </template>
          <!-- reasonOfRegistration -->
          <template #item.reasonOfRegistration="{ item }">
            <div
              @dblclick="dblclickRow('reasonOfRegistration', item.value)"
            >
              <div v-if="item.props.title.reasonOfRegistration && table.isDbl.reasonOfRegistration && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.reasonOfRegistration"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.reasonOfRegistration }}
              </div>
            </div>
          </template>
          <!-- stakeholderStatement -->
          <template #item.stakeholderStatement="{ item }">
            <div
              @dblclick="dblclickRow('stakeholderStatement', item.value)"
            >
              <div v-if="item.props.title.stakeholderStatement && table.isDbl.stakeholderStatement && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.stakeholderStatement"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.stakeholderStatement }}
              </div>
            </div>
          </template>
          <!-- causeContract1 -->
          <template #item.causeContract1="{ item }">
            <div
              @dblclick="dblclickRow('causeContract1', item.value)"
            >
              <div v-if="item.props.title.causeContract1 && table.isDbl.causeContract1 && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.causeContract1"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-300 text-left"
              >
                {{ item.props.title.causeContract1 }}
              </div>
            </div>
          </template>
          <!-- receivableAmount -->
          <template #item.receivableAmount="{ item }">
            <div
              @dblclick="dblclickRow('receivableAmount', item.value)"
            >
              <div v-if="item.props.title.receivableAmount && table.isDbl.receivableAmount && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.receivableAmount"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.receivableAmount }}
              </div>
            </div>
          </template>
          <!-- causeContract2 -->
          <template #item.causeContract2="{ item }">
            <div
              @dblclick="dblclickRow('causeContract2', item.value)"
            >
              <div v-if="item.props.title.causeContract2 && table.isDbl.causeContract2 && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.causeContract2"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-300 text-left"
              >
                {{ item.props.title.causeContract2 }}
              </div>
            </div>
          </template>
          <!-- causeContract3 -->
          <template #item.causeContract3="{ item }">
            <div
              @dblclick="dblclickRow('causeContract3', item.value)"
            >
              <div v-if="item.props.title.causeContract3 && table.isDbl.causeContract3 && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.causeContract3"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.causeContract3 }}
              </div>
            </div>
          </template>
          <!-- causeContract4 -->
          <template #item.causeContract4="{ item }">
            <div
              @dblclick="dblclickRow('causeContract4', item.value)"
            >
              <div v-if="item.props.title.causeContract4 && table.isDbl.causeContract4 && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.causeContract4"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.causeContract4 }}
              </div>
            </div>
          </template>
          <!-- secondLoanForSpeculative -->
          <template #item.secondLoanForSpeculative="{ item }">
            <div
              @dblclick="dblclickRow('secondLoanForSpeculative', item.value)"
            >
              <div v-if="item.props.title.secondLoanForSpeculative && table.isDbl.secondLoanForSpeculative && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.secondLoanForSpeculative"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.secondLoanForSpeculative }}
              </div>
            </div>
          </template>
          <!-- securityInterest -->
          <template #item.securityInterest="{ item }">
            <div
              @dblclick="dblclickRow('securityInterest', item.value)"
            >
              <div v-if="item.props.title.securityInterest && table.isDbl.securityInterest && item.value === table.dblSettingTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.securityInterest"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.securityInterest }}
              </div>
            </div>
          </template>
          <!-- isActive -->
          <template #item.isActive="{ item }">
            <div class="text-center">
              <v-chip
                :style="'background-color:' + ACTIVE_INACTIVE.get(item.props.title.isActive).color + ';'"
                :color="ACTIVE_INACTIVE.get(item.props.title.isActive).color"
              >
                <div class="text-center w-28" style="color: #ffffff!important;">
                  {{ ACTIVE_INACTIVE.get(item.props.title.isActive).text }}
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
                @click="showDialogUserUpdate(item.value.settingTypeId)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive === 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.settingTypeId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-lock"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive !== 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.settingTypeId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-unlock"></i>
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
    <dialog-confirm-delete
      ref="refDialogConfirmDelete"
      @apply="executeDelete(table.idDelete, table.isActive)"
    >
      <template #body>
        <p class="mt-1 mx-1">
          {{ $t('dialogContent.delete') }}
        </p>
      </template>
    </dialog-confirm-delete>
    <dialog-setting-type-create
      ref="refDialogSettingTypeCreate"
      :id-update="idUpdate"
      @apply="search()"
    />
  </div>
</template>
<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {useCommonStore} from "@/store/commonStore";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {DataTableHelper} from "@/common/helper";
import {ACTIVE_INACTIVE, TOOLBAR_TABLE} from "@/constants/constant";
import CardDataTable from '@/components/card/CardDataTable.vue';
import TableTitleFunction from '@/components/table/TableTitleFunction.vue';
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import DialogConfirmDelete from '@/components/dialog/DialogConfirmDelete.vue'
import DialogSettingTypeCreate from '@/components/dialog/master/DialogSettingTypeCreate.vue'
import { useI18n } from 'vue-i18n'
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, {"name": t('nav.screen.master.settingType'), "path": "setting-type-list"})
const SettingTypeRepository = RepositoryFactory.get('settingType')
const refDialogConfirmDelete = ref(null)
const refDialogSettingTypeCreate = ref(null)
const user = JSON.parse(localStorage.getItem('user'))
const router = useRouter()

let idUpdate = null
const table = reactive({
  options: DataTableHelper.optionBuilder(),
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
      width: 150,
      key: 'action'
    },
    {
      title: t('settingType.settingType'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'settingType'
    },
    {
      title: t('settingType.delegatedDuty'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'delegatedDuty'
    },
    {
      title: t('settingType.delegatedDutyExample'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'delegatedDutyExample'
    },
    {
      title: t('settingType.purposeOfRegistration'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'purposeOfRegistration'
    },
    {
      title: t('settingType.reasonOfRegistration'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'reasonOfRegistration'
    },
    {
      title: t('settingType.stakeholderStatement'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'stakeholderStatement'
    },
    {
      title: t('settingType.causeContract1'),
      align: 'center',
      sortable: false,
      width: 300,
      key: 'causeContract1'
    },
    {
      title: t('settingType.receivableAmount'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'receivableAmount'
    },
    {
      title: t('settingType.causeContract2'),
      align: 'center',
      sortable: false,
      width: 300,
      key: 'causeContract2'
    },
    {
      title: t('settingType.causeContract3'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'causeContract3'
    },
    {
      title: t('settingType.causeContract4'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'causeContract4'
    },
    {
      title: t('settingType.secondLoanForSpeculative'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'secondLoanForSpeculative'
    },
    {
      title: t('settingType.securityInterest'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'securityInterest'
    },
    {
      title: t('table.active'),
      align: 'center',
      sortable: false,
      width: 100,
      key: 'isActive'
    }
  ],
  totalPages: null,
  totalElements: null,
  displayPageNums: 5,
  amountOfDataDisplay: null,
  idDelete: null,
  isActive: null,
  isDbl: {
    settingType: false,
    delegatedDuty: false,
    delegatedDutyExample: false,
    purposeOfRegistration: false,
    reasonOfRegistration: false,
    stakeholderStatement: false,
    causeContract1: false,
    receivableAmount: false,
    causeContract2: false,
    causeContract3: false,
    causeContract4: false,
    securityInterest: false,
    secondLoanForSpeculative: false
  },
  dblSettingTypeId: null
})

const searchRequest = reactive({
  "name": null
})

// Function
const dblclickRow = (fieldName, settingTypeId) => {
  switch (fieldName) {
    case 'settingType':
      table.isDbl.settingType = true
      break
    case 'delegatedDuty':
      table.isDbl.delegatedDuty = true
      break
    case 'delegatedDutyExample':
      table.isDbl.delegatedDutyExample = true
      break
    case 'purposeOfRegistration':
      table.isDbl.purposeOfRegistration = true
      break
    case 'reasonOfRegistration':
      table.isDbl.reasonOfRegistration = true
      break
    case 'stakeholderStatement':
      table.isDbl.stakeholderStatement = true
      break
    case 'causeContract1':
      table.isDbl.causeContract1 = true
      break
    case 'receivableAmount':
      table.isDbl.receivableAmount = true
      break
    case 'causeContract2':
      table.isDbl.causeContract2 = true
      break
    case 'causeContract3':
      table.isDbl.causeContract3 = true
      break
    case 'causeContract4':
      table.isDbl.causeContract4 = true
      break
    case 'secondLoanForSpeculative':
      table.isDbl.secondLoanForSpeculative = true
      break
  }
  table.dblSettingTypeId = settingTypeId
}

const clickOutside = () => {
  table.isDbl.settingType = false
  table.isDbl.delegatedDuty = false
  table.isDbl.delegatedDutyExample = false
  table.isDbl.purposeOfRegistration = false
  table.isDbl.reasonOfRegistration = false
  table.isDbl.stakeholderStatement = false
  table.isDbl.causeContract1 = false
  table.isDbl.receivableAmount = false
  table.isDbl.causeContract2 = false
  table.isDbl.causeContract3 = false
  table.isDbl.causeContract4 = false
  table.isDbl.secondLoanForSpeculative = false
  table.dblSettingTypeId = null
}

const clickRow = (item, row) => {
  if (table.dblSettingTypeId !== row.item.value &&
    (table.isDbl.settingType === true
      || table.isDbl.delegatedDuty === true
      || table.isDbl.delegatedDutyExample === true
      || table.isDbl.purposeOfRegistration === true
      || table.isDbl.reasonOfRegistration === true
      || table.isDbl.stakeholderStatement === true
      || table.isDbl.causeContract1 === true
      || table.isDbl.receivableAmount === true
      || table.isDbl.causeContract2 === true
      || table.isDbl.causeContract3 === true
      || table.isDbl.causeContract4 === true
      || table.isDbl.secondLoanForSpeculative === true
    )) {
    table.isDbl.settingType = false
    table.isDbl.delegatedDuty = false
    table.isDbl.delegatedDutyExample = false
    table.isDbl.purposeOfRegistration = false
    table.isDbl.reasonOfRegistration = false
    table.isDbl.stakeholderStatement = false
    table.isDbl.causeContract1 = false
    table.isDbl.receivableAmount = false
    table.isDbl.causeContract2 = false
    table.isDbl.causeContract3 = false
    table.isDbl.causeContract4 = false
    table.isDbl.secondLoanForSpeculative = false
    table.dblSettingTypeId = null
  }
}

const showDialogConfirmDelete = (id, isActive) => {
  table.idDelete = id
  table.isActive = isActive
  executeDelete(table.idDelete, table.isActive)
  // refDialogConfirmDelete.value.open("settingType")
}

const showDialogUserUpdate = (id) => {
  idUpdate = id
  refDialogSettingTypeCreate.value.open(id)
}

const executeDelete = (item, isActive) => {
  let request = {
    ids: [item],
    isActive: isActive
  }
  SettingTypeRepository.delete(request).then((function (response) {
    if (response.code === 'ES200') {
      search()
    }
  }))

}

const search = () => {
  let request = {}
  request = DataTableHelper.buildRequest(table.options, searchRequest);

  SettingTypeRepository.searchAll(request).then((function (response) {
    table.items = response.data.settingTypeList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.settingTypeList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.settingTypeList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.CREATE) {
    console.log(' open create ')
    refDialogSettingTypeCreate.value.open()
  }
}

watch(table.options, () => (
  search()
))

const changeData = (e) => {
  table.options.page = e.page
  table.options.itemsPerPage = e.perPage
}


onMounted(() => {
  cookies.remove('documentPrev')
  cookies.remove('recordRegAppPrev')
  cookies.remove('keyPrev')
  cookies.remove('recordRegFinalPrev')
  if (user.role !== 0) {
    router.replace('/document')
  }
  search()
})

</script>
<style scoped>
</style>
