//封装getVant()函数 这样以后要引入组件的时候 就不用main.js中写app.use()拉
import { Swipe, SwipeItem, Button, Popup} from 'vant';

//放入数组中
let plugins = [
  Swipe, SwipeItem, Button, Popup
]

export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}