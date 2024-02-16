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
          title="postCode"
          show-import
          show-download-template
          show-clear-search
          show-search
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
                    {{ $t('postCode.postCode') }}
                  </span>
                </div>
                <v-text-field
                  v-model="searchRequest.postCode"
                  hide-details
                  class="bg-white"
                  density="compact"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </template>
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
          height="550px"
          hide-actions
          class="relative h-master elevation-1 h-full py-5 row-height-50 table-border"
          @update:options="table.options"
          @click:row="clickRow"
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

          <template #item.postCode="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('postCode', item.value)"
            >
              <div v-if="item.props.title.postCode && table.isDbl.postCode && item.value === table.dblPostCode"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.postCode"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.postCode }}
              </div>
            </div>
          </template>

          <template #item.city="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('city', item.value)"
            >
              <div v-if="item.props.title.city && table.isDbl.city && item.value === table.dblPostCode"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.city"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.city }}
              </div>
            </div>
          </template>

          <template #item.district="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('district', item.value)"
            >
              <div v-if="item.props.title.district && table.isDbl.district && item.value === table.dblPostCode"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.district"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-left"
              >
                {{ item.props.title.district }}
              </div>
            </div>
          </template>

          <template #item.street="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('street', item.value)"
            >
              <div v-if="item.props.title.street && table.isDbl.street && item.value === table.dblPostCode"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.street"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.street }}
              </div>
            </div>
          </template>

<!--          &lt;!&ndash; isActive &ndash;&gt;-->
<!--          <template #item.isActive="{ item }">-->
<!--            <div class="text-center">-->
<!--              <v-chip-->
<!--                :style="'background-color:' + ACTIVE_INACTIVE.get(item.props.title.isActive).color + ';'"-->
<!--                :color="ACTIVE_INACTIVE.get(item.props.title.isActive).color"-->
<!--              >-->
<!--                <div class="text-center w-28" style="color: #ffffff!important;">-->
<!--                  {{ ACTIVE_INACTIVE.get(item.props.title.isActive).text }}-->
<!--                </div>-->
<!--              </v-chip>-->
<!--            </div>-->
<!--          </template>-->

          <template #item.action="{ item }">
            <div
              class="my-1 text-center"
            >
              <v-btn
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogPostCodeUpdate(item.value.postCode)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
<!--              <v-btn-->
<!--                v-if="item.props.title.isActive === 1"-->
<!--                icon-->
<!--                elevation="1"-->
<!--                class="fa-solid fa-lock mr-1 btn-data-table"-->
<!--                @click="showDialogConfirmDelete(item.value.postCode, item.props.title.isActive)"-->
<!--              >-->
<!--              </v-btn>-->
<!--              <v-btn-->
<!--                v-if="item.props.title.isActive !== 1"-->
<!--                icon-->
<!--                elevation="1"-->
<!--                class="fa-solid fa-unlock mr-1 btn-data-table"-->
<!--                @click="showDialogConfirmDelete(item.value.postCode, item.props.title.isActive)"-->
<!--              >-->
<!--              </v-btn>-->
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
<!--    <dialog-confirm-delete-->
<!--      ref="refDialogConfirmDelete"-->
<!--      @apply="executeDelete(table.idDelete, table.isActive)"-->
<!--    >-->
<!--      <template #body>-->
<!--        <p class="mt-1 mx-1">-->
<!--          {{ $t('dialogContent.delete') }}-->
<!--        </p>-->
<!--      </template>-->
<!--    </dialog-confirm-delete>-->
    <dialog-post-code-create
      ref="refDialogPostCodeCreate"
      :id-update="idUpdate"
      @apply="search()"
    />
    <dialog-file-error ref="refDialogFileError">
    </dialog-file-error>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {useCommonStore} from "@/store/commonStore";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {DataTableHelper, DownloadTemplate} from "@/common/helper";
import {ACTIVE_INACTIVE, TOOLBAR_TABLE} from "@/constants/constant";
import CardDataTable from '@/components/card/CardDataTable.vue';
import TableTitleFunction from '@/components/table/TableTitleFunction.vue';
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import DialogConfirmDelete from '@/components/dialog/DialogConfirmDelete.vue'
import DialogPostCodeCreate from '@/components/dialog/master/DialogPostCodeCreate.vue'
import { useI18n } from 'vue-i18n'
import {useRouter} from "vue-router";
import DialogFileError from "@/components/dialog/DialogFileError.vue";
import Toast from "@/common/toast";
import {useCookies} from "vue3-cookies";
const refDialogFileError = ref(null)

