<template>
  <div>
    <!-- 使用组件 -->
    <TopNav></TopNav>
    <SwiperTop></SwiperTop>
    <IconList></IconList>
    <MusicList></MusicList>
  </div>
</template>

<script>
// @ is an alias to /src
// @相当于src这个路径

//引入TopNav组件
import TopNav from '@/components/home/TopNav.vue'
//引入SwiperTop组件
import SwiperTop from '@/components/home/SwiperTop.vue'
//引入每日推荐组件
import IconList from '@/components/home/IconList.vue'
//引入推荐歌单组件
import MusicList from '@/components/home/MusicList.vue'

export default {
  name: 'HomeView',
  components: {
    //注册组件
    TopNav, 
    SwiperTop,
    IconList,
    MusicList
  }
}
</script>
