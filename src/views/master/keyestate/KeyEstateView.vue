<template>
  <div class="pa-5">
    <card-data-table>
      <template #toolbar>
        <table-title-function
          title="key-estate"
          show-add-new
          @action="handleAction($event)"
        >
        </table-title-function>
      </template>

      <template #table>
        <v-data-table
          v-model:option="table.options"
          v-click-outside="clickOutside"
          :headers="table.headers"
          :items="table.items"
          :items-length="table.totalRecords"
          :items-per-page="table.options.itemsPerPage"
          item-value="key"
          :fixed-footer="true"
          :fixed-header="true"
          disable-initial-sort
          height="700px"
          hide-actions
          class="relative h-master elevation-1 h-full py-5 row-height-50 table-border"
          @click:row="clickRow"
          @update:options="table.options"
        >
          <template #no-data>
            <tr>
              <td :colspan="table.headers.length"
                  class="text-center opacity-70 italic py-2"
              >
                {{ $t('table.noDataText') }}
              </td>
            </tr>
          </template>

          <!--index-->
          <template #item.index="{ index }">
            <div class="text-center">
              {{ table.options.itemsPerPage * (table.options.page - 1) + index + 1 }}
            </div>
          </template>
          <!-- floorNumber -->
          <template #item.floorNumber="{ item }">
            <div
              @dblclick="dblclickRow('floorNumber', item.value)"
            >
              <div v-if="item.props.title.floorNumber && table.isDbl.floorNumber && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.floorNumber"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200 text-right"
              >
                {{ item.props.title.floorNumber }}
              </div>
            </div>
          </template>
          <template #item.stokeNumber="{ item }">
            <div
              class="display-limit-txt-w-200 text-right"
            >
              {{ item.props.title.stokeNumber }}
            </div>
          </template>
          <template #item.plotNumber="{ item }">
            <div
              class="display-limit-txt-w-200 text-right"
            >
              {{ item.props.title.plotNumber }}
            </div>
          </template>
          <template #item.buildingNumber="{ item }">
            <div
              class="display-limit-txt-w-200 text-right"
            >
              {{ item.props.title.buildingNumber }}
            </div>
          </template>
          <!-- jurisdiction -->
          <template #item.jurisdiction="{ item }">
            <div
              @dblclick="dblclickRow('jurisdiction', item.value)"
            >
              <div v-if="item.props.title.jurisdiction && table.isDbl.jurisdiction && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.jurisdiction"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.jurisdiction }}
              </div>
            </div>
          </template>
          <!-- denominator -->
          <template #item.denominator="{ item }">
            <div
              @dblclick="dblclickRow('denominator', item.value)"
            >
              <div v-if="item.props.title.denominator && table.isDbl.denominator && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.denominator"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.denominator }}
              </div>
            </div>
          </template>
          <!-- hotelName -->
          <template #item.hotelName="{ item }">
            <div
              @dblclick="dblclickRow('hotelName', item.value)"
            >
              <div v-if="item.props.title.hotelName && table.isDbl.hotelName && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.hotelName"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.hotelName }}
              </div>
            </div>
          </template>
          <!-- associationDisplay -->
          <template #item.associationDisplay="{ item }">
            <div
              @dblclick="dblclickRow('associationDisplay', item.value)"
            >
              <div v-if="item.props.title.associationDisplay && table.isDbl.associationDisplay && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.associationDisplay"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.associationDisplay }}
              </div>
            </div>
          </template>
          <!-- propertyDisplay -->
          <template #item.propertyDisplay="{ item }">
            <div
              @dblclick="dblclickRow('propertyDisplay', item.value)"
            >
              <div v-if="item.props.title.propertyDisplay && table.isDbl.propertyDisplay && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.propertyDisplay"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.propertyDisplay }}
              </div>
            </div>
          </template>
          <!-- twoUnitPropertyDisplay -->
          <template #item.twoUnitPropertyDisplay="{ item }">
            <div
              @dblclick="dblclickRow('twoUnitPropertyDisplay', item.value)"
            >
              <div v-if="item.props.title.twoUnitPropertyDisplay && table.isDbl.twoUnitPropertyDisplay && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.twoUnitPropertyDisplay"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.twoUnitPropertyDisplay }}
              </div>
            </div>
          </template>
          <!-- twoUnitLoanRegistrationDisplay -->
          <template #item.twoUnitLoanRegistrationDisplay="{ item }">
            <div
              @dblclick="dblclickRow('twoUnitLoanRegistrationDisplay', item.value)"
            >
              <div v-if="item.props.title.twoUnitLoanRegistrationDisplay && table.isDbl.twoUnitLoanRegistrationDisplay && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.twoUnitLoanRegistrationDisplay"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.twoUnitLoanRegistrationDisplay }}
              </div>
            </div>
          </template>
          <!-- threeUnitLoanRegistrationDisplay -->
          <template #item.threeUnitLoanRegistrationDisplay="{ item }">
            <div
              @dblclick="dblclickRow('threeUnitLoanRegistrationDisplay', item.value)"
            >
              <div v-if="item.props.title.threeUnitLoanRegistrationDisplay && table.isDbl.threeUnitLoanRegistrationDisplay && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.threeUnitLoanRegistrationDisplay"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.threeUnitLoanRegistrationDisplay }}
              </div>
            </div>
          </template>
          <!-- fourUnitLoanRegistrationDisplay -->
          <template #item.fourUnitLoanRegistrationDisplay="{ item }">
            <div
              @dblclick="dblclickRow('fourUnitLoanRegistrationDisplay', item.value)"
            >
              <div v-if="item.props.title.fourUnitLoanRegistrationDisplay && table.isDbl.fourUnitLoanRegistrationDisplay && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.fourUnitLoanRegistrationDisplay"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.fourUnitLoanRegistrationDisplay }}
              </div>
            </div>
          </template>
          <!-- propertyDisplay2 -->
          <template #item.propertyDisplay2="{ item }">
            <div
              @dblclick="dblclickRow('propertyDisplay2', item.value)"
            >
              <div v-if="item.props.title.propertyDisplay2 && table.isDbl.propertyDisplay2 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.propertyDisplay2"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.propertyDisplay2 }}
              </div>
            </div>
          </template>
          <!-- twoUnitPropertyDisplay2 -->
          <template #item.twoUnitPropertyDisplay2="{ item }">
            <div
              @dblclick="dblclickRow('twoUnitPropertyDisplay2', item.value)"
            >
              <div v-if="item.props.title.twoUnitPropertyDisplay2 && table.isDbl.twoUnitPropertyDisplay2 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.twoUnitPropertyDisplay2"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.twoUnitPropertyDisplay2 }}
              </div>
            </div>
          </template>
          <!-- twoUnitLoanRegistrationDisplay2 -->
          <template #item.twoUnitLoanRegistrationDisplay2="{ item }">
            <div
              @dblclick="dblclickRow('twoUnitLoanRegistrationDisplay2', item.value)"
            >
              <div v-if="item.props.title.twoUnitLoanRegistrationDisplay2 && table.isDbl.twoUnitLoanRegistrationDisplay2 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.twoUnitLoanRegistrationDisplay2"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.twoUnitLoanRegistrationDisplay2 }}
              </div>
            </div>
          </template>
          <!-- threeUnitLoanRegistrationDisplay2 -->
          <template #item.threeUnitLoanRegistrationDisplay2="{ item }">
            <div
              @dblclick="dblclickRow('threeUnitLoanRegistrationDisplay2', item.value)"
            >
              <div v-if="item.props.title.threeUnitLoanRegistrationDisplay2 && table.isDbl.threeUnitLoanRegistrationDisplay2 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.threeUnitLoanRegistrationDisplay2"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.threeUnitLoanRegistrationDisplay2 }}
              </div>
            </div>
          </template>
          <!-- fourUnitLoanRegistrationDisplay2 -->
          <template #item.fourUnitLoanRegistrationDisplay2="{ item }">
            <div
              @dblclick="dblclickRow('fourUnitLoanRegistrationDisplay2', item.value)"
            >
              <div v-if="item.props.title.fourUnitLoanRegistrationDisplay2 && table.isDbl.fourUnitLoanRegistrationDisplay2 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.fourUnitLoanRegistrationDisplay2"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.fourUnitLoanRegistrationDisplay2 }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay1 -->
          <template #item.realEstateDisplay1="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay1', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay1 && table.isDbl.realEstateDisplay1 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay1"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay1 }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay2 -->
          <template #item.realEstateDisplay2="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay2', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay2 && table.isDbl.realEstateDisplay2 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay2"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay2 }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay3 -->
          <template #item.realEstateDisplay3="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay3', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay3 && table.isDbl.realEstateDisplay3 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay3"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay3 }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay4 -->
          <template #item.realEstateDisplay4="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay4', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay4 && table.isDbl.realEstateDisplay4 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay4"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay4 }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay5 -->
          <template #item.realEstateDisplay5="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay5', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay5 && table.isDbl.realEstateDisplay5 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay5"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay5 }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay6 -->
          <template #item.realEstateDisplay6="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay6', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay6 && table.isDbl.realEstateDisplay6 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay6"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay6 }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay7 -->
          <template #item.realEstateDisplay7="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay7', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay7 && table.isDbl.realEstateDisplay7 && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay7"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay7 }}
              </div>
            </div>
          </template>
          <!-- jurisdictionE -->
          <template #item.jurisdictionE="{ item }">
            <div
              @dblclick="dblclickRow('jurisdictionE', item.value)"
            >
              <div v-if="item.props.title.jurisdictionE && table.isDbl.jurisdictionE && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.jurisdictionE"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.jurisdictionE }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay1e -->
          <template #item.realEstateDisplay1e="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay1e', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay1e && table.isDbl.realEstateDisplay1e && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay1e"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay1e }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay2e -->
          <template #item.realEstateDisplay2e="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay2e', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay2e && table.isDbl.realEstateDisplay2e && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay2e"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay2e }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay3e -->
          <template #item.realEstateDisplay3e="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay3e', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay3e && table.isDbl.realEstateDisplay3e && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay3e"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay3e }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay4e -->
          <template #item.realEstateDisplay4e="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay4e', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay4e && table.isDbl.realEstateDisplay4e && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay4e"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay4e }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay5e -->
          <template #item.realEstateDisplay5e="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay5e', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay5e && table.isDbl.realEstateDisplay5e && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay5e"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay5e }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay6e -->
          <template #item.realEstateDisplay6e="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay6e', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay6e && table.isDbl.realEstateDisplay6e && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay6e"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay6e }}
              </div>
            </div>
          </template>
          <!-- realEstateDisplay7e -->
          <template #item.realEstateDisplay7e="{ item }">
            <div
              @dblclick="dblclickRow('realEstateDisplay7e', item.value)"
            >
              <div v-if="item.props.title.realEstateDisplay7e && table.isDbl.realEstateDisplay7e && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.realEstateDisplay7e"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.realEstateDisplay7e }}
              </div>
            </div>
          </template>
          <!-- signature -->
          <template #item.signature="{ item }">
            <div
              @dblclick="dblclickRow('signature', item.value)"
            >
              <div v-if="item.props.title.signature && table.isDbl.signature && item.value === table.dblKeyEstateId"
                   class="mt-2 mb-2"
              >
                <v-textarea
                  rows="3"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  :model-value="item.props.title.signature"
                ></v-textarea>
              </div>
              <div v-else
                   class="display-limit-txt-w-200"
              >
                {{ item.props.title.signature }}
              </div>
            </div>
          </template>

          <!-- isActive -->
          <template #item.isActive="{ item }">
            <div class="text-center">
              <v-chip
                :style="'background-color:' + ACTIVE_INACTIVE.get(item.props.title.isActive).color + ';'"
                :color="ACTIVE_INACTIVE.get(item.props.title.isActive).color"
              >
                <div class="text-center w-28" style="color: #ffffff!important;">
                  {{ ACTIVE_INACTIVE.get(item.props.title.isActive).text }}
                </div>
              </v-chip>
            </div>
          </template>

          <template #item.action="{ item }">
            <div
              class="my-1 text-center"
            >
              <v-btn
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogUserUpdate(item.value.keyEstateId)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive === 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.keyEstateId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-lock"></i>
              </v-btn>
              <v-btn
                v-if="item.props.title.isActive !== 1"
                icon
                elevation="1"
                class="mr-1 btn-data-table"
                @click="showDialogConfirmDelete(item.value.keyEstateId, item.props.title.isActive)"
              >
                <i class="fa-solid fa-unlock"></i>
              </v-btn>
            </div>
          </template>
          <template #bottom>
            <pagination-common
              @changeData="changeData"
            >
            </pagination-common>
          </template>
        </v-data-table>
      </template>
    </card-data-table>
    <dialog-confirm-delete
      ref="refDialogConfirmDelete"
      @apply="executeDelete(table.idDelete, table.isActive)"
    >
      <template #body>
        <p class="mt-1 mx-1">
          {{ $t('dialogContent.delete') }}
        </p>
      </template>
    </dialog-confirm-delete>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {useCommonStore} from "@/store/commonStore";