// Initial
const {cookies} = useCookies();
const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, {"name": t('nav.screen.master.postCode'), "path": "post-code-list"})
const PostCodeRepository = RepositoryFactory.get('postCode')
const refDialogConfirmDelete = ref(null)
const refDialogPostCodeCreate = ref(null)
const user = JSON.parse(localStorage.getItem('user'))
const router = useRouter()
const uploadFileRef = ref(null)

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
      title: t('postCode.postCode'),
      align: 'center',
      sortable: false,
      key: 'postCode'
    },
    {
      title: t('postCode.city'),
      align: 'center',
      sortable: false,
      key: 'city'
    },
    {
      title: t('postCode.district'),
      align: 'center',
      sortable: false,
      key: 'district'
    },
    {
      title: t('postCode.street'),
      align: 'center',
      sortable: false,
      key: 'street'
    },
    // {
    //   title: t('table.active'),
    //   align: 'center',
    //   sortable: false,
    //   width: 100,
    //   key: 'isActive'
    // }
  ],
  totalPages: null,
  totalElements: null,
  displayPageNums: 5,
  amountOfDataDisplay: null,
  idDelete: null,
  // isActive: null,
  isDbl: {
    postCode: false,
    city: false,
    district: false,
    street: false,
  },
  dblPostCode: null
})

const searchRequest = reactive({
  postCode: null
})

// Function
const dblclickRow = (fieldName, postCode) => {
  switch (fieldName) {
    case 'postCode':
      table.isDbl.postCode = true
      break
    case 'city':
      table.isDbl.city = true
      break
    case 'district':
      table.isDbl.district = true
      break
    case 'street':
      table.isDbl.street = true
      break
  }
  table.dblPostCode = postCode
}

const clickOutside = () => {
  table.isDbl.postCode = false
  table.isDbl.city = false
  table.isDbl.district = false
  table.isDbl.street = false
  table.dblPostCode = null
}

const clickRow = (item, row) => {
  if (table.dblPostCode !== row.item.value &&
    (table.isDbl.postCode === true
      || table.isDbl.city === true
      || table.isDbl.district === true
      || table.isDbl.street === true
    )) {
    table.isDbl.postCode = false
    table.isDbl.city = false
    table.isDbl.district = false
    table.isDbl.street = false
    table.dblPostCode = null
  }
}

const showDialogConfirmDelete = (id, isActive) => {
  table.idDelete = id
  table.isActive = isActive
  executeDelete(table.idDelete, table.isActive)
  // refDialogConfirmDelete.value.open("postCode")
}

const showDialogPostCodeUpdate = (id) => {
  idUpdate = id
  refDialogPostCodeCreate.value.open(id)
}

const executeDelete = (item, isActive) => {
  let request = {
    ids: [item],
    isActive: isActive
  }
  PostCodeRepository.delete(request).then((function (response) {
    if (response.code === 'ES200') {
      search()
    }
  }))

}

const search = () => {
  let request = {}
  request = DataTableHelper.buildRequest(table.options, searchRequest);

  PostCodeRepository.searchAll(request).then((function (response) {
    table.items = response.data.postCodeList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.postCodeList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.postCodeList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.IMPORT) {
    uploadFileRef.value.click()
  }
  if (actionId === TOOLBAR_TABLE.SEARCH) {
    search(true)
  }
  if (actionId === TOOLBAR_TABLE.DOWNLOAD_TEMPLATE) {
    let path = '/cg/api/File/template/post-code/'
    let fileName = 'Template_PostCode_Import.xlsx'
    let fileNameDownload = 'post_code_template.xlsx'
    DownloadTemplate(path, fileName, fileNameDownload)
  }
}

watch(table.options, () => (
  search()
))

const changeData = (e) => {
  table.options.page = e.page
  table.options.itemsPerPage = e.perPage
}

const onFileChange = (e) => {
  let files = e.target.files
  if (!files) {
    return
  }
  if (files[0].size > 20971000) {
    Toast.showError('ファイルの容量が20MBを超えていました。')
    uploadFileRef.value.value = ''
    return
  }
  let formData = new FormData()
  formData.append('file', files[0])
  PostCodeRepository.upload(formData)
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
