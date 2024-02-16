<template>
  <div class="pa-5">
    <v-form ref="form"
            v-model="data.valid"
            @submit.prevent
    >
      <v-container class="mt-4 border-b border-gray-50">
        <v-row dense>
          <v-col lg="1"
                 cols="12"
                 :class="data.errorInfos.showErrLocation ? 'mt-3' : 'd-flex align-center'"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.locationName') }}
              <span class="text-red-600">*</span>
            </span>
          </v-col>
          <v-col lg="2"
                 cols="12"
          >
            <v-select
              v-model="data.request.locationId"
              density="compact"
              rounded
              dense
              :hide-details="!data.errorInfos.showErrLocation"
              variant="outlined"
              :error="data.errorInfos.showErrLocation"
              :error-messages="data.errorInfos.location"
              :items="locations"
            ></v-select>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 :class="data.errorInfos.showErrFloorNumber || data.errorInfos.showErrLocation ? 'mt-3' : 'd-flex align-center'"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.floorNumber') }}
            </span>
          </v-col>
          <v-col lg="2"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.floorNumber"
              color="info"
              dense
              variant="outlined"
              density="compact"
              type="number"
              :hide-details="!data.errorInfos.showErrFloorNumber"
              :error="data.errorInfos.showErrFloorNumber"
              :error-messages="data.errorInfos.floorNumber"
              :max="MAX_NUMBER_2_CHAR"
              :oninput="validateInputFloorNumber"
              @keypress="handleInput"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="mt-4 border-b border-gray-50">
        <v-row dense>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.stokeNumber') }}
            </span>
          </v-col>
          <v-col lg="2"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.stokeNumber"
              maxlength="255"
              color="info"
              dense
              variant="outlined"
              hide-details
              density="compact"
              type="number"
              :max="MAX_NUMBER_10_CHAR"
              :oninput="validateInputStokeNumber"
              @keypress="handleInput"
            ></v-text-field>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.plotNumber') }}
            </span>
          </v-col>
          <v-col lg="2"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.plotNumber"
              maxlength="255"
              color="info"
              dense
              variant="outlined"
              hide-details
              density="compact"
              type="number"
              :max="MAX_NUMBER_10_CHAR"
              :oninput="validateInputPlotNumber"
              @keypress="handleInput"
            ></v-text-field>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.buildingNumber') }}
            </span>
          </v-col>
          <v-col lg="2"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.buildingNumber"
              maxlength="255"
              color="info"
              dense
              variant="outlined"
              hide-details
              density="compact"
              type="number"
              :max="MAX_NUMBER_10_CHAR"
              :oninput="validateInputBuildingNumber"
              @keypress="handleInput"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="mt-4 border-b border-gray-50">
        <!-- 1 -->
        <v-row dense>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.denominator') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.denominator"
              maxlength="255"
              color="info"
              dense
              variant="outlined"
              hide-details
              density="compact"
              :error="data.errorInfos.showErrDenominator"
              :error-messages="data.errorInfos.denominator"
            ></v-text-field>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.hotelName') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.hotelName"
              maxlength="255"
              color="info"
              dense
              variant="outlined"
              hide-details
              density="compact"
              :error="data.errorInfos.showErrHotelName"
              :error-messages="data.errorInfos.hotelName"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- 2 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.jurisdiction') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.jurisdiction"
              maxlength="255"
              color="info"
              dense
              variant="outlined"
              hide-details
              density="compact"
              :error="data.errorInfos.showErrJurisdiction"
              :error-messages="data.errorInfos.jurisdiction"
            ></v-text-field>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.associationDisplay') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.associationDisplay"
              maxlength="255"
              color="info"
              dense
              variant="outlined"
              hide-details
              density="compact"
              :error="data.errorInfos.showErrAssociationDisplay"
              :error-messages="data.errorInfos.associationDisplay"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- 3 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.jurisdictionE') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-text-field
              v-model="data.request.jurisdictionE"
              maxlength="255"
              color="info"
              dense
              variant="outlined"
              hide-details
              density="compact"
              :error="data.errorInfos.showErrJurisdictionE"
              :error-messages="data.errorInfos.jurisdictionE"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <!-- Row Area 1 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.propertyDisplay') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.propertyDisplay"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.signature') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.signature"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 2 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.twoUnitPropertyDisplay') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.twoUnitPropertyDisplay"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.twoUnitLoanRegistrationDisplay') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.twoUnitLoanRegistrationDisplay"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 3 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.threeUnitLoanRegistrationDisplay') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.threeUnitLoanRegistrationDisplay"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.fourUnitLoanRegistrationDisplay') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.fourUnitLoanRegistrationDisplay"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 4 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.propertyDisplay2') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.propertyDisplay2"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.twoUnitPropertyDisplay2') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.twoUnitPropertyDisplay2"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 5 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.twoUnitLoanRegistrationDisplay2') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.twoUnitLoanRegistrationDisplay2"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.threeUnitLoanRegistrationDisplay2') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.threeUnitLoanRegistrationDisplay2"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 6 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.fourUnitLoanRegistrationDisplay2') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.fourUnitLoanRegistrationDisplay2"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay1') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay1"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 7 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay2') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay2"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay3') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay3"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 8 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay4') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay4"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay5') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay5"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 9 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay6') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay6"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay7') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay7"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 10 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay1e') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay1e"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay2e') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay2e"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 11 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay3e') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay3e"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay4e') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay4e"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 12 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay5e') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay5e"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
          <v-col lg="1"
                 cols="12"
          ></v-col>
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay6e') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay6e"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- Row Area 13 -->
        <v-row dense
               class="mt-4"
        >
          <v-col lg="1"
                 cols="12"
                 class="d-flex align-center"
          >
            <span class="text-sm-left float-sm-left font-weight-medium text-sm">
              {{ $t('keyEstate.realEstateDisplay7e') }}
            </span>
          </v-col>
          <v-col lg="4"
                 cols="12"
          >
            <v-textarea
              v-model="data.request.realEstateDisplay7e"
              color="info"
              rows="3"
              dense
              variant="outlined"
              hide-details
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-card-actions
      class="flex-row-reverse mt-3"
    >
      <v-btn
        color="info"
        class="text-sm mb-2"
        variant="flat"
        @click="apply"
      >
        {{ $t('btn.save') }}
      </v-btn>
      <v-btn
        color="info"
        class="text-sm mb-2 mr-2"
        variant="outlined"
        @click="back"
      >
        {{ $t('btn.back') }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonStore } from '@/store/commonStore'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import {useDocumentStore} from "@/store/process/documentStore";
