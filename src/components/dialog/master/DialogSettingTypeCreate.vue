<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="40%"
    max-height="80%"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg" >
      <v-toolbar
        dark
        color="info"
        dense
      >
        <v-toolbar-title v-if="isAddNew">
          {{ $t('dialogName.master.settingType.add') }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('dialogName.master.settingType.edit') }}
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
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrSettingType ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.settingType') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.settingType"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrSettingType"
                  :error="data.errorInfos.showErrSettingType"
                  :error-messages="data.errorInfos.settingType"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrDelegatedDuty ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.delegatedDuty') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.delegatedDuty"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrDelegatedDuty"
                  :error="data.errorInfos.showErrDelegatedDuty"
                  :error-messages="data.errorInfos.delegatedDuty"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrDelegatedDutyExample ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.delegatedDutyExample') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.delegatedDutyExample"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrDelegatedDutyExample"
                  :error="data.errorInfos.showErrDelegatedDutyExample"
                  :error-messages="data.errorInfos.delegatedDutyExample"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--            1-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrPurposeOfRegistration ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.purposeOfRegistration') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.purposeOfRegistration"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrPurposeOfRegistration"
                  :error="data.errorInfos.showErrPurposeOfRegistration"
                  :error-messages="data.errorInfos.purposeOfRegistration"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--            2-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrReasonOfRegistration ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.reasonOfRegistration') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.reasonOfRegistration"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrReasonOfRegistration"
                  :error="data.errorInfos.showErrReasonOfRegistration"
                  :error-messages="data.errorInfos.reasonOfRegistration"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--            3-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrStakeholderStatement ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.stakeholderStatement') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.stakeholderStatement"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrStakeholderStatement"
                  :error="data.errorInfos.showErrStakeholderStatement"
                  :error-messages="data.errorInfos.stakeholderStatement"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--            4-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrCauseContract1 ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.causeContract1') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-textarea
                  v-model="data.request.causeContract1"
                  color="info"
                  rows="3"
                  dense
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrCauseContract1"
                  :error="data.errorInfos.showErrCauseContract1"
                  :error-messages="data.errorInfos.causeContract1"
                  density="compact"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrSecurityInterest ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.securityInterest') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.securityInterest"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrSecurityInterest"
                  :error="data.errorInfos.showErrSecurityInterest"
                  :error-messages="data.errorInfos.securityInterest"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>

            <!--            5-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrReceivableAmount ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.receivableAmount') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.receivableAmount"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrReceivableAmount"
                  :error="data.errorInfos.showErrReceivableAmount"
                  :error-messages="data.errorInfos.receivableAmount"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--            6-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrCauseContract2 ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.causeContract2') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-textarea
                  v-model="data.request.causeContract2"
                  color="info"
                  rows="3"
                  dense
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrCauseContract2"
                  :error="data.errorInfos.showErrCauseContract2"
                  :error-messages="data.errorInfos.causeContract2"
                  density="compact"
                ></v-textarea>
              </v-col>
            </v-row>
            <!--            7-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrCauseContract3 ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.causeContract3') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.causeContract3"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrCauseContract3"
                  :error="data.errorInfos.showErrCauseContract3"
                  :error-messages="data.errorInfos.causeContract3"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--            8-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrCauseContract4 ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.causeContract4') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.causeContract4"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrCauseContract4"
                  :error="data.errorInfos.showErrCauseContract4"
                  :error-messages="data.errorInfos.causeContract4"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--            9-->
            <v-row dense
                   class="mt-3"
            >
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrSecondLoanForSpeculative ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('settingType.secondLoanForSpeculative') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.secondLoanForSpeculative"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrSecondLoanForSpeculative"
                  :error="data.errorInfos.showErrSecondLoanForSpeculative"
                  :error-messages="data.errorInfos.secondLoanForSpeculative"
                  clearable
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <div>
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
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
// Initial
const SettingTypeRepository = RepositoryFactory.get('settingType')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const idUpdate = ref(null)
const isAddNew = ref(true)

