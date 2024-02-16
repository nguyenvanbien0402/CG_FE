<template>
  <div class="min-h-[85vh] flex flex-col relative">
    <div class="w-full p-5 border-b border-gray-50">
      <v-card :title="$t('dialogName.documentEdit')" variant="flat"></v-card>
    </div>
    <div class="mb-15">
      <v-form ref="form" @submit.prevent>
        <v-container class="mt-4 border-b border-gray-50">
          <!--Row 1 Project No & status-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.projectNo') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.projectNo"
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
                {{ $t('document.status') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <v-text-field
                v-model="data.request.status"
                readonly="true"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row 2 firstName & lastName  & customerNameJp-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.firstNameIsError ||
                data.isError.lastNameIsError ||
                data.isError.customerNameJpIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.firstName') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.firstNameIsError ||
                  data.isError.lastNameIsError ||
                  data.isError.customerNameJpIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.firstName"
                  :error="data.isError.firstNameIsError"
                  :error-messages="data.errorInfos.firstNameError"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  maxlength="255"
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  :hide-details="!data.isError.firstNameIsError"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"></v-col>
              <v-col
                lg="3"
                sm="12"
                cols="12"
                :class="
                  data.isError.firstNameIsError ||
                  data.isError.lastNameIsError ||
                  data.isError.customerNameJpIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.lastName') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="4"
                sm="12"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.firstNameIsError ||
                  data.isError.lastNameIsError ||
                  data.isError.customerNameJpIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.lastName"
                  :error="data.isError.lastNameIsError"
                  :error-messages="data.errorInfos.lastNameError"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  maxlength="255"
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.lastNameIsError"
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.firstNameIsError ||
                data.isError.lastNameIsError ||
                data.isError.customerNameJpIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.customerNameJp') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.customerNameJp"
                :error="data.isError.customerNameJpIsError"
                :error-messages="data.errorInfos.customerNameJpError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="255"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.customerNameJpIsError"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row 3 representative & contractCusName-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.representativeNameIsError || data.isError.contractCusNameIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.representativeName') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.representativeName"
                :error="data.isError.representativeNameIsError"
                :error-messages="data.errorInfos.representativeNameError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="255"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.representativeNameIsError"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.representativeNameIsError || data.isError.contractCusNameIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.contractCusName') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.contractCusName"
                :error="data.isError.contractCusNameIsError"
                :error-messages="data.errorInfos.contractCusNameError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="255"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.contractCusNameIsError"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row 4 purchaser & firstTel-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaserIsError || data.isError.firstTelIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaser') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.purchaser"
                :error="data.isError.purchaserIsError"
                :error-messages="data.errorInfos.purchaserError"
                readonly="true"
                maxlength="255"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaserIsError || data.isError.firstTelIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.firstTel') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.firstTel"
                :error="data.isError.firstTelIsError"
                :error-messages="data.errorInfos.firstTelError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="50"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.firstTelIsError"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row 5 zip_code & secondTel-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.zipCodeIsError || data.isError.secondTelIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.zipCode') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.zipCode"
                :error="data.isError.zipCodeIsError"
                :error-messages="data.errorInfos.zipCodeError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="50"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.zipCodeIsError"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.zipCodeIsError || data.isError.secondTelIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.secondTel') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.secondTel"
                :error="data.isError.secondTelIsError"
                :error-messages="data.errorInfos.secondTelError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="50"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.secondTelIsError"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--Row 6 country & thirdTel-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.countryIsError || data.isError.thirdTelIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.country') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.country"
                :error="data.isError.countryIsError"
                :error-messages="data.errorInfos.countryError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="50"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.countryIsError"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.countryIsError || data.isError.thirdTelIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.thirdTel') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.thirdTel"
                :error="data.isError.thirdTelIsError"
                :error-messages="data.errorInfos.thirdTelError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="50"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.thirdTelIsError"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Row email -->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.emailIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.email') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.email"
                :error="data.isError.emailIsError"
                :error-messages="data.errorInfos.emailError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="200"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.emailIsError"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col lg="6" sm="12" cols="12"></v-col>
          </v-row>
          <!--Row 7 addressEn-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.addressEn') }}
              </span>
            </v-col>
            <v-col lg="10" sm="12" cols="12">
              <v-textarea
                v-model="data.request.addressEn"
                readonly="true"
                rows="3"
                dense
                class="bg-gray-200"
                variant="outlined"
                hide-details
                density="compact"
              ></v-textarea>
            </v-col>
          </v-row>
          <!--Row 8 address-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="data.isError.addressIsError ? 'mt-3' : 'd-flex align-center'"
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.address') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="10" sm="12" cols="12">
              <v-textarea
                v-model="data.request.address"
                :error="data.isError.addressIsError"
                :error-messages="data.errorInfos.addressError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="255"
                rows="3"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.addressIsError"
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
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.wordsIsError ||
                data.isError.projectTypeIdIsError ||
                data.isError.inventoryPhaseIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.location') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.wordsIsError ||
                  data.isError.projectTypeIdIsError ||
                  data.isError.inventoryPhaseIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-select
                  v-model="data.request.locationId"
                  density="compact"
                  readonly="true"
                  dense
                  class="bg-gray-200"
                  variant="outlined"
                  hide-details
                  :items="locations"
                ></v-select>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col
                lg="3"
                sm="12"
                cols="12"
                :class="
                  data.isError.wordsIsError ||
                  data.isError.projectTypeIdIsError ||
                  data.isError.inventoryPhaseIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.words') }}
                  <span class="text-red-600">*</span>
                </span>
              </v-col>
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.wordsIsError ||
                  data.isError.projectTypeIdIsError ||
                  data.isError.inventoryPhaseIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.words"
                  :error="data.isError.wordsIsError"
                  :error-messages="data.errorInfos.wordsError"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.wordsIsError"
                  density="compact"
                  type="number"
                  :max="MAX_NUMBER_9_CHAR"
                  :oninput="validateInputNumberWords"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.wordsIsError ||
                data.isError.projectTypeIdIsError ||
                data.isError.inventoryPhaseIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.projectType') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.wordsIsError ||
                  data.isError.projectTypeIdIsError ||
                  data.isError.inventoryPhaseIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-select
                  v-model="data.request.projectTypeId"
                  :error="data.isError.projectTypeIdIsError"
                  :error-messages="data.errorInfos.projectTypeIdError"
                  density="compact"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.projectTypeIdIsError"
                  :items="projectTypes"
                  @update:modelValue="changeSelection('Project Type')"
                ></v-select>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col
                lg="3"
                sm="12"
                cols="12"
                :class="
                  data.isError.wordsIsError ||
                  data.isError.projectTypeIdIsError ||
                  data.isError.inventoryPhaseIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.inventoryPhase') }}
                </span>
              </v-col>
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.wordsIsError ||
                  data.isError.projectTypeIdIsError ||
                  data.isError.inventoryPhaseIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.inventoryPhase"
                  ::error="data.isError.inventoryPhaseIsError"
                  :error-messages="data.errorInfos.inventoryPhaseError"
                  maxlength="50"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.inventoryPhaseIsError"
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-col>
          </v-row>

          <!--Row 2 purchaseFloor1 & acquiredEquity1 & financeType-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor1IsError ||
                data.isError.acquiredEquity1IsError ||
                data.isError.financeTypeIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor1') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor1IsError ||
                  data.isError.acquiredEquity1IsError ||
                  data.isError.financeTypeIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.purchaseFloor1"
                  :error="data.isError.purchaseFloor1IsError"
                  :error-messages="data.errorInfos.purchaseFloor1Error"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.purchaseFloor1IsError"
                  density="compact"
                  type="number"
                  :max="MAX_NUMBER_9_CHAR"
                  :oninput="validateInputNumberPurchase1"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col
                lg="3"
                sm="12"
                cols="12"
                :class="
                  data.isError.purchaseFloor1IsError ||
                  data.isError.acquiredEquity1IsError ||
                  data.isError.financeTypeIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.acquiredEquity1') }}
                </span>
              </v-col>
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor1IsError ||
                  data.isError.acquiredEquity1IsError ||
                  data.isError.financeTypeIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-select
                  v-model="data.request.acquiredEquity1"
                  :error="data.isError.acquiredEquity1IsError"
                  :error-messages="data.errorInfos.acquiredEquity1Error"
                  density="compact"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.acquiredEquity1IsError"
                  :items="equityTypes"
                ></v-select>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor1IsError ||
                data.isError.acquiredEquity1IsError ||
                data.isError.financeTypeIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.financeType') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor1IsError ||
                data.isError.acquiredEquity1IsError ||
                data.isError.financeTypeIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <v-select
                v-model="data.request.financeTypeId"
                :error="data.isError.financeTypeIsError"
                :error-messages="data.errorInfos.financeTypeError"
                density="compact"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.financeTypeIsError"
                :items="financeTypes"
                @update:modelValue="changeSelection('Finance Type')"
              ></v-select>
            </v-col>
          </v-row>

          <!--Row 3 purchaseFloor2 & acquiredEquity2 & mortgageType & loanLimit-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor2IsError ||
                data.isError.acquiredEquity2IsError ||
                data.isError.financeTypeIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor2') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor2IsError ||
                  data.isError.acquiredEquity2IsError ||
                  data.isError.mortgageTypeIsError ||
                  data.isError.loanLimitIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.purchaseFloor2"
                  :error="data.isError.purchaseFloor2IsError"
                  :error-messages="data.errorInfos.purchaseFloor2Error"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.purchaseFloor2IsError"
                  density="compact"
                  type="number"
                  :max="MAX_NUMBER_9_CHAR"
                  :oninput="validateInputNumberPurchase2"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col
                lg="3"
                sm="12"
                cols="12"
                :class="
                  data.isError.purchaseFloor2IsError ||
                  data.isError.acquiredEquity2IsError ||
                  data.isError.mortgageTypeIsError ||
                  data.isError.loanLimitIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.acquiredEquity2') }}
                </span>
              </v-col>
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor2IsError ||
                  data.isError.acquiredEquity2IsError ||
                  data.isError.mortgageTypeIsError ||
                  data.isError.loanLimitIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-select
                  v-model="data.request.acquiredEquity2"
                  :error="data.isError.acquiredEquity2IsError"
                  :error-messages="data.errorInfos.acquiredEquity2Error"
                  density="compact"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.acquiredEquity2IsError"
                  :items="equityTypes"
                ></v-select>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor2IsError ||
                data.isError.acquiredEquity2IsError ||
                data.isError.mortgageTypeIsError ||
                data.isError.loanLimitIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.mortgageType') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor2IsError ||
                  data.isError.acquiredEquity2IsError ||
                  data.isError.mortgageTypeIsError ||
                  data.isError.loanLimitIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-select
                  v-model="data.request.mortgageType"
                  :error="data.errorInfos.mortgageTypeIsError"
                  density="compact"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.mortgageTypeIsError"
                  :items="settingTypes"
                  @update:modelValue="changeSelection('Mortgage Type')"
                ></v-select>
                <span v-if="data.errorInfos.mortgageTypeIsError" class="text-red-500 text-xs">{{
                  data.isError.mortgageTypeError
                }}</span>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col
                lg="3"
                sm="12"
                cols="12"
                :class="
                  data.isError.purchaseFloor2IsError ||
                  data.isError.acquiredEquity2IsError ||
                  data.isError.mortgageTypeIsError ||
                  data.isError.loanLimitIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.loanLimit') }}
                </span>
              </v-col>
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor2IsError ||
                  data.isError.acquiredEquity2IsError ||
                  data.isError.mortgageTypeIsError ||
                  data.isError.loanLimitIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.loanLimit"
                  :error="data.isError.loanLimitIsError"
                  :error-messages="data.errorInfos.loanLimitError"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  maxlength="255"
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.loanLimitIsError"
                  density="compact"
                  type="number"
                  :max="MAX_NUMBER_9_CHAR"
                  :oninput="validateInputNumberLoanLimit"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
            </v-col>
          </v-row>

          <!--Row 4 purchaseFloor3 & acquiredEquity3 & Upgrade From-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor3IsError ||
                data.isError.acquiredEquity3IsError ||
                data.isError.upgradeFromIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor3') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor3IsError ||
                  data.isError.acquiredEquity3IsError ||
                  data.isError.upgradeFromIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.purchaseFloor3"
                  :error="data.isError.purchaseFloor3IsError"
                  :error-messages="data.errorInfos.purchaseFloor3Error"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.purchaseFloor3IsError"
                  density="compact"
                  type="number"
                  :max="MAX_NUMBER_9_CHAR"
                  :oninput="validateInputNumberPurchase3"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col
                lg="3"
                sm="12"
                cols="12"
                :class="
                  data.isError.purchaseFloor3IsError ||
                  data.isError.acquiredEquity3IsError ||
                  data.isError.upgradeFromIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.acquiredEquity3') }}
                </span>
              </v-col>
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor3IsError ||
                  data.isError.acquiredEquity3IsError ||
                  data.isError.upgradeFromIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-select
                  v-model="data.request.acquiredEquity3"
                  :error="data.isError.acquiredEquity3IsError"
                  :error-messages="data.errorInfos.acquiredEquity3Error"
                  density="compact"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.acquiredEquity3IsError"
                  :items="equityTypes"
                ></v-select>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor3IsError ||
                data.isError.acquiredEquity3IsError ||
                data.isError.upgradeFromIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.upgradeFrom') }}
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor3IsError ||
                data.isError.acquiredEquity3IsError ||
                data.isError.upgradeFromIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <v-text-field
                v-model="data.request.upgradeFrom"
                :error="data.isError.upgradeFromIsError"
                :error-messages="data.errorInfos.upgradeFromError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="50"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.upgradeFromIsError"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--Row 5 purchaseFloor4 & acquiredEquity4 & Contract Type-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor4IsError ||
                data.isError.acquiredEquity4IsError ||
                data.isError.contractTypeIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.purchaseFloor4') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="d-flex align-center">
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor4IsError ||
                  data.isError.acquiredEquity4IsError ||
                  data.isError.contractTypeIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-text-field
                  v-model="data.request.purchaseFloor4"
                  :error="data.isError.purchaseFloor4IsError"
                  :error-messages="data.errorInfos.purchaseFloor4Error"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  maxlength="255"
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.purchaseFloor4IsError"
                  density="compact"
                  type="number"
                  :max="MAX_NUMBER_9_CHAR"
                  :oninput="validateInputNumberPurchase4"
                  @keypress="handleInput"
                ></v-text-field>
              </v-col>
              <v-col lg="1" sm="12" cols="12"> </v-col>
              <v-col
                lg="3"
                sm="12"
                cols="12"
                :class="
                  data.isError.purchaseFloor4IsError ||
                  data.isError.acquiredEquity4IsError ||
                  data.isError.contractTypeIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                  {{ $t('document.acquiredEquity4') }}
                </span>
              </v-col>
              <v-col
                lg="4"
                cols="12"
                style="padding: 0 !important"
                :class="
                  data.isError.purchaseFloor4IsError ||
                  data.isError.acquiredEquity4IsError ||
                  data.isError.contractTypeIsError
                    ? 'h-full'
                    : 'd-flex align-center'
                "
              >
                <v-select
                  v-model="data.request.acquiredEquity4"
                  :error="data.isError.acquiredEquity4IsError"
                  :error-messages="data.errorInfos.acquiredEquity4Error"
                  density="compact"
                  :readonly="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                  "
                  dense
                  :class="
                    data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                      ? 'bg-gray-200'
                      : ''
                  "
                  variant="outlined"
                  :hide-details="!data.isError.acquiredEquity4IsError"
                  :items="equityTypes"
                ></v-select>
              </v-col>
            </v-col>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center"></v-col>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor4IsError ||
                data.isError.acquiredEquity4IsError ||
                data.isError.contractTypeIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.contractType') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="
                data.isError.purchaseFloor4IsError ||
                data.isError.acquiredEquity4IsError ||
                data.isError.contractTypeIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <v-select
                v-model="data.request.contractTypeId"
                :error="data.errorInfos.contractTypeIsError"
                :error-messages="data.errorInfos.contractTypeError"
                density="compact"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                dense
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.contractTypeIsError"
                :items="contractTypes"
                @update:modelValue="changeSelection('Contract Type')"
              >
              </v-select>
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
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="data.isError.requestDateIsError ? 'mt-3' : 'd-flex align-center'"
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.requestDate') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <VueDatePicker
                v-model="data.request.requestDate"
                :select-text="$t('datePicker.select')"
                :cancel-text="$t('datePicker.cancel')"
                text-input
                :disabled="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                locale="ja"
                :enable-time-picker="false"
                format="yyyy/MM/dd"
              ></VueDatePicker>
              <div class="px-3" v-if="data.isError.requestDateIsError">
                <span class="v-messages__message" style="color: rgb(var(--v-theme-error))">{{
                  data.errorInfos.requestDateError
                }}</span>
              </div>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="data.isError.requestDateIsError ? 'mt-3' : 'my-auto'"
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.estDeliveryDate') }}
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="data.isError.requestDateIsError ? 'h-full' : 'my-auto'"
            >
              <VueDatePicker
                v-model="data.request.estDeliveryDate"
                :select-text="$t('datePicker.select')"
                :cancel-text="$t('datePicker.cancel')"
                text-input
                :disabled="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                locale="ja"
                :enable-time-picker="false"
                format="yyyy/MM/dd"
              ></VueDatePicker>
            </v-col>
          </v-row>

          <!--Row 2 Box Number-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="data.isError.boxNumberIsError ? 'mt-3' : 'd-flex align-center'"
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.boxNumber') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <v-text-field
                v-model="data.request.boxNumber"
                :error="data.isError.boxNumberIsError"
                :error-messages="data.errorInfos.boxNumberError"
                :readonly="
                  (data.request.numberOfStatus !== 6 && data.request.numberOfStatus !== 99) ||
                  (data.request.numberOfStatus === 99 && data.request.oldStatus < 6)
                "
                maxlength="255"
                dense
                :class="
                  (data.request.numberOfStatus !== 6 && data.request.numberOfStatus !== 99) ||
                  (data.request.numberOfStatus === 99 && data.request.oldStatus < 6)
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.boxNumberIsError"
                density="compact"
                type="number"
                :max="MAX_NUMBER_9_CHAR"
                :oninput="validateInputNumberBoxNumber"
                @keypress="handleInput"
              ></v-text-field>
            </v-col>

            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="data.isError.boxNumberIsError ? 'mt-3' : 'd-flex align-center'"
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.regDate') }}
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="data.isError.boxNumberIsError ? 'h-full' : 'my-auto'"
            >
              <VueDatePicker
                v-model="data.request.regDate"
                :select-text="$t('datePicker.select')"
                :cancel-text="$t('datePicker.cancel')"
                text-input
                disabled="true"
                locale="ja"
                :enable-time-picker="false"
                format="yyyy/MM/dd"
              ></VueDatePicker>
            </v-col>
          </v-row>

          <!--Row 3 prepareFormDate & prepareFormPic-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.prepareFormDateIsError || data.isError.prepareFormPicIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.prepareFormDate') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="
                data.isError.prepareFormDateIsError || data.isError.prepareFormPicIsError
                  ? 'h-full'
                  : ''
              "
            >
              <VueDatePicker
                v-model="data.request.prepareFormDate"
                :select-text="$t('datePicker.select')"
                :cancel-text="$t('datePicker.cancel')"
                text-input
                :disabled="
                  (data.request.numberOfStatus !== 6 && data.request.numberOfStatus !== 99) ||
                  (data.request.numberOfStatus === 99 && data.request.oldStatus < 6)
                "
                locale="ja"
                :enable-time-picker="false"
                format="yyyy/MM/dd"
              ></VueDatePicker>
              <div class="px-3" v-if="data.isError.prepareFormDateIsError">
                <span class="v-messages__message" style="color: rgb(var(--v-theme-error))">{{
                  data.errorInfos.prepareFormDateError
                }}</span>
              </div>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.prepareFormDateIsError || data.isError.prepareFormPicIsError
                  ? 'mt-3'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.prepareFormPic') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="
                data.isError.prepareFormDateIsError || data.isError.prepareFormPicIsError
                  ? 'h-full'
                  : 'my-auto'
              "
            >
              <v-select
                v-model="data.request.prepareFormPic"
                density="compact"
                :error="data.isError.prepareFormPicIsError"
                :error-messages="data.errorInfos.prepareFormPicError"
                :readonly="
                  (data.request.numberOfStatus !== 6 && data.request.numberOfStatus !== 99) ||
                  (data.request.numberOfStatus === 99 && data.request.oldStatus < 6)
                "
                maxlength="255"
                dense
                :class="
                  (data.request.numberOfStatus !== 6 && data.request.numberOfStatus !== 99) ||
                  (data.request.numberOfStatus === 99 && data.request.oldStatus < 6)
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.prepareFormPicIsError"
                :items="users"
                @update:modelValue="changeSelection('Prepare Form Pic')"
              ></v-select>
            </v-col>
          </v-row>

          <!--Row 4 primaryCheckFormDate & primaryCheckFormPic-->
          <v-row dense>
            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.primaryCheckFormDateIsError || data.isError.primaryCheckFormPicIsError
                  ? 'h-full'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.primaryCheckFormDate') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="
                data.isError.primaryCheckFormDateIsError || data.isError.primaryCheckFormPicIsError
                  ? 'h-full'
                  : ''
              "
            >
              <VueDatePicker
                v-model="data.request.primaryCheckFormDate"
                :select-text="$t('datePicker.select')"
                :cancel-text="$t('datePicker.cancel')"
                text-input
                :disabled="
                  (data.request.numberOfStatus !== 6 && data.request.numberOfStatus !== 99) ||
                  (data.request.numberOfStatus === 99 && data.request.oldStatus < 6)
                "
                locale="ja"
                :enable-time-picker="false"
                format="yyyy/MM/dd"
              ></VueDatePicker>
              <div class="px-3" v-if="data.isError.primaryCheckFormDateIsError">
                <span class="v-messages__message" style="color: rgb(var(--v-theme-error))">{{
                  data.errorInfos.primaryCheckFormDateError
                }}</span>
              </div>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col
              lg="1"
              sm="12"
              cols="12"
              :class="
                data.isError.primaryCheckFormDateIsError || data.isError.primaryCheckFormPicIsError
                  ? 'h-full'
                  : 'd-flex align-center'
              "
            >
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.primaryCheckFormPic') }}
                <span class="text-red-600">*</span>
              </span>
            </v-col>
            <v-col
              lg="4"
              sm="12"
              cols="12"
              :class="
                data.isError.primaryCheckFormDateIsError || data.isError.primaryCheckFormPicIsError
                  ? 'h-full'
                  : 'my-auto'
              "
            >
              <v-select
                v-model="data.request.primaryCheckFormPic"
                density="compact"
                :error="data.isError.primaryCheckFormPicIsError"
                :error-messages="data.errorInfos.primaryCheckFormPicError"
                :readonly="
                  (data.request.numberOfStatus !== 6 && data.request.numberOfStatus !== 99) ||
                  (data.request.numberOfStatus === 99 && data.request.oldStatus < 6)
                "
                maxlength="255"
                dense
                :class="
                  (data.request.numberOfStatus !== 6 && data.request.numberOfStatus !== 99) ||
                  (data.request.numberOfStatus === 99 && data.request.oldStatus < 6)
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.primaryCheckFormPicIsError"
                :items="users"
                @update:modelValue="changeSelection('Primary Check Form Pic')"
              ></v-select>
            </v-col>
          </v-row>

          <!--Row 5 date_payment_email & memorandum_receipt_date-->
          <v-row dense>
            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.datePaymentEmail') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12">
              <VueDatePicker
                v-model="data.request.datePaymentEmail"
                :select-text="$t('datePicker.select')"
                :cancel-text="$t('datePicker.cancel')"
                text-input
                disabled="true"
                locale="ja"
                :enable-time-picker="false"
                format="yyyy/MM/dd"
              ></VueDatePicker>
            </v-col>
            <v-col lg="1" sm="12" cols="12"></v-col>

            <v-col lg="1" sm="12" cols="12" class="d-flex align-center">
              <span class="text-sm-left float-sm-left font-weight-medium text-sm">
                {{ $t('document.memorandumReceiptDate') }}
              </span>
            </v-col>
            <v-col lg="4" sm="12" cols="12" class="my-auto">
              <VueDatePicker
                v-model="data.request.memorandumReceiptDate"
                :select-text="$t('datePicker.select')"
                :cancel-text="$t('datePicker.cancel')"
                text-input
                disabled="true"
                locale="ja"
                :enable-time-picker="false"
                format="yyyy/MM/dd"
              ></VueDatePicker>
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
                :error="data.isError.remarksIsError"
                :error-messages="data.errorInfos.remarksError"
                :readonly="data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99"
                maxlength="255"
                dense
                rows="3"
                :class="
                  data.request.numberOfStatus !== 0 && data.request.numberOfStatus !== 99
                    ? 'bg-gray-200'
                    : ''
                "
                variant="outlined"
                :hide-details="!data.isError.remarksIsError"
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
      <v-card-actions class="flex-row justify-end mt-5 mx-5">
        <v-btn color="info" class="text-sm mb-2" variant="outlined" href="/document">
          {{ $t('btn.back') }}
        </v-btn>
        <v-btn color="info" class="text-sm mb-2" variant="flat" @click="save">
          {{ $t('btn.save') }}
        </v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, computed, watch } from 'vue'
import { useCommonStore } from '@/store/commonStore'
import { useDocumentStore } from '@/store/process/documentStore'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import { useRoute, useRouter } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { MAX_NUMBER_9_CHAR } from '@/constants/constant'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useCommonStore()
const documentStore = useDocumentStore()
store.setBreadcrumb(store, { name: t('dialogName.documentEdit'), path: '/document' })
const DocumentRepository = RepositoryFactory.get('document')
const route = useRoute()
const router = useRouter()

const contractTypes = computed(() => documentStore.getContractTypes)
const financeTypes = computed(() => documentStore.getFinanceTypes)
const locations = computed(() => documentStore.getLocations)
const projectTypes = computed(() => documentStore.getProjectTypes)
const users = computed(() => documentStore.getUserManages)
const settingTypes = computed(() => documentStore.getSettingType)
const equityTypes = computed(() => documentStore.getEquityType)
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
    inventoryPhase: null,
    address: null,
    addressEn: null,
    zipCode: null,
    firstTel: null,
    secondTel: null,
    thirdTel: null,
    email:null,
    projectTypeId: null,
    requestDate: null,
    words: null,
    acquiredEquity1: null,
    acquiredEquity2: null,
    acquiredEquity3: null,
    acquiredEquity4: null,
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
    purchaser: null,
    country: null,
    datePaymentEmail: null,
    memorandumReceiptDate: null,
    regDate: null
  },
  errorInfos: {
    projectNoError: '',
    firstNameError: '',
    lastNameError: '',
    customerNameJpError: '',
    contractCusNameError: '',
    remarksError: '',
    statusError: '',
    upgradeFromError: '',
    contractTypeError: '',
    financeTypeError: '',
    locationError: '',
    inventoryPhaseError: '',
    addressError: '',
    zipCodeError: '',
    firstTelError: '',
    secondTelError: '',
    thirdTelError: '',
    emailError:'',
    projectTypeIdError: '',
    requestDateError: '',
    wordsError: '',
    acquiredEquity1Error: '',
    acquiredEquity2Error: '',
    acquiredEquity3Error: '',
    acquiredEquity4Error: '',
    estDeliveryDateError: '',
    purchaseFloor1Error: '',
    purchaseFloor2Error: '',
    purchaseFloor3Error: '',
    purchaseFloor4Error: '',
    representativeNameError: '',
    loanLimitError: '',
    mortgageTypeError: '',
    boxNumberError: '',
    prepareFormPicError: '',
    prepareFormDateError: '',
    primaryCheckFormPicError: '',
    primaryCheckFormDateError: '',
    purchaserError: '',
    countryError: ''
  },
  isError: {
    projectNoIsError: false,
    firstNameIsError: false,
    lastNameIsError: false,
    customerNameJpIsError: false,
    contractCusNameIsError: false,
    remarksIsError: false,
    statusIsError: false,
    upgradeFromIsError: false,
    contractTypeIsError: false,
    financeTypeIsError: false,
    locationIsError: false,
    inventoryPhaseIsError: false,
    addressIsError: false,
    zipCodeIsError: false,
    firstTelIsError: false,
    secondTelIsError: false,
    thirdTelIsError: false,
    emailIsError:false,
    projectTypeIdIsError: false,
    requestDateIsError: false,
    wordsIsError: false,
    acquiredEquity1IsError: false,
    acquiredEquity2IsError: false,
    acquiredEquity3IsError: false,
    acquiredEquity4IsError: false,
    estDeliveryDateIsError: false,
    purchaseFloor1IsError: false,
    purchaseFloor2IsError: false,
    purchaseFloor3IsError: false,
    purchaseFloor4IsError: false,
    representativeNameIsError: false,
    loanLimitIsError: false,
    mortgageTypeIsError: false,
    boxNumberIsError: false,
    prepareFormPicIsError: false,
    prepareFormDateIsError: false,
    primaryCheckFormPicIsError: false,
    primaryCheckFormDateIsError: false,
    purchaserIsError: false,
    countryIsError: false
  }
})

