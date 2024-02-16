<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      color="#F0F4F7"
      @click="rail = false"
      rail-width="72"
      width="300"
    >
      <v-list-item class="mt-2" prepend-avatar="/src/assets/logo.png" @click.stop="rail = !rail">
        <div v-if="!rail" class="text-7xl font-bold text-black-500 drop-shadow-lg shadow-black">
          <p style="font-size: 18px">
            CastGl<span style="color: #c2c215">o</span>balGr<span style="color: #da1182">o</span>up
          </p>
          <p style="font-weight: bold" class="text-sm">司法書士法人キャストグローバル</p>
        </div>
      </v-list-item>

      <v-divider class="mb-2 mt-2 border-opacity-100"></v-divider>

      <default-list />
    </v-navigation-drawer>

    <v-app-bar app>
      <div class="w-full flex flex-row justify-between">
        <v-app-bar-nav-icon class="ml-2" @click.stop="toggleSidebar"></v-app-bar-nav-icon>
        <div class="w-full flex flex-row justify-between align-center">
          <span class="font-weight-medium">
            {{ nameScreen ? nameScreen.name : nameScreen }}
          </span>
        </div>
        <div class="info-account w-48">
          <div class="h-full flex justify-between">
            <v-menu>
              <template #activator="{ props }">
                <v-btn variant="text" height="auto" class="w-100" v-bind="props">
                  <i class="fa-solid fa-user mr-1" style="color: #000000"></i>
                  <span class="text-xs wrap_text"> {{ data.userName }}</span>
                </v-btn>
              </template>
              <v-list>
                <template v-for="(p, i) in userItems">
                  <v-divider
                    v-if="p.divider"
                    :key="`divider-${i}`"
                    class="mb-2 mt-2 border-opacity-100"
                  />
                  <div
                    v-else
                    :key="`item-${i}`"
                    :class="`text-${
                      p.color ? p.color : 'black'
                    }-500 pa-2 __hover-bar-item cursor-pointer`"
                    @click="actionAccount(p.key)"
                  >
                    <v-icon class="px-1" style="color: inherit">
                      {{ p.icon }}
                    </v-icon>
                    <span class="font-weight-regular">{{ p.title }}</span>
                  </div>
                </template>
              </v-list>
            </v-menu>
            <modal-change-password ref="refModalChangePassword" />
          </div>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import DefaultList from '@/layouts/sidebar/List.vue'
import { useCommonStore } from '@/store/commonStore'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'
import ModalChangePassword from '@/components/dialog/ChangePassword.vue'

const refModalChangePassword = ref(null)
const commonStore = useCommonStore()
const authStore = useAuthStore()

const user = JSON.parse(localStorage.getItem('user'))

const data = reactive({
  userName: null
})

const nameScreen = computed(() => {
  return commonStore.breadcrumb
})
const router = useRouter()

const displaySidebar = () => {
  commonStore.setShowSidebar(commonStore, !commonStore._isShowSidebar)
}

const userItems = [
  { title: 'Change password', icon: 'mdi-lock-outline', key: 'change-password' },
  { divider: true },
  { title: 'Logout', icon: 'mdi-logout', key: 'logout', color: 'red' }
]

const actionAccount = (key) => {
  if (key === 'profile') {
    this.$router.push('/profile')
  } else if (key === 'change-password') {
    refModalChangePassword.value.open()
  } else if (key === 'logout') {
    authStore.logout()
    router.push('/login')
  }
}

onMounted(async () => {
  if (user) {
    data.userName = user.userName
  }
})

const breadscrum = computed(() => {
  return commonStore.breadcrumb
})

watch(breadscrum, () => {
  let currentUri = window.location.href
  commonStore.getMenu.forEach((base) => {
    base.items.forEach((sub) => {
      if (currentUri.includes(sub.to)) {
        nameScreen.value = sub.title
      }
    })
  })
})

const drawer = ref(true)
const rail = ref(false)

const items = ref([])

const toggleSidebar = () => {
  rail.value = !rail.value
}
</script>
<style>
.v-navigation-drawer--rail:not(.v-navigation-drawer--is-hovering) .v-list .v-avatar {
  --v-avatar-height: 40px !important;
}
</style>