const getInitialData = () => ({
  valid: false,
  showUserName: false,
  request: {
    settingType: null,
    delegatedDuty: null,
    delegatedDutyExample: null,
    purposeOfRegistration: null,
    reasonOfRegistration: null,
    stakeholderStatement: null,
    causeContract1: null,
    receivableAmount: null,
    causeContract2: null,
    causeContract3: null,
    causeContract4: null,
    secondLoanForSpeculative: null,
    securityInterest: null,
    isActive: null
  },
  errorInfos: {
    settingType: '',
    delegatedDuty: '',
    delegatedDutyExample: '',
    purposeOfRegistration: '',
    reasonOfRegistration: '',
    stakeholderStatement: '',
    causeContract1: '',
    receivableAmount: '',
    causeContract2: '',
    causeContract3: '',
    causeContract4: '',
    secondLoanForSpeculative: '',
    securityInterest: '',
    showErrSettingType: false,
    showErrDelegatedDuty: false,
    showErrDelegatedDutyExample: false,
    showErrPurposeOfRegistration: false,
    showErrReasonOfRegistration: false,
    showErrStakeholderStatement: false,
    showErrCauseContract1: false,
    showErrReceivableAmount: false,
    showErrCauseContract2: false,
    showErrCauseContract3: false,
    showErrCauseContract4: false,
    showErrSecondLoanForSpeculative: false,
    showErrSecurityInterest: false
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
      settingType: data.request.settingType ? data.request.settingType : null,
      delegatedDuty: data.request.delegatedDuty ? data.request.delegatedDuty : null,
      delegatedDutyExample: data.request.delegatedDutyExample ? data.request.delegatedDutyExample : null,
      purposeOfRegistration: data.request.purposeOfRegistration ? data.request.purposeOfRegistration : null,
      reasonOfRegistration: data.request.reasonOfRegistration ? data.request.reasonOfRegistration : null,
      stakeholderStatement: data.request.stakeholderStatement ? data.request.stakeholderStatement : null,
      causeContract1: data.request.causeContract1 ? data.request.causeContract1 : null,
      receivableAmount: data.request.receivableAmount ? data.request.receivableAmount : null,
      causeContract2: data.request.causeContract2 ? data.request.causeContract2 : null,
      causeContract3: data.request.causeContract3 ? data.request.causeContract3 : null,
      causeContract4: data.request.causeContract4 ? data.request.causeContract4 : null,
      secondLoanForSpeculative: data.request.secondLoanForSpeculative ? data.request.secondLoanForSpeculative : null,
      securityInterest: data.request.securityInterest ? data.request.securityInterest : null
    }
    addNew(request)
  } else {
    let request = {
      settingTypeId: idUpdate.value,
      settingType: data.request.settingType ? data.request.settingType : null,
      delegatedDuty: data.request.delegatedDuty ? data.request.delegatedDuty : null,
      delegatedDutyExample: data.request.delegatedDutyExample ? data.request.delegatedDutyExample : null,
      purposeOfRegistration: data.request.purposeOfRegistration ? data.request.purposeOfRegistration : null,
      reasonOfRegistration: data.request.reasonOfRegistration ? data.request.reasonOfRegistration : null,
      stakeholderStatement: data.request.stakeholderStatement ? data.request.stakeholderStatement : null,
      causeContract1: data.request.causeContract1 ? data.request.causeContract1 : null,
      receivableAmount: data.request.receivableAmount ? data.request.receivableAmount : null,
      causeContract2: data.request.causeContract2 ? data.request.causeContract2 : null,
      causeContract3: data.request.causeContract3 ? data.request.causeContract3 : null,
      causeContract4: data.request.causeContract4 ? data.request.causeContract4 : null,
      secondLoanForSpeculative: data.request.secondLoanForSpeculative ? data.request.secondLoanForSpeculative : null,
      securityInterest: data.request.securityInterest ? data.request.securityInterest : null,
      isActive: data.request.isActive
    }
    update(request)
  }

}

