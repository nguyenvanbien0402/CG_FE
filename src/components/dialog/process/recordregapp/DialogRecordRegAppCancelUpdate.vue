<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="85%"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg"
            style="overflow:inherit!important;"
    >
      <v-toolbar
        dark
        color="info"
        dense
      >
        <v-toolbar-title>
          {{ $t('dialogName.recordRegApp.singleCancelUpdate') }}
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
        class="py-1 px-7 rounded-0 overflow-y-scroll"
        style="height: calc(100% - 48px); overflow: inherit"
      >
        <v-form
          ref="form"
          v-model="data.valid"
          @submit.prevent
        >
          <v-container class="mt-2 flex flex-col">
            <v-row dense>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegApp.regDate') }}
                </span>
              </v-col>
              <v-col
                lg="5"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="11"
                         cols="12"
                  >
                    <VueDatePicker v-model="data.request.regDate"
                                   text-input
                                   :select-text="$t('datePicker.select')"
                                   :cancel-text="$t('datePicker.cancel')"
                                   locale="ja"
                                   :enable-time-picker="false"
                                   :format="CommonFormatDate"
                    ></VueDatePicker>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegApp.cancelRegDate') }}
                </span>
              </v-col>
              <v-col
                lg="5"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="11"
                         cols="12"
                  >
                    <VueDatePicker v-model="data.request.cancelRegDate"
                                   text-input
                                   :select-text="$t('datePicker.select')"
                                   :cancel-text="$t('datePicker.cancel')"
                                   locale="ja"
                                   :enable-time-picker="false"
                                   :format="CommonFormatDate"
                    ></VueDatePicker>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- Row 2 -->
            <v-row dense
                   class="mt-10"
            >
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegApp.cancelNum1') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.cancelNum1"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessCancelNum1 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessCancelNum1"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberCancelNum1"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.transferNum1') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.transferNum1"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessTransferNum1 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessTransferNum1"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberTransferNum1"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.lSettingNum1') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.lSettingNum1"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessLSettingNum1 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessLSettingNum1"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberLSettingNum1"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.pipeTransferNum1') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.pipeTransferNum1"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessPipeTransferNum1 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessPipeTransferNum1"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberPipeTransferNum1"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- Row 3 -->
            <v-row dense
                   class="mt-10"
            >
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegApp.cancelNum2') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.cancelNum2"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessCancelNum2 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessCancelNum2"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberCancelNum2"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.transferNum2') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.transferNum2"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessTransferNum2 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessTransferNum2"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberTransferNum2"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.lSettingNum2') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.lSettingNum2"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessLSettingNum2 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessLSettingNum2"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberLSettingNum2"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.pipeTransferNum2') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.pipeTransferNum2"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessPipeTransferNum2 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessPipeTransferNum2"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberPipeTransferNum2"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- Row 4 -->
            <v-row dense
                   class="mt-10"
            >
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegApp.cancelNum3') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.cancelNum3"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessCancelNum3 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessCancelNum3"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberCancelNum3"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.transferNum3') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.transferNum3"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessTransferNum3 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessTransferNum3"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberTransferNum3"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.lSettingNum3') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.lSettingNum3"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessLSettingNum3 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessLSettingNum3"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberLSettingNum3"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.pipeTransferNum3') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.pipeTransferNum3"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessPipeTransferNum3 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessPipeTransferNum3"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberPipeTransferNum3"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- Row 5 -->
            <v-row dense
                   class="mt-10"
            >
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegApp.cancelNum4') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.cancelNum4"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessCancelNum4 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessCancelNum4"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberCancelNum4"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.transferNum4') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.transferNum4"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessTransferNum4 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessTransferNum4"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberTransferNum4"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.lSettingNum4') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.lSettingNum4"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessLSettingNum4 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessLSettingNum4"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberLSettingNum4"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                lg="1"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 text-right"
                >
                  {{ $t('recordRegApp.pipeTransferNum4') }}
                </span>
              </v-col>
              <v-col
                lg="2"
                cols="12"
              >
                <v-row dense>
                  <v-col lg="10"
                         cols="12"
                  >
                    <v-text-field
                      v-model="data.request.pipeTransferNum4"
                      color="info"
                      variant="outlined"
                      density="compact"
                      hide-details
                      type="number"
                      :class="data.isNotAccessPipeTransferNum4 ? 'bg-gray-200' : ''"
                      :readonly="data.isNotAccessPipeTransferNum4"
                      :max="MAX_NUMBER_8_CHAR"
                      :oninput="validateInputNumberPipeTransferNum4"
                      @keypress="handleInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions
          class="flex-row-reverse mt-10"
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
import {reactive, ref, watch} from 'vue';
import {RepositoryFactory} from '@/repositories/repositoryFactory';
import VueDatePicker from '@vuepic/vue-datepicker';

