<template>
  <div :class="{ 'se-tag': !!startEndTxt }">
    <template v-if="startEndTxt">
      <div class="day">{{ li.day }}</div>
      <div class="tag-txt">
        {{ startEndTxt }}
      </div>
    </template>
    <template v-else>{{ li.day }}</template>
  </div>
</template>

<script>
export default {
  props: {
    li: {
      type: Object,
      default() {
        return {}
      },
    },
    firstLastDate: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    startEndTxt() {
      if (this.firstLastDate[0] && this.firstLastDate[0].formatDate === this.li.formatDate)
        return '起'
      if (this.firstLastDate[1] && this.firstLastDate[1].formatDate === this.li.formatDate)
        return '止'
      return ''
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.se-tag {
  display: flex;
  flex-flow: column;
  line-height: 12px;
  background: var(--primary-w6);
  padding: 3px;
  .day {
    height: 50%;
    text-align: left;
  }
  .tag-txt {
    color: #ffffff;
    height: 50%;
    text-align: right;
  }
}
</style>
