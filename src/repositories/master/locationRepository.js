import Axios from '@/plugins/axios'

export default {
  searchAll(request, isLoading = true) {
    return Axios.POST(false, 'cg/api/LocationMst/searchAll', request, isLoading)
  },
  add(request) {
    return Axios.POST(true, 'cg/api/LocationMst/add', request)
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/LocationMst/delete', request)
  },
  update(request) {
    return Axios.POST(true, 'cg/api/LocationMst/update', request)
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/LocationMst/getById', id)
  }
}
