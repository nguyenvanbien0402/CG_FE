import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/RecordRegComplete/searchAll', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/RecordRegComplete/delete', request);
  },
  singleUpdate1(request) {
    return Axios.POST(true, 'cg/api/RecordRegComplete/singleUpdate1', request);
  },
  singleUpdate2(request) {
    return Axios.POST(true, 'cg/api/RecordRegComplete/singleUpdate2', request);
  },
  singleUpdate3(request) {
    return Axios.POST(true, 'cg/api/RecordRegComplete/singleUpdate3', request);
  },
  checkStatusMultiUpdate(request) {
    return Axios.POST(false, 'cg/api/RecordRegComplete/checkStatusMultiUpdate', request);
  },
  multiUpdate1(request) {
    return Axios.POST(true, 'cg/api/RecordRegComplete/multiUpdate1', request);
  },
  multiUpdate2(request) {
    return Axios.POST(true, 'cg/api/RecordRegComplete/multiUpdate2', request);
  },
  multiUpdate3(request) {
    return Axios.POST(true, 'cg/api/RecordRegComplete/multiUpdate3', request);
  },
  multiUpdatePending(request) {
    return Axios.POST(true, 'cg/api/RecordRegComplete/multiUpdatePending', request);
  },
  singleUpdatePending(request) {
    return Axios.POST(true, 'cg/api/RecordRegComplete/singleUpdatePending', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/RecordRegComplete/getById', id);
  }
}
