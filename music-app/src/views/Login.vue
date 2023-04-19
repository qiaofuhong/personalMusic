<template>
  <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
    <use xlink:href="#icon-leftArrow1"></use>
  </svg>

  <p class="Singer">SingerInformation</p>
  <div id="main" style="width: 350px; height: 400px"></div>
  <div class="echart" id="mychart"></div>

</template>
<script>
import * as echarts from 'echarts'

export default {
  name: "",
  data() {
    return {
      //饼状图数据
      charts: "",
      opinion: ["林志炫", "许嵩", "张信哲"],
      opinionData: [
        //渲染登录与未登录人员数量
        { value: 123, name: "许嵩" },
        { value: 34, name: "林志炫" },
        { value: 35, name: "张信哲" },
      ],

      //柱状图数据
      xData: ["许嵩", "张信哲", "林志炫", "周杰伦", "郁可唯", "莫文蔚"], //横坐标
      yData: [25, 12, 18, 20, 10, 8], //数据
  };
},
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: this.opinion,
        },
        series: [
          {
            type: "pie",
            name: "歌手",
            
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {       
                show: false,
                position: "center",
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "40",
                  fontWeight: "blod",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.opinionData,
          },
        ],
      });
    },

    //柱状图函数
    initEcharts() {
      //基本柱状图
      const option = {
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [
          {
            //形状为柱状图
            type: "bar",
            data:this.yData,
            itemStyle: {
              color: function (params) {
                        var colorList = [  ['#5498ff', '#89d3f6'],['#0acd81', '#b7f5bf'], ['#ff9137', '#ffd59a'], ['#f97878', '#ffafaf'] ];
                        var index = params.dataIndex;
                        if (params.dataIndex >= colorList.length) {
                            index = params.dataIndex - colorList.length;
                        }
                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: colorList[index][0] }, { offset: 1, color: colorList[index][1] } ]);
              },
              barBorderRadius:[60,60,0,0]
            },
            emphasis: {
              label: {
                show: true,
                position:'top',
                textStyle: {
                  fontSize: '14px',
                }
              },
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"))
      //加载数据
      myChart.setOption(option)

      //自适应调节大小
      window.addEventListener("resize", () => {
        myChart.resize()
      })
    }
  },
  //调用
  mounted() {
    this.$nextTick(function () {
      this.drawPie("main");
    });

    this.initEcharts();
  },
};
</script>

<style scoped>
/* * {
  margin: 0;
  padding: 0;
  list-style: none;
} */
#main {
  position: relative;
  top: 20px;
  left: 20px;
}
p {
  text-align: center;
  font-size: 15px;
  letter-spacing: 2px;
}
p::first-letter {
  color: rgb(163, 54, 54);
  font-size: 20px;
}
.icon {
  width: .5rem;
  height: .5rem;
  margin-left: 10px;
  margin-top: 5px;
}

.echart {
  float: left;
  width: 100%;
  height: 400px;
}
</style>