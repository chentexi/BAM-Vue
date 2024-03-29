let proxyObj = {}
proxyObj['/'] = {
    //websockets
    ws: false,
    //目标地址
    target: 'http://localhost:8088',
    //发送请求头中host会设置成target
    changeOrigin: true,
//不重写请求地址
    pathRewrite: {
        '^/': '/'
    }
}
module.exports = {
    configureWebpack: {
        externals: {
            "BMap": "BMap",
        },
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        // proxy: proxyObj
        proxy:{
            // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
            // 这里的api 表示如果我们的请求地址有/api的时候,就出触发代理机制
            // localhost:8888/api/abc  => 代理给另一个服务器
            '/api': {
                ws:true,
                target: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples', // 跨域请求的地址
                changeOrigin: true, // 只有这个值为true的情况下 才表示开启跨域
                secure: true, // 如果是https接口，需要配置这个参数
                // 路径重写
                pathRewrite: {
                    // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
                    '^/api': '' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做
                }
            },
            '/':{
                //websocket
                ws: false,
                //目标地址
                target: 'http://localhost:8088',
                //发送请求头中host会设置成target
                changeOrigin: true,
                //不重写请求地址
                pathRewrite: {
                    '^/': '/'
                }
            }
        }
    }
}
