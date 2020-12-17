<template>
  <div class="all-pages">
    <ul class="page-list">
      <template v-for="(item, index) in routers" :key="index">
        <li @click="jumpPage(item.name)">{{ item.meta.title }}</li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const self = getCurrentInstance()
    const route = useRoute()
    const router = useRouter()

    let routers = ref(router.options.routes).value
    routers = routers.slice(1, routers.length)

    const jumpPage = (name: string) => {
      router.push({ name })
    }
    return {
      routers,
      jumpPage,
    }
  },
})
</script>

<style scoped lang="scss">
.page-list {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  > li {
    margin: 10px;
    padding: 30px 50px;
    background: $primary-6;
    color: $white;
    &:hover {
      background: $primary-7;
      box-shadow: $box-shadow;
    }
  }
}
</style>
