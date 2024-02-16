<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="30%"
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
                  {{ $t('recordScheduleAppToHgv.returnDate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <VueDatePicker v-model="data.request.returnDate"
                               text-input
                               :select-text="$t('datePicker.select')"
                               :cancel-text="$t('datePicker.cancel')"
                               locale="ja"
                               :enable-time-picker="false"
                               :format="CommonFormatDate"
                ></VueDatePicker>
              </v-col>
            </v-row>
            <v-row dense class="mt-7">
              <v-col
                lg="3"
                sm="6"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 mb-5"
                >
                  {{ $t('recordScheduleAppToHgv.groupHgv') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.groupHgv"
                  color="info"
                  variant="outlined"
                  density="compact"
                  maxLength="50"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
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
    </v-card>
  </v-dialog>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import VueDatePicker from '@vuepic/vue-datepicker';

import {useI18n} from "vue-i18n";
import {CommonFormatDate} from '@/common/helper';

// Initial
const RecordScheduleAppToHgvRepository = RepositoryFactory.get('recordScheduleAppToHgv')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const { t } = useI18n()

const getInitialData = () => ({
  valid: false,
  selectText: t('datePicker.select'),
  cancelText: t('datePicker.cancel'),
  showUserName: false,
  request: {
    returnDate: null,
    groupHgv: null
  },
  projectNo: null
});

const data = reactive(getInitialData())

// Function
const open = (projectNo) => {
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
  let request = [{
    projectNo: data.projectNo,
    returnDate: data.request.returnDate,
    groupHgv: data.request.groupHgv
  }]
  update(request)

}

const update = (request) => {
  RecordScheduleAppToHgvRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
    }
  })
}

const getDataUpdate = (request) => {
  RecordScheduleAppToHgvRepository.getById(request).then(function (response) {
    data.request.returnDate = response.data.returnDate
    data.request.groupHgv = response.data.groupHgv
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
