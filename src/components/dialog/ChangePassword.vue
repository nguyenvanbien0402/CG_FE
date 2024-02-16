<template>
  <v-dialog
    scrollable
    v-model="dialog"
    max-width="30%"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="rounded-lg">
      <v-toolbar
        dark
        color="info"
      >
        <v-toolbar-title>{{ $t('dialogName.changePassword') }}</v-toolbar-title>
        <v-spacer/>
        <v-btn
          icon
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card
        class="px-4 pt-4 rounded-0"
        elevation="0"
      >
        <v-form
          ref="form"
          @submit.prevent
        >
          <v-row dense
                 class="mx-2 my-2"
          >
            <v-col
              lg="3"
              cols="12"
              :class="data.errorInfos.currentPassword ? 'mt-3' : 'd-flex align-center'"
            >
              <span
                class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
              >
                {{ $t('changePassword.currentPassword') }}
              </span>
            </v-col>
            <v-col
              lg="9"
              cols="12"
            >
              <v-text-field
                v-model="data.request.currentPassword"
                maxlength="30"
                dense
                variant="outlined"
                density="compact"
                :append-icon="data.showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="data.showCurrentPassword ? 'text' : 'password'"
                :hide-details="!data.errorInfos.showErrCurrentPassword"
                :error="data.errorInfos.showErrCurrentPassword"
                :error-messages="data.errorInfos.currentPassword"
                @input="() => { data.errorInfos.currentPassword = null; }"
                @click:append="data.showCurrentPassword = !data.showCurrentPassword"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense
                 class="mx-2 my-2"
          >
            <v-col
              lg="3"
              cols="12"
              :class="data.errorInfos.newPassword ? 'mt-3' : 'd-flex align-center'"
            >
              <span
                class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
              >
                {{ $t('changePassword.newPassword') }}
              </span>
            </v-col>
            <v-col
              lg="9"
              cols="12"
            >
              <v-text-field
                v-model="data.request.newPassword"
                maxlength="30"
                dense
                variant="outlined"
                density="compact"
                :append-icon="data.showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="data.showNewPassword ? 'text' : 'password'"
                :hide-details="!data.errorInfos.showErrNewPassword"
                :error="data.errorInfos.showErrNewPassword"
                :error-messages="data.errorInfos.newPassword"
                @input="() => { data.errorInfos.newPassword = null; }"
                @click:append="data.showNewPassword = !data.showNewPassword"
              ></v-text-field>
            </v-col>
          </v-row>


          <v-row dense
                 class="mx-2 my-2"
          >
            <v-col
              lg="3"
              cols="12"
              :class="data.errorInfos.confirmPassword ? 'mt-3' : 'd-flex align-center'"
            >
              <span
                class="text-sm-left float-sm-left font-weight-medium text-sm-body-2"
              >
                {{ $t('changePassword.repeatPassword') }}
              </span>
            </v-col>
            <v-col
              lg="9"
              cols="12"
            >
              <v-text-field
                v-model="data.request.confirmPassword"
                maxlength="30"
                dense
                variant="outlined"
                density="compact"
                :append-icon="data.showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="data.showConfirmPassword ? 'text' : 'password'"
                :hide-details="!data.errorInfos.showErrConfirmPassword"
                :error="data.errorInfos.showErrConfirmPassword"
                :error-messages="data.errorInfos.confirmPassword"
                @input="() => { data.errorInfos.confirmPassword = null; }"
                @click:append="data.showConfirmPassword = !data.showConfirmPassword"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card>

      <v-card-actions
        class="flex-row-reverse mt-3"
      >
        <v-btn
          color="info"
          class="text-sm mb-2"
          variant="flat"
          @click="save()"
        >
          {{ $t('btn.apply') }}
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
  </v-dialog>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {RepositoryFactory} from "@/repositories/repositoryFactory";

const UserRepository = RepositoryFactory.get('user')

const data = reactive({
  valid: false,
  showCurrentPassword: false,
  showNewPassword: false,
  showConfirmPassword: false,
  request: {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  },
  errorInfos: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showErrCurrentPassword: false,
    showErrNewPassword: false,
    showErrConfirmPassword: false
  }
})

const open = () => {
  data.errorInfos.currentPassword = ''
  data.errorInfos.newPassword = ''
  data.errorInfos.confirmPassword = ''
  data.errorInfos.showErrCurrentPassword = false
  data.errorInfos.showErrNewPassword = false
  data.errorInfos.showErrConfirmPassword = false
  return dialog.value = true
}
const save = () => {
  let request = {
    currentPassword : data.request.currentPassword,
    newPassword : data.request.newPassword,
    confirmPassword : data.request.confirmPassword
  }
  UserRepository.changePassword(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success add')
      dialog.value = false
      emit('apply')
    } else {
      data.errorInfos.currentPassword = ''
      data.errorInfos.newPassword = ''
      data.errorInfos.confirmPassword = ''
      data.errorInfos.showErrCurrentPassword = false
      data.errorInfos.showErrNewPassword = false
      data.errorInfos.showErrConfirmPassword = false
      response.data.forEach(error => {
        if (error.fieldName === "currentPassword") {
          data.errorInfos.currentPassword = error.errorCode
          data.errorInfos.showErrCurrentPassword = true
        }
        if (error.fieldName === "newPassword") {
          data.errorInfos.newPassword = error.errorCode
          data.errorInfos.showErrNewPassword = true
        }
        if (error.fieldName === "confirmPassword") {
          data.errorInfos.confirmPassword = error.errorCode
          data.errorInfos.showErrConfirmPassword = true
        }
      })
    }
  })
}

const close = () => {
  data.errorInfos.currentPassword = ''
  data.errorInfos.newPassword = ''
  data.errorInfos.confirmPassword = ''
  data.errorInfos.showErrCurrentPassword = false
  data.errorInfos.showErrNewPassword = false
  data.errorInfos.showErrConfirmPassword = false
  return dialog.value = false
}

watch(
  () => data.request.currentPassword,
  () => {
    data.errorInfos.currentPassword = ''
    data.errorInfos.showErrCurrentPassword = false
  }
)
watch(
  () => data.request.newPassword,
  () => {
    data.errorInfos.newPassword = ''
    data.errorInfos.showErrNewPassword = false
  }
)
watch(
  () => data.request.confirmPassword,
  () => {
    data.errorInfos.confirmPassword = ''
    data.errorInfos.showErrConfirmPassword = false
  }
)
defineExpose({
  open
})

const dialog = ref(false)
</script>

<style lang="scss" scoped>

</style>
