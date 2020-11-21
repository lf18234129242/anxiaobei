<script>
import { loadConfig } from "@/utils/echarts.config";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pictorialBar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

export default {
  name: "line-chart",
  props: {
    legend: {
      // 图例数据
      type: Array,
      default() {
        return [];
      },
    },
    xAxis: {
      // 横轴数据
      type: Array,
      default() {
        return [];
      },
    },
    series: {
      // 图表数据
      type: Array,
      default() {
        return [];
      },
    },
    chartId: {
      type: String,
      default() {
        return 'line-chart'
      }
    },
    hasAreaStyle: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      chart: null,
      loadTimer: null,
    };
  },
  computed: {
    chartOption() {
      let lineStyleColor = ['#246AD3', '#37ABBC']
      let areaStyleColor = {
        0: {
          color1: '#2773E5',
          color2: 'rgba(7,23,85,0.2)'
        },
        1: {
          color1: '#37ABBC',
          color2: 'rgba(7,22,82,0.2)'
        }
      }
      
      let series = this.series.map((v, i) => {
        return {
          name: v.name,
          data: v.data,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: lineStyleColor[i],
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: areaStyleColor[i].color1,
              },
              {
                offset: 1,
                color: areaStyleColor[i].color2,
              },
            ]),
          }
        }
      })

      let series_no_bg = this.series.map((v, i) => {
        return {
          name: v.name,
          data: v.data,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: lineStyleColor[i],
            width: 2,
          }
        }
      })
      // let selected
      // if (this.legend.indexOf('当前人数') > -1) {
      //   selected = {'粉丝团人数': false}
      // }
      let option = {
        legend: {
          data: this.legend,
          textStyle: {
            color: "#D5FDFD",
          },
          y: 15,
          // selected: selected ? selected : ''
        },
        color: ["#50FCFC", "#2773E5"],
        tooltip: {
          trigger: "axis",
          position: 'inside',
          borderColor: "rgba(21,49,127,1)",
          backgroundColor: "rgba(13,41,103,0.47)",
        },
        grid: {
          x: 60,
          y: 50,
          x2: 20,
          y2: 30
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxis,
          axisLabel: {
            textStyle: {
              color: "#D5FDFD",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: "#112251",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#D5FDFD",
            },
          },
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: this.hasAreaStyle ? series : series_no_bg,
      };
      return option;
    },
  },
  watch: {
    series: {
      deep: true,
      immediate: true,
      handler(n) {
        if (n) {
          if (this.chart) {
            this.$nextTick(() => {
              const hasOption = this.chart.getOption()
              if (hasOption) {
                this.chart.clear()
              }
              this.initChartIns()
            })
          }
        }
      }
    }
  },
  render() {
    return <div id={this.chartId} class="line-chart-wrapper" />;
  },
  mounted() {
    this.$nextTick(() => {
      this.initChartIns();
    });
  },
  methods: {
    initChartIns() {
      const wait = 1000;
      const elem = document.getElementById(this.chartId);

      this.chart = echarts.init(elem);
      this.chart.showLoading(loadConfig);

      this.chart.setOption(this.chartOption);
      this.chart.hideLoading();

      if (this.loadTimer) {
        clearTimeout(this.loadTimer);
      }

      this.loadTimer = setTimeout(() => {
        this.chart.hideLoading();
      }, wait);
    },
  },
};
</script>

<style lang="stylus" scoped>
.line-chart-wrapper {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>