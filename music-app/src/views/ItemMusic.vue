<!-- 创建跳转推荐歌单页面 -->
<template>
  <!-- 渲染子组件 -->
  <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
  <ItemMusicList :itemList="state.itemList"
                 :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
</template>

<script>
//路由跳转 拿到参数

import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
//引入推荐歌单详情页面接口
import { getMusicItemList, getMusicDetailItemList } from '@/request/api/item.js'
//引入推荐歌单详情页组件
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
//引入推荐歌单详情页播放列表
import ItemMusicList from '@/components/item/ItemMusicList.vue'

export default {
  setup () {
    const state = reactive({
      //歌单详情页数据
      playlist: {},
      //歌单里面的歌曲
      itemList: []
    });

    onMounted(async () => {
      //拿到推荐歌单页面的id
      let id = useRoute().query.id
      console.log(id);
      //获取歌单详情
      let res = await getMusicItemList(id);
      console.log(res);

      state.playlist = res.data.playlist
      //获取歌单的歌曲
      let result = await getMusicDetailItemList(id);
      console.log(result);
      state.itemList = result.data.songs

      //防止页面刷新数据丢失 将数据保存到sessionStorage中
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    });

    //返回数据
    return { state }
  },

  //引入子组件
  components: {
    ItemMusicTop,
    ItemMusicList
  }
};
</script>