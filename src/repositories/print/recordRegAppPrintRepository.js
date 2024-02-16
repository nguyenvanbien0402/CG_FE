import Axios from '@/plugins/axios'

export default {
  exportExcel1(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/record_reg_app_r1', request)
  },
  exportExcel2(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/record_reg_app_r2', request)
  },
  exportExcel3(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/record_reg_app_r3', request)
  },
  exportExcel4(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/record_reg_app_r4', request)
  },
  exportExcel5(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/record_reg_app_r5', request)
  },
  exportExcelM05(request) {
    return Axios.DOWNLOAD(false, 'cg/api/Print/record_delivery', request)
  }
}
