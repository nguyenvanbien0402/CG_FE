import Axios from '@/plugins/axios'

export default {
  getDataCallStatus(request) {
    return Axios.POST(true, 'cg/api/Chart/getDataCallStatus', request)
  },
  getQuantityAndCompletedAppForms(request) {
    return Axios.POST(true, 'cg/api/Chart/getQuantityAndCompletedAppForms', request)
  },
  getQuantityOfAppFormsCreated(request) {
    return Axios.POST(true, 'cg/api/Chart/getQuantityOfAppFormsCreated', request)
  },
  getAppFormCheckStatus(request) {
    return Axios.POST(true, 'cg/api/Chart/getAppFormCheckStatus', request)
  }
}
