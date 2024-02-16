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
                  class="text-sm-left float-sm-left font-weight-medium text-sm-body-2 mb-5 mt-3"
                >
                  {{ $t('recordCallLog.pic') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <Multiselect
                  v-model="data.request.pic"
                  :options="picFromUsers"
                  :searchable="false"
                  :can-clear="false"
                  :clear-on-select="false"
                  :clear-on-blur="false"
                  :clear-on-search="false"
                  :can-deselect="false"
                  :classes="{
                    containerActive: 'ring ring-blue-500 ring-opacity-10',
                    optionSelected: 'text-white bg-blue-500',
                    optionSelectedPointed: 'text-white bg-blue-500 opacity-80'}"
                />
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-4"
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
                  {{ $t('recordCallLog.contactDate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <VueDatePicker v-model="data.request.contactDate"
                               text-input
                               :select-text="$t('datePicker.select')"
                               :cancel-text="$t('datePicker.cancel')"
                               locale="ja"
                               :enable-time-picker="false"
                               :format="CommonFormatDate"
                ></VueDatePicker>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-7"
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
                  {{ $t('recordCallLog.estShipDocDate') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <VueDatePicker v-model="data.request.estShipDocDate"
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
            <v-row dense
                   class="mt-7"
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
                  {{ $t('recordCallLog.remarks') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                sm="12"
                cols="12"
              >
                <v-textarea
                  v-model="data.request.remarks"
                  color="info"
                  no-resize
                  rows="3"
                  dense
                  maxlength="255"
                  variant="outlined"
                  hide-details
                  density="compact"
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
import Multiselect from '@vueform/multiselect'
import {computed, onMounted, reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import VueDatePicker from '@vuepic/vue-datepicker';
import {useI18n} from "vue-i18n";
import {CommonFormatDate} from '@/common/helper';
import {useUserStore} from "@/store/userStore";

// Initial
const RecordCallLogRepository = RepositoryFactory.get('recordCallLog')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const {t} = useI18n()

const userStore = useUserStore()

const picFromUsers = computed(() => userStore.getUser)

const getInitialData = () => ({
  valid: false,
  selectText: t('datePicker.select'),
  cancelText: t('datePicker.cancel'),
  showUserName: false,
  request: {
    contactDate: null,
    pic: null,
    estShipDocDate: null,
    remarks: '',
  },
  errorInfos: {
    contactDate: null,
    estShipDocDate: null,
    showErrContactDate: false,
    showErrEstShipDocDate: false
  },
  projectNo: null,
  searchTerm: "",
  pics: [],
  picsCopy: [],
  selectedPics: null
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
    contactDate: data.request.contactDate,
    pic: data.request.pic,
    estShipDocDate: data.request.estShipDocDate,
    remarks: data.request.remarks
  }]
  update(request)

}

const update = (request) => {
  RecordCallLogRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.contactDate = ''
      data.errorInfos.estShipDocDate = ''
      data.errorInfos.showErrContactDate = false
      data.errorInfos.showErrEstShipDocDate = false
      response.data.forEach(error => {
        if (error.fieldName === "contactDate") {
          data.errorInfos.contactDate = error.errorCode
          data.errorInfos.showErrContactDate = true
        }
        if (error.fieldName === "estShipDocDate") {
          data.errorInfos.estShipDocDate = error.errorCode
          data.errorInfos.showErrEstShipDocDate = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  RecordCallLogRepository.getById(request).then(function (response) {
    data.request.contactDate = response.data.contactDate
    data.request.pic = response.data.pic
    data.request.estShipDocDate = response.data.estShipDocDate
    data.request.remarks = response.data.remarks
  })
}

const close = () => {
  data.errorInfos.contactDate = null
  data.errorInfos.estShipDocDate = null
  data.errorInfos.showErrContactDate = false
  data.errorInfos.showErrEstShipDocDate = false
  Object.assign(data, getInitialData());
  dialog.value = false
}

watch(data, () => (
  console.log('watch')
))
defineExpose({
  open
})

onMounted(async () => {

  await userStore.fetchUser()

})

</script>

<style scoped>
.border-date {
  border: 1px solid #e5e7eb;
}
</style>
