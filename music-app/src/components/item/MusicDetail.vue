<template>
  <img :src="musicList.al.picUrl" alt="bgImg" class="bgImg">

  <!-- 顶部 -->
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon downArrow" aria-hidden="true" @click="updateDetailShow">
        <use xlink:href="#icon-downArrow"></use>
      </svg>
      <div class="centerMarquee">
<!--         <marquee>{{ musicList.name }}</marquee>-->
         <p>{{ musicList.name }}</p>
         <span v-for="item in musicList.ar" :key="item">{{ item.name }}</span>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon share" aria-hidden="true"  style="fill: #f3eae3;">
        <use xlink:href="#icon-musicDetailShare"></use>
      </svg>
    </div>
  </div>

  <!-- 中间磁盘部分 -->
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
    <img src="@/assets/disc-plus.png" alt="" class="img_disc-plus">
    <img :src="musicList.al.picUrl" alt="" class="img_picUrl" @click="isLyricShow=true" :class="{img_picUrl_active:!isbtnShow,img_picUrl_paused:isbtnShow}">
  </div>
  <!-- 中间歌词部分 -->
  <div class="detailContentLyric" ref="musicLyric" v-show="isLyricShow">
   <!--  {{ lyricList.lyric }}
    {{ lyric }} -->
    <!-- 歌曲播放的时间大于这句歌词本身的时间并小于下一句歌词本身的时间 -->
    <p v-for="item in lyric" @click="isLyricShow=false" :key="item" :class="{ active:(currentTime *1000 >= item.time && currentTime*1000 < item.pre) }">
        {{ item.lyricData }}
    </p>
  </div>

  <!-- 底部 -->
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon notCollection" aria-hidden="true">
        <use xlink:href="#icon-not_collection"></use>
      </svg>
      <svg class="icon download" aria-hidden="true" >
        <use xlink:href="#icon-download"></use>
      </svg>
      <svg class="icon sing" aria-hidden="true">
        <use xlink:href="#icon-musicDetailSing"></use>
      </svg>
      <svg class="icon comments" aria-hidden="true" >
        <use xlink:href="#icon-musicDetailComments"></use>
      </svg>
      <svg class="icon musicMore" aria-hidden="true">
        <use xlink:href="#icon-itemMusicMore"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footerBottom">
      <svg class="icon listCirculation" aria-hidden="true">
        <use xlink:href="#icon-list_circulation"></use>
      </svg>
      <svg class="icon previous" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-previous"></use>
      </svg>
      <svg class="icon start" aria-hidden="true" v-if="isbtnShow" @click="play">
        <use xlink:href="#icon-start"></use>
      </svg>
      <svg class="icon stop" aria-hidden="true"   v-else @click="play">
        <use xlink:href="#icon-stop"></use>
      </svg>
      <svg class="icon next" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-next"></use>
      </svg>
      <svg class="icon songList" aria-hidden="true">
        <use xlink:href="#icon-song_list"></use>
      </svg>
    </div>
  </div>
</template>

<script>
//引入vue3跑马灯组件

import { mapMutations, mapState } from 'vuex';


/* import { Vue3Marquee } from 'vue3-marquee'
 */
