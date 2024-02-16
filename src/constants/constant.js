import {reactive} from "vue";

const NOT_FOUND_STATUS = { text: 'Not found', color: 'red' }

const HTTP_STATUS = {
  SUCCESS: 'ES200',
  ERROR: 'ES201',
  SHOW_TOAST_ERROR: 'ES205'
}
const TOOLBAR_TABLE = {
  CREATE: 'create',
  SEARCH: 'search',
  PENDING: 'pending',
  IMPORT: 'import',
  INPROGRESS: 'inprogress',
  CLEAR: 'clear',
  CLEAR_SEARCH: 'clear-search',
  MULTI_UPDATE: 'multi-update',
  DOWNLOAD_TEMPLATE: 'download-template',
  BARCODE_SCANNER: 'barcode-scanner',
  EXPORT: 'export',
  DRAW: 'draw',
  MIGRATION: 'migration',
  EXPORT_MULTIPLE: 'export-multiple'
}

const STATUS = Object.freeze({
  0: { key: 0, text: '依頼受託済', color: '#FE6D6D' },
  1: { key: 1, text: '捺印書類データ入力済', color: '#9E5EE4' },
  2: { key: 2, text: '捺印書類出力済', color: '#EDC20B' },
  3: { key: 3, text: '本人確認済', color: '#0000FF' },
  4: { key: 4, text: '捺印書類発送済', color: '#31B8A3' },
  5: { key: 5, text: '捺印書類返送済', color: '#E026F0' },
  6: { key: 6, text: '捺印書類確認済', color: '#3D43EE' },
  7: { key: 7, text: '申請書作成済', color: '#B1C694' },
  8: { key: 8, text: '申請書確認済', color: '#34AB88' },
  9: { key: 9, text: 'HGV申請報告済', color: '#C5B6B5' },
  10: { key: 10, text: '申請済', color: '#C7008A' },
  11: { key: 11, text: '請求済', color: '#025479' },
  12: { key: 12, text: '返却書類発送済', color: '#68C020' },
  13: { key: 13, text: '返却書類到着確認済', color: '#08825F' },
  14: { key: 14, text: 'HGV納品済', color: '#ABC3E6' },
  99: { key: 99, text: 'ペンディング', color: '#D1203E' },
  get(status) {
    return STATUS[status] || NOT_FOUND_STATUS
  }
})
const STATUS_SELECTED = [
  { value: '', title: '' },
  { value: 0, title: '依頼受託済' },
  { value: 1, title: '捺印書類データ入力済' },
  { value: 2, title: '捺印書類出力済' },
  { value: 3, title: '本人確認済' },
  { value: 4, title: '捺印書類発送済' },
  { value: 5, title: '捺印書類返送済' },
  { value: 6, title: '捺印書類確認済' },
  { value: 7, title: '申請書作成済' },
  { value: 8, title: '申請書確認済' },
  { value: 9, title: 'HGV申請報告済' },
  { value: 10, title: '申請済' },
  { value: 11, title: '請求済' },
  { value: 12, title: '返却書類発送済' },
  { value: 13, title: '返却書類到着確認済' },
  { value: 14, title: 'HGV納品済' },
  { value: 99, title: 'ペンディング' }
]
const ROLE_SELECTED = [
  { value: 0, title: 'Admin' },
  { value: 1, title: 'User' }
]

const TABLE_SELECTED = [
  { value: 1, title: '1. document' },
  { value: 2, title: '2. document_extend' },
  { value: 3, title: '3. document_cancel' },
  { value: 4, title: '4. record_calllog' },
  { value: 5, title: '5. record_delivery' },
  { value: 6, title: '6. record_doc_stamped' },
  { value: 7, title: '7. record_sch_app_to_hgv' },
  { value: 8, title: '8. record_reg_app' },
  { value: 9, title: '9. record_reg_complete' },
  { value: 10, title: '10. record_send_to_tax_office' },
]

const ACTIVE_INACTIVE = Object.freeze({
  0: { key: 0, text: 'INACTIVE', color: 'red' },
  1: { key: 1, text: 'ACTIVE', color: 'green' },
  get(statusActive) {
    return ACTIVE_INACTIVE[statusActive] || NOT_FOUND_STATUS
  }
})

const MAX_NUMBER_9_CHAR = 999999999
const MAX_NUMBER_10_CHAR = 9999999999
const MAX_NUMBER_8_CHAR = 99999999
const MAX_NUMBER_2_CHAR = 99
const MAX_NUMBER_20_CHAR = 99999999999999999999
const MAX_NUMBER_12_CHAR = 999999999999
const MAX_NUMBER_15_CHAR = 999999999999999

export {
  HTTP_STATUS,
  TOOLBAR_TABLE,
  STATUS,
  STATUS_SELECTED,
  ROLE_SELECTED,
  TABLE_SELECTED,
  MAX_NUMBER_8_CHAR,
  MAX_NUMBER_9_CHAR,
  MAX_NUMBER_10_CHAR,
  MAX_NUMBER_20_CHAR,
  MAX_NUMBER_15_CHAR,
  MAX_NUMBER_12_CHAR,
  MAX_NUMBER_2_CHAR,
  ACTIVE_INACTIVE
}