import {MAX_NUMBER_8_CHAR, MAX_NUMBER_10_CHAR, MAX_NUMBER_2_CHAR} from "@/constants/constant";
import {useI18n} from "vue-i18n";
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const documentStore = useDocumentStore()

const locations = computed(() => documentStore.getLocations)

// Initial
const store = useCommonStore()

const KeyEstateRepository = RepositoryFactory.get('keyEstate')
const emit = defineEmits(['apply'])
const dialog = ref(false)
const idUpdate = ref(null)
const isAddNew = ref(true)

const getInitialData = () => ({
  valid: false,
  showUserName: false,
  request: {
    locationId: null,
    floorNumber: null,
    jurisdiction: null,
    denominator: null,
    hotelName: null,
    propertyDisplay: null,
    associationDisplay: null,
    stokeNumber: null,
    plotNumber: null,
    buildingNumber: null,
    twoUnitPropertyDisplay: null,
    twoUnitLoanRegistrationDisplay: null,
    threeUnitLoanRegistrationDisplay: null,
    fourUnitLoanRegistrationDisplay: null,
    propertyDisplay2: null,
    twoUnitPropertyDisplay2: null,
    twoUnitLoanRegistrationDisplay2: null,
    threeUnitLoanRegistrationDisplay2: null,
    fourUnitLoanRegistrationDisplay2: null,
    realEstateDisplay1: null,
    realEstateDisplay2: null,
    realEstateDisplay3: null,
    realEstateDisplay4: null,
    realEstateDisplay5: null,
    realEstateDisplay6: null,
    realEstateDisplay7: null,
    jurisdictionE: null,
    realEstateDisplay1e: null,
    realEstateDisplay2e: null,
    realEstateDisplay3e: null,
    realEstateDisplay4e: null,
    realEstateDisplay5e: null,
    realEstateDisplay6e: null,
    realEstateDisplay7e: null,
    signature: null,
    isActive: null
  },
  errorInfos: {
    location: '',
    floorNumber: '',
    jurisdiction: '',
    denominator: '',
    hotelName: '',
    associationDisplay: '',
    jurisdictionE: '',
    showErrLocation: false,
    showErrFloorNumber: false,
    showErrJurisdiction: false,
    showErrDenominator: false,
    showErrHotelName: false,
    showErrAssociationDisplay: false,
    showErrJurisdictionE: false
  }
})

