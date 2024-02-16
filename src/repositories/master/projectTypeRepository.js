import Axios from '@/plugins/axios'

export default {
  searchAll(request, isLoading = true) {
    return Axios.POST(false, 'cg/api/ProjectTypeMst/searchAll', request, isLoading)
  },
  add(request) {
    return Axios.POST(true, 'cg/api/ProjectTypeMst/add', request)
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/ProjectTypeMst/delete', request)
  },
  update(request) {
    return Axios.POST(true, 'cg/api/ProjectTypeMst/update', request)
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/ProjectTypeMst/getById', id)
  }
}
