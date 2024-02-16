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
          {{ $t('dialogName.master.financeType.add') }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('dialogName.master.financeType.edit') }}
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
              <v-col lg="2"
                     cols="12"
                     :class="data.errorInfos.showErrName ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('financeType.name') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.name"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrName"
                  :error="data.errorInfos.showErrName"
                  :error-messages="data.errorInfos.name"
                  clearable
                  density="compact"
                  maxlength="255"
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
// Initial
const FinanceTypeRepository = RepositoryFactory.get('financeType')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const idUpdate = ref(null)
const isAddNew = ref(true)

const getInitialData = () => ({
  valid: false,
  showUserName: false,
  request: {
    name: null,
    isActive: null
  },
  errorInfos: {
    name: '',
    showErrName: false
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
      name: data.request.name ? data.request.name : null
    }
    addNew(request)
  } else {
    let request = {
      financeTypeId: idUpdate.value,
      name: data.request.name ? data.request.name : null,
      isActive: data.request.isActive
    }
    update(request)
  }

}

const addNew = (request) => {
  FinanceTypeRepository.add(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success add')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrName = false
      data.errorInfos.name = ''
      response.data.forEach(error => {
        if (error.fieldName === "name") {
          data.errorInfos.name = error.errorCode
          data.errorInfos.showErrName = true
        }
      })
    }
  })
}

const update = (request) => {
  FinanceTypeRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrName = false
      data.errorInfos.name = ''
      response.data.forEach(error => {
        if (error.fieldName === "name") {
          data.errorInfos.name = error.errorCode
          data.errorInfos.showErrName = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  FinanceTypeRepository.getById(request).then(function (response) {
    data.request.name = response.data.name
    data.request.isActive = response.data.isActive
  })
}

const close = () => {
  data.errorInfos.name = ''
  data.errorInfos.showErrName = false
  Object.assign(data, getInitialData());
  dialog.value = false
}

watch(data, () => (
  console.log('watch')
))

watch(
  () => data.request.name,
  () => {
    data.errorInfos.name = ''
    data.errorInfos.showErrName = false
  }
)

defineExpose({
  open
})

</script>

<style lang="scss" scoped>
</style>
