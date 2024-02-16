import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/RegistrationTypeMst/searchAll', request);
  },
  add(request) {
    return Axios.POST(true, 'cg/api/RegistrationTypeMst/add', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/RegistrationTypeMst/delete', request);
  },
  update(request) {
    return Axios.POST(true, 'cg/api/RegistrationTypeMst/update', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/RegistrationTypeMst/getById', id);
  }
}
