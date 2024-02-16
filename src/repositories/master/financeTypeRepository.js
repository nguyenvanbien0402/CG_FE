import Axios from '@/plugins/axios'

export default {
  searchAll(request, isLoading = true) {
    return Axios.POST(false, 'cg/api/FinanceTypeMst/searchAll', request, isLoading)
  },
  add(request) {
    return Axios.POST(true, 'cg/api/FinanceTypeMst/add', request)
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/FinanceTypeMst/delete', request)
  },
  update(request) {
    return Axios.POST(true, 'cg/api/FinanceTypeMst/update', request)
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/FinanceTypeMst/getById', id)
  }
}
