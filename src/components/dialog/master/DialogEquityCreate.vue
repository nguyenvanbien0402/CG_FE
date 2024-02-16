<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="42%"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg">
      <v-toolbar
        dark
        color="info"
        dense
      >
        <v-toolbar-title v-if="isAddNew">
          {{ $t('dialogName.master.equity.add') }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('dialogName.master.equity.edit') }}
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
          icon
          dark
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card
        flat
        class="py-1 px-7 rounded-0"
        style="height: calc(100% - 48px); overflow-y: auto!important;"
      >
        <v-form
          ref="form"
          v-model="data.valid"
          @submit.prevent
        >
          <v-container>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrLocation ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('equity.locationName') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-select
                  v-model="data.request.locationId"
                  density="compact"
                  rounded
                  dense
                  variant="outlined"
                  :error="data.errorInfos.showErrLocation"
                  :hide-details="!data.errorInfos.showErrLocation"
                  :error-messages="data.errorInfos.location"
                  :items="locations"
                ></v-select>
              </v-col>
            </v-row>
            <!-- equity -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrEquity ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('equity.equity') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.equity"
                  maxlength="255"
                  color="info"
                  dense
                  variant="outlined"
                  density="compact"
                  type="number"
                  :hide-details="!data.errorInfos.showErrEquity"
                  :error="data.errorInfos.showErrEquity"
                  :error-messages="data.errorInfos.equity"
                  :max="MAX_NUMBER_10_CHAR"
                  :oninput="validateInputEquity"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- managementFee -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrManagementFee ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('equity.managementFee') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.managementFee"
                  maxlength="255"
                  color="info"
                  dense
                  variant="outlined"
                  density="compact"
                  type="number"
                  :hide-details="!data.errorInfos.showErrManagementFee"
                  :error="data.errorInfos.showErrManagementFee"
                  :error-messages="data.errorInfos.managementFee"
                  :max="MAX_NUMBER_10_CHAR"
                  :oninput="validateInputManagementFee"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- partialTransferTax -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrPartialTransferTax ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('equity.partialTransferTax') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.partialTransferTax"
                  maxlength="255"
                  color="info"
                  dense
                  variant="outlined"
                  density="compact"
                  type="number"
                  :hide-details="!data.errorInfos.showErrPartialTransferTax"
                  :error="data.errorInfos.showErrPartialTransferTax"
                  :error-messages="data.errorInfos.partialTransferTax"
                  :max="MAX_NUMBER_10_CHAR"
                  :oninput="validateInputPartialTransferTax"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- managementFeeTax -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrManagementFeeTax ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('equity.managementFeeTax') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.managementFeeTax"
                  maxlength="255"
                  color="info"
                  dense
                  variant="outlined"
                  density="compact"
                  type="number"
                  :hide-details="!data.errorInfos.showErrManagementFeeTax"
                  :error="data.errorInfos.showErrManagementFeeTax"
                  :error-messages="data.errorInfos.managementFeeTax"
                  :max="MAX_NUMBER_10_CHAR"
                  :oninput="validateInputManagementFeeTax"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- adminFeeKanjiDisplay -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrAdminFeeKanjiDisplay ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('equity.adminFeeKanjiDisplay') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.adminFeeKanjiDisplay"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrAdminFeeKanjiDisplay"
                  :error="data.errorInfos.showErrAdminFeeKanjiDisplay"
                  :error-messages="data.errorInfos.adminFeeKanjiDisplay"
                  clearable
                  density="compact"
                  maxlength="20"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- managementFeeTaxKanji -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrManagementFeeTaxKanji ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('equity.managementFeeTaxKanji') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.managementFeeTaxKanji"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrManagementFeeTaxKanji"
                  :error="data.errorInfos.showErrManagementFeeTaxKanji"
                  :error-messages="data.errorInfos.managementFeeTaxKanji"
                  clearable
                  density="compact"
                  maxlength="20"
                ></v-text-field>
              </v-col>
            </v-row>

          </v-container>
        </v-form>
        <v-card-actions
          class="flex-row-reverse mt-3"
        >
          <v-btn
            color="info"
            class="text-sm mb-2"
            variant="flat"
            @click="apply"
          >
            {{ $t('btn.save') }}
          </v-btn>
          <v-btn
            color="info"
            class="text-sm mb-2 mr-2"
            variant="outlined"
            @click="close"
          >
            {{ $t('btn.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {useDocumentStore} from "@/store/process/documentStore";
import {MAX_NUMBER_10_CHAR} from "@/constants/constant";
// Initial
const EquityRepository = RepositoryFactory.get('equity')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const idUpdate = ref(null)
const isAddNew = ref(true)

const documentStore = useDocumentStore()
const locations = computed(() => documentStore.getLocations)

const getInitialData = () => ({
  valid: false,
  request: {
    locationId: null,
    equity: null,
    managementFee: null,
    partialTransferTax: null,
    managementFeeTax: null,
    adminFeeKanjiDisplay: null,
    managementFeeTaxKanji: null,
    isActive: null
  },
  errorInfos: {
    location: '',
    equity: '',
    managementFee: '',
    partialTransferTax: '',
    managementFeeTax: '',
    adminFeeKanjiDisplay: '',
    managementFeeTaxKanji: '',
    showErrLocation: false,
    showErrEquity: false,
    showErrManagementFee: false,
    showErrPartialTransferTax: false,
    showErrManagementFeeTax: false,
    showErrAdminFeeKanjiDisplay: false,
    showErrManagementFeeTaxKanji: false,
  }
});

const data = reactive(getInitialData())

// Function
const open = (id) => {
  if (id) {
    idUpdate.value = id
    isAddNew.value = false
    let request = {
      id: id
    }
    Object.assign(data, getInitialData());
    getDataUpdate(request)
  } else {
    isAddNew.value = true
    Object.assign(data, getInitialData());
  }
  return dialog.value = true
}

const validateInputEquity = () => {
  if (Number(data.request.equity) > MAX_NUMBER_10_CHAR) {
    data.request.equity = data.request.equity.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}
const validateInputManagementFee = () => {
  if (Number(data.request.managementFee) > MAX_NUMBER_10_CHAR) {
    data.request.managementFee = data.request.managementFee.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}
const validateInputPartialTransferTax = () => {
  if (Number(data.request.partialTransferTax) > MAX_NUMBER_10_CHAR) {
    data.request.partialTransferTax = data.request.partialTransferTax.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}
const validateInputManagementFeeTax = () => {
  if (Number(data.request.managementFeeTax) > MAX_NUMBER_10_CHAR) {
    data.request.managementFeeTax = data.request.managementFeeTax.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}
const validateInputAdminFeeKanjiDisplay = () => {
  if (Number(data.request.adminFeeKanjiDisplay) > MAX_NUMBER_10_CHAR) {
    data.request.adminFeeKanjiDisplay = data.request.adminFeeKanjiDisplay.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}
const validateInputManagementFeeTaxKanji = () => {
  if (Number(data.request.managementFeeTaxKanji) > MAX_NUMBER_10_CHAR) {
    data.request.managementFeeTaxKanji = data.request.managementFeeTaxKanji.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}

const handleInput = (e) => {
  if (e.key === 'e') {
    e.preventDefault()
  }
}

const apply = () => {
  if (isAddNew.value) {
    let request = {
      locationId: data.request.locationId,
      equity: data.request.equity,
      managementFee: data.request.managementFee,
      partialTransferTax: data.request.partialTransferTax,
      managementFeeTax: data.request.managementFeeTax,
      adminFeeKanjiDisplay: data.request.adminFeeKanjiDisplay,
      managementFeeTaxKanji: data.request.managementFeeTaxKanji
    }
    addNew(request)
  } else {
    let request = {
      equityId: idUpdate.value,
      locationId: data.request.locationId,
      equity: data.request.equity,
      managementFee: data.request.managementFee,
      partialTransferTax: data.request.partialTransferTax,
      managementFeeTax: data.request.managementFeeTax,
      adminFeeKanjiDisplay: data.request.adminFeeKanjiDisplay,
      managementFeeTaxKanji: data.request.managementFeeTaxKanji,
      isActive: data.request.isActive
    }
    update(request)
  }

}

const addNew = (request) => {
  EquityRepository.add(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success add')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrLocation = false
      data.errorInfos.showErrEquity = false
      data.errorInfos.showErrManagementFee = false
      data.errorInfos.showErrPartialTransferTax = false
      data.errorInfos.showErrManagementFeeTax = false
      data.errorInfos.showErrAdminFeeKanjiDisplay = false
      data.errorInfos.showErrManagementFeeTaxKanji = false
      data.errorInfos.location = ''
      data.errorInfos.equity = ''
      data.errorInfos.managementFee = ''
      data.errorInfos.partialTransferTax = ''
      data.errorInfos.managementFeeTax = ''
      data.errorInfos.adminFeeKanjiDisplay = ''
      data.errorInfos.managementFeeTaxKanji = ''
      response.data.forEach(error => {
        if (error.fieldName === "equityCode") {
          data.errorInfos.equity = error.errorCode
          data.errorInfos.location = error.errorCode
          data.errorInfos.showErrLocation = true
          data.errorInfos.showErrEquity = true
        }
        if (error.fieldName === "locationId") {
          if (error.errorCode) {
            error.errorCode = error.errorCode.replace('場所', 'コード用場所')
          }
          data.errorInfos.location = error.errorCode
          data.errorInfos.showErrLocation = true
        }
        if (error.fieldName === "equity") {
          data.errorInfos.equity = error.errorCode
          data.errorInfos.showErrEquity = true
        }
        if (error.fieldName === "managementFee") {
          data.errorInfos.managementFee = error.errorCode
          data.errorInfos.showErrManagementFee = true
        }
        if (error.fieldName === "partialTransferTax") {
          data.errorInfos.partialTransferTax = error.errorCode
          data.errorInfos.showErrPartialTransferTax = true
        }
        if (error.fieldName === "managementFeeTax") {
          data.errorInfos.managementFeeTax = error.errorCode
          data.errorInfos.showErrManagementFeeTax = true
        }
        if (error.fieldName === "adminFeeKanjiDisplay") {
          data.errorInfos.adminFeeKanjiDisplay = error.errorCode
          data.errorInfos.showErrAdminFeeKanjiDisplay = true
        }
        if (error.fieldName === "managementFeeTaxKanji") {
          data.errorInfos.managementFeeTaxKanji = error.errorCode
          data.errorInfos.showErrManagementFeeTaxKanji = true
        }
      })
    }
  })
}

const update = (request) => {
  EquityRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrLocation = false
      data.errorInfos.showErrEquity = false
      data.errorInfos.showErrManagementFee = false
      data.errorInfos.showErrPartialTransferTax = false
      data.errorInfos.showErrManagementFeeTax = false
      data.errorInfos.showErrAdminFeeKanjiDisplay = false
      data.errorInfos.showErrManagementFeeTaxKanji = false
      data.errorInfos.location = ''
      data.errorInfos.equity = ''
      data.errorInfos.managementFee = ''
      data.errorInfos.partialTransferTax = ''
      data.errorInfos.managementFeeTax = ''
      data.errorInfos.adminFeeKanjiDisplay = ''
      data.errorInfos.managementFeeTaxKanji = ''
      response.data.forEach(error => {
        if (error.fieldName === "equityCode") {
          data.errorInfos.equity = error.errorCode
          data.errorInfos.location = error.errorCode
          data.errorInfos.showErrLocation = true
          data.errorInfos.showErrEquity = true
        }
        if (error.fieldName === "locationId") {
          if (error.errorCode) {
            error.errorCode = error.errorCode.replace('場所', 'コード用場所')
          }
          data.errorInfos.location = error.errorCode
          data.errorInfos.showErrLocation = true
        }
        if (error.fieldName === "equity") {
          data.errorInfos.equity = error.errorCode
          data.errorInfos.showErrEquity = true
        }
        if (error.fieldName === "managementFee") {
          data.errorInfos.managementFee = error.errorCode
          data.errorInfos.showErrManagementFee = true
        }
        if (error.fieldName === "partialTransferTax") {
          data.errorInfos.partialTransferTax = error.errorCode
          data.errorInfos.showErrPartialTransferTax = true
        }
        if (error.fieldName === "managementFeeTax") {
          data.errorInfos.managementFeeTax = error.errorCode
          data.errorInfos.showErrManagementFeeTax = true
        }
        if (error.fieldName === "adminFeeKanjiDisplay") {
          data.errorInfos.adminFeeKanjiDisplay = error.errorCode
          data.errorInfos.showErrAdminFeeKanjiDisplay = true
        }
        if (error.fieldName === "managementFeeTaxKanji") {
          data.errorInfos.managementFeeTaxKanji = error.errorCode
          data.errorInfos.showErrManagementFeeTaxKanji = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  EquityRepository.getById(request).then(function (response) {
    data.request.locationId = response.data.locationId
    data.request.equity = response.data.equity
    data.request.managementFee = response.data.managementFee
    data.request.partialTransferTax = response.data.partialTransferTax
    data.request.managementFeeTax = response.data.managementFeeTax
    data.request.adminFeeKanjiDisplay = response.data.adminFeeKanjiDisplay
    data.request.managementFeeTaxKanji = response.data.managementFeeTaxKanji
    data.request.isActive = response.data.isActive
  })
}

const close = () => {
  Object.assign(data, getInitialData());
  dialog.value = false
}

watch(data, () => (
  console.log('watch')
))

watch(
  () => data.request.locationId,
  () => {
    data.errorInfos.location = ''
    data.errorInfos.showErrLocation = false
  }
)
watch(
  () => data.request.equity,
  () => {
    data.errorInfos.equity = ''
    data.errorInfos.showErrEquity = false
  }
)

onMounted(async () => {
  await documentStore.fetchLocation(false)
})

defineExpose({
  open
})

</script>

<style lang="scss" scoped>
</style>
