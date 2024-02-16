<template>
  <div class="min-h-[85vh] flex flex-col relative">
    <div class="w-full p-5 border-b border-gray-50">
      <div class="flex flex-row justify-between">
        <v-card :title="$t('dialogName.documentDetail')" variant="flat"></v-card>
        <v-btn
          color="info"
          class="text-sm mb-2"
          variant="outlined"
          :href="`${route.path.split('/')[route.path.split('/').length - 1]}` + '/edit'"
        >
          {{ $t('btn.edit') }}
        </v-btn>
      </div>
    </div>
    <div class="mb-15">
      <v-form ref="form" @submit.prevent>
        <v-container class="mt-4 border-b border-gray-50">
          <!--Row 1 Project No & status-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.projectNo') }}
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
                {{ $t('document.status') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.status"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 2 customerNameEn No & customerNameJp-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.customerNameEn') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.customerNameEn"
                :readonly="true"
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
                {{ $t('document.customerNameJp') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.customerNameJp"
                :readonly="true"
                class="bg-gray-200"
                variant="outlined"
                dense
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 3 representative Name & firstTel-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.representativeName') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.representativeName"
                :readonly="true"
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
                {{ $t('document.contractCusName') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.contractCusName"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 4 purchaser & firstTel-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaser') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.purchaser"
                :readonly="true"
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
                {{ $t('document.firstTel') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.firstTel"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 5 zip_code & secondTel-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.zipCode') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.zipCode"
                :readonly="true"
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
                {{ $t('document.secondTel') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.secondTel"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row 6 country & thirdTel-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.country') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.country"
                readonly="true"
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
                {{ $t('document.thirdTel') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.thirdTel"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Row Email -->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.email') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.email"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="6" sm="12" cols="12"></v-col>
          </v-row>
          <!--Row 7 address-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.address') }}
              </span>
            </v-col>
            <v-col lg="10" sm="12" cols="12">
              <v-textarea
                v-model="data.request.address"
                :readonly="true"
                rows="3"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-textarea>
            </v-col>
          </v-row>
          <!--Row Space-->
          <v-row dense>
            <v-col class="h-10"></v-col>
          </v-row>
        </v-container>

        <v-container class="mt-4 border-b border-gray-50">
          <!--Row 1 location & words & projectType & inventoryPhase-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.location') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.locationName"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col lg="3" sm="12" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.words') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.words"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.projectType') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.projectTypeName"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col lg="3" sm="12" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.inventoryPhase') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.inventoryPhase"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
          </v-row>

          <!--Row 2 purchaseFloor1 & acquiredEquity1 & financeType-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor1') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.purchaseFloor1"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col lg="3" sm="12" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.acquiredEquity1') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.acquiredEquityName1"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.financeType') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-text-field
                v-model="data.request.financeTypeName"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 3 purchaseFloor2 & acquiredEquity2 & mortgageType & loanLimit-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor2') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.purchaseFloor2"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col lg="3" sm="12" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.acquiredEquity2') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.acquiredEquityName2"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.mortgageType') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.mortgageTypeName"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col lg="3" sm="12" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.loanLimit') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.loanLimit"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
          </v-row>

          <!--Row 4 purchaseFloor3 & acquiredEquity3 & Upgrade From-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor3') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.purchaseFloor3"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col lg="3" sm="12" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.acquiredEquity3') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.acquiredEquityName3"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.upgradeFrom') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-text-field
                v-model="data.request.upgradeFrom"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 5 purchaseFloor4 & acquiredEquity4 & Contract Type-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor4') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.purchaseFloor4"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col lg="3" sm="12" cols="12" class="d-flex align-center">
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.acquiredEquity4') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.request.acquiredEquityName4"
                  :readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.contractType') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-text-field
                v-model="data.request.contractTypeName"
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

        <v-container class="mt-4">
          <!--Row 1 requestDate & estDeliveryDate-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.requestDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.requestDate"
                :readonly="true"
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
                {{ $t('document.estDeliveryDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.estDeliveryDate"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 2 Box Number-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.boxNumber') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.boxNumber"
                :readonly="true"
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
                {{ $t('document.regDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.regDate"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 3 prepareFormDate & prepareFormPic-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.prepareFormDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.prepareFormDate"
                :readonly="true"
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
                {{ $t('document.prepareFormPic') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.prepareFormPicName"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 4 primaryCheckFormDate & primaryCheckFormPic-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.primaryCheckFormDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.primaryCheckFormDate"
                :readonly="true"
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
                {{ $t('document.primaryCheckFormPic') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.primaryCheckFormPicName"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 5 datePaymentEmail & memorandumReceiptDate-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.datePaymentEmail') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.datePaymentEmail"
                :readonly="true"
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
                {{ $t('document.memorandumReceiptDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.memorandumReceiptDate"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 6 Remarks-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.remarks') }}
              </span>
            </v-col>
            <v-col lg="10" sm="12" cols="12">
              <v-textarea
                v-model="data.request.remarks"
                :readonly="true"
                rows="3"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="default"
              ></v-textarea>
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
store.setBreadcrumb(store, { name: t('dialogName.documentDetail'), path: '/document' })
const DocumentRepository = RepositoryFactory.get('document')
const route = useRoute()
const data = reactive({
  request: {
    projectNo: null,
    firstName: null,
    lastName: null,
    customerNameJp: null,
    contractCusName: null,
    remarks: null,
    status: null,
    upgradeFrom: null,
    contractTypeId: null,
    financeTypeId: null,
    locationId: null,
    contractTypeName: null,
    financeTypeName: null,
    locationName: null,
    inventoryPhase: null,
    address: null,
    zipCode: null,
    firstTel: null,
    secondTel: null,
    thirdTel: null,
    email: null,
    projectTypeId: null,
    requestDate: null,
    words: null,
    acquiredEquityName1: null,
    acquiredEquityName2: null,
    acquiredEquityName3: null,
    acquiredEquityName4: null,
    estDeliveryDate: null,
    purchaseFloor1: null,
    purchaseFloor2: null,
    purchaseFloor3: null,
    purchaseFloor4: null,
    representativeName: null,
    loanLimit: null,
    mortgageType: null,
    boxNumber: null,
    prepareFormPic: null,
    prepareFormDate: null,
    primaryCheckFormPic: null,
    primaryCheckFormDate: null,
    numberOfStatus: null,
    oldStatus: null,
    datePaymentEmail: null,
    memorandumReceiptDate: null,
    prepareFormPicName: null,
    primaryCheckFormPicName: null,
    regDate: null,
    mortgageTypeName: null
  }
})

const search = () => {
  const projectNo = route.path.split('/')[route.path.split('/').length - 1]
  let request = {}
  DocumentRepository.getByProjectNo(request, projectNo).then(function (response) {
    data.request = response.data
    data.request.purchaser =
      !data.request.representativeName && !data.request.upgradeFrom
        ? data.request.customerNameEn
        : data.request.customerNameJp
  })
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
