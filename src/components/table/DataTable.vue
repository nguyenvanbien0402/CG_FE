<script setup>
import {computed} from "vue";
import InputLabel from "@/components/common/InputLabel.vue";
import {ArrayHelper} from "@/common/helper"

const props = defineProps({
  headers: Array,
  items: Array,
  serverItemsLength: Number,
  options: Object,
  loading: Boolean,
  totalRecords: Number,
  showPagination: Boolean,
  showSelect: Boolean,
  selected: Array,
  itemKey: String,
  title: {
    type: String,
    default: 'abc'
  },
})

const emit = defineEmits([
  'rowClick',
  'update:options',
  'update:selected'
])

const updateSort = (field, sortable) => {
  if (!sortable) {
    return;
  }
  let sortBy = props.options.sortBy;
  let sortDesc = props.options.sortDesc;
  if (field === props.options.sortBy) {
    sortDesc = !sortDesc;
  } else {
    sortDesc = false;
    sortBy = field;
  }
  emit('update:options', {
    ...props.options,
    sortDesc: sortDesc,
    sortBy: sortBy
  })
}

const updatePage = (page) => {
  emit('update:options', {
    ...props.options,
    page: page
  })
}

const updateItemsPerPage = (itemsPerPage) => {
  emit('update:options', {
    ...props.options,
    itemsPerPage: itemsPerPage
  })
}

const updateSelected = (event, value) => {
  let selectedCopy = Object.assign([], props.selected);
  if (!event.target.checked) {
    ArrayHelper.remove(selectedCopy, value, 'id');
  } else {
    selectedCopy.push(value)
  }
  emit('update:selected', selectedCopy)
}

const updateSelectAll = (event) => {
  let selectedCopy = Object.assign([], props.items);
  if (!event.target.checked) {
    selectedCopy = [];
  }
  emit('update:selected', selectedCopy);
}

const rowClickEvent = (item, index) => {
  emit('rowClick', {item: item, index: index})
}

const getTotalPage = computed(() => {
  if (!props.totalRecords) {
    return 1;
  }
  return props.totalRecords / props.options.itemsPerPage + (props.totalRecords % props.options.itemsPerPage !== 0 ? 1 : 0);
})

const getTotalRecords = computed(() => {
  if (!props.totalRecords) {
    return items.length;
  }
  return props.totalRecords;
})

const selectedAll = computed(() => {
  return props.selected.length > 0;
})

</script>

<template>
  <v-card
    flat
  >
    <slot name="title">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-subtitle>
        <v-spacer />
        <v-row
          justify="end"
          align="center"
        >
          Search results: {{ getTotalRecords }} records
          <v-spacer />

        </v-row>
      </v-card-subtitle>
    </slot>
    <v-divider />
    <v-table class="pa-2 hm-table">
      <thead>
        <tr>
          <th v-if="showSelect">
            <v-checkbox
              :model-value="selectedAll"
              :indeterminate="selected.length && (selected.length < items.length)"
              hide-details
              color="primary"
              @change="updateSelectAll"
            />
          </th>
          <slot
            v-for="header in headers"
            :name="header"
            :item="{...header}"
          >
            <th
              :key="`cell-${header}`"
              :sortable="header.sortable"
              @click="updateSort(header.value, header.sortable)"
            >
              <span>{{ header.name }}</span>
              <template v-if="header.sortable">
                <v-icon
                  v-if="(options.sortDesc === true || options.sortDesc === false) && options.sortBy === header.value"
                >
                  {{ options.sortDesc ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
                </v-icon>
                <v-icon
                  v-else
                  class="sort-icon"
                >
                  mdi-arrow-up
                </v-icon>
              </template>
            </th>
          </slot>
        </tr>
        <tr v-if="loading">
          <td :colspan="headers.length + (showSelect ? 1 : 0)"
              style="height: 10px !important; padding: 0 !important;"
          >
            <v-progress-linear
              color="info"
              indeterminate
              rounded
              height="6"
              class="w-100"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, indexRow) in items"
          :key="item.value"
          @click="rowClickEvent(item, indexRow)"
        >
          <th v-if="showSelect">
            <v-checkbox
              :model-value="selected"
              :value="item"
              hide-details
              color="primary"
              @change="updateSelected($event, item)"
            />
          </th>
          <slot
            v-for="header in headers"
            :name="header.value"
            :item="{...item}"
          >
            <td
              :key="`${indexRow}-${header.value}`"
              :class="header.class ? header.class : ''"
            >
              {{ item[header.value] }}
            </td>
          </slot>
        </tr>
      </tbody>
    </v-table>
    <v-divider />

    <slot v-if="showPagination"
          name="pagination"
    >
      <input-label
        label="Items per page"
      >
        <template #input>
          <v-select
            :model-value="options.itemsPerPage"
            density="compact"
            :items="[20, 40, 60]"
            variant="outlined"
            hide-details
            @update:model-value="updateItemsPerPage"
          />
        </template>
      </input-label>
      <v-pagination
        :model-value="options.page"
        :length="getTotalPage"
        :total-visible="getTotalPage - 5 > 0 ? getTotalPage - 5 : 0"
        rounded="circle"
        density="compact"
        :show-first-last-page="true"
        elevation="1"
        active-color="primary"
        class="py-2"
        @update:model-value="updatePage"
      />
    </slot>
  </v-card>
</template>

<style scoped>
.hm-table thead th {
  font-size: 0.85rem !important;
  color: #3a4458;
  background-color: #f0f4f7;
  border-right: 1px solid #dfe7ec !important;
}
.hm-table thead [sortable="true"] i.sort-icon {
  color: transparent;
}
.hm-table thead [sortable="true"]:hover {
  cursor: pointer;
}
.hm-table thead [sortable="true"]:hover i.sort-icon {
  color: #e0e0e0;
}
.hm-table tbody tr:hover {
  background: #eee !important;
}
.hm-table tbody tr:nth-child(2n) {
  background-color: #f9fafc;
}

.v-table__wrapper {
  height: 500px!important;
}
.hm-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td, .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-right: 1px solid #dfe7ec !important;
}

</style>
