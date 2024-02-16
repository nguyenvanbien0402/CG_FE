import Axios from "@/plugins/axios";

export default {
  login(request) {
    return Axios.POST(false,'cg/api/login', request);
  },
  logout (request) {
    return Axios.POST(false, 'cg/api/logout', request);
  },
}
