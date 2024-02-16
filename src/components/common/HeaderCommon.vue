<template>
  <section class="relative">
    <div
      class="flex items-stretch justify-between fixed top-0 left-0 right-0 h-12 bg-white border-solid border-b-2 border-blue-500"
      style="z-index: 1000;"
    >
      <div class="flex basis-80 items-stretch justify-between ml-14">
        <div class="ml-10">
          <a href="/user-list">
            <img
              src="@/assets/images/logo.png"
              alt="Avatar"
              class="w-12 items-center"
            />
          </a>
        </div>
        <div class="pt-3">
          <i class="fa-solid fa-bars fa-xl"
             @click="displaySidebar()"
          ></i>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="info-account w-48">
          <div class="h-full flex justify-between">
            <v-menu>
              <template #activator="{ props }">
                <v-btn variant="text"
                       height="auto"
                       class="w-100"
                       v-bind="props"
                >
                  <i class="fa-solid fa-user mr-1"
                     style="color: #000000;"
                  ></i>
                  <span class="text-xs wrap_text"> {{ data.userName }}</span>
                </v-btn>
              </template>
              <v-list>
                <template v-for="(p, i) in items">
                  <v-divider
                    v-if="p.divider"
                    :key="`divider-${i}`"
                    class="mb-2 mt-2 border-opacity-100"
                  />
                  <div
                    v-else
                    :key="`item-${i}`"
                    :class="`text-${p.color ? p.color : 'black'}-500 pa-2 __hover-bar-item cursor-pointer`"
                    @click="actionAccount(p.key)"
                  >
                    <v-icon
                      class="px-1"
                      style="color: inherit;"
                    >
                      {{ p.icon }}
                    </v-icon>
                    <span class="font-weight-regular">{{ p.title }}</span>
                  </div>
                </template>
              </v-list>
            </v-menu>
            <modal-change-password ref="refModalChangePassword"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useCommonStore} from "@/store/commonStore";
import {useAuthStore} from "@/store/authStore";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from 'vue-router'
import { useCookies } from "vue3-cookies";
import {RepositoryFactory} from '@/repositories/repositoryFactory';
import ModalChangePassword from '@/components/dialog/ChangePassword.vue';
import Chart from "chart.js/auto";

const refModalChangePassword = ref(null)
const commonStore = useCommonStore();
const authStore = useAuthStore();

const user = JSON.parse(localStorage.getItem('user'))

const data = reactive({
  userName: null
})

const router = useRouter()

const displaySidebar = () => {
  console.log(commonStore._isShowSidebar)
  commonStore.setShowSidebar(commonStore, !commonStore._isShowSidebar)
  console.log(commonStore._isShowSidebar)
  // commonStore.commit("setShowSidebar", !commonStore.isShowSidebar);
};

const items = [
  {title: 'Change password', icon: 'mdi-lock-outline', key: 'change-password'},
  {divider: true},
  {title: 'Logout', icon: 'mdi-logout', key: 'logout', color: 'red'},
]

const actionAccount = (key) => {
  if (key === 'profile') {
    this.$router.push('/profile')
  } else if (key === 'change-password') {
    refModalChangePassword.value.open()
  } else if (key === 'logout') {
    authStore.logout();
    router.push('/login');
  }
}

onMounted(() => {
  if (user) {
    data.userName = user.userName
  }
})

</script>
<style scoped>
i:hover {
  background-color: rgba(176, 170, 170, 0.5);
  color: rgba(41, 27, 198, 1);
}
.info-account:hover {
  background-color: rgba(222, 216, 216, 0.5);
  color: rgba(41, 27, 198, 1);
}
.__hover-bar-item:hover {
  border-radius: .25rem;
  background-color: #EEEEEE;
}
</style>
