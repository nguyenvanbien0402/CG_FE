<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="40%"
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
          {{ $t('dialogName.master.projectType.add') }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('dialogName.master.projectType.edit') }}
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
                     :class="data.errorInfos.showErrProjectTypeName ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('projectType.projectTypeName') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.projectTypeName"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrProjectTypeName"
                  :error="data.errorInfos.showErrProjectTypeName"
                  :error-messages="data.errorInfos.projectTypeName"
                  clearable
                  density="compact"
                  maxlength="50"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrPowerOfAttorneyCancel ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('projectType.powerOfAttorneyCancel') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.powerOfAttorneyCancel"
                  color="info"
                  variant="outlined"
                  density="compact"
                  clearable
                  :hide-details="!data.errorInfos.showErrPowerOfAttorneyCancel"
                  :error="data.errorInfos.showErrPowerOfAttorneyCancel"
                  :error-messages="data.errorInfos.powerOfAttorneyCancel"
                  type="number"
                  :max="MAX_NUMBER_10_CHAR"
                  :oninput="validateInputPowerOfAttorneyCancel"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrNumberDelStroke ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('projectType.numberDelStroke') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.numberDelStroke"
                  color="info"
                  variant="outlined"
                  density="compact"
                  clearable
                  :hide-details="!data.errorInfos.showErrNumberDelStroke"
                  :error="data.errorInfos.showErrNumberDelStroke"
                  :error-messages="data.errorInfos.numberDelStroke"
                  type="number"
                  :max="MAX_NUMBER_10_CHAR"
                  :oninput="validateInputNumberDelStroke"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrIdentificationText ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('projectType.identificationText') }}
                </span>
              </v-col>
              <v-col
                lg="9"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.identificationText"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrIdentificationText"
                  :error="data.errorInfos.showErrIdentificationText"
                  :error-messages="data.errorInfos.identificationText"
                  clearable
                  density="compact"
                  maxlength="100"
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
import {reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {MAX_NUMBER_10_CHAR} from "@/constants/constant";
// Initial
const ProjectTypeRepository = RepositoryFactory.get('projectType')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const idUpdate = ref(null)
const isAddNew = ref(true)

const getInitialData = () => ({
  valid: false,
  showUserName: false,
  request: {
    projectTypeName: null,
    powerOfAttorneyCancel: null,
    numberDelStroke: null,
    identificationText: null,
    isActive: null
  },
  errorInfos: {
    projectTypeName: '',
    powerOfAttorneyCancel: '',
    numberDelStroke: '',
    identificationText: '',
    showErrProjectTypeName: false,
    showErrPowerOfAttorneyCancel: false,
    showErrNumberDelStroke: false,
    showErrIdentificationText: false
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

const validateInputPowerOfAttorneyCancel = () => {
  if (Number(data.request.powerOfAttorneyCancel) > MAX_NUMBER_10_CHAR) {
    data.request.powerOfAttorneyCancel = data.request.powerOfAttorneyCancel.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}

const validateInputNumberDelStroke = () => {
  if (Number(data.request.numberDelStroke) > MAX_NUMBER_10_CHAR) {
    data.request.numberDelStroke = data.request.numberDelStroke.substring(0, MAX_NUMBER_10_CHAR.toString().length)
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
      projectTypeName: data.request.projectTypeName ? data.request.projectTypeName : null,
      powerOfAttorneyCancel: data.request.powerOfAttorneyCancel,
      numberDelStroke: data.request.numberDelStroke,
      identificationText: data.request.identificationText ? data.request.identificationText : null
    }
    addNew(request)
  } else {
    let request = {
      projectTypeId: idUpdate.value,
      projectTypeName: data.request.projectTypeName ? data.request.projectTypeName : null,
      powerOfAttorneyCancel: data.request.powerOfAttorneyCancel,
      numberDelStroke: data.request.numberDelStroke,
      identificationText: data.request.identificationText ? data.request.identificationText : null,
      isActive: data.request.isActive
    }
    update(request)
  }

}

const addNew = (request) => {
  ProjectTypeRepository.add(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success add')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrProjectTypeName = false
      data.errorInfos.showErrPowerOfAttorneyCancel = false
      data.errorInfos.showErrNumberDelStroke = false
      data.errorInfos.showErrIdentificationText = false
      data.errorInfos.projectTypeName = ''
      data.errorInfos.powerOfAttorneyCancel = ''
      data.errorInfos.numberDelStroke = ''
      data.errorInfos.identificationText = ''
      response.data.forEach(error => {
        if (error.fieldName === "projectTypeName") {
          data.errorInfos.projectTypeName = error.errorCode
          data.errorInfos.showErrProjectTypeName = true
        }
        if (error.fieldName === "powerOfAttorneyCancel") {
          data.errorInfos.powerOfAttorneyCancel = error.errorCode
          data.errorInfos.showErrPowerOfAttorneyCancel = true
        }
        if (error.fieldName === "numberDelStroke") {
          data.errorInfos.numberDelStroke = error.errorCode
          data.errorInfos.showErrNumberDelStroke = true
        }
        if (error.fieldName === "identificationText") {
          data.errorInfos.identificationText = error.errorCode
          data.errorInfos.showErrIdentificationText = true
        }
      })
    }
  })
}

const update = (request) => {
  ProjectTypeRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrProjectTypeName = false
      data.errorInfos.showErrPowerOfAttorneyCancel = false
      data.errorInfos.showErrNumberDelStroke = false
      data.errorInfos.showErrIdentificationText = false
      data.errorInfos.projectTypeName = ''
      data.errorInfos.powerOfAttorneyCancel = ''
      data.errorInfos.numberDelStroke = ''
      data.errorInfos.identificationText = ''
      response.data.forEach(error => {
        if (error.fieldName === "projectTypeName") {
          data.errorInfos.projectTypeName = error.errorCode
          data.errorInfos.showErrProjectTypeName = true
        }
        if (error.fieldName === "powerOfAttorneyCancel") {
          data.errorInfos.powerOfAttorneyCancel = error.errorCode
          data.errorInfos.showErrPowerOfAttorneyCancel = true
        }
        if (error.fieldName === "numberDelStroke") {
          data.errorInfos.numberDelStroke = error.errorCode
          data.errorInfos.showErrNumberDelStroke = true
        }
        if (error.fieldName === "identificationText") {
          data.errorInfos.identificationText = error.errorCode
          data.errorInfos.showErrIdentificationText = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  ProjectTypeRepository.getById(request).then(function (response) {
    data.request.projectTypeName = response.data.projectTypeName
    data.request.powerOfAttorneyCancel = response.data.powerOfAttorneyCancel
    data.request.numberDelStroke = response.data.numberDelStroke
    data.request.identificationText = response.data.identificationText
    data.request.isActive = response.data.isActive
  })
}

const close = () => {
  data.errorInfos.showErrProjectTypeName = false
  data.errorInfos.showErrPowerOfAttorneyCancel = false
  data.errorInfos.showErrNumberDelStroke = false
  data.errorInfos.showErrIdentificationText = false
  data.errorInfos.projectTypeName = ''
  data.errorInfos.powerOfAttorneyCancel = ''
  data.errorInfos.numberDelStroke = ''
  data.errorInfos.identificationText = ''
  Object.assign(data, getInitialData());
  dialog.value = false
}

watch(
  () => data.request.projectTypeName,
  () => {
    data.errorInfos.projectTypeName = ''
    data.errorInfos.showErrProjectTypeName = false
  }
)

watch(data, () => (
  console.log('watch')
))
defineExpose({
  open
})

</script>

<style lang="scss" scoped>
</style>