import {RepositoryFactory} from "@/repositories/repositoryFactory";
import {DataTableHelper} from "@/common/helper";
import {ACTIVE_INACTIVE, TOOLBAR_TABLE} from "@/constants/constant";
import CardDataTable from '@/components/card/CardDataTable.vue';
import TableTitleFunction from '@/components/table/TableTitleFunction.vue';
import PaginationCommon from "@/components/table/PaginationCommon.vue";
import DialogConfirmDelete from '@/components/dialog/DialogConfirmDelete.vue'
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

// Initial
const {cookies} = useCookies();
const { t } = useI18n()
const store = useCommonStore()
store.setBreadcrumb(store, {"name": t('nav.screen.master.keyEstate'), "path": "key-list"})
const KeyEstateRepository = RepositoryFactory.get('keyEstate')
const refDialogConfirmDelete = ref(null)
const user = JSON.parse(localStorage.getItem('user'))
const router = useRouter()

let idUpdate = null
const table = reactive({
  options: DataTableHelper.optionBuilder(),
  headers: [
    {
      title: t('table.ordinalNumbers'),
      align: 'center',
      sortable: false,
      width: 50,
      key: 'index',
      disable: true,
    },
    {
      title: t('table.option'),
      align: 'center',
      sortable: false,
      width: 150,
      key: 'action'
    },
    {
      title: t('keyEstate.realEstateDisplayKey'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplayKey'
    },
    {
      title: t('keyEstate.locationName'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'locationName'
    },
    {
      title: t('keyEstate.floorNumber'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'floorNumber'
    },
    {
      title: t('keyEstate.jurisdiction'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'jurisdiction'
    },
    {
      title: t('keyEstate.denominator'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'denominator'
    },
    {
      title: t('keyEstate.hotelName'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'hotelName'
    },
    {
      title: t('keyEstate.propertyDisplay'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'propertyDisplay'
    },
    {
      title: t('keyEstate.associationDisplay'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'associationDisplay'
    },
    {
      title: t('keyEstate.stokeNumber'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'stokeNumber'
    },
    {
      title: t('keyEstate.plotNumber'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'plotNumber'
    },
    {
      title: t('keyEstate.buildingNumber'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'buildingNumber'
    },
    {
      title: t('keyEstate.twoUnitPropertyDisplay'),
      align: 'center',
      sortable: false,
      width: 200,
      maxWidth: 200,
      key: 'twoUnitPropertyDisplay'
    },
    {
      title: t('keyEstate.twoUnitLoanRegistrationDisplay'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'twoUnitLoanRegistrationDisplay'
    },
    {
      title: t('keyEstate.threeUnitLoanRegistrationDisplay'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'threeUnitLoanRegistrationDisplay'
    },
    {
      title: t('keyEstate.fourUnitLoanRegistrationDisplay'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'fourUnitLoanRegistrationDisplay'
    },
    {
      title: t('keyEstate.propertyDisplay2'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'propertyDisplay2'
    },
    {
      title: t('keyEstate.twoUnitPropertyDisplay2'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'twoUnitPropertyDisplay2'
    },
    {
      title: t('keyEstate.twoUnitLoanRegistrationDisplay2'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'twoUnitLoanRegistrationDisplay2'
    },
    {
      title: t('keyEstate.threeUnitLoanRegistrationDisplay2'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'threeUnitLoanRegistrationDisplay2'
    },
    {
      title: t('keyEstate.fourUnitLoanRegistrationDisplay2'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'fourUnitLoanRegistrationDisplay2'
    },
    {
      title: t('keyEstate.realEstateDisplay1'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay1'
    },
    {
      title: t('keyEstate.realEstateDisplay2'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay2'
    },
    {
      title: t('keyEstate.realEstateDisplay3'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay3'
    },
    {
      title: t('keyEstate.realEstateDisplay4'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay4'
    },
    {
      title: t('keyEstate.realEstateDisplay5'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay5'
    },
    {
      title: t('keyEstate.realEstateDisplay6'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay6'
    },
    {
      title: t('keyEstate.realEstateDisplay7'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay7'
    },
    {
      title: t('keyEstate.jurisdictionE'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'jurisdictionE'
    },
    {
      title: t('keyEstate.realEstateDisplay1e'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay1e'
    },
    {
      title: t('keyEstate.realEstateDisplay2e'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay2e'
    },
    {
      title: t('keyEstate.realEstateDisplay3e'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay3e'
    },
    {
      title: t('keyEstate.realEstateDisplay4e'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay4e'
    },
    {
      title: t('keyEstate.realEstateDisplay5e'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay5e'
    },
    {
      title: t('keyEstate.realEstateDisplay6e'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay6e'
    },
    {
      title: t('keyEstate.realEstateDisplay7e'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'realEstateDisplay7e'
    },
    {
      title: t('keyEstate.signature'),
      align: 'center',
      sortable: false,
      width: 200,
      key: 'signature'
    },
    {
      title: t('table.active'),
      align: 'center',
      sortable: false,
      width: 100,
      key: 'isActive'
    }
  ],
  totalPages: null,
  totalElements: null,
  displayPageNums: 5,
  amountOfDataDisplay: null,
  idDelete: null,
  isActive: null,
  isDbl: {
    floorNumber: false,
    jurisdiction: false,
    denominator: false,
    hotelName: false,
    associationDisplay: false,
    propertyDisplay: false,
    twoUnitPropertyDisplay: false,
    twoUnitLoanRegistrationDisplay: false,
    threeUnitLoanRegistrationDisplay: false,
    fourUnitLoanRegistrationDisplay: false,
    propertyDisplay2: false,
    twoUnitPropertyDisplay2: false,
    twoUnitLoanRegistrationDisplay2: false,
    threeUnitLoanRegistrationDisplay2: false,
    fourUnitLoanRegistrationDisplay2: false,
    realEstateDisplay1: false,
    realEstateDisplay2: false,
    realEstateDisplay3: false,
    realEstateDisplay4: false,
    realEstateDisplay5: false,
    realEstateDisplay6: false,
    realEstateDisplay7: false,
    jurisdictionE: false,
    realEstateDisplay1e: false,
    realEstateDisplay2e: false,
    realEstateDisplay3e: false,
    realEstateDisplay4e: false,
    realEstateDisplay5e: false,
    realEstateDisplay6e: false,
    realEstateDisplay7e: false,
    signature: false
  },
  dblKeyEstateId: null
})

const searchRequest = reactive({
  "name": null
})

// Function
const dblclickRow = (fieldName, realEstateDisplayKey) => {
  switch (fieldName) {
    case 'floorNumber':
      table.isDbl.floorNumber = true
      break
    case 'jurisdiction':
      table.isDbl.jurisdiction = true
      break
    case 'denominator':
      table.isDbl.denominator = true
      break
    case 'hotelName':
      table.isDbl.hotelName = true
      break
    case 'associationDisplay':
      table.isDbl.associationDisplay = true
      break
    case 'propertyDisplay':
      table.isDbl.propertyDisplay = true
      break
    case 'twoUnitPropertyDisplay':
      table.isDbl.twoUnitPropertyDisplay = true
      break
    case 'twoUnitLoanRegistrationDisplay':
      table.isDbl.twoUnitLoanRegistrationDisplay = true
      break
    case 'threeUnitLoanRegistrationDisplay':
      table.isDbl.threeUnitLoanRegistrationDisplay = true
      break
    case 'fourUnitLoanRegistrationDisplay':
      table.isDbl.fourUnitLoanRegistrationDisplay = true
      break
    case 'propertyDisplay2':
      table.isDbl.propertyDisplay2 = true
      break
    case 'twoUnitPropertyDisplay2':
      table.isDbl.twoUnitPropertyDisplay2 = true
      break
    case 'twoUnitLoanRegistrationDisplay2':
      table.isDbl.twoUnitLoanRegistrationDisplay2 = true
      break
    case 'threeUnitLoanRegistrationDisplay2':
      table.isDbl.threeUnitLoanRegistrationDisplay2 = true
      break
    case 'fourUnitLoanRegistrationDisplay2':
      table.isDbl.fourUnitLoanRegistrationDisplay2 = true
      break
    case 'realEstateDisplay1':
      table.isDbl.realEstateDisplay1 = true
      break
    case 'realEstateDisplay2':
      table.isDbl.realEstateDisplay2 = true
      break
    case 'realEstateDisplay3':
      table.isDbl.realEstateDisplay3 = true
      break
    case 'realEstateDisplay4':
      table.isDbl.realEstateDisplay4 = true
      break
    case 'realEstateDisplay5':
      table.isDbl.realEstateDisplay5 = true
      break
    case 'realEstateDisplay6':
      table.isDbl.realEstateDisplay6 = true
      break
    case 'realEstateDisplay7':
      table.isDbl.realEstateDisplay7 = true
      break
    case 'jurisdictionE':
      table.isDbl.jurisdictionE = true
      break
    case 'realEstateDisplay1e':
      table.isDbl.realEstateDisplay1e = true
      break
    case 'realEstateDisplay2e':
      table.isDbl.realEstateDisplay2e = true
      break
    case 'realEstateDisplay3e':
      table.isDbl.realEstateDisplay3e = true
      break
    case 'realEstateDisplay4e':
      table.isDbl.realEstateDisplay4e = true
      break
    case 'realEstateDisplay5e':
      table.isDbl.realEstateDisplay5e = true
      break
    case 'realEstateDisplay6e':
      table.isDbl.realEstateDisplay6e = true
      break
    case 'realEstateDisplay7e':
      table.isDbl.realEstateDisplay7e = true
      break
    case 'signature':
      table.isDbl.signature = true
      break
  }
  table.dblKeyEstateId = realEstateDisplayKey
}

const clickOutside = () => {
  table.isDbl.floorNumber = false
  table.isDbl.jurisdiction = false
  table.isDbl.denominator = false
  table.isDbl.hotelName = false
  table.isDbl.associationDisplay = false
  table.isDbl.propertyDisplay = false
  table.isDbl.twoUnitPropertyDisplay = false
  table.isDbl.twoUnitLoanRegistrationDisplay = false
  table.isDbl.threeUnitLoanRegistrationDisplay = false
  table.isDbl.fourUnitLoanRegistrationDisplay = false
  table.isDbl.propertyDisplay2 = false
  table.isDbl.twoUnitPropertyDisplay2 = false
  table.isDbl.twoUnitLoanRegistrationDisplay2 = false
  table.isDbl.threeUnitLoanRegistrationDisplay2 = false
  table.isDbl.fourUnitLoanRegistrationDisplay2 = false
  table.isDbl.realEstateDisplay1 = false
  table.isDbl.realEstateDisplay2 = false
  table.isDbl.realEstateDisplay3 = false
  table.isDbl.realEstateDisplay4 = false
  table.isDbl.realEstateDisplay5 = false
  table.isDbl.realEstateDisplay6 = false
  table.isDbl.realEstateDisplay7 = false
  table.isDbl.jurisdictionE = false
  table.isDbl.realEstateDisplay1e = false
  table.isDbl.realEstateDisplay2e = false
  table.isDbl.realEstateDisplay3e = false
  table.isDbl.realEstateDisplay4e = false
  table.isDbl.realEstateDisplay5e = false
  table.isDbl.realEstateDisplay6e = false
  table.isDbl.realEstateDisplay7e = false
  table.isDbl.signature = false
  table.dblKeyEstateId = null
}

const clickRow = (item, row) => {
  if (table.dblKeyEstateId !== row.item.value &&
    (table.isDbl.floorNumber === true
      || table.isDbl.jurisdiction === true
      || table.isDbl.denominator === true
      || table.isDbl.hotelName === true
      || table.isDbl.associationDisplay === true
      || table.isDbl.propertyDisplay === true
      || table.isDbl.twoUnitPropertyDisplay === true
      || table.isDbl.twoUnitLoanRegistrationDisplay === true
      || table.isDbl.threeUnitLoanRegistrationDisplay === true
      || table.isDbl.fourUnitLoanRegistrationDisplay === true
      || table.isDbl.propertyDisplay2 === true
      || table.isDbl.twoUnitPropertyDisplay2 === true
      || table.isDbl.twoUnitLoanRegistrationDisplay2 === true
      || table.isDbl.threeUnitLoanRegistrationDisplay2 === true
      || table.isDbl.fourUnitLoanRegistrationDisplay2 === true
      || table.isDbl.realEstateDisplay1 === true
      || table.isDbl.realEstateDisplay2 === true
      || table.isDbl.realEstateDisplay3 === true
      || table.isDbl.realEstateDisplay4 === true
      || table.isDbl.realEstateDisplay5 === true
      || table.isDbl.realEstateDisplay6 === true
      || table.isDbl.realEstateDisplay7 === true
      || table.isDbl.jurisdictionE === true
      || table.isDbl.realEstateDisplay1e === true
      || table.isDbl.realEstateDisplay2e === true
      || table.isDbl.realEstateDisplay3e === true
      || table.isDbl.realEstateDisplay4e === true
      || table.isDbl.realEstateDisplay5e === true
      || table.isDbl.realEstateDisplay6e === true
      || table.isDbl.realEstateDisplay7e === true
      || table.isDbl.signature === true
    )) {
    table.isDbl.floorNumber = false
    table.isDbl.jurisdiction = false
    table.isDbl.denominator = false
    table.isDbl.hotelName = false
    table.isDbl.associationDisplay = false
    table.isDbl.propertyDisplay = false
    table.isDbl.twoUnitPropertyDisplay = false
    table.isDbl.twoUnitLoanRegistrationDisplay = false
    table.isDbl.threeUnitLoanRegistrationDisplay = false
    table.isDbl.fourUnitLoanRegistrationDisplay = false
    table.isDbl.propertyDisplay2 = false
    table.isDbl.twoUnitPropertyDisplay2 = false
    table.isDbl.twoUnitLoanRegistrationDisplay2 = false
    table.isDbl.threeUnitLoanRegistrationDisplay2 = false
    table.isDbl.fourUnitLoanRegistrationDisplay2 = false
    table.isDbl.realEstateDisplay1 = false
    table.isDbl.realEstateDisplay2 = false
    table.isDbl.realEstateDisplay3 = false
    table.isDbl.realEstateDisplay4 = false
    table.isDbl.realEstateDisplay5 = false
    table.isDbl.realEstateDisplay6 = false
    table.isDbl.realEstateDisplay7 = false
    table.isDbl.jurisdictionE = false
    table.isDbl.realEstateDisplay1e = false
    table.isDbl.realEstateDisplay2e = false
    table.isDbl.realEstateDisplay3e = false
    table.isDbl.realEstateDisplay4e = false
    table.isDbl.realEstateDisplay5e = false
    table.isDbl.realEstateDisplay6e = false
    table.isDbl.realEstateDisplay7e = false
    table.isDbl.signature = false
    table.dblKeyEstateId = null
  }
}
const showDialogConfirmDelete = (id, isActive) => {
  table.idDelete = id
  table.isActive = isActive
  executeDelete(table.idDelete, table.isActive)
  // refDialogConfirmDelete.value.open("keyEstate")
}

const showDialogUserUpdate = (id) => {
  router.push({
    path: '/key-list-info',
    query: {keyEstateId: id}
  })
}

const executeDelete = (item, isActive) => {
  let request = {
    ids: [item],
    isActive: isActive
  }
  KeyEstateRepository.delete(request).then((function (response) {
    if (response.code === 'ES200') {
      search()
    }
  }))

}

const search = () => {
  let request = {}
  request = DataTableHelper.buildRequest(table.options, searchRequest);

  KeyEstateRepository.searchAll(request).then((function (response) {
    table.items = response.data.keyEstateList
    table.totalElements = response.data.totalElements
    table.totalPages = response.data.totalPage
    table.amountOfDataDisplay = response.data.keyEstateList.length

    let pagination = {
      page: table.options.page,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPage,
      amountOfDataDisplay: response.data.keyEstateList.length,
    }
    store.setPagination(store, pagination)
  }))

  cookies.set('keyPrev', {
    page: table.options.page,
    itemsPerPage: table.options.itemsPerPage,
    sortBy: table.options.sortBy,
    sortDesc: table.options.sortDesc
  })
}

const handleAction = (actionId) => {
  if (actionId === TOOLBAR_TABLE.CREATE) {
    console.log(' open create ')
    router.push({
      path: '/key-list-info',
      query: {keyEstateId: null}
    })
  }
}

watch(table.options, () => (
  search()
))

const changeData = (e) => {
  table.options.page = e.page
  table.options.itemsPerPage = e.perPage
}


onMounted(() => {
  if (user.role !== 0) {
    router.replace('/document')
  }
  if (cookies.get('keyPrev') && cookies.get('keyPrev').key) {
    if (cookies.get('keyPrev').page === 1 &&
      cookies.get('keyPrev').itemsPerPage === 20
    ) {
      search()
    }
  } else {
    search()
  }
  cookies.remove('recordRegAppPrev')
  cookies.remove('documentPrev')
  cookies.remove('recordRegFinalPrev')
})

</script>
<style scoped>
</style>
