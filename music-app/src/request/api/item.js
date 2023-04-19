//index推荐歌单详情页面接口

//service里面封装了baseurl和timeout 
//封装了axios实例 用来发送请求
import service from "..";

//获取歌单详情页面数据
export function getMusicItemList(data) {
  return service({
    method:"GET",
    //使用模板字符串拿到详情页面id
    url:`/playlist/detail?id=${data}`
  })
}

//获取推荐歌单详情页歌曲列表
export function getMusicDetailItemList(data) {
  return service({
    method:"GET",
    url:`/playlist/track/all?id=${data}&limit=20&offset=0`
  })
}

//获取相应歌曲的歌词
export function getMusicLyric(data) {
  return service({
    method:"GET",
    url:`/lyric?id=${data}`
  })
}