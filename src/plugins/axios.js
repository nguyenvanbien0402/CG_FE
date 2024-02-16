'use strict'

import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import Toast from '@/common/toast'
import { useLoading } from 'vue-loading-overlay'

const { cookies } = useCookies()
const handlerToast = (show, baseResponse) => {
  if (!show) {
    return
  }
  Toast.show(baseResponse.data)
}
const $loading = useLoading({
  // options
})

// const handlerToast = (isShow, type, errorMessage, timing) => {
//
//   if (!isShow) {
//     return
//   }
//
//   toast.open({
//     message: errorMessage,
//     type: type,
//     duration: timing,
//     dismissible: true,
//     position: 'top-right'
//   })
// }

const config = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 300 * 1000, // Timeout
  withCredentials: false
}

const _axios = axios.create(config)

const GET = (url, params = {}, isLoading = true) => {
  return new Promise((resolve, rejected) => {
    let loader
    if (isLoading) {
      loader = $loading.show({
        // Optional parameters
      })
    }
    _axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization:
            cookies.get('Authorization') == null ? null : 'Bearer ' + cookies.get('Authorization')
        },
        params: { ...params }
      })
      .then((rawResponse) => {
        resolve(rawResponse.data)
        if (isLoading) {
          loader.hide()
        }
      })
      .catch((error) => {
        checkError(error)
        rejected(error)
        if (isLoading) {
          loader.hide()
        }
      })
  })
}

const POST = (showToast, url, data, isLoading = true) => {
  let loader
  if (isLoading) {
    loader = $loading.show({
      // Optional parameters
    })
  }
  // openLoading(loading);
  return new Promise((resolve, rejected) => {
    _axios
      .post(url, data, {
        headers: {
          'Accept-Language': 'vi-VN',
          'Access-Control-Allow-Origin': '*',
          Authorization:
            cookies.get('Authorization') == null ? null : 'Bearer ' + cookies.get('Authorization')
        }
      })
      .then((rawResponse) => {
        handlerToast(showToast, rawResponse)
        resolve(rawResponse.data)
        if (isLoading) {
          loader.hide()
        }
      })
      .catch((error) => {
        checkError(error)
        rejected(error)
        if (isLoading) {
          loader.hide()
        }
      })
  })
}

const DELETE = (showToast, url, data, isLoading = true) => {
  let loader
  if (isLoading) {
    loader = $loading.show({
      // Optional parameters
    })
  }
  return new Promise((resolve, rejected) => {
    _axios
      .delete(url, {
        headers: {
          'Accept-Language': 'vi-VN',
          'Access-Control-Allow-Origin': '*',
          Authorization:
            cookies.get('Authorization') == null ? null : 'Bearer ' + cookies.get('Authorization')
        },
        data: data
      })
      .then((rawResponse) => {
        handlerToast(showToast, rawResponse)
        resolve(rawResponse.data)
        if (isLoading) {
          loader.hide()
        }
      })
      .catch((error) => {
        checkError(error)
        rejected(error)
        if (isLoading) {
          loader.hide()
        }
      })
  })
}

const DOWNLOAD = (showToast, url, data, isLoading = true) => {
  let loader
  if (isLoading) {
    loader = $loading.show({
      // Optional parameters
    })
  }
  // openLoading(loading);
  return new Promise((resolve, rejected) => {
    _axios
      .post(url, data, {
        responseType: 'arraybuffer',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          'X-CmdId': '',
          'Accept-Language': 'vi-VN',
          'Access-Control-Allow-Origin': '*',
          Authorization:
            cookies.get('Authorization') == null ? null : 'Bearer ' + cookies.get('Authorization')
        },
        data: data
      })
      .then((rawResponse) => {
        const contentDisposition = rawResponse.headers['content-disposition']
        const errorMessage = rawResponse.headers['error']
        if (errorMessage) {
          Toast.showError(decodeURI(errorMessage))
          if (isLoading) {
            loader.hide()
          }
        } else {
          const fileName = contentDisposition.substring(
            contentDisposition.indexOf('filename=') + 'filename='.length
          )
          let codes = new Uint8Array(rawResponse.data)
          setTimeout(function () {
            let elDownload = document.createElement('a')
            document.body.appendChild(elDownload)
            let data = window.btoa(
              codes.reduce(function (data, byte) {
                return data + String.fromCharCode(byte)
              }, '')
            )
            elDownload.setAttribute('href', 'data:application/octet-stream;base64,'.concat(data))
            elDownload.setAttribute('download', decodeURI(fileName))
            elDownload.style.display = 'none'
            elDownload.click()
            document.body.removeChild(elDownload)
            if (isLoading) {
              loader.hide()
            }
            handlerToast(showToast, rawResponse)
          }, 100)
          resolve(rawResponse)
        }
      })
      .catch((error) => {
        checkError(error)
        rejected(error)
        if (isLoading) {
          loader.hide()
        }
        handlerToast(showToast, rawResponse)
      })
  })
}

const checkError = (error) => {
  if (error?.response?.data?.code?.includes('06')) {
    cookies.remove('Authorization')
    window.location.href = '/login'
  }
  if (error.message.includes('403')) {
    // window.location.href = '#/403'
  }
}

export default { GET, POST, DELETE, DOWNLOAD }
