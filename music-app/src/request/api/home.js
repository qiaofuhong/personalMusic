//引入axios实例
import service from "..";

//获取首页轮播图数据
export function getBanner() {
    return service({
      method:"GET",
      url:'/banner?type=2',
    })
}

//获取推荐歌单
export function getMusicList() {
  return service({
    method:"GET",
    //通过网易云API获取推荐歌单
    url:"/personalized?limit=10"
  })
}

//搜索歌曲
export function getSearchMusic(data) {
  return service({
    method:"GET",
    url:`/search?keywords=${data}`
  })
}

//登录接口
export function getPhoneLogin(data) {
  return service({
    method:"GET",
    url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}

/* //二维码key生成接口
export function qrCodeLoginKey(timestamp) {
  return Request.get('/login/qr/key?timestamp=' + timestamp)
}


//二维码key生成接口
export function qrCodeLoginImg(key) {
  return Request.get('/login/qr/create?qrimg=true&key=' + key)
}

//二维码检测状态接口
export function qrCodeLoginCheck(key, timestamp) {
  return Request.get('/login/qr/check?key=' + key + '&timestamp=' + timestamp)
} */