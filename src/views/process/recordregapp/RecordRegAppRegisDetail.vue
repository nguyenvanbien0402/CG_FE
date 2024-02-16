<template>
  <div class="min-h-[92vh] flex flex-col relative">
    <div class="w-full p-5 border-b border-gray-50">
      <v-card :title="$t('dialogName.recordRegAppRegisDetail')" variant="flat"></v-card>
    </div>
    <div class="mb-15">
      <v-form ref="form" @submit.prevent>
        <v-container class="mt-4">
          <!--Row 1 Project No & status-->
          <v-row dense class="ml-5">
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.projectNo') }}
              </span>
            </v-col>
            <v-col lg="4" cols="12">
              <v-text-field
                v-model="data.projectNo"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"></v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.status') }}
              </span>
            </v-col>
            <v-col lg="3" cols="12">
              <v-text-field
                v-model="data.status"
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
            <v-col class="h-5"></v-col>
          </v-row>
          <!--Row 2 Customer Name Jp-->
          <v-row dense class="ml-5">
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.customerNameJp') }}
              </span>
            </v-col>
            <v-col lg="4" cols="12">
              <v-text-field
                v-model="data.customerNameJp"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.category') }}
              </span>
            </v-col>
            <v-col lg="1" cols="12">
              <v-text-field
                v-model="data.category"
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
            <v-col class="h-5"></v-col>
          </v-row>
          <!--Row 3 Reg Date-->
          <v-row dense class="ml-5">
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.regDate') }}
              </span>
            </v-col>
            <v-col lg="4" cols="12">
              <v-text-field
                v-model="data.regDate"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
          </v-row>
          <!--Row Space-->
          <v-row dense>
            <v-col class="h-5"></v-col>
          </v-row>
          <!--Row 4 number 1-->
          <v-row dense class="ml-5">
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.transferNum1') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.transferNum1"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.lSettingNum1') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.lSettingNum1"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.pipeTransferNum1') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.pipeTransferNum1"
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
            <v-col class="h-5"></v-col>
          </v-row>
          <!--Row 4 number 2-->
          <v-row dense class="ml-5">
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.transferNum2') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.transferNum2"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.lSettingNum2') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.lSettingNum2"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.pipeTransferNum2') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.pipeTransferNum2"
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
            <v-col class="h-5"></v-col>
          </v-row>
          <!--Row 6 number 3-->
          <v-row dense class="ml-5">
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.transferNum3') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.transferNum3"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.lSettingNum3') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.lSettingNum3"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.pipeTransferNum3') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.pipeTransferNum3"
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
            <v-col class="h-5"></v-col>
          </v-row>
          <!--Row 7 number 4-->
          <v-row dense class="ml-5">
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.transferNum4') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.transferNum4"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.lSettingNum4') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.lSettingNum4"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" cols="12"> </v-col>
            <v-col lg="1" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.pipeTransferNum4') }}
              </span>
            </v-col>
            <v-col lg="2" cols="12">
              <v-text-field
                v-model="data.pipeTransferNum4"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <div class="absolute bottom-0 w-full">
      <v-card-actions class="flex-row mt-5 mx-5 justify-end">
        <v-btn color="info" class="text-sm mb-2 cursor-pointer" variant="outlined" @click="back">
          {{ $t('btn.back') }}
        </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonStore } from '@/store/commonStore'
import { STATUS } from '@/constants/constant'
import { RepositoryFactory } from '@/repositories/repositoryFactory'

import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
// Initial
const store = useCommonStore()
store.setBreadcrumb(store, {
  name: t('nav.screen.recordRegAppDetail'),
  path:
    '/record-reg-app-detail/regis?projectNo=' +
    route.query.projectNo +
    '&category=' +
    route.query.category
})
const RecordRegAppRepository = RepositoryFactory.get('recordRegApp')

const getInitialData = () => ({
  projectNo: null,
  status: null,
  customerNameJp: null,
  category: null,
  regDate: null,
  transferNum1: null,
  lSettingNum1: null,
  pipeTransferNum1: null,
  transferNum2: null,
  lSettingNum2: null,
  pipeTransferNum2: null,
  transferNum3: null,
  lSettingNum3: null,
  pipeTransferNum3: null,
  transferNum4: null,
  lSettingNum4: null,
  pipeTransferNum4: null
})

const data = reactive(getInitialData())

const getDetails = (request) => {
  RecordRegAppRepository.getDetails(request).then(function (response) {
    data.projectNo = response.data.projectNo
    data.status = STATUS.get(response.data.status).text
    data.customerNameJp = response.data.customerNameJp
    data.category = response.data.category
    data.regDate = response.data.regDate ? response.data.regDate.replaceAll('-', '/') : null
    data.transferNum1 = response.data.transferNum1
    data.lSettingNum1 = response.data.lSettingNum1
    data.pipeTransferNum1 = response.data.pipeTransferNum1
    data.transferNum2 = response.data.transferNum2
    data.lSettingNum2 = response.data.lSettingNum2
    data.pipeTransferNum2 = response.data.pipeTransferNum2
    data.transferNum3 = response.data.transferNum3
    data.lSettingNum3 = response.data.lSettingNum3
    data.pipeTransferNum3 = response.data.pipeTransferNum3
    data.transferNum4 = response.data.transferNum4
    data.lSettingNum4 = response.data.lSettingNum4
    data.pipeTransferNum4 = response.data.pipeTransferNum4
  })
}

const back = () => {
  router.push({
    path: '/record-reg-app'
  })
}

onMounted(() => {
  if (route.query.projectNo && route.query.category) {
    let request = {
      projectNo: route.query.projectNo,
      category: route.query.category
    }
    getDetails(request)
  }
})

watch(data, () => console.log('watch'))
</script>

<style scoped>
.v-card-title {
  font-size: 35px !important;
}
</style>
