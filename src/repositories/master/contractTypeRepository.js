import Axios from '@/plugins/axios'

export default {
  searchAll(request, isLoading = true) {
    return Axios.POST(false, 'cg/api/ContractTypeMst/searchAll', request, isLoading)
  },
  add(request) {
    return Axios.POST(true, 'cg/api/ContractTypeMst/add', request)
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/ContractTypeMst/delete', request)
  },
  update(request) {
    return Axios.POST(true, 'cg/api/ContractTypeMst/update', request)
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/ContractTypeMst/getById', id)
  }
}