export default {
  data(){
    return{
      //显示歌词还是磁盘
      //默认显示磁盘
      isLyricShow:false,
      //是否被拖动
      isChange: false
    }
  },
  //解构
  computed: {
    ...mapState(["lyricList", 'currentTime', 'playList', 'playListIndex', 'duration']),
    //对歌词数据进行分割
    lyric:function() {
      let arr;
      //判断是否拿到歌词数据 拿到则将歌词放在arr数组中
      if(this.lyricList.lyric) {
        //通过split()方法进行切割数据 通过正则进行匹配
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i) => {
          // 获取歌词时间
          let minute = item.slice(1, 3)
          let second = item.slice(4, 6)
          let milliSecond = item.slice(7, 10)
          let lyricData = item.slice(11, item.length) 
          let time = parseInt(minute)*60*1000 + parseInt(second)*1000 + parseInt(milliSecond);

          //判断三个毫秒位置 第三个毫秒位置是否为数值
          if(isNaN(Number(milliSecond))) {
            //[000 000 00]
            //如果不为数值 时间从第七到九位进行切割
            milliSecond = item.slice(7, 9);
            //歌词则从第十位开始切割
            lyricData = item.slice(10, item.length);
            time = parseInt(minute)*60*1000 + parseInt(second)*1000 + parseInt(milliSecond)
          }
          //console.log(minute, second, Number(milliSecond), lyricData);
          return {minute, second, milliSecond, lyricData, time}
        })
        //当前歌曲播放时间与歌词本身下一句的时间进行比较
        arr.forEach((item, i) => {
          //当等于歌词本身最后一句时
          if(i === arr.length-1 || isNaN(arr[i+1].time)) {
            item.pre = 1000000
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      //打印歌词对象 里面包含时间与歌词
      console.log(arr);
      return arr
    }
  },
  mounted() {
    //console.log(this.musicList);
    //console.log(this.lyricList.lyric);
    //调用进度条函数
    this.addDuration()
  },
  //接收数据
  props:['musicList', 'isbtnShow', 'play', 'addDuration'],
  methods:{
    goPlay:function(num) {
      let index = this.playListIndex + num
      if(index < 0) {
        //如果是列表中的第一首歌曲 点击上一首 则返回列表的最后一首歌
        index = this.playList.length-1
      } else if(index == this.playList.lenght) {
        //如果当前歌曲下标等于数组长度 则当前歌曲为列表的最后一首歌
        //再次点击下一首 则回到列表中的第一首
        index = 0
      }
      //将索引传递到updaePlayListIndex()函数中 更新播放歌曲的下标 即实现歌曲切换
      this.updatePlayListIndex(index)
    },

    ...mapMutations(['updateDetailShow', 'updatePlayListIndex'])
  },
  watch: {
    currentTime:function(newValue) {
      let p = document.querySelector("p.active")
      //console.log([p]);

      if(p && p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300
      }

      if(newValue === this.duration) {
        if(this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0)
          this.play()
        } else {
          this.updatePlayListIndex(this.playListIndex + 1)
        }
      //console.log(this.$refs.musicLyric);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bgImg {
  width: 380px;
  height: 690px;
  position: absolute;
  z-index: -1;
  filter: blur(1rem);
}
.detailTop {
  width: 380px;
  height: 1rem;
  display: flex;
  //padding: .2rem;
  //justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .centerMarquee {
      width: 2rem;
      height: 100%;
      margin-left: .4rem;
      align-items: center;
      position: relative;
      left: 80%;
      top: 10px;
      p {
        color:#fff9f2;
        letter-spacing: 2px;
      }
      span{
        color: #999;
        position: relative;
        right: 20%;
      }
      .icon {
        width: .3rem;
        height: .3rem;
      }
    }
  }
  .downArrow {
    margin-top: 5px;
    margin-left: 10px;
  }
  .detailTopRight {
    margin-top: 5px;
    position: relative;
    left: 48%;
  }
}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 42%;
    top: .3rem;
    transform-origin: 0 0;
    transform: rotate(-20deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 42%;
    top: .3rem;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_disc-plus {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 1.8rem;
    z-index: -1;
  }
  .img_picUrl {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 2.74rem;
    animation: rotate_picUrl 15s linear infinite;
  }
  .img_picUrl_active {
    animation-play-state: running;
  }
  .img_picUrl_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_picUrl {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.detailContentLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  overflow: scroll;
  scroll-behavior: smooth;;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: .3rem;
  }
  .active {
    color: greenyellow;
    font-size: .6rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: .2rem;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: .36rem;
      height: .36rem;
      fill: #fff9f2;
    }
    .icon {
      width: .6rem;
      height: .6rem;
    }
  }
  .range {
    width: 100%;
    height: .04rem;
  }
  .footerContent {
    width: 100%;
    height: 1rem;
  }
  .footerBottom {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
  }
}
</style>