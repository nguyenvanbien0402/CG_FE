<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          title="user-list"
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
          class="relative elevation-1 h-master h-full py-5 row-height-50 table-border"
          @update:options="table.options"
        >
          <template #item.index="{ index }">
            <div class="text-center">
              {{ table.options.itemsPerPage * (table.options.page - 1) + index + 1 }}
            </div>
          </template>

          <!--index-->
          <template #no-data>
            <tr>
              <td :colspan="table.headers.length"
                  class="text-center opacity-70 italic py-2"
              >
                {{ $t('table.noDataText') }}
              </td>
            </tr>
          </template>
  
          <!-- userName -->
          <template #item.userName="{ item }">
            <div class="mt-2 mb-2 text-left">
              {{ item.props.title.userName }}     
              {{ item }}
            </div>
          </template>
 
          <!-- fullName -->
          <template #item.fullName="{ item }">
            <div class="mt-2 mb-2 text-left">
              {{ item.props.title.fullName }}
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
            <div class="my-1 text-center">
              <v-btn
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogUserUpdate(item.value.userId)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive === 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.userId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-lock"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive !== 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.userId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-unlock"></i>
              </v-btn>
              <v-btn
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmResetPassword(item.value.userId)"
              >
                <i class="fa-sharp fa-solid fa-arrows-rotate fa-lg"></i>
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
    <dialog-confirm-delete ref="refDialogConfirmDelete"
                           @apply="executeDelete(table.idDelete, table.isActive)"
    >
      <template #body>
        <p class="mt-1 mx-1">
          {{ $t('dialogContent.delete') }}
        </p>
      </template>
    </dialog-confirm-delete>
    <dialog-user-create ref="refDialogUserCreate"
                        :id-update="idUpdate"
                        @apply="search()"
    />
    <dialog-confirm ref="refDialogResetPassword"
                    @apply="resetPassword">
      <template #body>
        <p>
          {{ $t('dialogContent.resetPassword') }}
        </p>
      </template>
    </dialog-confirm>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {useCommonStore} from '@/store/commonStore'
import {RepositoryFactory} from '@/repositories/repositoryFactory'
import {DataTableHelper} from '@/common/helper'
import {TOOLBAR_TABLE, ACTIVE_INACTIVE, STATUS} from '@/constants/constant'
import CardDataTable from '@/components/card/CardDataTable.vue'
import TableTitleFunction from '@/components/table/TableTitleFunction.vue'
import DialogConfirmDelete from '@/components/dialog/DialogConfirmDelete.vue'
import DialogConfirm from '@/components/dialog/DialogConfirm.vue'
import DialogUserCreate from '@/components/dialog/master/DialogUserCreate.vue'
import {useI18n} from 'vue-i18n'
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, { name: t('nav.screen.master.user'), path: 'user-list' })
const UserRepository = RepositoryFactory.get('user')
const refDialogConfirmDelete = ref(null)
const refDialogUserCreate = ref(null)
const refDialogResetPassword = ref(null)

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))

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
      disable: true
    },
    {
      title: t('table.option'),
      align: 'center',
      sortable: false,
      width: 125,
      key: 'action'
    },
    {
      title: t('user.userName'),
      align: 'center',
      sortable: false,
      width: 400,
      key: 'userName'
    },
    {
      title: t('user.fullName'),
      align: 'center',
      sortable: false,
      width: 400,
      key: 'fullName'
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
  userName: null,
  fullName: null
})

// Function
const showDialogConfirmDelete = (id, isActive) => {
  table.idDelete = id
  table.isActive = isActive
  executeDelete(table.idDelete, table.isActive)
  // refDialogConfirmDelete.value.open("user")
}
const showDialogConfirmResetPassword = (id) => {
  refDialogResetPassword.value.open(id)
}

const resetPassword = (id) => {
  let request = [id.item]
  UserRepository.resetPassword(request).then(function (response) {
    if (response.code === 'ES200') {
      search()
    }
  })
}

const showDialogUserUpdate = (id) => {
  idUpdate = id
  refDialogUserCreate.value.open(id)
}

const executeDelete = (item, isActive) => {
  let request = {
    ids: [item],
    isActive: isActive
  }
  UserRepository.delete(request).then(function (response) {
    if (response.code === 'ES200') {
      search()
    }
  })
}

const search = () => {
  let request = {}
  request = DataTableHelper.buildRequest(table.options, searchRequest)

  UserRepository.searchAll(request).then(function (response) {
    table.items = response.data.userResponseList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.userResponseList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.userResponseList.length,
    }
    store.setPagination(store, pagination)
  })
}

const changeData = (e) => {
  table.options.page = e.page
  table.options.itemsPerPage = e.perPage
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.CREATE) {
    console.log(' open create ')
    refDialogUserCreate.value.open()
  }
}

watch(table.options, () => search())

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
