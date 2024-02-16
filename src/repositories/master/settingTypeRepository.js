import Axios from '@/plugins/axios'

export default {
  searchAll(request, isLoading = true) {
    return Axios.POST(false, 'cg/api/SettingTypeMst/searchAll', request, isLoading)
  },
  add(request) {
    return Axios.POST(true, 'cg/api/SettingTypeMst/add', request)
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/SettingTypeMst/delete', request)
  },
  update(request) {
    return Axios.POST(true, 'cg/api/SettingTypeMst/update', request)
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/SettingTypeMst/getById', id)
  }
}