const search = () => {
  const projectNo = route.path.split('/')[route.path.split('/').length - 2]
  let request = {}
  DocumentRepository.getByProjectNo(request, projectNo).then(function (response) {
    data.request = response.data
    data.request.loanLimit = data.request.loanLimit
      ? data.request.loanLimit.replaceAll(',', '')
      : data.request.loanLimit
    data.request.boxNumber = data.request.boxNumber
      ? data.request.boxNumber.replaceAll(',', '')
      : data.request.boxNumber
    data.request.purchaser =
      !data.request.representativeName && !data.request.upgradeFrom
        ? data.request.customerNameEn
        : data.request.customerNameJp
  })
}

const save = () => {
  if (typeof data.request.requestDate !== 'string' && data.request.requestDate) {
    data.request.requestDate = data.request.requestDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '/')
  }
  if (typeof data.request.estDeliveryDate !== 'string' && data.request.estDeliveryDate) {
    data.request.estDeliveryDate = data.request.estDeliveryDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '/')
  }
  if (typeof data.request.prepareFormDate !== 'string' && data.request.prepareFormDate) {
    data.request.prepareFormDate = data.request.prepareFormDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '/')
  }
  if (typeof data.request.primaryCheckFormDate !== 'string' && data.request.primaryCheckFormDate) {
    data.request.primaryCheckFormDate = data.request.primaryCheckFormDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '/')
  }
  debugger
  DocumentRepository.add(data.request).then((response) => {
    if (response.code !== 'ES200') {
      response.data.forEach((s) => {
        switch (s.fieldName) {
          case 'Contract Type':
            data.errorInfos.contractTypeError = s.errorCode
            data.isError.contractTypeIsError = true
            documentStore.fetchContractType()
            break
          case 'Finance Type':
            data.errorInfos.financeTypeError = s.errorCode
            data.isError.financeTypeIsError = true
            documentStore.fetchFinanceType()
            break
          case 'Project Type':
            data.errorInfos.projectTypeIdError = s.errorCode
            data.isError.projectTypeIdIsError = true
            documentStore.fetchProjectType()
            break
          case 'projectTypeId':
            data.errorInfos.projectTypeIdError = s.errorCode
            data.isError.projectTypeIdIsError = true
            break
          case 'Prepare Form Pic':
            data.errorInfos.prepareFormPicError = s.errorCode
            data.isError.prepareFormPicIsError = true
            documentStore.fetchUserManage()
            break
          case 'Primary Check Form Pic':
            data.errorInfos.primaryCheckFormPicError = s.errorCode
            data.isError.primaryCheckFormPicIsError = true
            documentStore.fetchUserManage()
            break
          case 'Mortgage Type':
            data.errorInfos.primaryCheckFormPicError = s.errorCode
            data.isError.primaryCheckFormPicIsError = true
            documentStore.fetchSettingType()
            break
          case 'firstName':
            data.errorInfos.firstNameError = s.errorCode
            data.isError.firstNameIsError = true
            break
          case 'contractTypeId':
            data.errorInfos.contractTypeError = s.errorCode
            data.isError.contractTypeIsError = true
            break
          case 'lastName':
            data.errorInfos.lastNameError = s.errorCode
            data.isError.lastNameIsError = true
            break
          case 'address':
            data.errorInfos.addressError = s.errorCode
            data.isError.addressIsError = true
            break
          case 'projectNo':
            data.errorInfos.projectNoError = s.errorCode
            data.isError.projectNoIsError = true
            break
          case 'status':
            data.errorInfos.statusError = s.errorCode
            data.isError.statusIsError = true
            break
          case 'locationId':
            data.errorInfos.locationError = s.errorCode
            data.isError.locationIsError = true
            break
          case 'contractTypeId':
            data.errorInfos.contractTypeError = s.errorCode
            data.isError.contractTypeIsError = true
            break
          case 'financeTypeId':
            data.errorInfos.financeTypeError = s.errorCode
            data.isError.financeTypeIsError = true
            break
          case 'inventoryPhase':
            data.errorInfos.inventoryPhaseError = s.errorCode
            data.isError.inventoryPhaseIsError = true
            break
          case 'zipCode':
            data.errorInfos.zipCodeError = s.errorCode.replace('Postal Code', '郵便番号')
            data.isError.zipCodeIsError = true
            break
          case 'contractCusName':
            data.errorInfos.contractCusNameError = s.errorCode
            data.isError.contractCusNameIsError = true
            break
          case 'upgradeFrom':
            data.errorInfos.upgradeFromError = s.errorCode.replace('Upgrade From', '原契約番号')
            data.isError.upgradeFromIsError = true
            break
          case 'thirdTel':
            data.errorInfos.thirdTelError = s.errorCode.replace('Phone 3', 'Third Tel')
            data.isError.thirdTelIsError = true
            break
          case 'secondTel':
            data.errorInfos.secondTelError = s.errorCode.replace('Phone 2', 'Second Tel')
            data.isError.secondTelIsError = true
            break
            case 'email':
            data.errorInfos.emailError = s.errorCode
            data.isError.emailIsError = true
            break
          case 'remarks':
            data.errorInfos.remarksError = s.errorCode
            data.isError.remarksIsError = true
            break
          case 'country':
            data.errorInfos.countryError = s.errorCode
            data.isError.countryIsError = true
            break
          case 'requestDate':
            data.errorInfos.requestDateError = s.errorCode
            data.isError.requestDateIsError = true
            break
          case 'words':
            data.errorInfos.wordsError = s.errorCode
            data.isError.wordsIsError = true
            break
          case 'acquiredEquity1':
            data.errorInfos.acquiredEquity1Error = s.errorCode
            data.isError.acquiredEquity1IsError = true
            break
          case 'acquiredEquity2':
            data.errorInfos.acquiredEquity2Error = s.errorCode
            data.isError.acquiredEquity2IsError = true
            break
          case 'acquiredEquity3':
            data.errorInfos.acquiredEquity3Error = s.errorCode
            data.isError.acquiredEquity3IsError = true
            break
          case 'acquiredEquity4':
            data.errorInfos.acquiredEquity4Error = s.errorCode
            data.isError.acquiredEquity4IsError = true
            break
          case 'customerNameJp':
            data.errorInfos.customerNameJpError = s.errorCode
            data.isError.customerNameJpIsError = true
            break
          case 'representativeName':
            data.errorInfos.representativeNameError = s.errorCode
            data.isError.representativeNameIsError = true
            break
          case 'loanLimit':
            data.errorInfos.loanLimitError = s.errorCode
            data.isError.loanLimitIsError = true
            break
          case 'mortgageType':
            data.errorInfos.mortgageTypeError = s.errorCode
            data.isError.mortgageTypeIsError = true
            break
          case 'purchaseFloor1':
            data.errorInfos.purchaseFloor1Error = s.errorCode
            data.isError.purchaseFloor1IsError = true
            break
          case 'purchaseFloor2':
            data.errorInfos.purchaseFloor2Error = s.errorCode
            data.isError.purchaseFloor2IsError = true
            break
          case 'purchaseFloor3':
            data.errorInfos.purchaseFloor3Error = s.errorCode
            data.isError.purchaseFloor3IsError = true
            break
          case 'purchaseFloor4':
            data.errorInfos.purchaseFloor4Error = s.errorCode
            data.isError.purchaseFloor4IsError = true
            break
          case 'boxNumber':
            data.errorInfos.boxNumberError = s.errorCode
            data.isError.boxNumberIsError = true
            break
          case 'prepareFormPic':
            data.errorInfos.prepareFormPicError = s.errorCode
            data.isError.prepareFormPicIsError = true
            break
          case 'prepareFormDate':
            data.errorInfos.prepareFormDateError = s.errorCode
            data.isError.prepareFormDateIsError = true
            break
          case 'primaryCheckFormPic':
            data.errorInfos.primaryCheckFormPicError = s.errorCode
            data.isError.primaryCheckFormPicIsError = true
            break
          case 'primaryCheckFormDate':
            data.errorInfos.primaryCheckFormDateError = s.errorCode
            data.isError.primaryCheckFormDateIsError = true
            break
          case 'Upgrade From':
            data.errorInfos.upgradeFromError = s.errorCode.replace('Upgrade From', '原契約番号')
            data.isError.upgradeFromIsError = true
            break
          case 'firstTel':
            data.errorInfos.firstTelError = s.errorCode
            data.isError.firstTelIsError = true
            break
        }
      })
    } else {
      router.push({
        path: '/document'
      })
    }
  })
}

