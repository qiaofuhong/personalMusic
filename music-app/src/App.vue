<template>
  <!-- 使用组件 -->
  <router-view />
  <FooterMusic v-show="$store.state.isFooterMusic"/>
</template>

<script>
import FooterMusic from "@/components/item/FooterMusic.vue"

export default {
  components: {
  //注册FooterMusic组件
  FooterMusic
  }
}
</script>

<style lang="less" >
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
  }
  
    .icon {
        width: .5rem;
        height: .5rem;
      }
</style>