<template>
  <v-list
    expand
    nav
    v-model:opened="open"
  >
    <template v-for="(item, i) in items">
      <default-list-group
        v-if="item.items"
        :key="`group-${i}`"
        :title="item.title"
        :name="item.to"
        :items="item"
      />

      <default-list-item
        v-else
        :key="`item-${i}`"
        :items="item"
      />
    </template>
  </v-list>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue';
import DefaultListGroup from '@/layouts/sidebar/ListGroup.vue'
import DefaultListItem from '@/layouts/sidebar/ListItem.vue'
import {useCommonStore} from "@/store/commonStore";
import {useRoute} from "vue-router";

const route = useRoute()
const valueRef = ref([])

const commonStore = useCommonStore()

const items = computed(() => commonStore.getMenu);

const open = reactive(['expand'])

const checkUri = () => {
  items.value.forEach((item, i) => {
    item.items.forEach(s => {
      if (route.path.includes(s.to)) {
        valueRef.value[i] = 'expand'
        commonStore.setBaseMenu(commonStore, item.title)
      }
    })
  })
}

onMounted(async () => {
  await commonStore.fetchMenu()
  await checkUri()
  console.log(valueRef.value)
})
</script>
