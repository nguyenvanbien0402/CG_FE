import Axios from '@/plugins/axios'

export default {
  getByProjectNo(request, projectNo) {
    return Axios.GET('cg/api/RecordRegFinal/' + projectNo, request)
  }
}
