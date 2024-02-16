import Axios from '@/plugins/axios'

export default {
  searchAll(request, isLoading = true) {
    return Axios.POST(false, 'cg/api/PostCodeMst/searchAll', request, isLoading)
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/PostCodeMst/delete', request)
  },
  update(request) {
    return Axios.POST(true, 'cg/api/PostCodeMst/update', request)
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/PostCodeMst/getById', id)
  },
  upload(request) {
    return Axios.POST(true, 'cg/api/PostCodeMst/upload', request)
  }
}