const data = reactive(getInitialData())

const validateInputFloorNumber = () => {
  if (Number(data.request.floorNumber) > MAX_NUMBER_2_CHAR) {
    data.request.floorNumber = data.request.floorNumber.substring(0, MAX_NUMBER_2_CHAR.toString().length)
  }
}
const validateInputStokeNumber = () => {
  if (Number(data.request.stokeNumber) > MAX_NUMBER_10_CHAR) {
    data.request.stokeNumber = data.request.stokeNumber.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}
const validateInputPlotNumber = () => {
  if (Number(data.request.plotNumber) > MAX_NUMBER_10_CHAR) {
    data.request.plotNumber = data.request.plotNumber.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}
const validateInputBuildingNumber = () => {
  if (Number(data.request.buildingNumber) > MAX_NUMBER_10_CHAR) {
    data.request.buildingNumber = data.request.buildingNumber.substring(0, MAX_NUMBER_10_CHAR.toString().length)
  }
}

const handleInput = (e) => {
  if (e.key === 'e') {
    e.preventDefault()
  }
}

const apply = () => {
  if (isAddNew.value) {
    let request = {
      locationId: data.request.locationId ,
      floorNumber: data.request.floorNumber,
      jurisdiction: data.request.jurisdiction ? data.request.jurisdiction : null,
      denominator: data.request.denominator ? data.request.denominator : null,
      hotelName: data.request.hotelName ? data.request.hotelName : null,
      associationDisplay: data.request.associationDisplay ? data.request.associationDisplay : null,
      jurisdictionE: data.request.jurisdictionE ? data.request.jurisdictionE : null,
      propertyDisplay: data.request.propertyDisplay ? data.request.propertyDisplay : null,
      stokeNumber: data.request.stokeNumber,
      plotNumber: data.request.plotNumber,
      buildingNumber: data.request.buildingNumber,
      twoUnitPropertyDisplay: data.request.twoUnitPropertyDisplay ? data.request.twoUnitPropertyDisplay : null,
      twoUnitLoanRegistrationDisplay: data.request.twoUnitLoanRegistrationDisplay ? data.request.twoUnitLoanRegistrationDisplay : null,
      threeUnitLoanRegistrationDisplay: data.request.threeUnitLoanRegistrationDisplay ? data.request.threeUnitLoanRegistrationDisplay : null,
      fourUnitLoanRegistrationDisplay: data.request.fourUnitLoanRegistrationDisplay ? data.request.fourUnitLoanRegistrationDisplay : null,
      propertyDisplay2: data.request.propertyDisplay2 ? data.request.propertyDisplay2 : null,
      twoUnitPropertyDisplay2: data.request.twoUnitPropertyDisplay2 ? data.request.twoUnitPropertyDisplay2 : null,
      twoUnitLoanRegistrationDisplay2: data.request.twoUnitLoanRegistrationDisplay2 ? data.request.twoUnitLoanRegistrationDisplay2 : null,
      threeUnitLoanRegistrationDisplay2: data.request.threeUnitLoanRegistrationDisplay2 ? data.request.threeUnitLoanRegistrationDisplay2 : null,
      fourUnitLoanRegistrationDisplay2: data.request.fourUnitLoanRegistrationDisplay2 ? data.request.fourUnitLoanRegistrationDisplay2 : null,
      realEstateDisplay1: data.request.realEstateDisplay1 ? data.request.realEstateDisplay1 : null,
      realEstateDisplay2: data.request.realEstateDisplay2 ? data.request.realEstateDisplay2 : null,
      realEstateDisplay3: data.request.realEstateDisplay3 ? data.request.realEstateDisplay3 : null,
      realEstateDisplay4: data.request.realEstateDisplay4 ? data.request.realEstateDisplay4 : null,
      realEstateDisplay5: data.request.realEstateDisplay5 ? data.request.realEstateDisplay5 : null,
      realEstateDisplay6: data.request.realEstateDisplay6 ? data.request.realEstateDisplay6 : null,
      realEstateDisplay7: data.request.realEstateDisplay7 ? data.request.realEstateDisplay7 : null,
      realEstateDisplay1e: data.request.realEstateDisplay1e ? data.request.realEstateDisplay1e : null,
      realEstateDisplay2e: data.request.realEstateDisplay2e ? data.request.realEstateDisplay2e : null,
      realEstateDisplay3e: data.request.realEstateDisplay3e ? data.request.realEstateDisplay3e : null,
      realEstateDisplay4e: data.request.realEstateDisplay4e ? data.request.realEstateDisplay4e : null,
      realEstateDisplay5e: data.request.realEstateDisplay5e ? data.request.realEstateDisplay5e : null,
      realEstateDisplay6e: data.request.realEstateDisplay6e ? data.request.realEstateDisplay6e : null,
      realEstateDisplay7e: data.request.realEstateDisplay7e ? data.request.realEstateDisplay7e : null,
      signature: data.request.signature ? data.request.signature : null
    }
    addNew(request)
  } else {
    let request = {
        keyEstateId: idUpdate.value,
        locationId: data.request.locationId ,
        floorNumber: data.request.floorNumber,
        jurisdiction: data.request.jurisdiction ? data.request.jurisdiction : null,
        denominator: data.request.denominator ? data.request.denominator : null,
        hotelName: data.request.hotelName ? data.request.hotelName : null,
        associationDisplay: data.request.associationDisplay ? data.request.associationDisplay : null,
        jurisdictionE: data.request.jurisdictionE ? data.request.jurisdictionE : null,
        propertyDisplay: data.request.propertyDisplay ? data.request.propertyDisplay : null,
        stokeNumber: data.request.stokeNumber,
        plotNumber: data.request.plotNumber,
        buildingNumber: data.request.buildingNumber,
        twoUnitPropertyDisplay: data.request.twoUnitPropertyDisplay ? data.request.twoUnitPropertyDisplay : null,
        twoUnitLoanRegistrationDisplay: data.request.twoUnitLoanRegistrationDisplay ? data.request.twoUnitLoanRegistrationDisplay : null,
        threeUnitLoanRegistrationDisplay: data.request.threeUnitLoanRegistrationDisplay ? data.request.threeUnitLoanRegistrationDisplay : null,
        fourUnitLoanRegistrationDisplay: data.request.fourUnitLoanRegistrationDisplay ? data.request.fourUnitLoanRegistrationDisplay : null,
        propertyDisplay2: data.request.propertyDisplay2 ? data.request.propertyDisplay2 : null,
        twoUnitPropertyDisplay2: data.request.twoUnitPropertyDisplay2 ? data.request.twoUnitPropertyDisplay2 : null,
        twoUnitLoanRegistrationDisplay2: data.request.twoUnitLoanRegistrationDisplay2 ? data.request.twoUnitLoanRegistrationDisplay2 : null,
        threeUnitLoanRegistrationDisplay2: data.request.threeUnitLoanRegistrationDisplay2 ? data.request.threeUnitLoanRegistrationDisplay2 : null,
        fourUnitLoanRegistrationDisplay2: data.request.fourUnitLoanRegistrationDisplay2 ? data.request.fourUnitLoanRegistrationDisplay2 : null,
        realEstateDisplay1: data.request.realEstateDisplay1 ? data.request.realEstateDisplay1 : null,
        realEstateDisplay2: data.request.realEstateDisplay2 ? data.request.realEstateDisplay2 : null,
        realEstateDisplay3: data.request.realEstateDisplay3 ? data.request.realEstateDisplay3 : null,
        realEstateDisplay4: data.request.realEstateDisplay4 ? data.request.realEstateDisplay4 : null,
        realEstateDisplay5: data.request.realEstateDisplay5 ? data.request.realEstateDisplay5 : null,
        realEstateDisplay6: data.request.realEstateDisplay6 ? data.request.realEstateDisplay6 : null,
        realEstateDisplay7: data.request.realEstateDisplay7 ? data.request.realEstateDisplay7 : null,
        realEstateDisplay1e: data.request.realEstateDisplay1e ? data.request.realEstateDisplay1e : null,
        realEstateDisplay2e: data.request.realEstateDisplay2e ? data.request.realEstateDisplay2e : null,
        realEstateDisplay3e: data.request.realEstateDisplay3e ? data.request.realEstateDisplay3e : null,
        realEstateDisplay4e: data.request.realEstateDisplay4e ? data.request.realEstateDisplay4e : null,
        realEstateDisplay5e: data.request.realEstateDisplay5e ? data.request.realEstateDisplay5e : null,
        realEstateDisplay6e: data.request.realEstateDisplay6e ? data.request.realEstateDisplay6e : null,
        realEstateDisplay7e: data.request.realEstateDisplay7e ? data.request.realEstateDisplay7e : null,
        signature: data.request.signature ? data.request.signature : null,
      isActive: data.request.isActive
      }

    update(request)
  }
}

const addNew = (request) => {
  KeyEstateRepository.add(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success add')
      dialog.value = false
      emit('apply')
      back()
    } else {
      data.errorInfos.showErrLocation = false
      data.errorInfos.showErrFloorNumber = false
      data.errorInfos.showErrJurisdiction = false
      data.errorInfos.showErrDenominator = false
      data.errorInfos.showErrHotelName = false
      data.errorInfos.showErrAssociationDisplay = false
      data.errorInfos.showErrJurisdictionE = false
      data.errorInfos.location = ''
      data.errorInfos.floorNumber = ''
      data.errorInfos.jurisdiction = ''
      data.errorInfos.denominator = ''
      data.errorInfos.hotelName = ''
      data.errorInfos.associationDisplay = ''
      data.errorInfos.jurisdictionE = ''
      response.data.forEach((error) => {
        if (error.fieldName === 'realEstateDisplayKey') {
          data.errorInfos.floorNumber = error.errorCode
          data.errorInfos.location = error.errorCode
          data.errorInfos.showErrFloorNumber = true
          data.errorInfos.showErrLocation = true
        }
        if (error.fieldName === 'locationId') {
          data.errorInfos.location = error.errorCode
          data.errorInfos.showErrLocation = true
        }
        if (error.fieldName === 'floorNumber') {
          data.errorInfos.floorNumber = error.errorCode
          data.errorInfos.showErrFloorNumber = true
        }
        if (error.fieldName === 'jurisdiction') {
          data.errorInfos.jurisdiction = error.errorCode
          data.errorInfos.showErrJurisdiction = true
        }
        if (error.fieldName === 'denominator') {
          data.errorInfos.denominator = error.errorCode
          data.errorInfos.showErrDenominator = true
        }
        if (error.fieldName === 'hotelName') {
          data.errorInfos.hotelName = error.errorCode
          data.errorInfos.showErrHotelName = true
        }
        if (error.fieldName === 'associationDisplay') {
          data.errorInfos.associationDisplay = error.errorCode
          data.errorInfos.showErrAssociationDisplay = true
        }
        if (error.fieldName === 'jurisdictionE') {
          data.errorInfos.jurisdictionE = error.errorCode
          data.errorInfos.showErrJurisdictionE = true
        }
      })
    }
  })
}

