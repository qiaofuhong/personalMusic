<!-- 推荐歌单数据获取 -->
<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">推荐歌单></div>
      <div class="more">...</div>
    </div>

    <div class="musicContent">
      <van-swipe 
        :loop="false" 
        :width="150" 
        class="my-swipe" 
        :show-indicators="false">
        <van-swipe-item 
          v-for="item in state.musicList" 
            :key="item" 
              class="my-swipe_item">
            <!-- 通过router-link进行推荐歌单详情页面的跳转 -->
           <router-link :to="{path:'/itemMusic', query:{id:item.id}}">   
          <img :src="item.picUrl" alt="" />
          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-playCount"></use>
            </svg>
            <!-- 传递播放量格式化参数 -->
            {{ changeCount(item.playCount) }}
          </span>
          <div class="name">{{ item.name }}</div>
           </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="musicClass">
      <div class="one"><a href="https://music.163.com/"> </a>摇滚</div>
      <div class="two">民谣</div>
      <div class="three">舒缓</div>
      <div class="four">纯音乐</div>
      <div class="five">英文</div>
      <div class="six">抒情</div>
    </div>
  </div>
</template>

<!-- 获取推荐歌单数据 -->
<script>
//vue2写法
 /*  import { getMusicList } from "@/request/api/home.js"

  export default {
    data() {
      return {
        musicList: []
      }
    },
    methods: {
      async getGnedan() {
        let res = await getMusicList();
        console.log(res);
        //对musicList数组进行赋值
        this.musicList = res.data.result
      },
      //格式化播放量函数
      changeCount: function (num) {
        if (num >= 100000000) {
          return (num / 100000000).toFixed(1) + "亿"
        } else if (num >= 10000) {
          return (num / 10000).toFixed(0) + "万"
        }
      }
    },
    mounted() {
      this.getGnedan()
    }
  } */

import { getMusicList } from '@/request/api/home';
import { reactive, onMounted } from 'vue';

  // vue3写法
  export default {
  setup() {
    const state = reactive({
      musicList: [],
    })
      //格式化推荐歌单数据
      function changeCount(num) {
        if(num >= 100000000) {
          return (num / 100000000).toFixed(1) + "亿";
        } else if (num >= 10000) {
          return (num / 10000).toFixed(0) + "万";
        }
      }
      onMounted(async () => {
        let res = await getMusicList();
        console.log(res);
        state.musicList = res.data.result;
      });
      return { state, changeCount }
  }
}
</script>

<style lang="less" scoped>
  .musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    margin-top: -.5rem;
    .musicTop {
      width: 100%;
      height: 0.6rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.2rem;
      .title {
        font-size: 0.3rem;
        //font-weight: 400;
      }
      .more {
        writing-mode: vertical-lr;
        text-align: center;
        font-size: 0.4rem;
        font-weight: 500;
        padding: 0.1rem;
        color: #ccc;
        margin-right: -0.3rem;
        margin-top: .11rem;
      }
    }
    .musicContent {
      width: 100%;
      height: 4rem;
      position: relative;
      top: -.2rem;
      .my-swipe {
        height: 100%;
        .my-swipe_item {
          margin-right: -15px;
          .playCount {
            position: relative;
            bottom: 2.55rem;
            left: 1.5rem;
            color: #fffffd;
            font-size: 50%;
            .icon {
              position: relative;
              top: 40.5px;
              right: 268px;
              width: 15px;
              height: 50px;
            }
          }
            img {
              width: 80%;
              height: 2.5rem;
              overflow: hidden;
              border-radius: 10px;
              transform: translateY(0);  
            }
          }
        }
      }
    }

    .name {
      color: #3f434c;
      font-size: 12px;
      width: 110px;
      white-space: normal;
      margin-top: -20px;
    }

    .musicClass {
      width: 350px;
      height: 100px;
      margin-top: -28px;
      margin-left: 22px;
      display: grid;
      grid-template-columns: 115px 115px 115px;
      grid-template-rows: 50px,50px;
      
      .one{
       background-color: #ff9137;
       width: 80px;
       height: 40px;
       text-align: center;
       padding-top: 10px;
       border-radius: 10px; 
      }
      .one:hover  {
          box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      .two {
        background-color:#5498ff;
        width: 80px;
        height: 40px;
        text-align: center;
        padding-top: 10px;
        border-radius: 10px;
      }
      .two:hover  {
          box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      .three {
        background-color: #89d3f6;
        width: 80px;
        height: 40px;
        text-align: center;      
        padding-top: 10px;
        border-radius: 10px;
      }
      .three:hover  {
          box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      .four {
        background-color: #b7f5bf;
        width: 80px;
        height: 40px;
        text-align: center;      
        padding-top: 10px;
        border-radius: 10px;
      }
      .four:hover  {
          box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      .five {
        background-color: #f97878;
        width: 80px;
        height: 40px;
        text-align: center;     
        padding-top: 10px;
        border-radius: 10px;
      }
      .five:hover  {
          box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      .six {
        background-color: #ffafaf;
        width: 80px;
        height: 40px;
        text-align: center;      
        padding-top: 10px;
        border-radius: 10px;
      }
      .six:hover  {
          box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
    }
</style>