<template>
  <!-- 首页头部组件 -->
  <div class="topNav">
    <div class="topleft">
      <svg class="icon"
           aria-hidden="true"
           @click="$router.push('/userInfo')">
        <use xlink:href="#icon-list"></use>
      </svg>
    </div>
    <div class="topContent">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topright">
      <svg class="icon"
           aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-IndexSearch"></use>
      </svg>
    </div>
  </div>
</template>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    //align-items: center;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>