<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          title="equity"
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

          <!-- equityCode -->
          <template #item.equityCode="{ item }">
            <div>
              {{ item.props.title.equityCode }}
            </div>
          </template>

          <!-- locationId -->
          <template #item.locationId="{ item }">
            <div>
              {{ item.props.title.locationId }}
            </div>
          </template>
          <!-- equity -->
          <template #item.equity="{ item }">
            <div class="text-right">
              {{ item.props.title.equity }}
            </div>
          </template>
          <!-- managementFee -->
          <template #item.managementFee="{ item }">
            <div class="text-right">
              {{ item.props.title.managementFee }}
            </div>
          </template>
          <!-- partialTransferTax -->
          <template #item.partialTransferTax="{ item }">
            <div class="text-right">
              {{ item.props.title.partialTransferTax }}
            </div>
          </template>
          <!-- managementFeeTax -->
          <template #item.managementFeeTax="{ item }">
            <div class="text-right">
              {{ item.props.title.managementFeeTax }}
            </div>
          </template>
          <!-- adminFeeKanjiDisplay -->
          <template #item.adminFeeKanjiDisplay="{ item }">
            <div>
              {{ item.props.title.adminFeeKanjiDisplay }}
            </div>
          </template>
          <!-- managementFeeTaxKanji -->
          <template #item.managementFeeTaxKanji="{ item }">
            <div>
              {{ item.props.title.managementFeeTaxKanji }}
            </div>
          </template>

          <!-- delegatedDuty -->
          <template #item.delegatedDuty="{ item }">
            <div
              @dblclick="dblclickRow('delegatedDuty', item.value)"
            >
              <div v-if="item.props.title.delegatedDuty && table.isDbl.delegatedDuty && item.value === table.dblEquityId"
                   class="mt-2 mb-2"
              >
                <v-text-field
                  hide-details
                  variant="outlined"
                  density="compact"
                  readonly
                  :model-value="item.props.title.delegatedDuty"
                ></v-text-field>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.delegatedDuty }}
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
                @click="showDialogUserUpdate(item.value.equityId)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive === 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.equityId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-lock"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive !== 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.equityId, item.props.title.isActive)"
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
    <dialog-equity-create
      ref="refDialogEquityCreate"
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
import DialogEquityCreate from '@/components/dialog/master/DialogEquityCreate.vue'
import { useI18n } from 'vue-i18n'
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";
const user = JSON.parse(localStorage.getItem('user'))
const router = useRouter()

// Initial
const {cookies} = useCookies();
const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, {"name": t('nav.screen.master.equity'), "path": "equity-list"})
const EquityRepository = RepositoryFactory.get('equity')
const refDialogConfirmDelete = ref(null)
const refDialogEquityCreate = ref(null)

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
      title: t('equity.equityCode'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'equityCode'
    },
    {
      title: t('equity.locationName'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'locationName'
    },
    {
      title: t('equity.equity'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'equity'
    },
    {
      title: t('equity.managementFee'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'managementFee'
    },
    {
      title: t('equity.partialTransferTax'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'partialTransferTax'
    },
    {
      title: t('equity.managementFeeTax'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'managementFeeTax'
    },
    {
      title: t('equity.adminFeeKanjiDisplay'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'adminFeeKanjiDisplay'
    },
    {
      title: t('equity.managementFeeTaxKanji'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'managementFeeTaxKanji'
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
    equity: false,
  },
  dblEquityId: null
})

const searchRequest = reactive({
  "name": null
})

// Function
const dblclickRow = (fieldName, equityId) => {
  switch (fieldName) {
    case 'equity':
      table.isDbl.equity = true
      break
  }
  table.dblEquityId = equityId
}

const clickOutside = () => {
  table.isDbl.equity = false
  table.dblEquityId = null
}

const clickRow = (item, row) => {
  if (table.dblEquityId !== row.item.value &&
    (table.isDbl.equity === true)) {
    table.isDbl.equity = false
    table.dblEquityId = null
  }
}

const showDialogConfirmDelete = (id, isActive) => {
  table.idDelete = id
  table.isActive = isActive
  executeDelete(table.idDelete, table.isActive)
  // refDialogConfirmDelete.value.open("equity")
}

const showDialogUserUpdate = (id) => {
  idUpdate = id
  refDialogEquityCreate.value.open(id)
}

const executeDelete = (item, isActive) => {
  let request = {
    ids: [item],
    isActive: isActive
  }
  EquityRepository.delete(request).then((function (response) {
    if (response.code === 'ES200') {
      search()
    }
  }))

}

const search = () => {
  let request = {}
  request = DataTableHelper.buildRequest(table.options, searchRequest);

  EquityRepository.searchAll(request).then((function (response) {
    table.items = response.data.equityList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.equityList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.equityList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.CREATE) {
    console.log(' open create ')
    refDialogEquityCreate.value.open()
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
