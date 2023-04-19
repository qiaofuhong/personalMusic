<template>
  <!-- vant轮播图 -->
  <div id="swiperTop">
    <van-swipe :autoplay="3000"
               lazy-render>
      <van-swipe-item v-for="image in state.images"
                      :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

//引入axios
import axios from 'axios'
import { getBanner } from '@/request/api/home.js'
//引入vue中的onMounted
//使用vue3中的reactive 把轮播图数据变成响应式的
import { reactive, onMounted } from 'vue'

/* 通过Vue3 API 直接引入线上图片 */
export default {
  setup () {
    const state = reactive({
      images:[
      "https://picsum.photos/200/300",
      "https://img.yzcdn.cn/2.jpg",
    ]});
    onMounted(async () => {
      /* //拿到服务器地址
      axios.get('http://localhost:3000/banner?type=2').then((res) => {
        console.log(res);
        state.images = res.data.banners
      }) */

      //使用异步请求
      let res = await getBanner();
      state.images = res.data.banners;
      console.log(res);
    })
    return { state };
  },
};
</script>

<style lang="less" scoped>
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>