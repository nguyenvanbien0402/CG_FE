import {defineStore} from 'pinia'

export const useSelectedItemsStore = defineStore({
  state: () => ({
    items: []
  }),
  getters: {
    selectedItems: state => state.items,
  },
  actions: {
    updateSelectedItems(items) {
      this.items = items
    }
  },
  persist: {
    // Lưu trữ state của store vào localStorage
    // để khôi phục nó khi trang được tải lại.
    // Đối với một ứng dụng thực tế, bạn có thể sử dụng một cơ chế
    // lưu trữ khác như IndexedDB hoặc cookie.
    key: 'selected-items',
    restore: true,
  }
})

