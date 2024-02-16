<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          show-migration
          @action="handleAction($event)"
        >
          <template #form>
            <v-row class="mg-5">
              <v-col
                cols="3"
                md="6"
                lg="3"
                sm="12"
              >
                <div class="mb-2">
                  <span
                    class="font-weight-medium text-sm"
                  >
                    Table
                  </span>
                </div>
                <v-select
                  v-model="request.table"
                  density="compact"
                  dense
                  variant="outlined"
                  hide-details
                  :items="tableList"
                ></v-select>
              </v-col>
              <v-col
                cols="3"
                md="6"
                lg="3"
                sm="12"
              >
                <div class="mb-2">
                  <span
                    class="font-weight-medium text-sm"
                  >
                    {{ $t('recordScheduleAppToHgv.status') }}
                  </span>
                </div>
                <v-text-field
                  ref="uploadFileRef"
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  hide-details
                  density="compact"
                  variant="outlined"
                  @change="onFileChange($event)"
                />
              </v-col>
            </v-row>
          </template>
        </table-title-function>
      </template>
    </card-data-table>
    <dialog-file-error ref="refDialogFileError">
    </dialog-file-error>
  </div>
</template>
<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import {useCommonStore} from '@/store/commonStore'
import {TOOLBAR_TABLE} from '@/constants/constant'
import CardDataTable from '@/components/card/CardDataTable.vue'
import TableTitleFunction from '@/components/table/TableTitleFunction.vue'
import DialogFileError from '@/components/dialog/DialogFileError.vue'
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import Toast from "@/common/toast";

const MigrationRepository = RepositoryFactory.get('migration')

// Initial
const store = useCommonStore()
const uploadFileRef = ref(null)
const refDialogFileError = ref(null)

const tableList = computed(() => store.getTableMigration)

let formDataDef = new FormData()

const request = reactive({
  table: null
})


const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.MIGRATION) {
    let formData = new FormData()
    formDataDef.delete('table')
    formData = formDataDef
    formData.append('table', request.table)
    MigrationRepository.migrate(formData)
      .then((response) => {
        uploadFileRef.value.value = null
        if (response.code !== 'ES200') {
          refDialogFileError.value.open(response.data)
          return
        }
      })
      .catch(() => {
        uploadFileRef.value.value = null
      })
  }
  if (actionId === TOOLBAR_TABLE.IMPORT) {
    uploadFileRef.value.click()
  }
}


const onFileChange = (e) => {
  formDataDef = new FormData()
  let files = e.target.files
  if (!files) {
    return
  }
  if (files[0].size > 209710000) {
    Toast.showError('ファイルの容量が200MBを超えていました。')
    uploadFileRef.value.value = ''
    return
  }
  let formData = new FormData()
  formData.append('file', files[0])

  formDataDef = formData

}

onMounted(async () => {
  await store.fetchTableMigrationList()
})
</script>
<style scoped>
</style>

