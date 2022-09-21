<template>
  <div class="test-content">
    <dht-button style="width: 200px">测试文件上传</dht-button>
    <div
      tabindex="1"
      @focus="onfocus"
      @blur="onblur"
      @paste="onPaste"
      class="tarea"
      placeholder="文件内容"
    >
      <template v-for="(item, index) in imgList" :key="index">
        <!--        <img :src="item" />-->
        <span>{{ item }}</span>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const test = ref('')
const imgList = ref<string[]>([])

function onPaste(e: ClipboardEvent) {
  let file = null
  const items = e.clipboardData?.items
  if (items && items.length) {
    for (let i = 0; i < items.length; i++) {
      file = items[i].getAsFile()
      // if (items[i].type.indexOf('image') !== -1) {
      //   file = items[i].getAsFile()
      //   break
      // }
    }
  }
  if (!file) {
    console.log('粘贴的不是图片')
    return
  }
  console.log(file.name, file)
  imgList.value.push(URL.createObjectURL(file))
  // 当成正常的input文件上传处理
  // 如下
  // const fromData = new FormData()
  // fromData.append(file.name, file)
}
function onfocus() {
  console.log(1)
}
function onblur() {
  console.log(2)
}
</script>

<style lang="scss" scoped>
.test-content {
  padding: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.tarea {
  width: 800px;
  height: 700px;
  border: #1890ff 1px solid;
}
</style>
