<!-- 推荐歌单详情页面组件 -->
<template>
  <!-- 推荐详情页顶部 -->
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg">
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)" style="position: relative;top: .23rem;left: .2rem;width: 30px;height: 30px;">
        <use xlink:href="#icon-leftArrow"></use>
      </svg>
      <span style="font-size: .4rem; color: #faffff;position: relative;top:.1rem;left: .5rem;">歌单</span>
    </div>

    <div class="itemRight">
      <svg class="icon" aria-hidden="true" style="position: relative;top: .23rem;right: .4rem;width: 25px;height: 25px;">
        <use xlink:href="#icon-search"></use>
      </svg>
<!--       <img class="icon" src="@/images/more.png" alt="">
 -->    
      <div class="more">...</div>
    </div>
  </div>

  <!-- 推荐详情页中部 -->
  <div class="itemMusicMiddle">
    <div class="middleLeft">
      <img :src="playlist.coverImgUrl" alt="">
      <span class="playCount">
            <svg class="icon" aria-hidden="true" style="position: relative; bottom: 2.45rem;left: 1.22rem;width: 15px;height: 15px;">
              <use xlink:href="#icon-playCount"></use>
            </svg>
            <!-- 传递播放量格式化参数 -->
            <span style="position: relative;bottom: 2.5rem;left: 1.2rem;font-size:2px;">{{ changeCount(playlist.playCount) }}</span>
      </span>
    </div>

    <div class="middleRight">
      <div class="name">{{ playlist.name }}</div>
      <div class="description">{{ playlist.description }}</div>
    </div>
  </div>

  <!-- 推荐详情页底部 -->
  <div class="itemMusicBottom">
    <div class="BottomLeft">
      <svg class="icon" aria-hidden="true" style="position: relative;left: 30%;width: 30px;height: 30px;">
        <use xlink:href="#icon-share"></use>
      </svg>
    </div>
    <div class="BottomCenter">
      <svg class="icon" aria-hidden="true" style="position: relative;left: 30%;width: 30px;height: 30px;">
        <use xlink:href="#icon-comments"></use>
      </svg>
    </div>
    <div class="BottomRight">
      <svg class="icon" aria-hidden="true" style="position: relative;left: 25%;top:18%;width: 20px;height: 20px;">
        <use xlink:href="#icon-itemMusicCollection"></use>
      </svg>
     <!--  <span class="collectionCount">bo{{  subscribedCount }}</span>  -->
    </div>
  </div>
</template>

<script>


//子组件接收数据
export default {
  setup(props) {
    //console.log(props);
    //之前通过props进行传值 判断如果数据拿不到 就获取sessionStorage中的数据
    if((props.playlist.creator="")) {
      props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
    }

    function changeCount(num) {
        if(num >= 100000000) {
          return (num / 100000000).toFixed(1) + "亿";
        } else if (num >= 10000) {
          return (num / 10000).toFixed(0) + "万";
        }
      }

      return { changeCount }
  },
  props:['playlist']
}

</script>

<style lang="less" scoped>
//scoped声明 让样式只应用与当前页面
body {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;

}

.itemMusicTop {
  width: 380px;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //padding: .2rem;
  position: relative;
   .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .2rem;  //(上下 左右)
  
   /*  .icon {
      //fill: #fff; //填充颜色
    } */
    .more {
        writing-mode: vertical-lr;
        font-size: .6rem;
        font-weight: 500;
        padding: 0.1rem;
        color: #faffff;
        margin-right: -0.3rem;
        margin-top: .11rem;
        position: relative;
        top: .2rem;
        right: -.1rem;
      }
  }
  .bgimg {
    width: 380px;
    height: 676px;
    position: fixed;
    z-index: -1;
    filter:blur(1rem);
  }
}

.itemMusicMiddle {
  width: 380px;
  height: 5rem;
  //background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;

  .middleLeft {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0 1.5rem .2rem;  //下 右 上 左 从底部逆时针排序
   img {
    height: 100%;
    width: 100%;
    border-radius: 0.16rem;
   }
   .playCount {
      color: #faffff;
   }

  }
  .middleRight {
    width: 200px;
    height: 2.5rem;
    margin: 0 .2rem 1.5rem 0;
    
    .name {
      color: #faffff;
      font-size: 0.3rem;
      text-indent: 0.4rem;
      letter-spacing: 0.04rem;
    }
    .description {
      color: #ccc;
      font-size: 0.1rem;
      margin-top: 20px;
      letter-spacing: 0.02rem;
      text-indent: 0.4rem;
      overflow: hidden;
      //white-space: nowrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}

.itemMusicBottom {
  width: 380px;
  height: 20px;
  display: flex;
  margin: auto;
    .BottomLeft {
      width: 80px;
      height: 30px;
      background-color: #faffff;
      border-radius: 8px;    
      opacity: 0.6;
      position: relative;
      bottom: 60px;
      left: 45px;
    }
    .BottomCenter {
      width: 80px;
      height: 30px;
      background-color: #faffff;
      border-radius: 8px;
      opacity: 0.6;
      position: relative;
      bottom: 60px;
      left: 65px;
    }
    .BottomRight {
      width: 80px;
      height: 30px;
      background-color: #fe3444;
      border-radius: 8px;
      opacity: 1;
      position: relative;
      bottom: 60px;
      left: 85px;
    }
}
</style>