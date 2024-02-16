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
          {{ $t('dialogName.multiUpdate') }}
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
            <v-row
              v-if="data.status === STATUS.get(11).key || (data.status === STATUS.get(99).key && data.oldStatus > 11)"
              dense>
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
            <v-row
              v-if="data.status === STATUS.get(12).key || (data.status === STATUS.get(99).key && data.oldStatus > 12)"
              dense>
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
              dense>
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
import {reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import VueDatePicker from '@vuepic/vue-datepicker';
import {STATUS} from '@/constants/constant';

import {useI18n} from "vue-i18n";
import {CommonFormatDate} from '@/common/helper'

// Initial
const RecordRegCompleteRepository = RepositoryFactory.get('recordRegComplete')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const { t } = useI18n()

const getInitialData = () => ({
  valid: false,
  showUserName: false,
  selectText: t('datePicker.select'),
  cancelText: t('datePicker.cancel'),
  request: {
    ownerReturnDate: null,
    hgvReturnDate: null,
    ownerArrivalDate: null
  },
  projectNo: null,
  status: null,
  oldStatus: null
});

const data = reactive(getInitialData())

// Function
const open = (projectNo, status, oldStatus) => {
  data.projectNo = projectNo
  data.status = status
  data.oldStatus = oldStatus
  return dialog.value = true
}

const apply = () => {
  if (data.status === STATUS.get(11).key) {
    let request = {
      projectNo: data.projectNo,
      ownerReturnDate: data.request.ownerReturnDate,
    }
    multiUpdate1(request)
  }

  if (data.status === STATUS.get(12).key) {
    let request = {
      projectNo: data.projectNo,
      ownerArrivalDate: data.request.ownerArrivalDate,
    }
    multiUpdate2(request)
  }

  if (data.status === STATUS.get(13).key) {
    let request = {
      projectNo: data.projectNo,
      hgvReturnDate: data.request.hgvReturnDate,
    }
    multiUpdate3(request)
  }

  if (data.status === STATUS.get(99).key) {
    let request = {
      projectNo: data.projectNo,
      ownerReturnDate: data.request.ownerReturnDate,
      ownerArrivalDate: data.request.ownerArrivalDate,
      hgvReturnDate: data.request.hgvReturnDate,
    }
    multiUpdatePending(request)
  }

}

const multiUpdate1 = (request) => {
  RecordRegCompleteRepository.multiUpdate1(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
    }
  })
}

const multiUpdate2 = (request) => {
  RecordRegCompleteRepository.multiUpdate2(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
    }
  })
}

const multiUpdate3 = (request) => {
  RecordRegCompleteRepository.multiUpdate3(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
    }
  })
}

const multiUpdatePending = (request) => {
  RecordRegCompleteRepository.multiUpdatePending(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
    }
  })
}


const close = () => {
  data.request.ownerReturnDate = null
  data.request.hgvReturnDate = null
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
