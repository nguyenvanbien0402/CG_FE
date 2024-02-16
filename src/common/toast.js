import { useToast } from 'vue-toast-notification'
import { HTTP_STATUS } from '@/constants/constant'

const toast = useToast()

function showWarning(message) {
  toast.open({
    message: message,
    duration: 5000,
    progressbar: true,
    dismissible: true,
    position: 'top-right',
    type: 'warning'
  })
}
function showError(message) {
  toast.open({
    message: message,
    duration: 3000,
    progressbar: true,
    dismissible: true,
    position: 'top-right',
    type: 'error'
  })
}

function show(response) {
  let _toast = detectToast(response.code)
  toast.open({
    message: response.message,
    duration: 3000,
    progressbar: true,
    dismissible: true,
    position: 'top-right',
    type: _toast.type
  })
}

function detectToast(code) {
  switch (code) {
    case HTTP_STATUS.SUCCESS:
      return {
        message: 'Success',
        type: 'success'
      }
    case HTTP_STATUS.SHOW_TOAST_ERROR:
      return {
        message: 'Error',
        type: 'error'
      }
    default:
      return {
        message: 'Error',
        type: 'error'
      }
  }
}

export default {
  show,
  showWarning,
  showError
}
