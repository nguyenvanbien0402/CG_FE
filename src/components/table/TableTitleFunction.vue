<template>
  <div class="elevation-0 rounded-t-lg flex flex-column w-100">
    <div class="ml-2 flex flex-row-rever flex-wrap"
    >
      <v-btn v-if="showAddNew"
             color="info"
             rounded
             class="w-32 mt-2 mr-3"
             @click="action(TOOLBAR_TABLE.CREATE)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.addNew') }}</span>
      </v-btn>
      <v-btn
        v-if="showMultiUpdate"
        color="info"
        rounded
        class="w-32 mt-2 mr-3"
        @click="action(TOOLBAR_TABLE.MULTI_UPDATE)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.multiUpdate') }}</span>
      </v-btn>
      <v-btn
        v-if="showImport"
        color="info"
        rounded
        class="w-32 mt-2 mr-3"
        @click="action(TOOLBAR_TABLE.IMPORT)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.import') }}</span>
      </v-btn>
      <v-btn
        v-if="showExport"
        color="info"
        rounded
        class="w-32 mt-2 mr-3"
        @click="action(TOOLBAR_TABLE.EXPORT)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.export') }}</span>
      </v-btn>
      <v-btn
        v-if="showPending"
        color="info"
        rounded
        class="w-32 mt-2 mr-3"
        @click="action(TOOLBAR_TABLE.PENDING)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.pending') }}</span>
      </v-btn>
      <v-btn
        v-if="showInProgress"
        color="info"
        rounded
        class="w-32 mt-2 mr-3"
        @click="action(TOOLBAR_TABLE.INPROGRESS)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.inProgress') }}</span>
      </v-btn>
      <v-btn
        v-if="showBarcode"
        color="info"
        rounded
        class="w-32 mt-2 mr-3"
        @click="action(TOOLBAR_TABLE.BARCODE_SCANNER)"
      >
        <span class="d-sm-block">Barcode</span>
      </v-btn>
      <v-btn
        v-if="showDownloadTemplate"
        color="info"
        rounded
        class="w-32 mt-2 mr-3"
        @click="action(TOOLBAR_TABLE.DOWNLOAD_TEMPLATE)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.downloadTemplate') }}</span>
      </v-btn>
      <v-btn
        v-if="showExportMultiple"
        color="info"
        rounded
        class="w-32 mt-2 mr-3"
        @click="action(TOOLBAR_TABLE.EXPORT_MULTIPLE)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.exportMultiple') }}</span>
      </v-btn>
    </div>
    <div
      v-if="title !== 'user-list' &&
        title !== 'contract-type' &&
        title !== 'finance-type' &&
        title !== 'location' &&
        title !== 'project-type' &&
        title !== 'setting-type' &&
        title !== 'registration-type' &&
        title !== 'key-estate' &&
        title !== 'equity'"
      class="mt-2 ml-2"
    >
      <slot name="form"></slot>
    </div>
    <div class="mg-5 flex flex-row-reverse">
      <v-btn
        v-if="showSearch"
        color="info"
        class="rounded-lg mx-1 w-24"
        @click="action(TOOLBAR_TABLE.SEARCH)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.search') }}</span>
      </v-btn>
      <v-btn
        v-if="showClearSearch"
        color="info"
        class="rounded-lg mx-1 w-24"
        @click="action(data.TOOLBAR_TABLE.CLEAR_SEARCH)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.clearSearch') }}</span>
      </v-btn>
      <v-btn v-if="showDraw"
             color="info"
             class="rounded-lg mx-1 w-24"
             @click="action(TOOLBAR_TABLE.DRAW)"
      >
        <span class="d-sm-block">{{ $t('tableTitleFunction.draw') }}</span>
      </v-btn>
      <v-btn v-if="showMigration"
             color="info"
             class="rounded-lg mx-1 w-24 mb-2"
             @click="action(TOOLBAR_TABLE.MIGRATION)"
      >
        <span class="d-sm-block">Migrate</span>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import {onMounted} from "vue";
import { TOOLBAR_TABLE } from '@/constants/constant'

const emit = defineEmits(['action'])

const props = defineProps({
  title: {
    type: String
  },
  showAddNew: {
    type: Boolean
  },
  showSearch: {
    type: Boolean
  },
  showClearSearch: {
    type: Boolean
  },
  showMultiUpdate: {
    type: Boolean
  },
  showDownloadTemplate: {
    type: Boolean
  },
  showPending: {
    type: Boolean
  },
  showImport: {
    type: Boolean
  },
  showInProgress: {
    type: Boolean
  },
  showExportMultiple: {
    type: Boolean
  },
  showBarcode: {
    type: Boolean
  },
  showExport: {
    type: Boolean
  },
  showDraw: {
    type: Boolean
  },
  showMigration: {
    type: Boolean
  }
})

const data = reactive({
  TOOLBAR_TABLE
})

const action = (actionId) => {
  emit('action', actionId)
}

onMounted(() =>{
})
</script>

<style scoped></style>