const update = (request) => {
  KeyEstateRepository.update(request).then(function (response) {
    if (response.code === 'ES200') {
      console.log('success edit')
      dialog.value = false
      emit('apply')
      back()
    } else {
      data.errorInfos.showErrLocation = false
      data.errorInfos.showErrFloorNumber = false
      data.errorInfos.showErrJurisdiction = false
      data.errorInfos.showErrDenominator = false
      data.errorInfos.showErrHotelName = false
      data.errorInfos.showErrAssociationDisplay = false
      data.errorInfos.showErrJurisdictionE = false
      data.errorInfos.location = ''
      data.errorInfos.floorNumber = ''
      data.errorInfos.jurisdiction = ''
      data.errorInfos.denominator = ''
      data.errorInfos.hotelName = ''
      data.errorInfos.associationDisplay = ''
      data.errorInfos.jurisdictionE = ''
      response.data.forEach((error) => {
        if (error.fieldName === 'realEstateDisplayKey') {
          data.errorInfos.floorNumber = error.errorCode
          data.errorInfos.location = error.errorCode
          data.errorInfos.showErrFloorNumber = true
          data.errorInfos.showErrLocation = true
        }
        if (error.fieldName === 'floorNumber') {
          data.errorInfos.floorNumber = error.errorCode
          data.errorInfos.showErrFloorNumber = true
        }
        if (error.fieldName === 'jurisdiction') {
          data.errorInfos.jurisdiction = error.errorCode
          data.errorInfos.showErrJurisdiction = true
        }
        if (error.fieldName === 'denominator') {
          data.errorInfos.denominator = error.errorCode
          data.errorInfos.showErrDenominator = true
        }
        if (error.fieldName === 'hotelName') {
          data.errorInfos.hotelName = error.errorCode
          data.errorInfos.showErrHotelName = true
        }
        if (error.fieldName === 'associationDisplay') {
          data.errorInfos.associationDisplay = error.errorCode
          data.errorInfos.showErrAssociationDisplay = true
        }
        if (error.fieldName === 'jurisdictionE') {
          data.errorInfos.jurisdictionE = error.errorCode
          data.errorInfos.showErrJurisdictionE = true
        }
      })
    }
  })
}

