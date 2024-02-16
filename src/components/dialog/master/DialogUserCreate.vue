<template>
  <v-dialog
    v-model="dialog"
    scrollable
    no-click-animation
    max-width="40%"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg overflow-auto">
      <v-toolbar
        dark
        color="info"
        dense
      >
        <v-toolbar-title v-if="isAddNew">
          {{ $t('dialogName.master.user.add') }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t('dialogName.master.user.edit') }}
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
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrUserName ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('user.userName') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="8"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.userName"
                  maxlength="255"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrUserName"
                  :error="data.errorInfos.showErrUserName"
                  :error-messages="data.errorInfos.userName"
                  clearable
                  density="compact"
                  class="mw-450"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="9"
                     :class="data.errorInfos.showErrFullName ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('user.fullName') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="8"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.fullName"
                  maxlength="255"
                  autocomplete="new-password"
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrFullName"
                  :error="data.errorInfos.showErrFullName"
                  :error-messages="data.errorInfos.fullName"
                  clearable
                  density="compact"
                  class="mw-450"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isAddNew"
                   dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrPassword ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('user.password') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="8"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.password"
                  maxlength="255"
                  autocomplete="new-password"
                  color="info"
                  :type="data.showPassword ? 'text' : 'password'"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrPassword"
                  :error="data.errorInfos.showErrPassword"
                  :error-messages="data.errorInfos.password"
                  clearable
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1"
                     cols="12"
                     class="d-flex align-center"
              >
                <div>
                  <v-icon :icon="data.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          role="button"
                          :hide-details="!data.errorInfos.showErrPassword"
                          color="gray"
                          @click="data.showPassword = !data.showPassword"
                  ></v-icon>
                </div>
              </v-col>
            </v-row>
            <v-row v-if="isAddNew"
                   dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrConfirmPassword ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('user.confirmPassword') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="8"
                cols="12"
              >
                <v-text-field
                  v-model="data.request.confirmPassword"
                  maxlength="255"
                  autocomplete="new-password"
                  color="info"
                  :type="data.showConfirmPassword ? 'text' : 'password'"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrConfirmPassword"
                  :error="data.errorInfos.showErrConfirmPassword"
                  :error-messages="data.errorInfos.confirmPassword"
                  clearable
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1"
                     cols="12"
                     class="d-flex align-center"
              >
                <div>
                  <v-icon :icon="data.showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          role="button"
                          :hide-details="!data.errorInfos.showErrConfirmPassword"
                          color="gray"
                          @click="data.showConfirmPassword = !data.showConfirmPassword"
                  ></v-icon>
                </div>
              </v-col>
            </v-row>
            <v-row dense
                   class="mt-2"
            >
              <v-col lg="3"
                     cols="12"
                     :class="data.errorInfos.showErrRole ? 'mt-3' : 'd-flex align-center'"
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('user.role') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="8"
                cols="12"
              >
                <v-select
                  v-model="data.request.role"
                  density="compact"
                  dense
                  color="info"
                  variant="outlined"
                  :hide-details="!data.errorInfos.showErrRole"
                  :items="roleList"
                  :error="data.errorInfos.showErrRole"
                  :error-messages="data.errorInfos.role"
                  class="mw-450"
                ></v-select>
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
import {computed, onMounted, reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {useCommonStore} from "@/store/commonStore";

// Initial
const store = useCommonStore()
const UserRepository = RepositoryFactory.get('user')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const roleList = computed(() =>
  store.getRole
)
const isAddNew = ref(true)
const idUpdate = ref(null)

const getInitialData = () => ({
  valid: false,
  request: {
    userName: null,
    fullName: null,
    password: null,
    confirmPassword: null,
    role: null,
    isActive: null
  },
  errorInfos: {
    userName: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    role: '',
    showErrUserName: false,
    showErrFullName: false,
    showErrPassword: false,
    showErrConfirmPassword: false,
    showErrRole: false
  },
  showPassword: false,
  showConfirmPassword: false
});

const data = reactive(getInitialData())

// Function
const open = (id) => {
  if (id) {
    idUpdate.value = id
    isAddNew .value = false
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
      userName: data.request.userName ? data.request.userName : null,
      fullName: data.request.fullName ? data.request.fullName : null,
      password: data.request.password ? data.request.password : null,
      confirmPassword: data.request.confirmPassword ? data.request.confirmPassword : null,
      role: data.request.role
    }
    addNew(request)
  } else {
    let request = {
      userId: idUpdate.value,
      userName: data.request.userName ? data.request.userName : null,
      fullName: data.request.fullName ? data.request.fullName : null,
      role: data.request.role,
      isActive: data.request.isActive
    }
    update(request)
  }

}