watch(
  () => data.request.firstName,
  () => {
    data.errorInfos.firstNameError = ''
    data.isError.firstNameIsError = false
  }
)
watch(
  () => data.request.lastName,
  () => {
    data.errorInfos.lastNameError = ''
    data.isError.lastNameIsError = false
  }
)
watch(
  () => data.request.status,
  () => {
    data.errorInfos.statusError = ''
    data.isError.statusIsError = false
  }
)
watch(
  () => data.request.contractCusName,
  () => {
    data.errorInfos.contractCusNameError = ''
    data.isError.contractCusNameIsError = false
  }
)
watch(
  () => data.request.upgradeFrom,
  () => {
    data.errorInfos.upgradeFromError = ''
    data.isError.upgradeFromIsError = false
  }
)
watch(
  () => data.request.inventoryPhase,
  () => {
    data.errorInfos.inventoryPhaseError = ''
    data.isError.inventoryPhaseIsError = false
  }
)
watch(
  () => data.request.zipCode,
  () => {
    data.errorInfos.zipCodeError = ''
    data.isError.zipCodeIsError = false
  }
)
watch(
  () => data.request.address,
  () => {
    data.errorInfos.addressError = ''
    data.isError.addressIsError = false
  }
)
watch(
  () => data.request.thirdTel,
  () => {
    data.errorInfos.thirdTelError = ''
    data.isError.thirdTelIsError = false
  }
)
watch(
  () => data.request.email,
  () => {
    data.errorInfos.emailError = ''
    data.isError.emailIsError = false
  }
)
watch(
  () => data.request.secondTel,
  () => {
    data.errorInfos.secondTelError = ''
    data.isError.secondTelIsError = false
  }
)
watch(
  () => data.request.remarks,
  () => {
    data.errorInfos.remarksError = ''
    data.isError.remarksIsError = false
  }
)
watch(
  () => data.request.country,
  () => {
    data.errorInfos.countryError = ''
    data.isError.countryIsError = false
  }
)
watch(
  () => data.request.firstTel,
  () => {
    data.errorInfos.firstTelError = ''
    data.isError.firstTelIsError = false
  }
)
watch(
  () => data.request.requestDate,
  () => {
    data.errorInfos.requestDateError = ''
    data.isError.requestDateIsError = false
  }
)
watch(
  () => data.request.words,
  () => {
    data.errorInfos.wordsError = ''
    data.isError.wordsIsError = false
  }
)
watch(
  () => data.request.acquiredEquity1,
  () => {
    data.errorInfos.acquiredEquity1Error = ''
    data.isError.acquiredEquity1IsError = false
  }
)
watch(
  () => data.request.acquiredEquity2,
  () => {
    data.errorInfos.acquiredEquity2Error = ''
    data.isError.acquiredEquity2IsError = false
  }
)
watch(
  () => data.request.acquiredEquity3,
  () => {
    data.errorInfos.acquiredEquity3Error = ''
    data.isError.acquiredEquity3IsError = false
  }
)
watch(
  () => data.request.acquiredEquity4,
  () => {
    data.errorInfos.acquiredEquity4Error = ''
    data.isError.acquiredEquity4IsError = false
  }
)
watch(
  () => data.request.customerNameJp,
  () => {
    data.errorInfos.customerNameJpError = ''
    data.isError.customerNameJpIsError = false
  }
)
watch(
  () => data.request.representativeName,
  () => {
    data.errorInfos.representativeNameError = ''
    data.isError.representativeNameIsError = false
  }
)
watch(
  () => data.request.loanLimit,
  () => {
    data.errorInfos.loanLimitError = ''
    data.isError.loanLimitIsError = false
  }
)
watch(
  () => data.request.mortgageType,
  () => {
    data.errorInfos.mortgageTypeError = ''
    data.isError.mortgageTypeIsError = false
  }
)
watch(
  () => data.request.boxNumber,
  () => {
    data.errorInfos.boxNumberError = ''
    data.isError.boxNumberIsError = false
  }
)
watch(
  () => data.request.prepareFormPic,
  () => {
    data.errorInfos.prepareFormPicError = ''
    data.isError.prepareFormPicIsError = false
  }
)
watch(
  () => data.request.prepareFormDate,
  () => {
    data.errorInfos.prepareFormDateError = ''
    data.isError.prepareFormDateIsError = false
  }
)
watch(
  () => data.request.primaryCheckFormPic,
  () => {
    data.errorInfos.primaryCheckFormPicError = ''
    data.isError.primaryCheckFormPicIsError = false
  }
)
watch(
  () => data.request.primaryCheckFormDate,
  () => {
    data.errorInfos.primaryCheckFormDateError = ''
    data.isError.primaryCheckFormDateIsError = false
  }
)

