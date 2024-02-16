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
          <v-container class="mt-2">
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
                  {{ $t('recordDelivery.deliveryDate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <VueDatePicker v-model="data.request.deliveryDate"
                               text-input
                               :select-text="$t('datePicker.select')"
                               :cancel-text="$t('datePicker.cancel')"
                               locale="ja"
                               :enable-time-picker="false"
                               :format="CommonFormatDate"
                ></VueDatePicker>
              </v-col>
            </v-row>
            <v-row class="mt-5"
                   dense
            >
              <v-col
                lg="3"
                sm="6"
                cols="12"
                :class="data.errorInfos.showErrDeliveryCode ? 'mt-3' : 'd-flex align-center'"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordDelivery.deliveryCode') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.deliveryCode"
                  color="info"
                  variant="outlined"
                  density="compact"
                  clearable
                  :error="data.errorInfos.showErrDeliveryCode"
                  :hide-details="!data.errorInfos.showErrDeliveryCode"
                  :error-messages="data.errorInfos.deliveryCode"
                  maxLength="50"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-5"
                   dense
            >
              <v-col
                lg="3"
                cols="12"
                :class="data.errorInfos.showErrReturnLp ? 'mt-3' : 'd-flex align-center'"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordDelivery.returnLp') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.returnLp"
                  color="info"
                  variant="outlined"
                  density="compact"
                  :error="data.errorInfos.showErrReturnLp"
                  :hide-details="!data.errorInfos.showErrReturnLp"
                  :error-messages="data.errorInfos.returnLp"
                  clearable
                  maxLength="15"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- remark m05 -->
            
            <v-row class="mt-5"
                   dense
            >
              <v-col
                lg="3"
                cols="12"
                class="d-flex align-center"
              >
                <span
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
                >
                  {{ $t('recordDelivery.remarks') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <v-textarea
                  v-model="data.request.deliveryRemarks"
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
import {MAX_NUMBER_15_CHAR} from "@/constants/constant";

// Initial
const RecordDeliveryRepository = RepositoryFactory.get('recordDelivery')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const {t} = useI18n()

const getInitialData = () => ({
  valid: false,
  selectText: t('datePicker.select'),
  cancelText: t('datePicker.cancel'),
  showUserName: false,
  request: {
    deliveryDate: null,
    deliveryCode: '',
    returnLp: null,
    deliveryRemarks: null
  },
  projectNo: null,
  errorInfos: {
    returnLp: '',
    deliveryCode: '',
    showErrReturnLp: false,
    showErrDeliveryCode: false
  },
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
    deliveryDate: data.request.deliveryDate,
    deliveryCode: data.request.deliveryCode,
    returnLp: data.request.returnLp,
    deliveryRemarks: data.request.deliveryRemarks
  }]
  update(request)

}

const handleInput = (e) => {
  if (e.key === 'e') {
    e.preventDefault()
  }
}

const validateInputReturnLp = () => {
  if (Number(data.request.returnLp) > MAX_NUMBER_15_CHAR) {
    data.request.returnLp = data.request.returnLp.substring(0, MAX_NUMBER_15_CHAR.toString().length)
  }
}

const update = (request) => {
  RecordDeliveryRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrReturnLp = false
      data.errorInfos.returnLp = ''
      data.errorInfos.showErrDeliveryCode = false
      data.errorInfos.deliveryCode = ''
      response.data.forEach(error => {
        if (error.fieldName === "returnLp") {
          data.errorInfos.returnLp = error.errorCode
          data.errorInfos.showErrReturnLp = true
        }
        if (error.fieldName === "deliveryCode") {
          data.errorInfos.deliveryCode = error.errorCode
          data.errorInfos.showErrDeliveryCode = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  RecordDeliveryRepository.getById(request).then(function (response) {
    data.request.deliveryDate = response.data.deliveryDate
    data.request.deliveryCode = response.data.deliveryCode
    data.request.returnLp = response.data.returnLp
    data.request.deliveryRemarks = response.data.deliveryRemarks
  })
}

const close = () => {
  data.errorInfos.returnLp = ''
  data.errorInfos.showErrReturnLp = false
  data.errorInfos.deliveryCode = ''
  data.errorInfos.showErrDeliveryCode = false
  Object.assign(data, getInitialData());
  dialog.value = false
}

watch(data, () => (
  console.log('watch')
))

watch(
  () => data.request.returnLp,
  () => {
    data.errorInfos.returnLp = ''
    data.errorInfos.deliveryCode = ''
    data.errorInfos.showErrReturnLp = false
    data.errorInfos.showErrDeliveryCode = false
  }
)

defineExpose({
  open
})

</script>

<style scoped>
.border-date {
  border: 1px solid #e5e7eb;
}
</style>
