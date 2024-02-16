import {defineStore} from 'pinia';
import {ROLE_SELECTED, STATUS_SELECTED, TABLE_SELECTED} from "@/constants/constant";
import {RepositoryFactory} from "@/repositories/repositoryFactory";

const UserRepository = RepositoryFactory.get('user')

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      _user: [],
    }
  },
  getters: {
    getUser(state) {
      return state._user
    }
  },
  actions: {
    async fetchUser() {
      const dataResponse = []
      await UserRepository.getAllUser().then((response) => {
        response.data.forEach((s) => {
          dataResponse.push({ label: s.fullName, value: s.userId })
        })
      })
      this._user = dataResponse
    }
  }
})