import {useI18n} from 'vue-i18n';
import {CommonFormatDate} from '@/common/helper'
import {MAX_NUMBER_8_CHAR} from '@/constants/constant'

// Initial
const RecordRegAppRepository = RepositoryFactory.get('recordRegApp')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const {t} = useI18n()


const getInitialData = () => ({
  valid: false,
  showUserName: false,
  request: {
    cancelRegDate: null,
    projectNo: null,
    cancelNum1: null,
    cancelNum2: null,
    cancelNum3: null,
    cancelNum4: null,
    regDate: null,
    transferNum1: null,
    lSettingNum1: null,
    pipeTransferNum1: null,
    transferNum2: null,
    lSettingNum2: null,
    pipeTransferNum2: null,
    transferNum3: null,
    lSettingNum3: null,
    pipeTransferNum3: null,
    transferNum4: null,
    lSettingNum4: null,
    pipeTransferNum4: null
  },
  isNotAccessCancelNum1: false,
  isNotAccessCancelNum2: false,
  isNotAccessCancelNum3: false,
  isNotAccessCancelNum4: false,
  isNotAccessTransferNum1: false,
  isNotAccessTransferNum2: false,
  isNotAccessTransferNum3: false,
  isNotAccessTransferNum4: false,
  isNotAccessLSettingNum1: false,
  isNotAccessLSettingNum2: false,
  isNotAccessLSettingNum3: false,
  isNotAccessLSettingNum4: false,
  isNotAccessPipeTransferNum1: false,
  isNotAccessPipeTransferNum2: false,
  isNotAccessPipeTransferNum3: false,
  isNotAccessPipeTransferNum4: false
})

const data = reactive(getInitialData())

// Function
const open = (projectNo, category) => {
  if (projectNo && category) {
    data.request.projectNo = projectNo
    let request = {
      projectNo: data.request.projectNo,
      category: category
    }
    getDataUpdate(request)
  }
  return dialog.value = true
}

const apply = () => {
  let request = {
    projectNo: data.request.projectNo,
    regDate: data.request.regDate,
    cancelRegDate: data.request.cancelRegDate,
    transferNum1: data.request.transferNum1,
    lSettingNum1: data.request.lSettingNum1,
    pipeTransferNum1: data.request.pipeTransferNum1,
    transferNum2: data.request.transferNum2,
    lSettingNum2: data.request.lSettingNum2,
    pipeTransferNum2: data.request.pipeTransferNum2,
    transferNum3: data.request.transferNum3,
    lSettingNum3: data.request.lSettingNum3,
    pipeTransferNum3: data.request.pipeTransferNum3,
    transferNum4: data.request.transferNum4,
    lSettingNum4: data.request.lSettingNum4,
    pipeTransferNum4: data.request.pipeTransferNum4,
    cancelNum1: data.request.cancelNum1,
    cancelNum2: data.request.cancelNum2,
    cancelNum3: data.request.cancelNum3,
    cancelNum4: data.request.cancelNum4
  }
  update(request)

}

