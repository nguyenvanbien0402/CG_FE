<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="45%"
    max-height="80%"
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
          {{ $t('dialogName.master.registrationType.add') }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('dialogName.master.registrationType.edit') }}
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
        class="py-1 px-7 rounded-0 overflow-y-auto"
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
                     :class="data.errorInfos.showErrRegistrationTypeName ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.registrationTypeName') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.registrationTypeName"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrRegistrationTypeName"
                  :error="data.errorInfos.showErrRegistrationTypeName"
                  :error-messages="data.errorInfos.registrationTypeName"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 1 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrDeliveryReceiptWithCertificate ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.deliveryReceiptWithCertificate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.deliveryReceiptWithCertificate"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrDeliveryReceiptWithCertificate"
                  :error="data.errorInfos.showErrDeliveryReceiptWithCertificate"
                  :error-messages="data.errorInfos.deliveryReceiptWithCertificate"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 2 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrResidentRegistrationDoc ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.residentRegistrationDoc') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.residentRegistrationDoc"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrResidentRegistrationDoc"
                  :error="data.errorInfos.showErrResidentRegistrationDoc"
                  :error-messages="data.errorInfos.residentRegistrationDoc"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 3 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrResidentRegistrationDocByPost ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.residentRegistrationDocByPost') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-textarea
                  v-model="data.request.residentRegistrationDocByPost"
                  color="info"
                  rows="3"
                  dense
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrResidentRegistrationDocByPost"
                  :error="data.errorInfos.showErrResidentRegistrationDocByPost"
                  :error-messages="data.errorInfos.residentRegistrationDocByPost"
                  density="compact"
                ></v-textarea>
              </v-col>
            </v-row>
            <!-- 4 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrAppendixRegistration ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.appendixRegistration') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.appendixRegistration"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrAppendixRegistration"
                  :error="data.errorInfos.showErrAppendixRegistration"
                  :error-messages="data.errorInfos.appendixRegistration"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 5 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrReturnDocument ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.returnDocument') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.returnDocument"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrReturnDocument"
                  :error="data.errorInfos.showErrReturnDocument"
                  :error-messages="data.errorInfos.returnDocument"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 6 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrAppendixCancellation ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.appendixCancellation') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.appendixCancellation"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrAppendixCancellation"
                  :error="data.errorInfos.showErrAppendixCancellation"
                  :error-messages="data.errorInfos.appendixCancellation"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 7 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrIdentificationMark ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.identificationMark') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.identificationMark"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrIdentificationMark"
                  :error="data.errorInfos.showErrIdentificationMark"
                  :error-messages="data.errorInfos.identificationMark"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 8 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrExistenceLoan ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.existenceLoan') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.existenceLoan"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrExistenceLoan"
                  :error="data.errorInfos.showErrExistenceLoan"
                  :error-messages="data.errorInfos.existenceLoan"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 9 -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrSealCertificate ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.sealCertificate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.sealCertificate"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrSealCertificate"
                  :error="data.errorInfos.showErrSealCertificate"
                  :error-messages="data.errorInfos.sealCertificate"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 1 0-->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrResidentRegisterRegistration ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.residentRegisterRegistration') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.residentRegisterRegistration"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrResidentRegisterRegistration"
                  :error="data.errorInfos.showErrResidentRegisterRegistration"
                  :error-messages="data.errorInfos.residentRegisterRegistration"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 1 1-->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrResidentRegistrationDetails ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.residentRegistrationDetails') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.residentRegistrationDetails"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrResidentRegistrationDetails"
                  :error="data.errorInfos.showErrResidentRegistrationDetails"
                  :error-messages="data.errorInfos.residentRegistrationDetails"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrCheckbox ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.checkbox') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.checkbox"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrCheckbox"
                  :error="data.errorInfos.showErrCheckbox"
                  :error-messages="data.errorInfos.checkbox"
                  clearable
                  density="compact"
                  maxlength="5"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- last -->
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrAboutSignature ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('registrationType.aboutSignature') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.aboutSignature"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrAboutSignature"
                  :error="data.errorInfos.showErrAboutSignature"
                  :error-messages="data.errorInfos.aboutSignature"
                  clearable
                  density="compact"
                  maxlength="100"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-card-actions
        class="flex-row-reverse"
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
  </v-dialog>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
// Initial
const RegistrationTypeRepository = RepositoryFactory.get('registrationType')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const idUpdate = ref(null)
const isAddNew = ref(true)

