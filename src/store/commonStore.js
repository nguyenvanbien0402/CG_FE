import {defineStore} from 'pinia';
import {ROLE_SELECTED, STATUS_SELECTED, TABLE_SELECTED} from "@/constants/constant";
import {RepositoryFactory} from "@/repositories/repositoryFactory";

const MenuRepository = RepositoryFactory.get('menu')

export const useCommonStore = defineStore({
  id: 'common',
  state: () => {
    return {
      _isShowSidebar: true,
      _breadcrumb: null,
      _tableMigration: [],
      _status: [],
      _role: [],
      _menu: [],
      _pagination: {},
      _activeMenu: null,
      _baseMenu: null
    }
  },
  getters: {
    isShowSidebar: (state) => state._isShowSidebar,
    breadcrumb: (state) => state._breadcrumb,
    getStatus(state) {
      return state._status
    },
    getRole(state) {
      return state._role
    },
    getMenu(state) {
      return state._menu
    },
    getPagination(state) {
      return state._pagination
    },
    getActiveMenu(state) {
      return state._activeMenu
    },
    getBaseMenu(state) {
      return state._baseMenu
    },
    getTableMigration(state) {
      return state._tableMigration
    }
  },
  actions: {
    setPagination(state, pagination) {
      state._pagination = pagination
    },
    setShowSidebar(state, isShowSidebar) {
      state._isShowSidebar = isShowSidebar
    },
    setBreadcrumb(state, value) {
      state._breadcrumb = value
    },
    async fetchStatusList() {
      this._status = STATUS_SELECTED
    },
    async fetchTableMigrationList() {
      this._tableMigration = TABLE_SELECTED
    },
    async fetchRoleUser() {
      this._role = ROLE_SELECTED
    },
    async fetchMenu() {
      this._menu = []
      const dataResponse = []
      await MenuRepository.findAllMenu().then((response) => {
        response.data.forEach((s) => {
          dataResponse.push(s)
        })
      })
      this._menu = dataResponse
    },
    setActiveMenu(state, value) {
      state._activeMenu = value
    },
    setBaseMenu(state, value) {
      state._baseMenu = value
    },
  }
})
