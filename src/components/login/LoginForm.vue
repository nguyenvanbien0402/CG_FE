<template>
  <div class="center-div">
    <!-- Nội dung của khối div ở đây -->
    <v-card
      class="mx-auto"
      align="center"
      color="transparent"
      width="500px"
      min-height="500px"
    >
      <v-img
        height="100px"
        width="100px"
        cover
      ></v-img>

      <v-card-title>
        <span class="_logo-text">
          CastGl<span style="color: rgb(194, 194, 21);">o</span>balGr<span
            style="color: rgb(218, 17, 130);"
          >o</span>up
        </span>
      </v-card-title>

      <v-card-text class="mt-5">
        <v-form
          ref="form"
          class="text-left max-width-350"
          lazy-validation
        >
          <v-text-field
            v-model="data.username"
            variant="outlined"
            density="comfortable"
            rounded
            prepend-inner-icon="mdi-account"
            color="info"
            :error="data.errorInfos.showErrUserName"
            :error-messages="data.errorInfos.userName"
            @keydown.enter="login"
          />
          <v-text-field
            v-model="data.password"
            type="password"
            color="info"
            variant="outlined"
            density="comfortable"
            rounded
            prepend-inner-icon="mdi-lock"
            :error="data.errorInfos.showErrPassword"
            :error-messages="data.errorInfos.password"
            @keydown.enter="login"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="max-width-350">
        <v-btn
          block
          size="large"
          rounded="lg"
          style="max-width: 50px!important;"
          color="info"
          class="px-5"
          variant="flat"
          @click="login"
        >
          ログインする
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>

import {useCookies} from "vue3-cookies";
import {useAuthStore} from "@/store/authStore";
import {useRouter} from "vue-router";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {onMounted, reactive} from "vue";

const {cookies} = useCookies()
const authStore = useAuthStore()

let router = useRouter()
const AuthRepository = RepositoryFactory.get('auth')

const getInitialData = () => ({
  username: null,
  password: null,
  errorInfos: {
    userName: '',
    password: '',
    showErrUserName: false,
    showErrPassword: false
  }
});

const data = reactive(getInitialData())

const login = () => {
  let request = {
    username: data.username,
    password: data.password,
  }

  AuthRepository.login(request).then((response) => {
    if (response && response.code === 'ES200') {
      cookies.set('Authorization', response.data.accessToken, 8640000)
      authStore.setUser(response.data.userMasterMst)
      router.push('user-list')
    } else {
      if (response.message.includes('Username')) {
        data.errorInfos.userName = response.message
        data.errorInfos.showErrUserName = true
        data.errorInfos.password = ''
        data.errorInfos.showErrPassword = false
      } else {
        if (response.message.includes('Password')) {
          data.errorInfos.password = response.message
          data.errorInfos.showErrPassword = true
          data.errorInfos.userName = ''
          data.errorInfos.showErrUserName = false
        }
      }
    }

  })
}

onMounted(() => {
  data.errorInfos.userName = ''
  data.errorInfos.password = ''
  data.errorInfos.showErrUserName = false
  data.errorInfos.showErrPassword = false
})

</script>
<style scoped>
.center-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFF;
  width: 500px;
  height: 500px;
}

.max-width-350 {
  max-width: 350px !important;
}

.max-width-200 {
  max-width: 200px !important;
}

._logo-text {
  font-size: 28px !important;
  background: -webkit-linear-gradient(#a0e3f8, #064579);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
