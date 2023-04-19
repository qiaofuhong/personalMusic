import { createStore } from 'vuex'
//引入获取歌词的函数
import { getMusicLyric } from "@/request/api/item.js"
//引入登录函数
import { getPhoneLogin } from "@/request/api/home.js"

export default createStore({
  state: {
    playList:[{
      //为播放列表添加默认值
      //album为专辑里面的数据
      al:{
        /* id: 16949,
        name: "素颜",
        pic: 109951164179134670,
        picUrl: "https://p2.music.126.net/LMyITvYRS7NsgA9lYUKpqg==/109951164179134667.jpg",
        pic_str: "109951164179134667" */
        id: 15338,
        name: "讲不出再见",
        picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
        pic_str: "109951165566447762"
      },
      
        name: "讲不出再见",
      //所需要播放歌曲的id
      /* id:167827 */
        id:152392
    }],
    //默认的下标为零
    playListIndex:0,
    //暂停按钮的显示
    isbtnShow:true,
    //歌曲详情页显示(歌词)
    detailShow:false,
    //歌词
    lyricList:{},
    //当前歌曲播放时间
    currentTime:0,
    //用户是否登录
    isLogin:false,
    //是否显示底部组件
    isFooterMusic:true,
  },
  getters: {
  },
  mutations: {
    //操作播放 暂停按钮显示的方法
    updateIsbtnShow:function(state,value) {
      state.isbtnShow = value
    },
    //搜索歌曲添加播放列表方法
    pushPlayList: function (state, value) {
      state.playList.push(value)
    },
    //添加推荐歌单数据 实现更新歌曲功能
    updatePlayList:function(state,value) {
      state.playList = value
      console.log(state.playList);
    },
    //更换推荐歌单数组下标 实现切换歌曲功能
    updatePlayListIndex:function(state,value) {
      state.playListIndex = value;
    },
    //展示歌曲详情页方法
    updateDetailShow:function(state) {
      state.detailShow =! state.detailShow
    },
    //更新歌词方法
    updateLyricList:function(state, value) {
      state.lyricList = value
    },
    //更新歌曲播放的时间
    updateCurrentTime:function(state, value) {
      //console.log(state.currentTime);
      state.currentTime = value
    },
    //获取歌曲总时长
    updateDuration:function(state,value) {
      state.duration = value
    }
  },
  actions: {
    //异步请求在actions里面获取
    getLyric:async function(context,value) {
      let res = await getMusicLyric(value)
      //console.log(res);
      //提交歌词数据
      context.commit("updateLyricList", res.data.lrc)
    },
    //异步获取登录时用户的号码 密码数据
    getLogin:async function(context,value) {
      let res1 = await getPhoneLogin(value)
      console.log(res1)
    }
  },
  modules: {
  }
})
