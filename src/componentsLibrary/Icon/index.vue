<template>
  <i :class="`dht-icon-${name}`"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DhtIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
})
</script>
