<template>
  <div class="searchTop">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-leftArrow1"></use>
      </svg>
    </div>

    <div class="topCenter">
      <!-- 通过v-model绑定数据 -->
     <input type="text" placeholder="emoMusic" v-model="searchKey" @keydown.enter="enterKey">
    </div>

    <div class="topRight"></div>
  </div>

  <div class="searchContent"></div>

  <div class="searchFooter">
    <div class="searchHistory">
      <span class="searchSpan">搜索历史</span>
        <span class="historySpan" v-for="item in keyWordList" :key="item" @click="clickSearchHistory(item)">
          {{ item }}
        </span>
     </div>

     <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="updateIndex(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div class="musicName">
            <p>{{ item.name  }}</p>
            <span v-for="(item1, index) in item.artists" :key="index">{{ item1.name }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="iconVideo" aria-hidden="true" v-if="item.mvid != 0">
            <use xlink:href="#icon-itemMusicListVideo"></use>
          </svg>
          <svg class="iconMore" aria-hidden="true">
            <use xlink:href="#icon-more"></use>
          </svg> 
        </div>
      </div>
    </div>

      <svg class="iconDelete" aria-hidden="true" @click="deleteHistory">
        <use xlink:href="#icon-delete"></use>
      </svg>
  </div>
</template>

<script>
//引入搜索歌曲函数
import { getSearchMusic } from "@/request/api/home.js"

export default {
  data() {
    return {
      //搜索历史存放在数组里面
      keyWordList:[],
      //通过这个变量把搜索历史添加到keyWordList中
      searchKey: "",
      //创建搜索列表用于接收搜索数据
      searchList:[],
    }
  },
  mounted(){
    //渲染时让搜索历史等于localStorage里面的值 实现搜索历史保存
    this.keyWordList = JSON.parse(localStorage.getItem('keyWordList') || '[]')
  },
  methods: {
    //通过enterKey函数把搜索框输入的内容保存在keyWordList
    enterKey:async function() {
      if(this.searchKey !== "") {
        //通过unshift方法把searchKey添加到keyWordList前面
        this.keyWordList.unshift(this.searchKey)
        //搜索历史去重
        this.keyWordList = [...new Set(this.keyWordList)]
        // 搜索长度限制
        if(this.keyWordList.length > 4) {
          this.keyWordList.pop()
        }
        //把搜索历史保存在localStorage
        localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
        //使用搜索歌曲函数
        let res = await getSearchMusic(this.searchKey)
        console.log(res);
        this.searchList = res.data.result.songs
        //按下回车清空输入框内容
        this.searchKey = ""
      }
    },
    //删除搜索历史
    deleteHistory: function() {
      localStorage.removeItem("keyWordList")
      this.keyWordList = []
    },
    //点击搜索函数
    clickSearchHistory:async function (item) {
      let res = await getSearchMusic(item)
      console.log(res);
      this.searchList = res.data.result.songs
    },
    //搜索歌曲添加到播放列表方法
    updateIndex: function (item) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      //修改state的值
      this.$store.commit("pushPlayList", item)
      //更新播放列表 将搜索的歌曲添加到播放列表的最后
      this.$store.commit("updatePlayListIndex", this.$store.state.playList.length-1)
    },
  }
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height:1rem ;
  margin-top: .1rem;
  padding: 0 .2rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  input {
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 95%;
    padding: .1rem;
  }
}
.searchFooter {
  position: relative;
  .searchHistory{
    width: 100%;
    padding: .1rem;
    .searchSpan {
      font-size: .2rem;
      position: relative;
      top: -.4rem;
    }
    .historySpan {
      padding: .1rem .1rem;
      background-color: rgb(185, 169, 169);
      border-radius: .2rem;
      margin: .1rem .1rem;
      position: relative;
      top: .2rem;
      display: inline-block;
    }
  }
  .iconDelete{
    width: .5rem;
    height: .5rem;
    position: absolute;
    right: .2rem;
    top: .4rem;
  }
}

.itemList {
         //background-color: #ffffff;
    width: 100%;
    .item {
      width: 100%;
      height: 1.2rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
         .itemLeft {   
          width: 85%;
          height: 100%;
          display: flex;
          align-items: center;
          .leftSpan {
            margin-left: .2rem;
            display: inline-block;
            width: .2rem;
            text-align: center;
         }
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
        }
         .musicName {
          display: inline-block;
          margin-left: .4rem;
          margin-top: 15pX;
         }
         .item:nth-last-child(1) {
          padding-bottom: 1.3rem;
         }
         .itemRight {
          .iconVideo {
            box-sizing: border-box;
            margin-right: 5px;
            width: .5rem;
            height: .5rem;
          }
          .iconMore {
            width: .5rem;
            height: .5rem;
          }
         }
      }
</style>