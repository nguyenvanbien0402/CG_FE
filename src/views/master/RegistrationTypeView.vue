<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          title="registration-type"
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

          <!-- registrationTypeName -->
          <template #item.registrationTypeName="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('registrationTypeName', item.value)"
            >
              <div v-if="item.props.title.registrationTypeName && table.isDbl.registrationTypeName && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.registrationTypeName"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.registrationTypeName }}
              </div>
            </div>
          </template>
          <!-- deliveryReceiptWithCertificate -->
          <template #item.deliveryReceiptWithCertificate="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('deliveryReceiptWithCertificate', item.value)"
            >
              <div v-if="item.props.title.deliveryReceiptWithCertificate && table.isDbl.deliveryReceiptWithCertificate && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.deliveryReceiptWithCertificate"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.deliveryReceiptWithCertificate }}
              </div>
            </div>
          </template>
          <!-- residentRegistrationDoc -->
          <template #item.residentRegistrationDoc="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('residentRegistrationDoc', item.value)"
            >
              <div v-if="item.props.title.residentRegistrationDoc && table.isDbl.residentRegistrationDoc && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.residentRegistrationDoc"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.residentRegistrationDoc }}
              </div>
            </div>
          </template>
          <!-- residentRegistrationDocByPost -->
          <template #item.residentRegistrationDocByPost="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('residentRegistrationDocByPost', item.value)"
            >
              <div v-if="item.props.title.residentRegistrationDocByPost && table.isDbl.residentRegistrationDocByPost && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.residentRegistrationDocByPost"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-300"
              >
                {{ item.props.title.residentRegistrationDocByPost }}
              </div>
            </div>
          </template>
          <!-- appendixRegistration -->
          <template #item.appendixRegistration="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('appendixRegistration', item.value)"
            >
              <div v-if="item.props.title.appendixRegistration && table.isDbl.appendixRegistration && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.appendixRegistration"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.appendixRegistration }}
              </div>
            </div>
          </template>
          <!-- returnDocument -->
          <template #item.returnDocument="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('returnDocument', item.value)"
            >
              <div v-if="item.props.title.returnDocument && table.isDbl.returnDocument && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.returnDocument"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.returnDocument }}
              </div>
            </div>
          </template>
          <!-- appendixCancellation -->
          <template #item.appendixCancellation="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('appendixCancellation', item.value)"
            >
              <div v-if="item.props.title.appendixCancellation && table.isDbl.appendixCancellation && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.appendixCancellation"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.appendixCancellation }}
              </div>
            </div>
          </template>
          <!-- identificationMark -->
          <template #item.identificationMark="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('identificationMark', item.value)"
            >
              <div v-if="item.props.title.identificationMark && table.isDbl.identificationMark && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.identificationMark"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.identificationMark }}
              </div>
            </div>
          </template>
          <!-- existenceLoan -->
          <template #item.existenceLoan="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('existenceLoan', item.value)"
            >
              <div v-if="item.props.title.existenceLoan && table.isDbl.existenceLoan && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.existenceLoan"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.existenceLoan }}
              </div>
            </div>
          </template>
          <!-- sealCertificate -->
          <template #item.sealCertificate="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('sealCertificate', item.value)"
            >
              <div v-if="item.props.title.sealCertificate && table.isDbl.sealCertificate && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.sealCertificate"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.sealCertificate }}
              </div>
            </div>
          </template>
          <!-- residentRegisterRegistration -->
          <template #item.residentRegisterRegistration="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('residentRegisterRegistration', item.value)"
            >
              <div v-if="item.props.title.residentRegisterRegistration && table.isDbl.residentRegisterRegistration && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.residentRegisterRegistration"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.residentRegisterRegistration }}
              </div>
            </div>
          </template>
          <!-- residentRegistrationDetails -->
          <template #item.residentRegistrationDetails="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('residentRegistrationDetails', item.value)"
            >
              <div v-if="item.props.title.residentRegistrationDetails && table.isDbl.residentRegistrationDetails && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.residentRegistrationDetails"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.residentRegistrationDetails }}
              </div>
            </div>
          </template>


          <template #item.checkbox="{ item }">
            {{ item.props.title.checkbox }}
          </template>

          <template #item.aboutSignature="{ item }">
            <div class="text-left"
                 @dblclick="dblclickRow('aboutSignature', item.value)"
            >
              <div v-if="item.props.title.aboutSignature && table.isDbl.aboutSignature && item.value === table.dblRegistrationTypeId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.aboutSignature"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.aboutSignature }}
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
                @click="showDialogUserUpdate(item.value.registrationTypeId)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive === 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.registrationTypeId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-lock"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive !== 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.registrationTypeId, item.props.title.isActive)"
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
    <dialog-registration-type-create
      ref="refDialogRegistrationTypeCreate"
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
import DialogRegistrationTypeCreate from '@/components/dialog/master/DialogRegistrationTypeCreate.vue'
import { useI18n } from 'vue-i18n'
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, {"name": t('nav.screen.master.registrationType'), "path": "upgrade-contract-type-list"})
const RegistrationTypeRepository = RepositoryFactory.get('registrationType')
const refDialogConfirmDelete = ref(null)
const refDialogRegistrationTypeCreate = ref(null)
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
      title: t('registrationType.registrationTypeName'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'registrationTypeName'
    },
    {
      title: t('registrationType.deliveryReceiptWithCertificate'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'deliveryReceiptWithCertificate'
    },
    {
      title: t('registrationType.residentRegistrationDoc'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'residentRegistrationDoc'
    },
    {
      title: t('registrationType.residentRegistrationDocByPost'),
      align: 'center',
      width: 300,
      sortable: false,
      key: 'residentRegistrationDocByPost'
    },
    {
      title: t('registrationType.appendixRegistration'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'appendixRegistration'
    },
    {
      title: t('registrationType.returnDocument'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'returnDocument'
    },
    {
      title: t('registrationType.appendixCancellation'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'appendixCancellation'
    },
    {
      title: t('registrationType.identificationMark'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'identificationMark'
    },
    {
      title: t('registrationType.existenceLoan'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'existenceLoan'
    },
    {
      title: t('registrationType.sealCertificate'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'sealCertificate'
    },
    {
      title: t('registrationType.checkbox'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'checkbox'
    },
    {
      title: t('registrationType.residentRegisterRegistration'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'residentRegisterRegistration'
    },
    {
      title: t('registrationType.residentRegistrationDetails'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'residentRegistrationDetails'
    },
    {
      title: t('registrationType.aboutSignature'),
      align: 'center',
      width: 200,
      sortable: false,
      key: 'aboutSignature'
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
    registrationTypeName: false,
    deliveryReceiptWithCertificate: false,
    residentRegistrationDoc: false,
    residentRegistrationDocByPost: false,
    appendixRegistration: false,
    returnDocument: false,
    appendixCancellation: false,
    identificationMark: false,
    existenceLoan: false,
    sealCertificate: false,
    residentRegisterRegistration: false,
    residentRegistrationDetails: false,
    aboutSignature: false
  },
  dblRegistrationTypeId: null
})

const searchRequest = reactive({
  "name": null
})

// Function
const dblclickRow = (fieldName, registrationTypeId) => {
  switch (fieldName) {
    case 'registrationTypeName':
      table.isDbl.registrationTypeName = true
      break
    case 'deliveryReceiptWithCertificate':
      table.isDbl.deliveryReceiptWithCertificate = true
      break
    case 'residentRegistrationDoc':
      table.isDbl.residentRegistrationDoc = true
      break
    case 'residentRegistrationDocByPost':
      table.isDbl.residentRegistrationDocByPost = true
      break
    case 'appendixRegistration':
      table.isDbl.appendixRegistration = true
      break
    case 'returnDocument':
      table.isDbl.returnDocument = true
      break
    case 'appendixCancellation':
      table.isDbl.appendixCancellation = true
      break
    case 'identificationMark':
      table.isDbl.identificationMark = true
      break
    case 'existenceLoan':
      table.isDbl.existenceLoan = true
      break
    case 'sealCertificate':
      table.isDbl.sealCertificate = true
      break
    case 'residentRegisterRegistration':
      table.isDbl.residentRegisterRegistration = true
      break
    case 'residentRegistrationDetails':
      table.isDbl.residentRegistrationDetails = true
      break
    case 'aboutSignature':
      table.isDbl.aboutSignature = true
      break
  }
  table.dblRegistrationTypeId = registrationTypeId
}

const clickOutside = () => {
  table.isDbl.registrationTypeName = false
  table.isDbl.deliveryReceiptWithCertificate = false
  table.isDbl.residentRegistrationDoc = false
  table.isDbl.residentRegistrationDocByPost = false
  table.isDbl.appendixRegistration = false
  table.isDbl.returnDocument = false
  table.isDbl.appendixCancellation = false
  table.isDbl.identificationMark = false
  table.isDbl.existenceLoan = false
  table.isDbl.sealCertificate = false
  table.isDbl.residentRegisterRegistration = false
  table.isDbl.residentRegistrationDetails = false
  table.isDbl.aboutSignature = false
  table.dblRegistrationTypeId = null
}

const clickRow = (item, row) => {
  if (table.dblRegistrationTypeId !== row.item.value &&
    (table.isDbl.registrationTypeName === true
      || table.isDbl.deliveryReceiptWithCertificate === true
      || table.isDbl.residentRegistrationDoc === true
      || table.isDbl.residentRegistrationDocByPost === true
      || table.isDbl.appendixRegistration === true
      || table.isDbl.returnDocument === true
      || table.isDbl.appendixCancellation === true
      || table.isDbl.identificationMark === true
      || table.isDbl.existenceLoan === true
      || table.isDbl.sealCertificate === true
      || table.isDbl.residentRegisterRegistration === true
      || table.isDbl.residentRegistrationDetails === true
      || table.isDbl.aboutSignature === true
    )) {
    table.isDbl.registrationTypeName = false
    table.isDbl.deliveryReceiptWithCertificate = false
    table.isDbl.residentRegistrationDoc = false
    table.isDbl.residentRegistrationDocByPost = false
    table.isDbl.appendixRegistration = false
    table.isDbl.returnDocument = false
    table.isDbl.appendixCancellation = false
    table.isDbl.identificationMark = false
    table.isDbl.existenceLoan = false
    table.isDbl.sealCertificate = false
    table.isDbl.residentRegisterRegistration = false
    table.isDbl.residentRegistrationDetails = false
    table.isDbl.aboutSignature = false
    table.dblRegistrationTypeId = null
  }
}

const showDialogConfirmDelete = (id, isActive) => {
  table.idDelete = id
  table.isActive = isActive
  executeDelete(table.idDelete, table.isActive)
  // refDialogConfirmDelete.value.open("registrationType")
}

const showDialogUserUpdate = (id) => {
  idUpdate = id
  refDialogRegistrationTypeCreate.value.open(id)
}

const executeDelete = (item, isActive) => {
  let request = {
    ids: [item],
    isActive: isActive
  }
  RegistrationTypeRepository.delete(request).then((function (response) {
    if (response.code === 'ES200') {
      search()
    }
  }))

}

const search = () => {
  let request = {}
  request = DataTableHelper.buildRequest(table.options, searchRequest);

  RegistrationTypeRepository.searchAll(request).then((function (response) {
    table.items = response.data.registrationTypeList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.registrationTypeList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.registrationTypeList.length,
    }
    store.setPagination(store, pagination)
  }))
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.CREATE) {
    console.log(' open create ')
    refDialogRegistrationTypeCreate.value.open()
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
