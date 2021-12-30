<template>
  <div class="home">
    <div class="title">全局公共色彩展示</div>
    <div class="tips">组件库没有圆角，采用锐角设计</div>
    <div class="one">
      <div class="nav-title">主色卡：</div>
      <template v-for="(item, index) in colorCard" :key="index">
        <div :class="'bg' + (index + 1)">{{ index + 1 }}</div>
      </template>
    </div>
    <!--单独色彩-->
    <div class="independent">
      <div class="one">
        <div class="nav-title">边框颜色：</div>
        <template v-for="(item, index) in border" :key="index">
          <div :class="'border-c' + (index + 1)">{{ index + 1 }}级边框</div>
        </template>
      </div>
      <div class="one">
        <div class="nav-title">字体颜色：</div>
        <template v-for="(item, index) in font" :key="index">
          <div :class="'font-c' + (index + 1)">{{ item }}颜色</div>
        </template>
      </div>
      <div class="one">
        <div class="nav-title">字体大小：</div>
        <template v-for="(item, index) in fontsize" :key="index">
          <div :class="'fonts-s' + (index + 1)">
            H{{ fontsize.length - index }},字体大小:{{ item }}
          </div>
        </template>
      </div>
      <div class="one">
        <div class="nav-title">阴影颜色：</div>
        <div class="shadow-color">一般弹窗rgba(0, 0, 0, 0.5)</div>
        <div class="box-shadowr">边框阴影：0 0 4px 0 darken($white, 20%)</div>
      </div>
      <div class="one">
        <div class="nav-title">四色提醒：</div>
        <template v-for="(item, index) in tips" :key="index">
          <div :class="'tips-c' + (index + 1)">{{ item }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const colorCard = ref(new Array(10)).value

    const border = ref(new Array(3)).value

    const font = ref(['主字体', '禁用']).value

    const fontsize = ref([12, 14, 16, 20, 24, 32]).value

    const tips = ref(['成功', '失败', '提醒', '警告']).value
    return {
      colorCard,
      border,
      font,
      fontsize,
      tips,
    }
  },
})
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  flex-flow: column;
}
.title {
  padding: 25px;
  font-size: $h1-32;
}
.nav-title {
  font-size: $h4-16;
}
.one {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
// 颜色卡
@mixin color-card($name, $i, $color, $fco: $font-color) {
  .#{$name + $i} {
    background: $color;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $fco;
  }
}
// 主色彩区域
$bgcolorlist: (
  1: $primary-1,
  2: $primary-2,
  3: $primary-3,
  4: $primary-4,
  5: $primary-5,
  6: $primary-color,
  7: $primary-6,
  8: $primary-7,
  9: $primary-8,
  10: $primary-9,
);
@each $i, $color in $bgcolorlist {
  @include color-card('bg', $i, $color);
}
// 独立色彩区域
.independent {
  margin-top: 20px;
}
// 边框颜色
$borderlist: (
  1: $border-1,
  2: $border-2,
  3: $border-3,
);
@each $i, $color in $borderlist {
  @include color-card('border-c', $i, $color);
}
// 字体颜色部分
$fontlist: (
  1: $font-color,
  2: $font-disable,
);
@each $i, $color in $fontlist {
  @include color-card('font-c', $i, $color, #fff);
}
// 字体颜色部分
$font-size-list: (
  1: $h6-12,
  2: $h5-14,
  3: $h4-16,
  4: $h3-20,
  5: $h2-24,
  6: $h1-32,
);
@each $i, $size in $font-size-list {
  .fonts-s#{$i} {
    font-size: $size;
    margin-right: 20px;
  }
}
// 阴影颜色
.shadow-color {
  background: $shadow-color;
  height: 80px;
  width: 200px;
  margin-right: 30px;
}
.box-shadowr {
  box-shadow: $box-shadow;
  width: 250px;
  height: 80px;
  background: $white;
}
// 四色提醒
$four-tips-list: (
  1: $success,
  2: $error,
  3: $info,
  4: $warn,
);
@each $i, $color in $four-tips-list {
  @include color-card('tips-c', $i, $color, #fff);
}
</style>
