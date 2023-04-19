<template>
  <div class="FooterMusic">
    <!-- 渲染播放歌曲的数据 -->
    <div class="footerLeft" @click="updateDetailShow">
      <svg class="icon bgRecord" aria-hidden="true">
        <use xlink:href="#icon-bgRecord"></use>
      </svg>
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div class="songBox">
        <p>{{ playList[playListIndex].name }}</p>
<!--         <span>- {{ playList[playListIndex].ar.name }}</span> 
 -->        <!-- <span>横划切换歌曲</span> -->
         <span v-for="item in playList[playListIndex].ar" :key="item"> - {{ item.name }}</span>
      </div>
    </div>

    <div class="footerRight">
      <svg class="icon footerMusicStart" aria-hidden="true" @click="play" v-if="isbtnShow" >
        <use xlink:href="#icon-fixedStart" style="width: .6rem;height: .6rem;"></use>
      </svg>
      <svg class="icon footerMusicStop" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-fixedStop"></use>
      </svg>
      <svg class="icon footerMusicList" aria-hidden="true" @click="changeMultiple">
        <use xlink:href="#icon-fixedSongList"></use>
      </svg>
    </div>
    <audio 
      ref="audio"
      type="range"
      @input="onChange"
      @change="onChange"
      min="0"
      max="360"
      value="0"
      preload="auto"
    
      :src=" `https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`">
    </audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{height: '100%',width:'100%'}">
        <!-- 使用歌曲详情页组件 -->
        <!-- 通过props给MusicDetail传值 让详情页也获取进度条 -->
        <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
  /* 引入辅助函数 */
import { mapMutations, mapState} from 'vuex'
//引入歌曲详情页组件
import MusicDetail from '@/components/item/MusicDetail.vue'

  export default {
    data(){
      return{
        //计时器
        interVal:0,
        //倍速播放区间
        multipleArray: [0.75, 1, 1.5, 2],
        //初始化倍速播放
        multipleIndex: 1,
        //是否拖动进度条
        isChange: false,
        currentTime: '00:00:00',
        audioType: false
      }
    },

    computed: {
      /* 使用辅助函数进行解构 */
      ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow']),
    },
    mounted() {
      console.log(this.$refs);
      //渲染时也要获取歌词数据
      this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
      //点击歌词显示 同样需要调用定时器
      //this.updateTime()
    },
    updated(){
      //footerMusic更新时获取歌词数据
      this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
      //更新歌曲播放时间
      this.addDuration()
    },

    props:['musicList'],

    methods: {
      //音乐播放暂停方法
      play: function () {
        //paused属性表示当前歌曲是否播放
        //paused为真 说明当前歌曲处于暂停状态 点击即为播放
        if (this.$refs.audio.paused) {
          this.$refs.audio.play();
          this.updateIsbtnShow(false)
          //处于播放状态则启动定时器
          this.updateTime()
        } else {
          this.$refs.audio.pause();
          //是否处于暂停状态
          this.updateIsbtnShow(true)
          //处于暂停状态则清除这个定时器
          clearInterval(this.interVal)
        }
      },
      //获取歌曲总时长
      addDuration:function() {
        this.updateDuration(this.$refs.audio.duration)
      },
      //更新歌曲播放时间
      //创建一个定时器
      updateTime:function() {
        this.interVal = setInterval(() => {
          this.updateCurrentTime(this.$refs.audio.currentTime)
        },10)
      },

      //倍速播放函数
      changeMultiple() {
        if(this.multipleIndex < 3) {
          this.multipleIndex++
        } else {
          this.multipleIndex = 0
        }
        let audioPlayer = document.querySelector("audio")
        audioPlayer.playbackRate = this.multipleArray[this.multipleIndex]
      },

      //拖拽进度条
      onChange() {
        let type = document.querySelector("audio")
        if(type) {
          document.querySelector("audio").play()
        } else {
          document.querySelector("audio").pause()
        }

      },
      //解构函数
      ...mapMutations(['updateIsbtnShow','updateDetailShow', 'updateCurrentTime', 'updateDuration'])
    },
    //监听数组下标是否更改 如果下标改变则自动播放音乐
    watch:{
      playListIndex:function() {
        this.$refs.audio.autoplay = true;

        //判断是否处于播放状态 如果是则更换为暂停图标
        if(this.$refs.audio.paused) {
          this.updateIsbtnShow(false)
        }
      },
      playList:function() {
        //默认下标0与推荐歌单下表相同时 点击推荐歌单[0]正常播放函数
        if(this.isbtnShow) {
          this.$refs.audio.autoplay = true;
        }
        if(this.$refs.audio.paused) {
          this.updateIsbtnShow(false)
        }
      } 
    },
    //注册歌曲详情页组件
    components:{
      MusicDetail
    }
  }
</script>


<style lang="less" scoped>
  .FooterMusic {

    width: 7.5rem;
    height: 1.2rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: .1px solid #999;
    display: flex;
    /* padding: .2rem; */
   /*  justify-content: space-between; */

    .footerLeft {
      width: 60%;
      height: 100%;
      display: flex;
      /* justify-content: space-around; */
      align-items: center;
      .bgRecord {
        width: 1.2rem;
        height: 1.2rem;
        position: relative;
        left: .5rem;
      }
      img {
        height: .8rem;
        width: .8rem;
        border-radius: 50%;
        position: relative;
        left: -11%;
      }
      .songBox {
        display: flex;
        position: relative;
        left: -.1rem;
        p {
          font-size: 12px;
        }
        span {
          font-size: 10px;
          margin-left: 5px;
          color: #8b8c91;
        }
      }
    }

    .footerRight {
      width: 30%;
      height: 100%;
      display: flex;
      /* justify-content: space-between; */
      align-items: center;

      .icon {
        width: .5rem;
        height: .5rem;
        position: relative;
        left: 1.2rem;
        margin-right: .4rem;
      }
    }
  }
</style>