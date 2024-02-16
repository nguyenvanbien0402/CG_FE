<template>
  <div
    v-if="pagination.amountOfDataDisplay"
    style="position: absolute; width: 100%; bottom: 5px; overflow-x: auto"
  >
    <div class="v-data-table-footer">
      <div class="first-item">
        <div class="v-data-table-footer__items-per-page pa-2">
          <span class="_pagination_total_showing">
            {{ data.perPage * (data.page - 1) + 1 }}
            -
            {{ data.perPage * (data.page - 1) + pagination.amountOfDataDisplay }}
            of
            {{ pagination.totalElements }}
          </span>
          <v-select
            v-model="data.perPage"
            density="compact"
            variant="outlined"
            hide-details
            :items="data.perPageValues"
          ></v-select>
        </div>
      </div>
      <div class="last-item">
        <v-pagination
          v-model="data.page"
          :length="pagination.totalPages"
          :total-visible="5"
          :show-first-last-page="true"
          size="small"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies()
const emit = defineEmits(['changeData'])
const commonStore = useCommonStore()

const pagination = computed(() => {
  return commonStore.getPagination
})

const data = reactive({
  page: null,
  perPage: null,
  perPageValues: [20, 40, 60]
})

// watch(
//   () => data.perPage,
//   () => {
//     data.page = 1
//   }
// )

watch(pagination, () => {
  if (pagination.value.page !== data.page) {
    data.page = pagination.value.page
  }
  if (pagination.value.totalElements < (data.perPage * (data.page - 1) + 1)) {
    data.page = Math.floor(pagination.value.totalElements/ data.perPage) + 1
  }
})

watch(data, () => emit('changeData', data))

onMounted(() => {
  commonStore.getPagination
  data.page = 1
  data.perPage = 20
  if (cookies.get('documentPrev') &&
    document.location.href.includes('/document') &&
    cookies.get('documentPrev') !== 'undefined') {
    data.page = cookies.get('documentPrev').page
    data.perPage = cookies.get('documentPrev').itemsPerPage
  }
  if (cookies.get('recordRegAppPrev') &&
    document.location.href.includes('/record-reg-app') &&
    cookies.get('recordRegAppPrev') !== 'undefined') {
    data.page = cookies.get('recordRegAppPrev').page
    data.perPage = cookies.get('recordRegAppPrev').itemsPerPage
  }
  if (cookies.get('keyPrev') &&
    document.location.href.includes('/key-list') &&
    cookies.get('keyPrev') !== 'undefined') {
    data.page = cookies.get('keyPrev').page
    data.perPage = cookies.get('keyPrev').itemsPerPage
  }
  if (cookies.get('recordRegFinalPrev') &&
    document.location.href.includes('/record-reg-final') &&
    cookies.get('recordRegFinalPrev') !== 'undefined') {
    data.page = cookies.get('recordRegFinalPrev').page
    data.perPage = cookies.get('recordRegFinalPrev').itemsPerPage
  }
})
</script>

<style scoped>
.first-item {
  order: -1;
  align-self: flex-start;
}

.v-data-table-footer {
  justify-content: flex-start !important;
  flex-direction: column !important;
}

.last-item {
  order: 1;
  align-self: flex-end;
}

.v-data-table-footer {
  /*padding-top: 10px !important;*/
}
</style>