const addNew = (request) => {
  UserRepository.add(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success add')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrUserName = false
      data.errorInfos.showErrFullName = false
      data.errorInfos.showErrPassword = false
      data.errorInfos.showErrConfirmPassword = false
      data.errorInfos.showErrRole = false
      data.errorInfos.userName = ''
      data.errorInfos.fullName = ''
      data.errorInfos.password = ''
      data.errorInfos.confirmPassword = ''
      data.errorInfos.role = ''
      response.data.forEach(error => {
        if (error.fieldName === "userName") {
          data.errorInfos.userName = error.errorCode
          data.errorInfos.showErrUserName = true
        }
        if (error.fieldName === "fullName") {
          data.errorInfos.fullName = error.errorCode
          data.errorInfos.showErrFullName = true
        }
        if (error.fieldName === "password") {
          data.errorInfos.password = error.errorCode
          data.errorInfos.showErrPassword = true
        }
        if (error.fieldName === "confirmPassword") {
          data.errorInfos.confirmPassword = error.errorCode
          data.errorInfos.showErrConfirmPassword = true
        }
        if (error.fieldName === "role") {
          data.errorInfos.role = error.errorCode
          data.errorInfos.showErrRole = true
        }
      })
    }
  })
  // Object.assign(data, getInitialData());
}

const update = (request) => {
  UserRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.showErrUserName = false
      data.errorInfos.showErrFullName = false
      data.errorInfos.showErrRole = false
      data.errorInfos.userName = ''
      data.errorInfos.fullName = ''
      data.errorInfos.role = ''
      response.data.forEach(error => {
        if (error.fieldName === "userName") {
          data.errorInfos.userName = error.errorCode
          data.errorInfos.showErrUserName = true
        }
        if (error.fieldName === "fullName") {
          data.errorInfos.fullName = error.errorCode
          data.errorInfos.showErrFullName = true
        }
        if (error.fieldName === "role") {
          data.errorInfos.role = error.errorCode
          data.errorInfos.showErrRole = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  UserRepository.getById(request).then(function (response) {
    data.request.userName = response.data.userName
    data.request.fullName = response.data.fullName
    data.request.role = response.data.role
    data.request.isActive = response.data.isActive
  })
}

const close = () => {
  data.errorInfos.userName =  ''
  data.errorInfos.fullName =  ''
  data.errorInfos.password =  ''
  data.errorInfos.confirmPassword =  ''
  data.errorInfos.role =  ''
  data.errorInfos.showErrUserName =  false
  data.errorInfos.showErrFullName =  false
  data.errorInfos.showErrPassword =  false
  data.errorInfos.showErrConfirmPassword =  false
  data.errorInfos.showErrRole =  false
  Object.assign(data, getInitialData());
  dialog.value = false
}

watch(data, () => (
  console.log('watch')
))

watch(
  () => data.request.userName,
  () => {
    data.errorInfos.userName = ''
    data.errorInfos.showErrUserName = false
  }
)
watch(
  () => data.request.fullName,
  () => {
    data.errorInfos.fullName = ''
    data.errorInfos.showErrFullName = false
  }
)
watch(
  () => data.request.password,
  () => {
    data.errorInfos.password = ''
    data.errorInfos.showErrPassword = false
  }
)
watch(
  () => data.request.confirmPassword,
  () => {
    data.errorInfos.confirmPassword = ''
    data.errorInfos.showErrConfirmPassword = false
  }
)
watch(
  () => data.request.role,
  () => {
    data.errorInfos.role = ''
    data.errorInfos.showErrRole = false
  }
)

defineExpose({
  open
})

onMounted(async () => {
  await store.fetchRoleUser()
})
</script>

<style scoped>


</style>
