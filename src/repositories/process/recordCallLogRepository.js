import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/RecordCallLog/searchAll', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/RecordCallLog/delete', request);
  },
  update(request) {
    return Axios.POST(true, 'cg/api/RecordCallLog/update', request);
  },
  multiUpdate(request) {
    return Axios.POST(true, 'cg/api/RecordCallLog/multiUpdate', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/RecordCallLog/getById', id);
  }
}