const addNew = (request) => {
  SettingTypeRepository.add(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success add')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrSettingType = false
      data.errorInfos.showErrDelegatedDuty = false
      data.errorInfos.showErrDelegatedDutyExample = false
      data.errorInfos.showErrPurposeOfRegistration = false
      data.errorInfos.showErrReasonOfRegistration = false
      data.errorInfos.showErrStakeholderStatement = false
      data.errorInfos.showErrCauseContract1 = false
      data.errorInfos.showErrReceivableAmount = false
      data.errorInfos.showErrCauseContract2 = false
      data.errorInfos.showErrCauseContract3 = false
      data.errorInfos.showErrCauseContract4 = false
      data.errorInfos.showErrSecondLoanForSpeculative = false
      data.errorInfos.showErrSecurityInterest = false
      data.errorInfos.settingType = ''
      data.errorInfos.delegatedDuty = ''
      data.errorInfos.delegatedDutyExample = ''
      data.errorInfos.purposeOfRegistration = ''
      data.errorInfos.reasonOfRegistration = ''
      data.errorInfos.stakeholderStatement = ''
      data.errorInfos.causeContract1 = ''
      data.errorInfos.receivableAmount = ''
      data.errorInfos.causeContract2 = ''
      data.errorInfos.causeContract3 = ''
      data.errorInfos.causeContract4 = ''
      data.errorInfos.secondLoanForSpeculative = ''
      data.errorInfos.securityInterest = ''
      response.data.forEach(error => {
        if (error.fieldName === "securityInterest") {
          data.errorInfos.securityInterest = error.errorCode
          data.errorInfos.showErrSecurityInterest = true
        }
        if (error.fieldName === "settingType") {
          data.errorInfos.settingType = error.errorCode
          data.errorInfos.showErrSettingType = true
        }
        if (error.fieldName === "delegatedDuty") {
          data.errorInfos.delegatedDuty = error.errorCode
          data.errorInfos.showErrDelegatedDuty = true
        }
        if (error.fieldName === "delegatedDutyExample") {
          data.errorInfos.delegatedDutyExample = error.errorCode
          data.errorInfos.showErrDelegatedDutyExample = true
        }
        if (error.fieldName === "purposeOfRegistration") {
          data.errorInfos.purposeOfRegistration = error.errorCode
          data.errorInfos.showErrPurposeOfRegistration = true
        }
        if (error.fieldName === "reasonOfRegistration") {
          data.errorInfos.reasonOfRegistration = error.errorCode
          data.errorInfos.showErrReasonOfRegistration = true
        }
        if (error.fieldName === "stakeholderStatement") {
          data.errorInfos.stakeholderStatement = error.errorCode
          data.errorInfos.showErrStakeholderStatement = true
        }
        if (error.fieldName === "causeContract1") {
          data.errorInfos.causeContract1 = error.errorCode
          data.errorInfos.showErrCauseContract1 = true
        }
        if (error.fieldName === "receivableAmount") {
          data.errorInfos.receivableAmount = error.errorCode
          data.errorInfos.showErrReceivableAmount = true
        }
        if (error.fieldName === "causeContract2") {
          data.errorInfos.causeContract2 = error.errorCode
          data.errorInfos.showErrCauseContract2 = true
        }
        if (error.fieldName === "causeContract3") {
          data.errorInfos.causeContract3 = error.errorCode
          data.errorInfos.showErrCauseContract3 = true
        }
        if (error.fieldName === "causeContract4") {
          data.errorInfos.causeContract4 = error.errorCode
          data.errorInfos.showErrCauseContract4 = true
        }
        if (error.fieldName === "secondLoanForSpeculative") {
          data.errorInfos.secondLoanForSpeculative = error.errorCode
          data.errorInfos.showErrSecondLoanForSpeculative = true
        }
      })
    }
  })
}

