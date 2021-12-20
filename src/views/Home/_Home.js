// @vue/component

import loadBMap from "../../utils/headMapBaidu";
import locale from "element-ui/src/mixins/locale";

export default {
    inject: ['reload'],
    name: 'Home',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            user: JSON.parse(window.sessionStorage.getItem('user')),
            myClockChart: '',
            index_y: null,
            whetherShowEcharts: false
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
        if (this.$router.currentRoute.path=='/home') {
            this.myClock();
            this.myPieChart();
            loadBMap().then(() => {
                this.myHeatMap();
            });
            this.drawLine();
        }
        window.onbeforeunload = e => {      //刷新时弹出提示s
            this.myClockChart.value.clear();
            return ''
        };
    },
    methods: {
        goToHome() {
            this.$router.replace('/home');
            this.whetherShowEcharts=true;
            location.reload();
            // this.reload();
        },
        // this.initMenu();
        myClock(myChart) {
            var myChart = this.$echarts.init(this.$refs.myClockRef);

            var option;
            option = {
                series: [
                    {
                        name: 'hour',
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        min: 0,
                        max: 12,
                        splitNumber: 12,
                        clockwise: true,
                        axisLine: {
                            lineStyle: {
                                width: 15,
                                color: [[1, 'rgba(0,0,0,0.7)']],
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 15
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 3,
                                shadowOffsetX: 1,
                                shadowOffsetY: 2
                            }
                        },
                        axisLabel: {
                            fontSize: 20,
                            distance: 25,
                            formatter: function (value) {
                                if (value === 0) {
                                    return '';
                                }
                                return value + '';
                            }
                        },
                        anchor: {
                            show: true,
                            icon: 'path://M532.8,70.8C532.8,70.8,532.8,70.8,532.8,70.8L532.8,70.8C532.7,70.8,532.8,70.8,532.8,70.8z M456.1,49.6c-2.2-6.2-8.1-10.6-15-10.6h-37.5v10.6h37.5l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3v0h-22.5c-1.5,0.1-3,0.4-4.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.8c-0.6,1.7-0.9,3.4-0.9,5.3v16h10.6v-16l0,0l0,0c0-2.7,2.1-5,4.7-5.3h10.3l10.4,21.2h11.8l-10.4-21.2h0c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3C457,53,456.7,51.2,456.1,49.6z M388.9,92.1h11.3L381,39h-3.6h-11.3L346.8,92v0h11.3l3.9-10.7h7.3h7.7l3.9-10.6h-7.7h-7.3l7.7-21.2v0L388.9,92.1z M301,38.9h-10.6v53.1H301V70.8h28.4l3.7-10.6H301V38.9zM333.2,38.9v10.6v10.7v31.9h10.6V38.9H333.2z M249.5,81.4L249.5,81.4L249.5,81.4c-2.9,0-5.3-2.4-5.3-5.3h0V54.9h0l0,0c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.9-10.6h-37.5c-1.9,0-3.6,0.3-5.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.7c-0.6,1.7-0.9,3.5-0.9,5.3l0,0v21.3c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.5,0.9,5.3,0.9h33.6l3.9-10.6H249.5z M176.8,38.9v10.6h49.6l3.9-10.6H176.8z M192.7,81.4L192.7,81.4L192.7,81.4c-2.9,0-5.3-2.4-5.3-5.3l0,0v-5.3h38.9l3.9-10.6h-53.4v10.6v5.3l0,0c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.4,0.9,5.3,0.9h23.4h10.2l3.9-10.6l0,0H192.7z M460.1,38.9v10.6h21.4v42.5h10.6V49.6h17.5l3.8-10.6H460.1z M541.6,68.2c-0.2,0.1-0.4,0.3-0.7,0.4C541.1,68.4,541.4,68.3,541.6,68.2L541.6,68.2z M554.3,60.2h-21.6v0l0,0c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.8-10.6h-37.5l0,0c-6.9,0-12.8,4.4-15,10.6c-0.6,1.7-0.9,3.5-0.9,5.3c0,1.9,0.3,3.7,0.9,5.3c2.2,6.2,8.1,10.6,15,10.6h21.6l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3l0,0h-37.5v10.6h37.5c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3c0-1.9-0.3-3.7-0.9-5.3C567.2,64.6,561.3,60.2,554.3,60.2z',
                            showAbove: false,
                            offsetCenter: [0, '-35%'],
                            size: 120,
                            keepAspect: true,
                            itemStyle: {
                                color: '#707177'
                            }
                        },
                        pointer: {
                            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                            width: 12,
                            length: '55%',
                            offsetCenter: [0, '8%'],
                            itemStyle: {
                                color: '#C0911F',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        detail: {
                            show: false
                        },
                        title: {
                            offsetCenter: [0, '30%']
                        },
                        data: [
                            {
                                value: 0
                            }
                        ]
                    },
                    {
                        name: 'minute',
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        min: 0,
                        max: 60,
                        clockwise: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                            width: 8,
                            length: '70%',
                            offsetCenter: [0, '8%'],
                            itemStyle: {
                                color: '#C0911F',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        anchor: {
                            show: true,
                            size: 20,
                            showAbove: false,
                            itemStyle: {
                                borderWidth: 15,
                                borderColor: '#C0911F',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        detail: {
                            show: false
                        },
                        title: {
                            offsetCenter: ['0%', '-40%']
                        },
                        data: [
                            {
                                value: 0
                            }
                        ]
                    },
                    {
                        name: 'second',
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        min: 0,
                        max: 60,
                        animationEasingUpdate: 'bounceOut',
                        clockwise: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                            width: 4,
                            length: '85%',
                            offsetCenter: [0, '8%'],
                            itemStyle: {
                                color: '#C0911F',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        anchor: {
                            show: true,
                            size: 15,
                            showAbove: true,
                            itemStyle: {
                                color: '#C0911F',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        detail: {
                            show: false
                        },
                        title: {
                            offsetCenter: ['0%', '-40%']
                        },
                        data: [
                            {
                                value: 0
                            }
                        ]
                    }
                ]
            };
            setInterval(function () {
                var date = new Date();
                var second = date.getSeconds();
                var minute = date.getMinutes() + second / 60;
                var hour = (date.getHours() % 12) + minute / 60;
                option.animationDurationUpdate = 300;
                myChart.setOption({
                    series: [
                        {
                            name: 'hour',
                            animation: hour !== 0,
                            data: [{value: hour}]
                        },
                        {
                            name: 'minute',
                            animation: minute !== 0,
                            data: [{value: minute}]
                        },
                        {
                            animation: second !== 0,
                            name: 'second',
                            data: [{value: second}]
                        }
                    ]
                });
            }, 1000);
            option && myChart.setOption(option, true);
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('myChart'));
            const colors = ['#5470C6', '#EE6666'];
            var option;
            option = {
                color: colors,
                tooltip: {
                    trigger: 'none',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {},
                grid: {
                    top: 70,
                    bottom: 50
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return (
                                            'Precipitation  ' +
                                            params.value +
                                            (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                                    );
                                }
                            }
                        },
                        // prettier-ignore
                        data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
                    },
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return (
                                            'Precipitation  ' +
                                            params.value +
                                            (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                                    );
                                }
                            }
                        },
                        // prettier-ignore
                        data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Precipitation(2015)',
                        type: 'line',
                        xAxisIndex: 1,
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                        ]
                    },
                    {
                        name: 'Precipitation(2016)',
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [
                            3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
                        ]
                    }
                ]
            };
            option && myChart.setOption(option);
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
            option && eChartsType.setOption(option, true);
        },
        //热力图
        myHeatMap() {
            var app = {}, option;

            // var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
            var myChart = this.$echarts.init(document.getElementById('myHeatMap'));
            this.getRequestNoJson('/api/data/asset/data/hangzhou-tracks.json').then(data => {
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
                            query: {
                                maxWidth: 500               // 当容器宽度小于 500 时。
                            },
                            itemStyle: {
                                // 普通样式。
                                normal: {
                                    // 点的颜色。
                                    color: 'red',
                                    width: 500,
                                    height: 4000
                                },
                                // 高亮样式。
                                emphasis: {
                                    // 高亮时点的颜色。
                                    color: 'blue'
                                }
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
                                    pointSize: 10,
                                    blurSize: 10
                                }
                            ]
                        })
                );
                // 添加百度地图插件
                var bmap = myChart.getModel().getComponent('bmap').getBMap();
                bmap.addControl(new BMap.MapTypeControl());
            });
            if (option && typeof option === 'object') {
                myChart.setOption(option, true);
            }
        }
    }
}
