import Axios from '@/plugins/axios'

export default {
  searchAll(request) {
    return Axios.POST(false, 'cg/api/LongTermNonReturn/searchAll', request)
  }
}