const getDataUpdate = (request) => {
  KeyEstateRepository.getById(request).then(function (response) {
    // data.request.realEstateDisplayKey = response.data.realEstateDisplayKey
    data.request.locationId = response.data.locationId
    data.request.floorNumber = response.data.floorNumber
    data.request.jurisdiction = response.data.jurisdiction
    data.request.denominator = response.data.denominator
    data.request.hotelName = response.data.hotelName
    data.request.propertyDisplay = response.data.propertyDisplay
    data.request.associationDisplay = response.data.associationDisplay
    data.request.stokeNumber = response.data.stokeNumber
    data.request.plotNumber = response.data.plotNumber
    data.request.buildingNumber = response.data.buildingNumber
    data.request.twoUnitPropertyDisplay = response.data.twoUnitPropertyDisplay
    data.request.twoUnitLoanRegistrationDisplay = response.data.twoUnitLoanRegistrationDisplay
    data.request.threeUnitLoanRegistrationDisplay = response.data.threeUnitLoanRegistrationDisplay
    data.request.fourUnitLoanRegistrationDisplay = response.data.fourUnitLoanRegistrationDisplay
    data.request.propertyDisplay2 = response.data.propertyDisplay2
    data.request.twoUnitPropertyDisplay2 = response.data.twoUnitPropertyDisplay2
    data.request.twoUnitLoanRegistrationDisplay2 = response.data.twoUnitLoanRegistrationDisplay2
    data.request.threeUnitLoanRegistrationDisplay2 = response.data.threeUnitLoanRegistrationDisplay2
    data.request.fourUnitLoanRegistrationDisplay2 = response.data.fourUnitLoanRegistrationDisplay2
    data.request.realEstateDisplay1 = response.data.realEstateDisplay1
    data.request.realEstateDisplay2 = response.data.realEstateDisplay2
    data.request.realEstateDisplay3 = response.data.realEstateDisplay3
    data.request.realEstateDisplay4 = response.data.realEstateDisplay4
    data.request.realEstateDisplay5 = response.data.realEstateDisplay5
    data.request.realEstateDisplay6 = response.data.realEstateDisplay6
    data.request.realEstateDisplay7 = response.data.realEstateDisplay7
    data.request.jurisdictionE = response.data.jurisdictionE
    data.request.realEstateDisplay1e = response.data.realEstateDisplay1e
    data.request.realEstateDisplay2e = response.data.realEstateDisplay2e
    data.request.realEstateDisplay3e = response.data.realEstateDisplay3e
    data.request.realEstateDisplay4e = response.data.realEstateDisplay4e
    data.request.realEstateDisplay5e = response.data.realEstateDisplay5e
    data.request.realEstateDisplay6e = response.data.realEstateDisplay6e
    data.request.realEstateDisplay7e = response.data.realEstateDisplay7e
    data.request.signature = response.data.signature
    data.request.isActive = response.data.isActive
  })
}

const back = () => {
  router.push({
    path: '/key-list'
  })
}

onMounted(async () => {

  await documentStore.fetchLocation(false)

  if (route.query.keyEstateId !== null) {
    isAddNew.value = false
    idUpdate.value = route.query.keyEstateId
    let request = {
      keyEstateId: idUpdate.value
    }
    getDataUpdate(request)
  }
  if (idUpdate.value === null) {
    store.setBreadcrumb(store, { name: t('nav.screen.master.keyEstateAdd'), path: 'key-list' })
  } else {
    store.setBreadcrumb(store, { name: t('nav.screen.master.keyEstateEdit'), path: 'key-list' })
  }
})

watch(data, () => console.log('watch'))

watch(
  () => data.request.locationId,
  () => {
    data.errorInfos.location = ''
    data.errorInfos.showErrLocation = false
  }
)

</script>

<style scoped>
</style>
