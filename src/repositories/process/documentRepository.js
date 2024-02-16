import Axios from '@/plugins/axios'

export default {
  searchAll(request, isLoading = true) {
    return Axios.POST(false, 'cg/api/Document/searchAll', request, isLoading)
  },
  getByProjectNo(request, projectNo) {
    return Axios.GET('cg/api/Document/' + projectNo, request)
  },
  checkPendingStatusOfRecord(request) {
    return Axios.POST(false, 'cg/api/Document/checkPendingStatus', request, false)
  },
  pendingStatus(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Document/pendingStatus', request)
  },
  inProgressStatus(request) {
    return Axios.POST(true, 'cg/api/Document/inProgressStatus', request)
  },
  forwardStatus(request) {
    return Axios.POST(true, 'cg/api/Document/forwardStatus', request)
  },
  add(request) {
    return Axios.POST(true, 'cg/api/Document/add', request)
  },
  delete(request) {
    return Axios.POST(true, 'cg/api/Document/delete', request)
  },
  upload(request) {
    return Axios.POST(true, 'cg/api/Document/upload', request)
  },
  getDocumentCancelByProjectNo(request, projectNoCancel, projectNo) {
    return Axios.GET('cg/api/DocumentCancel/' + projectNoCancel + '/' + projectNo, request)
  },
  updateDocumentCancel(request) {
    return Axios.POST(true, 'cg/api/DocumentCancel/update', request)
  },
  downloadDoc(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/doc', request)
  },
  downloadExcel(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/excel', request)
  },
  downloadDocMulti(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/docMulti', request)
  }
}
