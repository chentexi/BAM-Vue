// @vue/component
import {initMenu} from "@/utils/menus";

export default {
    name: 'Home',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            user: JSON.parse(window.sessionStorage.getItem('user'))
        }
    },

    computed: {
        routes() {
            return this.$store.state.routes;
        }
    },

    watch: {},

    created() {
    },
    mounted() {
        this.myPieChart();
        this.myHeatMap();
        this.drawLine();
    },
    methods: {
        // this.initMenu();
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                //提示框组件，专门配置提示框的。
                tooltip: {
                    trigger: 'axis',
                    // 坐标轴指示器配置项。
                    axisPointer: {
                        type: 'cross', //指示器样试
                    }
                },
                //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                toolbox: {
                    feature: {
                        // 动态类型切换,切换图表
                        magicType: {
                            type: ['line', 'bar',]
                        },
                        //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                        dataView: {
                            show: true,  //是否显示 数据示图
                            readOnly: false, //是否 直接可以编辑数据。
                        },
                        //保存为图片的配置
                        saveAsImage: {
                            show: true
                        },
                        //配置项还原
                        restore: {show: true},
                    }
                },
                //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
                legend: {
                    data: ['实体查阅', '电子查阅'] //对应的是name
                },
                //配置X轴
                xAxis: {
                    //坐标轴类型
                    type: 'category',
                    //配置类目名称。 可以逐一设置，具体看文档
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    //配置 鼠标移入时显示的 阴影指示器'line' 直线指示器 'shadow' 阴影指示,器  'none' 无指示器
                    axisPointer: {
                        show: true, //show 必须写，开关的作用
                        type: 'shadow'
                    }
                },
                //配置Y轴
                yAxis: [
                    {
                        type: 'value', //坐标轴类型
                        name: '实体查阅', //名称
                        min: 0, //最小值
                        max: 100, //最大值
                        interval: 10, //列数
                        axisLabel: {  //坐标轴刻度标签的相关设置。
                            formatter: '{value}人'  //字符串模板
                        }
                    },
                ],
                //系列列表。每个系列通过 type 决定自己的图表类型,一个对象表示一个列表
                series: [
                    {
                        name: '实体查阅',
                        type: 'bar',
                        data: [15, 25, 40, 20, 20, 22, 23, 44, 42, 25, 32, 45],
                        itemStyle: { //图形的颜色。默认指向全局的option.color
                            color: '#F60'
                        }
                    },
                    {
                        name: '电子查阅',
                        type: 'line',
                        data: [45, 54, 66, 50, 40, 32, 43, 76, 65, 55, 87, 75]
                    }
                ],
                //图表的颜色
                color: ['#CCC', '#AFA', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
            });
            //鼠标事件
            myChart.on('click', function (params) {
                console.log(params)
            })
        },
        // 饼状图
        myPieChart() {
            var eChartsType = this.$echarts.init(document.getElementById("myPieChart"));
            var option;
            option = {
                title: {
                    text: '饼状图',
                    subtext: '数据',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {value: 1048, name: '搜索引擎'},
                            {value: 735, name: '直销'},
                            {value: 580, name: '邮箱'},
                            {value: 484, name: '联盟广告'},
                            {value: 300, name: '视频广告'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            option && eChartsType.setOption(option);
        },
        //热力图
        myHeatMap() {
            var app = {}, option;

            // var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
            var myChart = this.$echarts.init(document.getElementById('myHeatMap'));
            this.getRequest('/api/data/asset/data/hangzhou-tracks.json').then(data=> {
                var points = [].concat.apply(
                    [],
                    data.map(function (track) {
                        return track.map(function (seg) {
                            return seg.coord.concat([1]);
                        });
                    })
                );
                myChart.setOption(
                    (option = {
                        animation: false,
                        bmap: {
                            center: [120.13066322374, 30.240018034923],
                            zoom: 14,
                            roam: true
                        },
                        visualMap: {
                            show: false,
                            top: 'top',
                            min: 0,
                            max: 5,
                            seriesIndex: 0,
                            calculable: true,
                            inRange: {
                                color: ['blue', 'blue', 'green', 'yellow', 'red']
                            }
                        },
                        series: [
                            {
                                type: 'heatmap',
                                coordinateSystem: 'bmap',
                                data: points,
                                pointSize: 5,
                                blurSize: 6
                            }
                        ]
                    })
                );
                // 添加百度地图插件
                var bmap = myChart.getModel().getComponent('bmap').getBMap();
                bmap.addControl(new BMap.MapTypeControl());
            });
            option && myChart.setOption(option);
        }
    }
}
