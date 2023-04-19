//移动端窗口适配
function remSize() {
    //获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (deviceWidth >= 750) {
        deviceWidth = 750;
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320;
    }

    //750px的时候 1rem = 100px
    //375px的时候 1rem = 50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'

    // 设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + "rem"
}

//调用函数
remSize();
//窗口大小变动时 调用函数
window.onresize = function() {
    remSize();
}