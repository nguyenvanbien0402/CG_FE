import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/EquityMst/searchAll', request);
  },
  add(request) {
    return Axios.POST(true, 'cg/api/EquityMst/add', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/EquityMst/delete', request);
  },
  update(request) {
    return Axios.POST(true, 'cg/api/EquityMst/update', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/EquityMst/getById', id);
  }
}
