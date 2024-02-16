import Axios from "@/plugins/axios";

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/RecordDelivery/searchAll', request);
  },
  delete(request) {
    return Axios.DELETE(true, 'cg/api/RecordDelivery/delete', request);
  },
  update(request) {
    return Axios.POST(true, 'cg/api/RecordDelivery/update', request);
  },
  multiUpdate(request) {
    return Axios.POST(true, 'cg/api/RecordDelivery/multiUpdate', request);
  },
  getById(id) {
    return Axios.POST(false, 'cg/api/RecordDelivery/getById', id);
  }
}
