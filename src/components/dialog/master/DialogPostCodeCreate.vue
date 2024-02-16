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
        <v-toolbar-title>
          {{ $t('dialogName.master.postCode.edit') }}
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
        class="py-1 px-7 rounded-0"
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
                     :class="data.errorInfos.showErrPostCode ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('postCode.postCode') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.postCode"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrPostCode"
                  :error="data.errorInfos.showErrPostCode"
                  :error-messages="data.errorInfos.postCode"
                  :readonly="true"
                  class="bg-gray-200"
                  density="compact"
                  maxlength="255"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="2"
                     cols="12"
                     class ="d-flex align-center"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('postCode.city') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.city"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  hide-details
                  clearable
                  density="compact"
                  maxlength="20"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="2"
                     cols="12"
                     class ="d-flex align-center"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('postCode.district') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.district"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  hide-details
                  clearable
                  density="compact"
                  maxlength="50"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="2"
                     cols="12"
                     class ="d-flex align-center"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('postCode.street') }}
                </span>
              </v-col>
              <v-col
                lg="10"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.street"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  hide-details
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
const PostCodeRepository = RepositoryFactory.get('postCode')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const idUpdate = ref(null)

const getInitialData = () => ({
  valid: false,
  request: {
    postCode: null,
    city: null,
    district: null,
    street: null
  },
  errorInfos: {
    postCode: '',
    showErrPostCode: false
  }
});

const data = reactive(getInitialData())

// Function
const open = (id) => {
  if (id) {
    idUpdate.value = id
    let request = {
      postCode: id
    }
    Object.assign(data, getInitialData());
    getDataUpdate(request)
  } else {
    Object.assign(data, getInitialData());
  }
  return dialog.value = true
}

const apply = () => {
    let request = {
      postCode: idUpdate.value,
      city: data.request.city ? data.request.city : null,
      district: data.request.district ? data.request.district : null,
      street: data.request.street ? data.request.street : null,
    }
    update(request)
}


const update = (request) => {
  PostCodeRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrPostCode = false
      data.errorInfos.postCode = ''
      response.data.forEach(error => {
        if (error.fieldName === "postCode") {
          data.errorInfos.postCode = error.errorCode
          data.errorInfos.showErrPostCode = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  PostCodeRepository.getById(request).then(function (response) {
    data.request.postCode = response.data.postCode
    data.request.city = response.data.city
    data.request.district = response.data.district
    data.request.street = response.data.street
  })
}

const close = () => {
  data.errorInfos.postCode = ''
  data.errorInfos.showErrPostCode = false
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

<style lang="scss" scoped>
</style>
