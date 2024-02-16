<template>
  <div class="min-h-[85vh] flex flex-col relative">
    <div class="w-full p-5 border-b border-gray-50">
      <v-card :title="$t('dialogName.recordRegFinalDetail')" variant="flat"></v-card>
    </div>
    <div class="mb-15">
      <v-form ref="form" @submit.prevent>

        <!-- Document Detail -->
        <v-container class="border-b border-gray-50">
          <!--Row 1 Project No & status-->
          <v-row dense class="mb-2">
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.projectNo') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.projectNo"
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
                v-model="data.document.status"
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
          <v-row dense class="mb-2">
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.customerNameEn') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.customerNameEn"
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
                v-model="data.document.customerNameJp"
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
          <v-row dense class="mb-2">
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.representativeName') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.representativeName"
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
                v-model="data.document.contractCusName"
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
          <v-row dense class="mb-2">
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaser') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.purchaser"
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
                v-model="data.document.firstTel"
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
          <v-row dense class="mb-2">
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.zipCode') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.zipCode"
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
                v-model="data.document.secondTel"
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
          <v-row dense class="mb-2">
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.country') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.country"
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
                v-model="data.document.thirdTel"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row 7 address-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.address') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-textarea
                v-model="data.document.address"
                :readonly="true"
                rows="3"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-textarea>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.email') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.document.email"
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

        <v-container class="border-b border-gray-50">
          <!--Row 1 location & words & projectType & inventoryPhase-->
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.location') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.document.locationName"
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
                  v-model="data.document.words"
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
                  v-model="data.document.projectTypeName"
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
                  v-model="data.document.inventoryPhase"
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
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor1') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.document.purchaseFloor1"
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
                  v-model="data.document.acquiredEquityName1"
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
                v-model="data.document.financeTypeName"
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
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor2') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.document.purchaseFloorName2"
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
                  v-model="data.document.acquiredEquityName2"
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
                  v-model="data.document.mortgageType"
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
                  v-model="data.document.loanLimit"
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
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor3') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.document.purchaseFloor3"
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
                  v-model="data.document.acquiredEquityName3"
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
                v-model="data.document.upgradeFrom"
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
                  v-model="data.document.purchaseFloor4"
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
                  v-model="data.document.acquiredEquityName4"
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
                v-model="data.document.contractTypeName"
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

        <v-container class="border-b border-gray-50">
          <!--Row 1 requestDate & estDeliveryDate-->
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.requestDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.requestDate"
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
                v-model="data.document.estDeliveryDate"
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
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.boxNumber') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.boxNumber"
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
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.prepareFormDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.prepareFormDate"
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
                v-model="data.document.prepareFormPicName"
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
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.primaryCheckFormDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.primaryCheckFormDate"
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
                v-model="data.document.primaryCheckFormPicName"
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
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.datePaymentEmail') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.document.datePaymentEmail"
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
                v-model="data.document.memorandumReceiptDate"
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
            <v-col lg="4" sm="12" cols="12">
              <v-textarea
                v-model="data.document.remarks"
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
        </v-container>

        <!-- Record Call Log Detail -->
        <v-container class="border-b border-gray-50">
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordCallLog.contactDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordCallLog.contactDate"
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
                  {{ $t('recordCallLog.estShipDocDate') }}
                </span>

              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordCallLog.estShipDocDate"
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
                {{ $t('recordCallLog.pic') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="12" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordCallLog.pic"
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
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordCallLog.remarks') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-textarea
                v-model="data.recordCallLog.remarks"
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
        </v-container>

        <!-- Record Delivery Detail -->
        <v-container class="border-b border-gray-50">
          <!-- Row 1 -->
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordDelivery.deliveryCode') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.recordDelivery.deliveryCode"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Row 2 -->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordDelivery.deliveryDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordDelivery.deliveryDate"
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
                  {{ $t('recordDelivery.returnLp') }}
                </span>

              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordDelivery.returnLp"
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
        </v-container>

        <!-- Record Doc Stamped Detail -->
        <v-container class="border-b border-gray-50">
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordDocStamped.receiptDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordDocStamped.receiptDate"
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
        </v-container>

        <!-- Record Schedule App To Hgv Detail -->
        <v-container class="border-b border-gray-50">
          <!--Row 1-->
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordScheduleAppToHgv.groupHgv') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-text-field
                v-model="data.recordScheduleAppToHgv.groupHgv"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordScheduleAppToHgv.memorandumConfirm') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="12" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordScheduleAppToHgv.memorandumConfirm"
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
          <!--Row 2-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordDocStamped.receiptDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordDocStamped.receiptDate"
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
        </v-container>

        <!-- Record Reg App Detail -->
        <v-container class="border-b border-gray-50">
          <!--Row 1-->
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.regDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.regDate"
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
                  {{ $t('recordRegApp.cancelRegDate') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.cancelRegDate"
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
                {{ $t('recordRegApp.category') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-text-field
                v-model="data.recordRegApp.category"
                :readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row 2-->
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.transferNum1') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.transferNum1"
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
                  {{ $t('recordRegApp.lSettingNum1') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.lSettingNum1"
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
                {{ $t('recordRegApp.pipeTransferNum1') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.pipeTransferNum1"
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
                  {{ $t('recordRegApp.cancelNum1') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.cancelNum1"
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
          <!--Row 3-->
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.transferNum2') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.transferNum2"
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
                  {{ $t('recordRegApp.lSettingNum2') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.lSettingNum2"
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
                {{ $t('recordRegApp.pipeTransferNum2') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.pipeTransferNum2"
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
                  {{ $t('recordRegApp.cancelNum2') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.cancelNum2"
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
          <!--Row 4-->
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.transferNum3') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.transferNum3"
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
                  {{ $t('recordRegApp.lSettingNum3') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.lSettingNum3"
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
                {{ $t('recordRegApp.pipeTransferNum3') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.pipeTransferNum3"
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
                  {{ $t('recordRegApp.cancelNum3') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.cancelNum3"
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
          <!--Row 5-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegApp.transferNum4') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.transferNum4"
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
                  {{ $t('recordRegApp.lSettingNum4') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.lSettingNum4"
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
                {{ $t('recordRegApp.pipeTransferNum4') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.pipeTransferNum4"
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
                  {{ $t('recordRegApp.cancelNum4') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegApp.cancelNum4"
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
        </v-container>

        <!-- Record Reg Complete Detail -->
        <v-container>
          <v-row class="mb-2" dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('recordRegComplete.ownerReturnDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegComplete.ownerReturnDate"
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
                  {{ $t('recordRegComplete.ownerArrivalDate') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegComplete.ownerArrivalDate"
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
                {{ $t('recordRegComplete.hgvReturnDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegComplete.hgvReturnDate"
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
                  {{ $t('recordRegComplete.returnNumber') }}
                </span>
              </v-col>
              <v-col lg="4" cols="12" style="padding: 0 !important">
                <v-text-field
                  v-model="data.recordRegComplete.returnNumber"
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
          <!--Row Space-->
          <v-row dense>
            <v-col class="h-10"></v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <div class="absolute bottom-0 w-full">
      <v-card-actions class="flex-row mt-5 mx-5 justify-end">
        <v-btn color="info" class="text-sm mb-2" variant="outlined" href="/record-reg-final"> {{ $t('btn.back') }} </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { useRoute } from 'vue-router'

const store = useCommonStore()
store.setBreadcrumb(store, { name: '完了案件詳細', path: '/record-reg-final' })
const RecordRegFinalRepository = RepositoryFactory.get('recordRegFinal')
const route = useRoute()
const data = reactive({
  document: {
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
    email:null,
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
    primaryCheckFormPicName: null
  },
  recordCallLog: {
    contactDate: null,
    pic: null,
    estShipDocDate: null,
    remarks: null
  },
  recordDelivery: {
    deliveryCode: null,
    returnLp: null,
    deliveryDate: null
  },
  recordDocStamped: {
    receiptDate: null
  },
  recordScheduleAppToHgv: {
    returnDate: null,
    groupHgv: null,
    memorandumConfirm: null
  },
  recordRegApp: {
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
    pipeTransferNum4: null,
    cancelRegDate: null,
    cancelNum1: null,
    cancelNum2: null,
    cancelNum3: null,
    cancelNum4: null,
    category: null,
  },
  recordRegComplete: {
    ownerReturnDate: null,
    ownerArrivalDate: null,
    hgvReturnDate: null,
    returnNumber: null
  },
})

const search = () => {
  const projectNo = route.path.split('/')[route.path.split('/').length - 1]
  let request = {}
  RecordRegFinalRepository.getByProjectNo(request, projectNo).then(function (response) {
    data.document = response.data.documentDetailResponse
    data.recordCallLog = response.data.recordCallLogDetailResponse
    data.recordDelivery = response.data.recordDeliveryDetailResponse
    data.recordDocStamped = response.data.recordDocStampedDetailResponse
    data.recordScheduleAppToHgv = response.data.recordScheduleAppToHgvDetailResponse
    data.recordRegApp = response.data.recordRegAppDetailResponse
    data.recordRegComplete = response.data.recordRegCompleteDetailResponse
    data.document.loanLimit = data.document.loanLimit
      ? Number(data.document.loanLimit)
      : data.document.loanLimit
    data.document.purchaser =
      !data.document.representativeName && !data.document.upgradeFrom
        ? ''
        : data.document.customerNameJp
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
