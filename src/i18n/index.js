import { createI18n } from 'vue-i18n'
import message from './message'

const messages = {
  en: message,
  vn: {
    nav: {
      home: 'Trang chủ',
      about: 'Trang chủ'
    },
    home: {
      header: 'Xin Chào',
      created_by: 'Bach.BuiXuan'
    },
    about: {
      header: 'Giới thiệus'
    }
  }
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE, // <--- 1
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, // <--- 2
  legacy: false, // <--- 3
  messages
})
