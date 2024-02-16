import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/RecordDocStamped/searchAll', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/RecordDocStamped/delete', request);
  },
  update(request) {
    return Axios.POST(true, 'cg/api/RecordDocStamped/update', request);
  },
  multiUpdate(request) {
    return Axios.POST(true, 'cg/api/RecordDocStamped/multiUpdate', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/RecordDocStamped/getById', id);
  }
}
