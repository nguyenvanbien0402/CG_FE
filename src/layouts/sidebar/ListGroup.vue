<template>
  <v-list-group
    :group="group"
    :value="nameActive === title ? 'expand' : ''"
  >
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :title="items.title"
        active-color="blue"
        @click="onClickBaseMenu(items)"
      >
        <template #prepend>
          <v-avatar>
            <v-icon :icon="items.icon"></v-icon>
          </v-avatar>
        </template>
      </v-list-item>
    </template>

    <template v-for="(child, i) in items.items">
      <default-list-group
        v-if="child.items"
        :key="`sub-group-${i}`"
        :name="child.to"
        :items="child"
      />

      <default-list-item
        v-if="!child.items"
        :key="`child-${i}`"
        :name="child.to"
        :items="child"
      />
    </template>
  </v-list-group>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import DefaultListGroup from '@/layouts/sidebar/ListGroup.vue'
import DefaultListItem from '@/layouts/sidebar/ListItem.vue'
import {useCommonStore} from "@/store/commonStore";

const commonStore = useCommonStore()

const props = defineProps({
  items: {
    type: Object
  },
  keyItem: {
    type: String
  },
  title: {
    type: String
  }
})

let group = reactive([])

const items = reactive(props.items);

const nameActive = computed(() =>{
  return commonStore.getBaseMenu
})

const onClickBaseMenu = (i) => {
  if (commonStore.getBaseMenu === i.title) {
    commonStore.setBaseMenu(commonStore, null)
  } else {
    commonStore.setBaseMenu(commonStore, i.title)
  }
}

const genGroup = (items) => {
  return items.reduce((acc, cur) => {
    if (!cur.to) return acc

    acc.push(
      cur.items
        ? this.genGroup(cur.items)
        : cur.to.slice(1, -1),
    )

    return acc
  }, []).join('|')
}
onMounted(() => {
  group = genGroup(items.items)
})
</script>
<style scoped>

</style>
