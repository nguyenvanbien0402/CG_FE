<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          title="location"
          show-add-new
          @action="handleAction($event)"
        >
        </table-title-function>
      </template>

      <template #table>
        <v-data-table
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

          <!-- locationId -->
          <template #item.locationId="{ item }">
            <div class="mt-2 mb-2 text-left">
              {{ item.props.title.locationId }}
            </div>
          </template>

          <!-- name -->
          <template #item.name="{ item }">
            <div class="mt-2 mb-2 text-left">
              {{ item.props.title.name }}
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
                @click="showDialogLocationUpdate(item.value.locationId)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
              <v-btn
                icon
                v-if="item.props.title.isActive === 1"
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.locationId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-lock"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive !== 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.locationId, item.props.title.isActive)"
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
    <dialog-location-create
      ref="refDialogLocationCreate"
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
import DialogLocationCreate from '@/components/dialog/master/DialogLocationCreate.vue'
import { useI18n } from 'vue-i18n'
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, {"name": t('nav.screen.master.location'), "path": "location-list"})
const LocationRepository = RepositoryFactory.get('location')
const refDialogConfirmDelete = ref(null)
const refDialogLocationCreate = ref(null)
const user = JSON.parse(localStorage.getItem('user'))
const router = useRouter()

let idUpdate = null
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
      width: 150,
      key: 'action'
    },
    {
      title: t('locationType.locationId'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'locationId'
    },
    {
      title: t('locationType.name'),
      align: 'center',
      sortable: false,
      key: 'name'
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
  isActive: null
})

const searchRequest = reactive({
  "name": null
})

// Function
const showDialogConfirmDelete = (id, isActive) => {
  table.idDelete = id
  table.isActive = isActive
  executeDelete(table.idDelete, table.isActive)
  // refDialogConfirmDelete.value.open("location")
}

const showDialogLocationUpdate = (id) => {
  idUpdate = id
  refDialogLocationCreate.value.open(id)
}

const executeDelete = (item, isActive) => {
  let request = {
    ids: [item],
    isActive: isActive
  }
  LocationRepository.delete(request).then((function (response) {
    if (response.code === 'ES200') {
      search()
    }
  }))

}

const search = () => {
  let request = {}
  request = DataTableHelper.buildRequest(table.options, searchRequest);

  LocationRepository.searchAll(request).then((function (response) {
    table.items = response.data.locationList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.locationList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.locationList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.CREATE) {
    console.log(' open create ')
    refDialogLocationCreate.value.open()
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
