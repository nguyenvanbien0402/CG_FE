import Axios from '@/plugins/axios'

export default {
  searchAll(request, isLoading = true) {
    return Axios.POST(false, 'cg/api/UserMasterMst/searchAll', request, isLoading)
  },
  getAllUser(request) {
    return Axios.POST(false, 'cg/api/UserMasterMst/getAllUser', request)
  },
  add(request) {
    return Axios.POST(true, 'cg/api/UserMasterMst/add', request)
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/UserMasterMst/delete', request)
  },
  update(request) {
    return Axios.POST(true, 'cg/api/UserMasterMst/update', request)
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/UserMasterMst/getById', id)
  },
  changePassword(request) {
    return Axios.POST(true, 'cg/api/UserMasterMst/changePassword', request)
  },
  resetPassword(request) {
    return Axios.POST(true, 'cg/api/UserMasterMst/resetPassword', request)
  },
}
