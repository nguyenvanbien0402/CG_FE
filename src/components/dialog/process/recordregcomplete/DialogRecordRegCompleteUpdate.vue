<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="35%"
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
          {{ $t('dialogName.update') }}
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
            <v-row v-if="data.status === STATUS.get(11).key || (data.status === STATUS.get(99).key && data.oldStatus > 11)"
                   dense
            >
              <v-col
                lg="3"
                sm="6"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegComplete.ownerReturnDate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <VueDatePicker v-model="data.request.ownerReturnDate"
                               text-input
                               :select-text="$t('datePicker.select')"
                               :cancel-text="$t('datePicker.cancel')"
                               locale="ja"
                               :enable-time-picker="false"
                               :format="CommonFormatDate"
                ></VueDatePicker>
              </v-col>
            </v-row>
            <v-row v-if="data.status === STATUS.get(12).key || (data.status === STATUS.get(99).key && data.oldStatus > 12)"
                   dense
            >
              <v-col
                lg="3"
                sm="6"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegComplete.ownerArrivalDate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <VueDatePicker v-model="data.request.ownerArrivalDate"
                               text-input
                               :select-text="$t('datePicker.select')"
                               :cancel-text="$t('datePicker.cancel')"
                               locale="ja"
                               :enable-time-picker="false"
                               :format="CommonFormatDate"
                ></VueDatePicker>
              </v-col>
            </v-row>
            <v-row
              v-if="data.status === STATUS.get(13).key || (data.status === STATUS.get(99).key && data.oldStatus > 13)"
              dense
            >
              <v-col
                lg="3"
                sm="6"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegComplete.hgvReturnDate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <VueDatePicker v-model="data.request.hgvReturnDate"
                               text-input
                               :select-text="$t('datePicker.select')"
                               :cancel-text="$t('datePicker.cancel')"
                               locale="ja"
                               :enable-time-picker="false"
                               :format="CommonFormatDate"
                               label="sad"
                ></VueDatePicker>
              </v-col>
            </v-row>
            <v-row
              v-if="data.status === STATUS.get(11).key || (data.status === STATUS.get(99).key && data.oldStatus > 11)"
              dense
              class="mt-2"
            >
              <v-col
                lg="3"
                sm="6"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegComplete.returnNumber') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.returnNumber"
                  color="info"
                  variant="outlined"
                  density="compact"
                  clearable
                  hide-details
                  maxlength="20"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col
                lg="3"
                sm="6"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordRegComplete.remark') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <v-textarea
                    v-model="data.request.remark"
                    color="info"
                    variant="outlined"
                    density="compact"
                    rows="5"
                  ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions
          class="flex-row-reverse mt-5"
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
import {MAX_NUMBER_12_CHAR, MAX_NUMBER_20_CHAR, STATUS} from '@/constants/constant';

import {useI18n} from 'vue-i18n';
import {CommonFormatDate} from '@/common/helper';

// Initial
const RecordRegCompleteRepository = RepositoryFactory.get('recordRegComplete')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const { t } = useI18n()

const getInitialData = () => ({
  valid: false,
  selectText: t('datePicker.select'),
  cancelText: t('datePicker.cancel'),
  showUserName: false,
  request: {
    ownerReturnDate: null,
    hgvReturnDate: null,
    returnNumber: null,
    ownerArrivalDate: null,
    remark: null
  },
  projectNo: null,
  status: null,
  oldStatus: null
});

const data = reactive(getInitialData())

// Function
const open = (projectNo, status, oldStatus) => {
  if (oldStatus) {
    data.oldStatus = oldStatus
  }
  if (status) {
    data.status = status
  }
  if (projectNo) {
    data.projectNo = projectNo
    let request = {
      projectNo: projectNo
    }
    getDataUpdate(request)
  }
  return dialog.value = true
}

const apply = () => {
  if (data.status === STATUS.get(11).key) {
    let request = {
      projectNo: data.projectNo,
      ownerReturnDate: data.request.ownerReturnDate,
      returnNumber: data.request.returnNumber,
      remark : data.request.remark
    }
    singleUpdate1(request)
  }

  if (data.status === STATUS.get(12).key) {
    let request = {
      projectNo: data.projectNo,
      ownerArrivalDate: data.request.ownerArrivalDate,
      remark : data.request.remark
    }
    singleUpdate2(request)
  }

  if (data.status === STATUS.get(13).key) {
    let request = {
      projectNo: data.projectNo,
      hgvReturnDate: data.request.hgvReturnDate,
      remark : data.request.remark
    }
    singleUpdate3(request)
  }

  if (data.status === STATUS.get(99).key) {
    let request = {
      projectNo: data.projectNo,
      ownerReturnDate: data.request.ownerReturnDate,
      ownerArrivalDate: data.request.ownerArrivalDate,
      returnNumber: data.request.returnNumber,
      hgvReturnDate: data.request.hgvReturnDate,
      remark : data.request.remark
    }
    singleUpdatePending(request)
  }
}

const validateInputNumberReturnNumber = () => {
  if (Number(data.request.returnNumber) > MAX_NUMBER_12_CHAR) {
    data.request.returnNumber = data.request.returnNumber.substring(0, 12)
  }
}

const handleInput = (e) => {
  if (e.key === 'e') {
    e.preventDefault()
  }
}

const singleUpdate1 = (request) => {
  RecordRegCompleteRepository.singleUpdate1(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    }
  })
}
const singleUpdate2 = (request) => {
  RecordRegCompleteRepository.singleUpdate2(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    }
  })
}
const singleUpdate3 = (request) => {
  RecordRegCompleteRepository.singleUpdate3(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    }
  })
}
const singleUpdatePending = (request) => {
  RecordRegCompleteRepository.singleUpdatePending(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    }
  })
}

const getDataUpdate = (request) => {
  RecordRegCompleteRepository.getById(request).then(function (response) {
    data.request.ownerReturnDate = response.data.ownerReturnDate
    data.request.hgvReturnDate = response.data.hgvReturnDate
    data.request.returnNumber = response.data.returnNumber
    data.request.ownerArrivalDate = response.data.ownerArrivalDate
    data.request.remark = response.data.remark
  })
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
</style>
