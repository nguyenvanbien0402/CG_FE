import Axios from '@/plugins/axios'

export default {
  findAllMenu(request) {
    return Axios.POST(false, 'cg/api/Common/get-menu', request)
  }
}