const update = (request) => {
  RecordRegAppRepository.singleUpdateCancel(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
    }
  })
}

const getDataUpdate = (request) => {
  RecordRegAppRepository.getDetails(request).then(function (response) {
    data.request.cancelRegDate = response.data.cancelRegDate ? response.data.cancelRegDate : null
    data.request.regDate = response.data.regDate ? response.data.regDate : null
    data.request.cancelNum1 = response.data.cancelNum1
    data.request.cancelNum2 = response.data.cancelNum2
    data.request.cancelNum3 = response.data.cancelNum3
    data.request.cancelNum4 = response.data.cancelNum4
    data.request.transferNum1 = response.data.transferNum1
    data.request.lSettingNum1 = response.data.lSettingNum1
    data.request.pipeTransferNum1 = response.data.pipeTransferNum1
    data.request.transferNum2 = response.data.transferNum2
    data.request.lSettingNum2 = response.data.lSettingNum2
    data.request.pipeTransferNum2 = response.data.pipeTransferNum2
    data.request.transferNum3 = response.data.transferNum3
    data.request.lSettingNum3 = response.data.lSettingNum3
    data.request.pipeTransferNum3 = response.data.pipeTransferNum3
    data.request.transferNum4 = response.data.transferNum4
    data.request.lSettingNum4 = response.data.lSettingNum4
    data.request.pipeTransferNum4 = response.data.pipeTransferNum4

    data.isNotAccessCancelNum1 = (response.data.cancelOwnershipStake1 === null || response.data.cancelOwnershipStake1 === '')
    data.isNotAccessCancelNum2 = (response.data.cancelOwnershipStake2 === null || response.data.cancelOwnershipStake2 === '')
    data.isNotAccessCancelNum3 = (response.data.cancelOwnershipStake3 === null || response.data.cancelOwnershipStake3 === '')
    data.isNotAccessCancelNum4 = (response.data.cancelOwnershipStake4 === null || response.data.cancelOwnershipStake4 === '')
    data.isNotAccessTransferNum1 = response.data.acquiredEquity1 === null || response.data.acquiredEquity1 === ''
    data.isNotAccessTransferNum2 = response.data.acquiredEquity2 === null || response.data.acquiredEquity2 === ''
    data.isNotAccessTransferNum3 = response.data.acquiredEquity3 === null || response.data.acquiredEquity3 === ''
    data.isNotAccessTransferNum4 = response.data.acquiredEquity4 === null || response.data.acquiredEquity4 === ''

    data.isNotAccessLSettingNum1 = response.data.acquiredEquity1 === null ||
      response.data.acquiredEquity1 === '' ||
      response.data.financeTypeName === null ||
      response.data.financeTypeName === '' ||
      response.data.financeTypeName !== 'Loan'
    data.isNotAccessLSettingNum2 = response.data.acquiredEquity2 === null ||
      response.data.acquiredEquity2 === '' ||
      response.data.financeTypeName === null ||
      response.data.financeTypeName === '' ||
      response.data.financeTypeName !== 'Loan'
    data.isNotAccessLSettingNum3 = response.data.acquiredEquity3 === null ||
      response.data.acquiredEquity3 === '' ||
      response.data.financeTypeName === null ||
      response.data.financeTypeName === '' ||
      response.data.financeTypeName !== 'Loan'
    data.isNotAccessLSettingNum4 = response.data.acquiredEquity4 === null ||
      response.data.acquiredEquity4 === '' ||
      response.data.financeTypeName === null ||
      response.data.financeTypeName === '' ||
      response.data.financeTypeName !== 'Loan'
    data.isNotAccessPipeTransferNum1 = response.data.acquiredEquity1 === null || response.data.acquiredEquity1 === ''
    data.isNotAccessPipeTransferNum2 = response.data.acquiredEquity2 === null || response.data.acquiredEquity2 === ''
    data.isNotAccessPipeTransferNum3 = response.data.acquiredEquity3 === null || response.data.acquiredEquity3 === ''
    data.isNotAccessPipeTransferNum4 = response.data.acquiredEquity4 === null || response.data.acquiredEquity4 === ''
  })
}

