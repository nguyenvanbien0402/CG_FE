import Axios from '@/plugins/axios'

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/RecordSchAppToHgv/searchAll', request)
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/RecordSchAppToHgv/delete', request)
  },
  update(request) {
    return Axios.POST(true, 'cg/api/RecordSchAppToHgv/update', request)
  },
  multiUpdate(request) {
    return Axios.POST(true, 'cg/api/RecordSchAppToHgv/multiUpdate', request)
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/RecordSchAppToHgv/getById', id)
  },
  upload(request) {
    return Axios.POST(true, 'cg/api/RecordSchAppToHgv/upload', request)
  },
  exportExcel1(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/hgv1', request)
  },
  exportExcel2(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/hgv2', request)
  }
}
