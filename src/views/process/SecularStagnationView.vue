<template>
  <div class="pa-5">
    <card-data-table>
      <template #table>
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
          height="750px"
          hide-actions
          class="relative h-process-no-search elevation-1 h-full py-5 row-height-50 table-border"
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
            <div class="mt-2 mb-2"
                 @dblclick="dblclickRow('projectNo', item.value)"
            >
              <div v-if="item.props.title.projectNo && table.isDbl.projectNo && item.value === table.dblProjectNo">
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
                   class="display-limit-txt-w-150"
              >
                {{ item.props.title.fullName }}
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

          <template #item.returnLp="{ item }">
              <div class="display-limit-txt-w-150 text-right">
                {{ item.props.title.returnLp }}
              </div>
          </template>

          <template #item.requestDate="{ item }">
            <div class="text-right">
              {{ item.props.title.requestDate }}
            </div>
          </template>

          <template #item.contactDate="{ item }">
            <div class="text-right">
              {{ item.props.title.contactDate }}
            </div>
          </template>

          <template #item.deliveryDate="{ item }">
            <div class="text-right">
              {{ item.props.title.deliveryDate }}
            </div>
          </template>

          <template #item.receiptDate="{ item }">
            <div class="text-right">
              {{ item.props.title.receiptDate }}
            </div>
          </template>

          <template #item.regDate="{ item }">
            <div class="text-right">
              {{ item.props.title.regDate }}
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
  </div>
</template>
<script setup>
import {onMounted, reactive, watch} from 'vue'
import {useCommonStore} from "@/store/commonStore";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {DataTableHelper} from "@/common/helper";
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import CardDataTable from '@/components/card/CardDataTable.vue';
import {useI18n} from 'vue-i18n'
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const store = useCommonStore()
const SecularStagnationRepository = RepositoryFactory.get('secularStagnation')
const {t} = useI18n()
store.setBreadcrumb(store, {"name": t('nav.screen.secularStagnation'), "path": "secular-stagnation"})

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
      title: t('secularStagnation.projectNo'),
      align: 'center',
      width: 150,
      sortable: false,
      key: 'projectNo'
    },
    {
      title: t('secularStagnation.fullName'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'fullName'
    },
    {
      title: t('secularStagnation.customerNameJp'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'customerNameJp'
    },
    {
      title: t('secularStagnation.returnLp'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'returnLp'
    },
    {
      title: t('secularStagnation.requestDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'requestDate'
    },
    {
      title: t('secularStagnation.contactDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'contactDate'
    },
    {
      title: t('secularStagnation.deliveryDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'deliveryDate'
    },
    {
      title: t('secularStagnation.receiptDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'receiptDate'
    },
    {
      title: t('secularStagnation.regDate'),
      align: 'center',
      width: 120,
      sortable: false,
      key: 'regDate'
    }
  ],
  totalPages: null,
  totalElements: null,
  displayPageNums: 5,
  amountOfDataDisplay: null,
  isDbl: {
    projectNo: false,
    customerNameJp: false,
    returnLp: false,
    fullName: false
  },
  dblProjectNo: null
})

const dblclickRow = (fieldName, projectNo) => {
  switch (fieldName) {
    case 'projectNo':
      table.isDbl.projectNo = true
      break
    case 'customerNameJp':
      table.isDbl.customerNameJp = true
      break
    case 'returnLp':
      table.isDbl.returnLp = true
      break
    case 'fullName':
      table.isDbl.fullName = true
      break
  }
  table.dblProjectNo = projectNo
}

const clickOutside = () => {
  table.isDbl.projectNo = false
  table.isDbl.customerNameJp = false
  table.isDbl.returnLp = false
  table.isDbl.fullName = false
}

const clickRow = (item, row) => {
  if (table.dblProjectNo !== row.item.value &&
    (table.isDbl.returnLp === true ||
      table.isDbl.fullName === true ||
      table.isDbl.customerNameJp === true ||
      table.isDbl.projectNo === true
    )) {
    table.isDbl.projectNo = false
    table.isDbl.customerNameJp = false
    table.isDbl.returnLp = false
    table.isDbl.fullName = false
    table.dblProjectNo = null
  }
}

const search = (isClick) => {
  let request = {}

  if (isClick && table.options.page !== 1) {
    table.options.page = 1
    return
  }

  request = DataTableHelper.buildRequest(table.options);

  SecularStagnationRepository.searchAll(request).then((function (response) {
    table.items = response.data.secularStagnationList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.secularStagnationList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.secularStagnationList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const changeData = (e) => {
  table.options.page = e.page
  table.options.itemsPerPage = e.perPage
}

watch(table.options, () => (
  search(false)
))

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

