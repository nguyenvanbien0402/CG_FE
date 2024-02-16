import { defineStore } from 'pinia'
import { RepositoryFactory } from '@/repositories/repositoryFactory'

const ContractTypeRepository = RepositoryFactory.get('contractType')
const FinanceTypeRepository = RepositoryFactory.get('financeType')
const LocationRepository = RepositoryFactory.get('location')
const ProjectTypeRepository = RepositoryFactory.get('projectType')
const UserRepository = RepositoryFactory.get('user')
const SettingTypeRepository = RepositoryFactory.get('settingType')
const EquityRepository = RepositoryFactory.get('equity')

export const useDocumentStore = defineStore({
  id: 'document',
  state: () => ({
    request: {
      size: 1000,
      page: 1
    },
    _contractTypes: [],
    _financeTypes: [],
    _locations: [],
    _projectTypes: [],
    _userManages: [],
    _settingTypes: [],
    _equityTypes: []
  }),
  getters: {
    getContractTypes(state) {
      return state._contractTypes
    },
    getFinanceTypes(state) {
      return state._financeTypes
    },
    getLocations(state) {
      return state._locations
    },
    getProjectTypes(state) {
      return state._projectTypes
    },
    getUserManages(state) {
      return state._userManages
    },
    getSettingType(state) {
      return state._settingTypes
    },
    getEquityType(state) {
      return state._equityTypes
    },
    getAllUserName(state) {
      return state._userManages.filter((s) => s.title !== '')
    }
  },
  actions: {
    async fetchContractType() {
      const dataResponse = []
      await ContractTypeRepository.searchAll(this.request, false).then((response) => {
        response.data.contractTypeList.forEach((s) => {
          dataResponse.push({ title: s.name, value: s.contractId })
        })
        dataResponse.unshift({ title: '', value: null })
      })
      this._contractTypes = dataResponse
    },
    async fetchFinanceType() {
      const dataResponse = []
      await FinanceTypeRepository.searchAll(this.request, false).then((response) => {
        response.data.financeTypeList.forEach((s) => {
          dataResponse.push({ title: s.name, value: s.financeTypeId })
        })
        dataResponse.unshift({ title: '', value: null })
      })
      this._financeTypes = dataResponse
    },
    async fetchLocation(hasEmpty) {
      const dataResponse = []
      await LocationRepository.searchAll(this.request, false).then((response) => {
        response.data.locationList.forEach((s) => {
          dataResponse.push({ title: s.name, value: s.locationId })
        })
        if (hasEmpty) {
          dataResponse.unshift({ title: '', value: null })
        }
      })
      this._locations = dataResponse
    },
    async fetchProjectType() {
      const dataResponse = []
      await ProjectTypeRepository.searchAll(this.request, false).then((response) => {
        response.data?.projectTypeList.forEach((s) => {
          dataResponse.push({ title: s.projectTypeName, value: s.projectTypeId })
        })
        dataResponse.unshift({ title: '', value: null })
      })
      this._projectTypes = dataResponse
    },
    async fetchUserManage() {
      const dataResponse = []
      await UserRepository.searchAll(this.request, false).then((response) => {
        response.data.userResponseList.forEach((s) => {
          if (s.role !== 0) {
            dataResponse.push({ title: s.fullName, value: s.userId })
          }
        })
        dataResponse.unshift({ title: '', value: null })
      })
      this._userManages = dataResponse
    },
    async fetchSettingType() {
      const dataResponse = []
      await SettingTypeRepository.searchAll(this.request, false).then((response) => {
        response.data.settingTypeList.forEach((s) => {
          dataResponse.push({ title: s.settingType, value: s.settingTypeId })
        })
        dataResponse.unshift({ title: '', value: null })
      })
      this._settingTypes = dataResponse
    },
    async fetchEquityType() {
      const dataResponse = []
      await EquityRepository.searchAll(this.request, false).then((response) => {
        response.data.equityList.forEach((s) => {
          dataResponse.push({ title: s.equityCode, value: s.equity.toString() })
        })
        dataResponse.unshift('')
      })
      this._equityTypes = dataResponse
    }
  }
})
