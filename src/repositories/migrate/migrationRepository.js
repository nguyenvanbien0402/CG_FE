import Axios from '@/plugins/axios'

export default {
  migrate(request) {
    return Axios.POST(true, 'cg/api/migrate', request)
  }
}
