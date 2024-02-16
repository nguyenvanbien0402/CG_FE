import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/KeyEstateMst/searchAll', request);
  },
  add(request) {
    return Axios.POST(true, 'cg/api/KeyEstateMst/add', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/KeyEstateMst/delete', request);
  },
  update(request) {
    return Axios.POST(true, 'cg/api/KeyEstateMst/update', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/KeyEstateMst/getById', id);
  }
}
