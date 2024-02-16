<template>
  <v-list-item
    :href="items.href"
    :to="items.to"
    :rel="items.href ? 'nofollow' : undefined"
    :target="items.href ? '_blank' : undefined"
    color="info"
    :active="route.path.includes(props.name)"
  >
    <v-list-item-title>
      {{ items.title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script setup>
import {computed, reactive} from 'vue';
import {onMounted} from "vue";
import {useCommonStore} from "@/store/commonStore";
import {useRoute} from "vue-router";


const route = useRoute()

const commonStore = useCommonStore()

const props = defineProps({
  name:{
    type:String
  },
  items: {
    type: Object
  }
})
const active = computed(() => {
  return commonStore.getActiveMenu
})
const items = reactive(props.items);

onMounted(() =>{
})
</script>
