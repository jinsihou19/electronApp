"use strict";
var echarts = require('echarts');
require('../lib/dark.js');

var os = require('os');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'), 'dark');

// 指定图表的配置项和数据
var option = {
    title: {
        text: '内存状态'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c}%"
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    series: [
        {
            type: 'gauge',
            detail: {
                formatter: '{value}%\n' + (os.freemem() / 1024 / 1024).toFixed(2) + 'M',
                textStyle: {
                    fontSize: 15
                }
            },
            pointer: {//指针
                width: 5
            },
            splitLine: {//刻度盘分割线
                show: false
            },
            axisTick: {//刻度线
                show: false
            },
            data: [
                {value: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2), name: '已用内存'}
            ]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
setInterval(function () {
    option.series[0].detail.formatter = '{value}%\n' + (os.freemem() / 1024 / 1024).toFixed(2) + 'M';
    option.series[0].data[0].value = ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2);
    myChart.setOption(option, true);
}, 2000);