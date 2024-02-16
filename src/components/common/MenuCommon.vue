<template>
  <section class="relative">
    <div class="flex mt-12 fixed top-0 left-0 w-96 h-screen">
      <div class="w-22 border-solid border-r-2  border-blue-500 bg-info">
        <div v-for="(item, index) in items"
             :key="item.id"
             class="mx-3"
        >
          <div
            class="row flex flex-col items-center mt-4 w-14 h-14 justify-center"
            :class="item.active"
            @click="setActive(index)"
          >
            <span><i class="text-white"
                     :class="item.class"
            ></i></span>
            <span class="text-xs text-white">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div v-show="isShow"
           class="bg-white w-screen"
      >
        <ul class="mt-5">
          <div>
            <ul v-for="(item, index) in arrSubMenu[indexActive]"
                :key="index"
            >
              <a
                :href="item.path"
              >
                <li :class="item.active"
                    class="py-2 px-5 text-sm"
                >{{ item.name }}</li>
              </a>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  </section>
</template>
<script setup>
import {computed, onMounted, ref} from 'vue'
import {useCommonStore} from "@/store/commonStore";
import {RepositoryFactory} from "@/repositories/repositoryFactory";


const items = ref([])
const indexActive = ref(0)
const indexSubActive = ref(0)
const store = useCommonStore()
const isShow = computed(() => store.isShowSidebar)
const MenuRepository = RepositoryFactory.get('menu')

const setActive = async (index) => {
  items.value[indexActive.value].active = ''
  indexActive.value = index
  items.value[index].active = 'active'
}
const setSubActive = async (index) => {
  arrSubMenu.value[indexActive.value][index].active = ''
  indexSubActive.value = index
  arrSubMenu.value[indexActive.value][index].active = 'active'
}
const arrSubMenu = ref([])

onMounted(async () => {
  let currentUri = window.location.href;
  let responseIndex;
  let responseSubIndex;

  await MenuRepository.findAllMenu().then((function (response) {
    if (response.code === 'ES200') {
      const responseMap = new Map(Object.entries(response.data));
      responseMap.forEach(function (values, key) {
        let baseId = null
        let baseClass = null
        let arrSub = []
        values.forEach(value => {
          // Do something
          let submenu = ({
            path: value.path,
            name: value.subName
          })

          if (currentUri.includes(submenu.path)) {
            responseIndex = value.baseOrder
            responseSubIndex = value.subOrder
          }
          arrSub.push(submenu)

        })
        if (responseMap.get(key)[0]) {
          baseId = responseMap.get(key)[0].baseMenuId
          baseClass = responseMap.get(key)[0].baseClass
        }
        let item = ({
          name: key,
          id: baseId,
          active: '',
          class: baseClass
        })
        items.value.push(item)
        arrSubMenu.value.push(arrSub)
      });
    }
  }))
  if (responseIndex !== null && responseSubIndex !== null) {
    setActive(responseIndex)
    setSubActive(responseSubIndex)
  }
})


</script>
<style>
.row {
  background-color: hsla(0, 0%, 91.8%, 0.2);
  border-radius: 5%;
}

.row:hover {
  background-color: rgba(234, 234, 234, 0.755);
  cursor: pointer;
}

.row.active {
  background-color: rgba(255, 255, 255, 0.755);
}

.row.active span {
  color: rgba(41, 27, 198, 1);
}

.row.active span i {
  color: rgba(41, 27, 198, 1);
}

li:hover,
.sub-menu:hover {
  background-color: rgba(176, 170, 170, 0.5);
  color: rgba(41, 27, 198, 1);
  cursor: pointer;
}

ul> a > li.active {
  background-color: rgba(176, 170, 170, 0.5);
  color: rgba(41, 27, 198, 1);
}
</style>
