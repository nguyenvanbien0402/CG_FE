<template>
  <div class="min-h-[85vh] flex flex-col relative">
    <div class="w-full p-5 border-b border-gray-50">
      <div class="flex flex-row justify-between">
        <v-card :title="$t('dialogName.documentCancelDetail')" variant="flat"> </v-card>
        <v-btn
          color="info"
          class="text-sm mb-2"
          variant="outlined"
          :href="
            '/document_cancel/' +
            `${route.path.split('/')[route.path.split('/').length - 2]}` +
            '/' +
            `${route.path.split('/')[route.path.split('/').length - 1]}` +
            '/edit'
          "
        >
          {{ $t('btn.edit') }}
        </v-btn>
      </div>
    </div>
    <div class="mb-15">
      <v-form ref="form" @submit.prevent>
        <v-container class="mt-4 border-b border-gray-50">
          <!--Row 1 Project No & projectNoRef-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.projectNo') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.projectNo"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.projectNoRef') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.projectNoRef"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 2 抽出原契約名（英） & customer_name_jp-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.customerNameEn') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.customerNameEn"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.customerNameJp') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.customerNameJp"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 3 location & terminationDate-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.location') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.locationName"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.terminationDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.terminationDate"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 4 initialContractDate & cancelRegistrationDate-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.initialContractDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.initialContractDate"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelRegistrationDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.cancelRegistrationDate"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row Space-->
          <v-row dense>
            <v-col class="h-10"></v-col>
          </v-row>
        </v-container>

        <v-container class="mt-4 border-b border-gray-50">
          <!--Row 1 voidingFloorSpace1 & cancelOwnershipStake1-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.voidingFloorSpace1') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.voidingFloorSpace1"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelOwnershipStake1') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.cancelOwnershipStake1"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 2 cancelRegistrationNumber1 -->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelRegistrationNumber1') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.cancelRegistrationNumber1"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row Space-->
          <v-row dense>
            <v-col class="h-10"></v-col>
          </v-row>
        </v-container>

        <v-container class="mt-4 border-b border-gray-50">
          <!--Row 1 voidingFloorSpace2 & cancelOwnershipStake2-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.voidingFloorSpace2') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.voidingFloorSpace2"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelOwnershipStake2') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.cancelOwnershipStake2"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 2 cancelRegistrationNumber2 -->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelRegistrationNumber2') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.cancelRegistrationNumber2"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row Space-->
          <v-row dense>
            <v-col class="h-10"></v-col>
          </v-row>
        </v-container>

        <v-container class="mt-4 border-b border-gray-50">
          <!--Row 1 voidingFloorSpace3 & cancelOwnershipStake3-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.voidingFloorSpace3') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.voidingFloorSpace3"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelOwnershipStake3') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.cancelOwnershipStake3"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 2 cancelRegistrationNumber3 -->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelRegistrationNumber3') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.cancelRegistrationNumber3"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row Space-->
          <v-row dense>
            <v-col class="h-10"></v-col>
          </v-row>
        </v-container>

        <v-container class="mt-4">
          <!--Row 1 voidingFloorSpace4 & cancelOwnershipStake4-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.voidingFloorSpace4') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.voidingFloorSpace4"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelOwnershipStake4') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.cancelOwnershipStake4"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 2 cancelRegistrationNumber4 -->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.cancel.cancelRegistrationNumber4') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.cancelRegistrationNumber4"
                :readonly="true"
                maxlength="50"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row Space-->
          <v-row dense>
            <v-col class="h-10"></v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <div class="absolute bottom-0 w-full">
      <v-card-actions class="flex-row mt-5 mx-5 justify-end">
        <v-btn color="info" class="text-sm mb-2" variant="outlined" href="/document">
          {{ $t('btn.back') }}
        </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, { name: t('dialogName.documentCancelDetail'), path: '/document' })
const DocumentRepository = RepositoryFactory.get('document')
const route = useRoute()
const data = reactive({
  request: {
    projectNo: null,
    projectNoRef: null,
    customerNameEn: null,
    customerNameJp: null,
    locationName: null,
    terminationDate: null,
    initialContractDate: null,
    cancelRegistrationDate: null,
    voidingFloorSpace1: null,
    cancelOwnershipStake1: null,
    cancelRegistrationNumber1: null,
    voidingFloorSpace2: null,
    cancelOwnershipStake2: null,
    cancelRegistrationNumber2: null,
    voidingFloorSpace3: null,
    cancelOwnershipStake3: null,
    cancelRegistrationNumber3: null,
    voidingFloorSpace4: null,
    cancelOwnershipStake4: null,
    cancelRegistrationNumber4: null,
    numberOfStatus: null,
    oldStatus: null
  }
})

const search = () => {
  const projectNo = route.path.split('/')[route.path.split('/').length - 1]
  const projectNoCancel = route.path.split('/')[route.path.split('/').length - 2]
  let request = {}
  DocumentRepository.getDocumentCancelByProjectNo(request, projectNoCancel, projectNo).then(
    function (response) {
      data.request = response.data
    }
  )
}

onMounted(() => {
  search()
})
</script>
<style scoped>
.document-detail {
  flex: 50%;
  padding: 10px;
  width: 100%;
}
</style>
