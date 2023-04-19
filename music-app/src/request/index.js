//封装axios请求

//引入axios实例
import axios from 'axios'

//创建实例
let service = axios.create({
  //基础路径
  baseURL:'http://localhost:3000',
  //返回时间
  timeout:3000,
  withCredentials: true,
})
//导出实例
export default service