const update = (request) => {
  SettingTypeRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrSettingType = false
      data.errorInfos.showErrDelegatedDuty = false
      data.errorInfos.showErrDelegatedDutyExample = false
      data.errorInfos.showErrPurposeOfRegistration = false
      data.errorInfos.showErrReasonOfRegistration = false
      data.errorInfos.showErrStakeholderStatement = false
      data.errorInfos.showErrCauseContract1 = false
      data.errorInfos.showErrReceivableAmount = false
      data.errorInfos.showErrCauseContract2 = false
      data.errorInfos.showErrCauseContract3 = false
      data.errorInfos.showErrCauseContract4 = false
      data.errorInfos.showErrSecondLoanForSpeculative = false
      data.errorInfos.showErrSecurityInterest = false
      data.errorInfos.settingType = ''
      data.errorInfos.delegatedDuty = ''
      data.errorInfos.delegatedDutyExample = ''
      data.errorInfos.purposeOfRegistration = ''
      data.errorInfos.reasonOfRegistration = ''
      data.errorInfos.stakeholderStatement = ''
      data.errorInfos.causeContract1 = ''
      data.errorInfos.receivableAmount = ''
      data.errorInfos.causeContract2 = ''
      data.errorInfos.causeContract3 = ''
      data.errorInfos.causeContract4 = ''
      data.errorInfos.secondLoanForSpeculative = ''
      data.errorInfos.securityInterest = ''
      response.data.forEach(error => {
        if (error.fieldName === "securityInterest") {
          data.errorInfos.securityInterest = error.errorCode
          data.errorInfos.showErrSecurityInterest = true
        }
        if (error.fieldName === "settingType") {
          data.errorInfos.settingType = error.errorCode
          data.errorInfos.showErrSettingType = true
        }
        if (error.fieldName === "delegatedDuty") {
          data.errorInfos.delegatedDuty = error.errorCode
          data.errorInfos.showErrDelegatedDuty = true
        }
        if (error.fieldName === "delegatedDutyExample") {
          data.errorInfos.delegatedDutyExample = error.errorCode
          data.errorInfos.showErrDelegatedDutyExample = true
        }
        if (error.fieldName === "purposeOfRegistration") {
          data.errorInfos.purposeOfRegistration = error.errorCode
          data.errorInfos.showErrPurposeOfRegistration = true
        }
        if (error.fieldName === "reasonOfRegistration") {
          data.errorInfos.reasonOfRegistration = error.errorCode
          data.errorInfos.showErrReasonOfRegistration = true
        }
        if (error.fieldName === "stakeholderStatement") {
          data.errorInfos.stakeholderStatement = error.errorCode
          data.errorInfos.showErrStakeholderStatement = true
        }
        if (error.fieldName === "causeContract1") {
          data.errorInfos.causeContract1 = error.errorCode
          data.errorInfos.showErrCauseContract1 = true
        }
        if (error.fieldName === "receivableAmount") {
          data.errorInfos.receivableAmount = error.errorCode
          data.errorInfos.showErrReceivableAmount = true
        }
        if (error.fieldName === "causeContract2") {
          data.errorInfos.causeContract2 = error.errorCode
          data.errorInfos.showErrCauseContract2 = true
        }
        if (error.fieldName === "causeContract3") {
          data.errorInfos.causeContract3 = error.errorCode
          data.errorInfos.showErrCauseContract3 = true
        }
        if (error.fieldName === "causeContract4") {
          data.errorInfos.causeContract4 = error.errorCode
          data.errorInfos.showErrCauseContract4 = true
        }
        if (error.fieldName === "secondLoanForSpeculative") {
          data.errorInfos.secondLoanForSpeculative = error.errorCode
          data.errorInfos.showErrSecondLoanForSpeculative = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  SettingTypeRepository.getById(request).then(function (response) {
    data.request.settingType = response.data.settingType
    data.request.delegatedDuty = response.data.delegatedDuty
    data.request.delegatedDutyExample = response.data.delegatedDutyExample
    data.request.purposeOfRegistration = response.data.purposeOfRegistration
    data.request.reasonOfRegistration = response.data.reasonOfRegistration
    data.request.stakeholderStatement = response.data.stakeholderStatement
    data.request.causeContract1 = response.data.causeContract1
    data.request.receivableAmount = response.data.receivableAmount
    data.request.causeContract2 = response.data.causeContract2
    data.request.causeContract3 = response.data.causeContract3
    data.request.causeContract4 = response.data.causeContract4
    data.request.secondLoanForSpeculative = response.data.secondLoanForSpeculative
    data.request.securityInterest = response.data.securityInterest
    data.request.isActive = response.data.isActive
  })
}

const close = () => {
  data.errorInfos.settingType = ''
  data.errorInfos.delegatedDuty = ''
  data.errorInfos.delegatedDutyExample = ''
  data.errorInfos.purposeOfRegistration = ''
  data.errorInfos.reasonOfRegistration = ''
  data.errorInfos.stakeholderStatement = ''
  data.errorInfos.causeContract1 = ''
  data.errorInfos.receivableAmount = ''
  data.errorInfos.causeContract2 = ''
  data.errorInfos.causeContract3 = ''
  data.errorInfos.causeContract4 = ''
  data.errorInfos.secondLoanForSpeculative = ''
  data.errorInfos.securityInterest = ''
  data.errorInfos.showErrSettingType = false
  data.errorInfos.showErrDelegatedDuty = false
  data.errorInfos.showErrDelegatedDutyExample = false
  data.errorInfos.showErrPurposeOfRegistration = false
  data.errorInfos.showErrReasonOfRegistration = false
  data.errorInfos.showErrStakeholderStatement = false
  data.errorInfos.showErrCauseContract1 = false
  data.errorInfos.showErrReceivableAmount = false
  data.errorInfos.showErrCauseContract2 = false
  data.errorInfos.showErrCauseContract3 = false
  data.errorInfos.showErrCauseContract4 = false
  data.errorInfos.showErrSecondLoanForSpeculative = false
  data.errorInfos.showErrSecurityInterest = false
  Object.assign(data, getInitialData());
  dialog.value = false
}

watch(data, () => (
  console.log('watch')
))

watch(
  () => data.request.settingType,
  () => {
    data.errorInfos.settingType = ''
    data.errorInfos.showErrSettingType = false
  }
)

defineExpose({
  open
})

</script>

<style lang="scss" scoped>
</style>
