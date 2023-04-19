<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon startAll" aria-hidden="true">
          <use xlink:href="#icon-itemMusicList_StartAll"></use>
        </svg>
        <span class="itemMusicStartAll">
          播放全部 <span class="itemMusicCount">({{  itemList.length }})</span>
        </span>
      </div>
      <div class="listRight">
        <svg class="icon downloadMusic" aria-hidden="true">
          <use xlink:href="#icon-itemMusicListDownload"></use>
        </svg>
        <span class="collectionCount">1729</span> 
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-itemMusicList"></use>
        </svg>
      </div>
    </div>

    <!-- 推荐歌曲列表 -->
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemList" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div class="musicName">
            <p>{{ item.name  }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{ item1.name }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon video" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-itemMusicListVideo"></use>
          </svg>
          <svg class="icon more" aria-hidden="true">
            <use xlink:href="#icon-more"></use>
          </svg> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';


//接收推荐歌单中的歌曲数据
export default {
  setup(props){
    console.log(props);
  },
  props:['itemList','subscribedCount'],
  methods:{
    playMusic:function(i) {
      this.updatePlayList(this.itemList)
      this.updatePlayListIndex(i)
    },
    ...mapMutations(['updatePlayList','updatePlayListIndex'])
  }
}
</script>

<style lang="less" scoped>
  
  .itemMusicList {
    margin-top: -.7rem;
  }
    .itemListTop {
      padding-left: .2rem;
      padding-right: .2rem;
      display: flex;
      justify-content: space-between;   
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      background-color: #ebe7e4;
      height: 40px;

        .listLeft {
          position: relative;
          
      
          .startAll {
            position: relative;
            top: 8px;
            width: 20px;
          }
          .itemMusicStartAll {
            font-size: 14px;
            position: relative;
            top: 3px;
            margin-left: 5px;
            letter-spacing: 1px;
          }
          .itemMusicCount {
            color: #989795;
          }
        }
        .listRight {
          position: relative;
          top: 10px;
          .downloadMusic {
            height: 20px;
            position: relative;
            bottom: 5px;
            margin-right: -.3rem;
          }
          .collectionCount {
            position: relative;
            bottom: 60px;
            right: 25px;
            color: #faffff;
            font-size: 10px;
          }
        }
    }
  

  .itemList {
    //background-color: #ffffff;
    width: 100%;
    padding:.2rem;
          .itemLeft {   
            .musicName p {
              font-size: 15px;
              width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .musicName span {
              font-size: 10px;
              width: 200px;
              color: #797979; 
              overflow: hidden;
            }
          }
    
         .leftSpan {
          margin-left: .2rem;
          position: relative;
          bottom: 8px;
          font-size: 10px;
          
         }
         .musicName {
          display: inline-block;
          margin-left: .4rem;
          margin-top: 15pX;
         }
         .item:nth-last-child(1) {
          padding-bottom: 1.6rem;
         }
      }
  .itemRight {
    float: right;
    margin-right: .2rem;
    position: relative;
    bottom: 30px;
    .video {
    position: relative;
    right: .2rem;
    }
    .more {
      height: 30px;
      width: 30px;
    }
  }
</style>