const validateInputNumberTransferNum1 = () => {
  if (Number(data.request.transferNum1) > MAX_NUMBER_8_CHAR) {
    data.request.transferNum1 = data.request.transferNum1.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberLSettingNum1 = () => {
  if (Number(data.request.lSettingNum1) > MAX_NUMBER_8_CHAR) {
    data.request.lSettingNum1 = data.request.lSettingNum1.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberPipeTransferNum1 = () => {
  if (Number(data.request.pipeTransferNum1) > MAX_NUMBER_8_CHAR) {
    data.request.pipeTransferNum1 = data.request.pipeTransferNum1.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberTransferNum2 = () => {
  if (Number(data.request.transferNum2) > MAX_NUMBER_8_CHAR) {
    data.request.transferNum2 = data.request.transferNum2.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberLSettingNum2 = () => {
  if (Number(data.request.lSettingNum2) > MAX_NUMBER_8_CHAR) {
    data.request.lSettingNum2 = data.request.lSettingNum2.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberPipeTransferNum2 = () => {
  if (Number(data.request.pipeTransferNum2) > MAX_NUMBER_8_CHAR) {
    data.request.pipeTransferNum2 = data.request.pipeTransferNum2.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberTransferNum3 = () => {
  if (Number(data.request.transferNum3) > MAX_NUMBER_8_CHAR) {
    data.request.transferNum3 = data.request.transferNum3.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberLSettingNum3 = () => {
  if (Number(data.request.lSettingNum3) > MAX_NUMBER_8_CHAR) {
    data.request.lSettingNum3 = data.request.lSettingNum3.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberPipeTransferNum3 = () => {
  if (Number(data.request.pipeTransferNum3) > MAX_NUMBER_8_CHAR) {
    data.request.pipeTransferNum3 = data.request.pipeTransferNum3.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberTransferNum4 = () => {
  if (Number(data.request.transferNum4) > MAX_NUMBER_8_CHAR) {
    data.request.transferNum4 = data.request.transferNum4.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberLSettingNum4 = () => {
  if (Number(data.request.lSettingNum4) > MAX_NUMBER_8_CHAR) {
    data.request.lSettingNum4 = data.request.lSettingNum4.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberPipeTransferNum4 = () => {
  if (Number(data.request.pipeTransferNum4) > MAX_NUMBER_8_CHAR) {
    data.request.pipeTransferNum4 = data.request.pipeTransferNum4.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}

const validateInputNumberCancelNum1 = () => {
  if (Number(data.request.cancelNum1) > MAX_NUMBER_8_CHAR) {
    data.request.cancelNum1 = data.request.cancelNum1.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}


const validateInputNumberCancelNum2 = () => {
  if (Number(data.request.cancelNum2) > MAX_NUMBER_8_CHAR) {
    data.request.cancelNum2 = data.request.cancelNum2.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}


const validateInputNumberCancelNum3 = () => {
  if (Number(data.request.cancelNum3) > MAX_NUMBER_8_CHAR) {
    data.request.cancelNum3 = data.request.cancelNum3.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}


const validateInputNumberCancelNum4 = () => {
  if (Number(data.request.cancelNum4) > MAX_NUMBER_8_CHAR) {
    data.request.cancelNum4 = data.request.cancelNum4.substring(0, MAX_NUMBER_8_CHAR.toString().length)
  }
}


const handleInput = (e) => {
  if (e.key === 'e') {
    e.preventDefault()
  }
}

const close = () => {
  Object.assign(data, getInitialData());
  dialog.value = false
}

watch(data, () => (
  console.log('watch')
))
defineExpose({
  open
})

</script>

<style scoped>
.border-date {
  border: 1px solid #e5e7eb;
}

.full-width-input .v-input__control {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
