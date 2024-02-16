import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/RecordRegApp/searchAll', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/RecordRegApp/delete', request);
  },
  singleUpdateRegis(request) {
    return Axios.POST(true, 'cg/api/RecordRegApp/singleUpdateRegis', request);
  },
  singleUpdateCancel(request) {
    return Axios.POST(true, 'cg/api/RecordRegApp/singleUpdateCancel', request);
  },
  multiRegisUpdate(request) {
    return Axios.POST(true, 'cg/api/RecordRegApp/multiRegisUpdate', request);
  },
  multiCancelUpdate(request) {
    return Axios.POST(true, 'cg/api/RecordRegApp/multiCancelUpdate', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/RecordRegApp/getById', id);
  },
  getDetails(request) {
    return Axios.POST(false, 'cg/api/RecordRegApp/getDetails', request);
  },
  checkCategory(request) {
    return Axios.POST(false, 'cg/api/RecordRegApp/checkCategory', request);
  },
  downloadRegApp(request) {
    return Axios.DOWNLOAD(false, 'cg/api/download/record-reg-app/xlsx', request);
  },
  upload(request) {
    return Axios.POST(true, 'cg/api/RecordRegApp/upload', request)
  }
}