const getInitialData = () => ({
  valid: false,
  showUserName: false,
  request: {
    registrationTypeName: null,
    deliveryReceiptWithCertificate: null,
    residentRegistrationDoc: null,
    residentRegistrationDocByPost: null,
    appendixRegistration: null,
    returnDocument: null,
    appendixCancellation: null,
    identificationMark: null,
    existenceLoan: null,
    sealCertificate: null,
    checkbox: null,
    residentRegisterRegistration: null,
    residentRegistrationDetails: null,
    aboutSignature: null,
    isActive: null
  },
  errorInfos: {
    registrationTypeName: '',
    deliveryReceiptWithCertificate: '',
    residentRegistrationDoc: '',
    residentRegistrationDocByPost: '',
    appendixRegistration: '',
    returnDocument: '',
    appendixCancellation: '',
    identificationMark: '',
    existenceLoan: '',
    sealCertificate: '',
    checkbox: '',
    residentRegisterRegistration: '',
    residentRegistrationDetails: '',
    aboutSignature: '',
    showErrRegistrationTypeName: false,
    showErrDeliveryReceiptWithCertificate: false,
    showErrResidentRegistrationDoc: false,
    showErrResidentRegistrationDocByPost: false,
    showErrAppendixRegistration: false,
    showErrReturnDocument: false,
    showErrAppendixCancellation: false,
    showErrIdentificationMark: false,
    showErrExistenceLoan: false,
    showErrSealCertificate: false,
    showErrCheckbox: false,
    showErrResidentRegisterRegistration: false,
    showErrResidentRegistrationDetails: false,
    showErrAboutSignature: false
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

const apply = () => {
  if (isAddNew.value) {
    let request = {
      registrationTypeName: data.request.registrationTypeName ? data.request.registrationTypeName : null,
      deliveryReceiptWithCertificate: data.request.deliveryReceiptWithCertificate ? data.request.deliveryReceiptWithCertificate : null,
      residentRegistrationDoc: data.request.residentRegistrationDoc ? data.request.residentRegistrationDoc : null,
      residentRegistrationDocByPost: data.request.residentRegistrationDocByPost ? data.request.residentRegistrationDocByPost : null,
      appendixRegistration: data.request.appendixRegistration ? data.request.appendixRegistration : null,
      returnDocument: data.request.returnDocument ? data.request.returnDocument : null,
      appendixCancellation: data.request.appendixCancellation ? data.request.appendixCancellation : null,
      identificationMark: data.request.identificationMark ? data.request.identificationMark : null,
      existenceLoan: data.request.existenceLoan ? data.request.existenceLoan : null,
      sealCertificate: data.request.sealCertificate ? data.request.sealCertificate : null,
      checkbox: data.request.checkbox,
      residentRegisterRegistration: data.request.residentRegisterRegistration ? data.request.residentRegisterRegistration : null,
      residentRegistrationDetails: data.request.residentRegistrationDetails ? data.request.residentRegistrationDetails : null,
      aboutSignature: data.request.aboutSignature ? data.request.aboutSignature : null
    }
    addNew(request)
  } else {
    let request = {
      registrationTypeId: idUpdate.value,
      registrationTypeName: data.request.registrationTypeName ? data.request.registrationTypeName : null,
      deliveryReceiptWithCertificate: data.request.deliveryReceiptWithCertificate ? data.request.deliveryReceiptWithCertificate : null,
      residentRegistrationDoc: data.request.residentRegistrationDoc ? data.request.residentRegistrationDoc : null,
      residentRegistrationDocByPost: data.request.residentRegistrationDocByPost ? data.request.residentRegistrationDocByPost : null,
      appendixRegistration: data.request.appendixRegistration ? data.request.appendixRegistration : null,
      returnDocument: data.request.returnDocument ? data.request.returnDocument : null,
      appendixCancellation: data.request.appendixCancellation ? data.request.appendixCancellation : null,
      identificationMark: data.request.identificationMark ? data.request.identificationMark : null,
      existenceLoan: data.request.existenceLoan ? data.request.existenceLoan : null,
      sealCertificate: data.request.sealCertificate ? data.request.sealCertificate : null,
      checkbox: data.request.checkbox,
      residentRegisterRegistration: data.request.residentRegisterRegistration ? data.request.residentRegisterRegistration : null,
      residentRegistrationDetails: data.request.residentRegistrationDetails ? data.request.residentRegistrationDetails : null,
      aboutSignature: data.request.aboutSignature ? data.request.aboutSignature : null,
      isActive: data.request.isActive
    }
    update(request)
  }

}

const addNew = (request) => {
  RegistrationTypeRepository.add(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success add')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.registrationTypeName = ''
      data.errorInfos.deliveryReceiptWithCertificate = ''
      data.errorInfos.residentRegistrationDoc = ''
      data.errorInfos.residentRegistrationDocByPost = ''
      data.errorInfos.appendixRegistration = ''
      data.errorInfos.returnDocument = ''
      data.errorInfos.appendixCancellation = ''
      data.errorInfos.identificationMark = ''
      data.errorInfos.existenceLoan = ''
      data.errorInfos.sealCertificate = ''
      data.errorInfos.checkbox = ''
      data.errorInfos.residentRegisterRegistration = ''
      data.errorInfos.residentRegistrationDetails = ''
      data.errorInfos.aboutSignature = ''
      data.errorInfos.showErrRegistrationTypeName = false
      data.errorInfos.showErrDeliveryReceiptWithCertificate = false
      data.errorInfos.showErrResidentRegistrationDoc = false
      data.errorInfos.showErrResidentRegistrationDocByPost = false
      data.errorInfos.showErrAppendixRegistration = false
      data.errorInfos.showErrReturnDocument = false
      data.errorInfos.showErrAppendixCancellation = false
      data.errorInfos.showErrIdentificationMark = false
      data.errorInfos.showErrExistenceLoan = false
      data.errorInfos.showErrSealCertificate = false
      data.errorInfos.showErrCheckbox = false
      data.errorInfos.showErrResidentRegisterRegistration = false
      data.errorInfos.showErrResidentRegistrationDetails = false
      data.errorInfos.showErrAboutSignature = false
      response.data.forEach(error => {
        if (error.fieldName === "registrationTypeName") {
          data.errorInfos.registrationTypeName = error.errorCode
          data.errorInfos.showErrRegistrationTypeName = true
        }
        if (error.fieldName === "deliveryReceiptWithCertificate") {
          data.errorInfos.deliveryReceiptWithCertificate = error.errorCode
          data.errorInfos.showErrDeliveryReceiptWithCertificate = true
        }
        if (error.fieldName === "residentRegistrationDoc") {
          data.errorInfos.residentRegistrationDoc = error.errorCode
          data.errorInfos.showErrResidentRegistrationDoc = true
        }
        if (error.fieldName === "residentRegistrationDocByPost") {
          data.errorInfos.residentRegistrationDocByPost = error.errorCode
          data.errorInfos.showErrResidentRegistrationDocByPost = true
        }
        if (error.fieldName === "appendixRegistration") {
          data.errorInfos.appendixRegistration = error.errorCode
          data.errorInfos.showErrAppendixRegistration = true
        }
        if (error.fieldName === "returnDocument") {
          data.errorInfos.returnDocument = error.errorCode
          data.errorInfos.showErrReturnDocument = true
        }
        if (error.fieldName === "appendixCancellation") {
          data.errorInfos.appendixCancellation = error.errorCode
          data.errorInfos.showErrAppendixCancellation = true
        }
        if (error.fieldName === "identificationMark") {
          data.errorInfos.identificationMark = error.errorCode
          data.errorInfos.showErrIdentificationMark = true
        }
        if (error.fieldName === "existenceLoan") {
          data.errorInfos.existenceLoan = error.errorCode
          data.errorInfos.showErrExistenceLoan = true
        }
        if (error.fieldName === "sealCertificate") {
          data.errorInfos.sealCertificate = error.errorCode
          data.errorInfos.showErrSealCertificate = true
        }
        if (error.fieldName === "checkbox") {
          data.errorInfos.checkbox = error.errorCode
          data.errorInfos.showErrCheckbox = true
        }
        if (error.fieldName === "residentRegisterRegistration") {
          data.errorInfos.residentRegisterRegistration = error.errorCode
          data.errorInfos.showErrResidentRegisterRegistration = true
        }
        if (error.fieldName === "residentRegistrationDetails") {
          data.errorInfos.residentRegistrationDetails = error.errorCode
          data.errorInfos.showErrResidentRegistrationDetails = true
        }
        if (error.fieldName === "aboutSignature") {
          data.errorInfos.aboutSignature = error.errorCode
          data.errorInfos.showErrAboutSignature = true
        }
      })
    }
  })
}

const update = (request) => {
  RegistrationTypeRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.registrationTypeName = ''
      data.errorInfos.deliveryReceiptWithCertificate = ''
      data.errorInfos.residentRegistrationDoc = ''
      data.errorInfos.residentRegistrationDocByPost = ''
      data.errorInfos.appendixRegistration = ''
      data.errorInfos.returnDocument = ''
      data.errorInfos.appendixCancellation = ''
      data.errorInfos.identificationMark = ''
      data.errorInfos.existenceLoan = ''
      data.errorInfos.sealCertificate = ''
      data.errorInfos.checkbox = ''
      data.errorInfos.residentRegisterRegistration = ''
      data.errorInfos.residentRegistrationDetails = ''
      data.errorInfos.aboutSignature = ''
      data.errorInfos.showErrRegistrationTypeName = false
      data.errorInfos.showErrDeliveryReceiptWithCertificate = false
      data.errorInfos.showErrResidentRegistrationDoc = false
      data.errorInfos.showErrResidentRegistrationDocByPost = false
      data.errorInfos.showErrAppendixRegistration = false
      data.errorInfos.showErrReturnDocument = false
      data.errorInfos.showErrAppendixCancellation = false
      data.errorInfos.showErrIdentificationMark = false
      data.errorInfos.showErrExistenceLoan = false
      data.errorInfos.showErrSealCertificate = false
      data.errorInfos.showErrCheckbox = false
      data.errorInfos.showErrResidentRegisterRegistration = false
      data.errorInfos.showErrResidentRegistrationDetails = false
      data.errorInfos.showErrAboutSignature = false
      response.data.forEach(error => {
        if (error.fieldName === "registrationTypeName") {
          data.errorInfos.registrationTypeName = error.errorCode
          data.errorInfos.showErrRegistrationTypeName = true
        }
        if (error.fieldName === "deliveryReceiptWithCertificate") {
          data.errorInfos.deliveryReceiptWithCertificate = error.errorCode
          data.errorInfos.showErrDeliveryReceiptWithCertificate = true
        }
        if (error.fieldName === "residentRegistrationDoc") {
          data.errorInfos.residentRegistrationDoc = error.errorCode
          data.errorInfos.showErrResidentRegistrationDoc = true
        }
        if (error.fieldName === "residentRegistrationDocByPost") {
          data.errorInfos.residentRegistrationDocByPost = error.errorCode
          data.errorInfos.showErrResidentRegistrationDocByPost = true
        }
        if (error.fieldName === "appendixRegistration") {
          data.errorInfos.appendixRegistration = error.errorCode
          data.errorInfos.showErrAppendixRegistration = true
        }
        if (error.fieldName === "returnDocument") {
          data.errorInfos.returnDocument = error.errorCode
          data.errorInfos.showErrReturnDocument = true
        }
        if (error.fieldName === "appendixCancellation") {
          data.errorInfos.appendixCancellation = error.errorCode
          data.errorInfos.showErrAppendixCancellation = true
        }
        if (error.fieldName === "identificationMark") {
          data.errorInfos.identificationMark = error.errorCode
          data.errorInfos.showErrIdentificationMark = true
        }
        if (error.fieldName === "existenceLoan") {
          data.errorInfos.existenceLoan = error.errorCode
          data.errorInfos.showErrExistenceLoan = true
        }
        if (error.fieldName === "sealCertificate") {
          data.errorInfos.sealCertificate = error.errorCode
          data.errorInfos.showErrSealCertificate = true
        }
        if (error.fieldName === "checkbox") {
          data.errorInfos.checkbox = error.errorCode
          data.errorInfos.showErrCheckbox = true
        }
        if (error.fieldName === "residentRegisterRegistration") {
          data.errorInfos.residentRegisterRegistration = error.errorCode
          data.errorInfos.showErrResidentRegisterRegistration = true
        }
        if (error.fieldName === "residentRegistrationDetails") {
          data.errorInfos.residentRegistrationDetails = error.errorCode
          data.errorInfos.showErrResidentRegistrationDetails = true
        }
        if (error.fieldName === "aboutSignature") {
          data.errorInfos.aboutSignature = error.errorCode
          data.errorInfos.showErrAboutSignature = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  RegistrationTypeRepository.getById(request).then(function (response) {
    data.request.registrationTypeName = response.data.registrationTypeName
    data.request.deliveryReceiptWithCertificate = response.data.deliveryReceiptWithCertificate
    data.request.residentRegistrationDoc = response.data.residentRegistrationDoc
    data.request.residentRegistrationDocByPost = response.data.residentRegistrationDocByPost
    data.request.appendixRegistration = response.data.appendixRegistration
    data.request.returnDocument = response.data.returnDocument
    data.request.appendixCancellation = response.data.appendixCancellation
    data.request.identificationMark = response.data.identificationMark
    data.request.existenceLoan = response.data.existenceLoan
    data.request.sealCertificate = response.data.sealCertificate
    data.request.checkbox = response.data.checkbox
    data.request.residentRegisterRegistration = response.data.residentRegisterRegistration
    data.request.residentRegistrationDetails = response.data.residentRegistrationDetails
    data.request.aboutSignature = response.data.aboutSignature
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
  () => data.request.registrationTypeName,
  () => {
    data.errorInfos.registrationTypeName = ''
    data.errorInfos.showErrRegistrationTypeName = false
  }
)

defineExpose({
  open
})

</script>

<style lang="scss" scoped>
</style>
