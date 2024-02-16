import { defineStore } from 'pinia';
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {useCookies} from "vue3-cookies";
import {useCommonStore} from "@/store/commonStore";

const AuthRepository = RepositoryFactory.get('auth')
const {cookies} = useCookies();
const commonStore = useCommonStore()

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null
  }),
  actions: {
    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      commonStore.setBaseMenu(commonStore, null)
      AuthRepository.logout();
      localStorage.removeItem('user')
      cookies.remove('Authorization');
      this.user = null
    },
  },
})

