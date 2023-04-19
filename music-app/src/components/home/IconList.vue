<!-- 每日推荐组件 -->
<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-RecommendedDiary"></use>
      </svg>
      <span>每日推荐</span>
    </div>

    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-PrivateFM"></use>
      </svg>
      <span>私人FM</span>
    </div>
  
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-PlayList_Index"></use>
      </svg>
      <span>歌单</span>
    </div>
  
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-List_Index"></use>
      </svg>
      <span>排行榜</span>
    </div>
  
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-LiveBroadcast"></use>
      </svg>
      <span>直播</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .iconList {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 0.3rem;
    .iconItem {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 0.7rem;
        height: 1rem;
      }
    }
  }
</style>