const handleInput = (e) => {
  if (e.key === 'e') {
    e.preventDefault()
  }
}

const validateInputNumberWords = () => {
  data.request.words = data.request.words.replace('e', '')
  if (Number(data.request.words) > MAX_NUMBER_9_CHAR) {
    data.request.words = data.request.words.substring(0, MAX_NUMBER_9_CHAR.toString().length)
  }
}
const validateInputNumberPurchase1 = () => {
  data.request.purchaseFloor1 = data.request.purchaseFloor1.replace('e', '')
  if (Number(data.request.purchaseFloor1) > MAX_NUMBER_9_CHAR) {
    data.request.purchaseFloor1 = data.request.purchaseFloor1.substring(
      0,
      MAX_NUMBER_9_CHAR.toString().length
    )
  }
}
const validateInputNumberPurchase2 = () => {
  data.request.purchaseFloor2 = data.request.purchaseFloor2.replace('e', '')
  if (Number(data.request.purchaseFloor2) > MAX_NUMBER_9_CHAR) {
    data.request.purchaseFloor2 = data.request.purchaseFloor2.substring(
      0,
      MAX_NUMBER_9_CHAR.toString().length
    )
  }
}
const validateInputNumberPurchase3 = () => {
  data.request.purchaseFloor3 = data.request.purchaseFloor3.replace('e', '')
  if (Number(data.request.purchaseFloor3) > MAX_NUMBER_9_CHAR) {
    data.request.purchaseFloor3 = data.request.purchaseFloor3.substring(
      0,
      MAX_NUMBER_9_CHAR.toString().length
    )
  }
}
const validateInputNumberPurchase4 = () => {
  data.request.purchaseFloor4 = data.request.purchaseFloor4.replace('e', '')
  if (Number(data.request.purchaseFloor4) > MAX_NUMBER_9_CHAR) {
    data.request.purchaseFloor4 = data.request.purchaseFloor4.substring(
      0,
      MAX_NUMBER_9_CHAR.toString().length
    )
  }
}
const validateInputNumberBoxNumber = () => {
  data.request.boxNumber = data.request.boxNumber.replace('e', '')
  if (Number(data.request.boxNumber) > MAX_NUMBER_9_CHAR) {
    data.request.boxNumber = data.request.boxNumber.substring(
      0,
      MAX_NUMBER_9_CHAR.toString().length
    )
  }
}
const validateInputNumberLoanLimit = () => {
  data.request.loanLimit = data.request.loanLimit.replace('e', '')
  if (Number(data.request.loanLimit) > MAX_NUMBER_9_CHAR) {
    data.request.loanLimit = data.request.loanLimit.substring(
      0,
      MAX_NUMBER_9_CHAR.toString().length
    )
  }
}

const changeSelection = (type) => {
  switch (type) {
    case 'Contract Type':
      data.errorInfos.contractTypeError = ''
      data.isError.contractTypeIsError = false
      break
    case 'Finance Type':
      data.errorInfos.financeTypeError = ''
      data.isError.financeTypeIsError = false
      break
    case 'Project Type':
      data.errorInfos.projectTypeIdError = ''
      data.isError.projectTypeIdIsError = false
      break
    case 'Prepare Form Pic':
      data.errorInfos.prepareFormPicError = ''
      data.isError.prepareFormPicIsError = false
      break
    case 'Primary Check Form Pic':
      data.errorInfos.primaryCheckFormPicError = ''
      data.isError.primaryCheckFormPicIsError = false
      break
    case 'Mortgage Type':
      data.errorInfos.primaryCheckFormPicError = ''
      data.isError.primaryCheckFormPicIsError = false
      break
  }
}

const init = async () => {
  search()
  documentStore.fetchContractType()
  documentStore.fetchFinanceType()
  documentStore.fetchLocation(true)
  documentStore.fetchProjectType()
  documentStore.fetchUserManage()
  documentStore.fetchSettingType()
  documentStore.fetchEquityType()
}

onMounted(() => {
  init()
})
</script>
