import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/WaitingCompletion/searchAll', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/WaitingCompletion/delete', request);
  },
  update(request) {
    return Axios.POST(true, 'cg/api/WaitingCompletion/update', request);
  },
  multiUpdate(request) {
    return Axios.POST(true, 'cg/api/WaitingCompletion/multiUpdate', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/WaitingCompletion/getById', id);
  }
}
