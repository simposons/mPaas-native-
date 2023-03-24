## 概述

该项目为一账户首页 小程序重构项目

技术栈 mPaaS 小程序

git 地址 [http://10.0.16.158:8090/mobile-front/mpaas/yzh-home.git](http://10.0.16.158:8090/mobile-front/mpaas/yzh-home.git)

> 注意事项:因小程序项目中的 mini-ali-ui 组件库已经废弃 大家尽量使用[antd-mini](https://mini.ant.design/)的组件

## 主要使用依赖

| 依赖名称           | 用途                           | 版本              | 备注     |
| ------------------ | ------------------------------ | ----------------- | -------- |
| `mini-ali-ui`      | 阿里提供的组件库               | `^1.0.10`         | 已经废弃 |
| `antd-mini`        | 阿里提供的组件库               | `v1`              | --       |
| `dayjs`            | 较小的时间处理插件             | `^1.11.7`         | --       |
| `@qiun/my-ucharts` | 图表组件                       | `^2.5.0-20230101` | --       |
| `iny-bus`          | 事件中心 手动导入 方便后续修改 | 无版本            | --       |
| `herculex`          | store状态管理               | `0.2.16-alpha.3` | [地址](https://opendocs.alipay.com/support/01rb24)   |
| `animate.css`          | 一些常用动画               | 手动引入 | [地址](https://animate.style/)   |

## 项目主要结构

```
yzh-home
└─ yzh-home
   ├─ .eslintignore
   ├─ .eslintrc
   ├─ app.acss
   ├─ app.js
   ├─ app.json
   ├─ assets
   │  └─ image
   ├─ components
   │  ├─ demo
   │  ├─ nav-bar
   │  └─ web-view
   ├─ config
   │  ├─ baseApi.json
   │  ├─ imgUrl.json
   │  └─ index.js
   ├─ mini.project.json
   ├─ package-lock.json
   ├─ package.json
   ├─ pages
   │  ├─ home
   │  │  └─ index
   │  │     ├─ index.acss
   │  │     ├─ index.axml
   │  │     ├─ index.js
   │  │     └─ index.json
   │  └─ me
   ├─ README.md
   ├─ services
   │  ├─ index.js
   │  ├─ request.js
   │  └─ yzhRequest.js
   ├─ store
   │  └─ index.js
   └─ utils
      ├─ index.js
      ├─ index.sjs
      └─ iny-bus
         └─ index.js

```

## 现有组件或公共页面总结

| 组件/页面名称     | 功能简介                         |
| ----------------- | -------------------------------- |
| `nav-bar`         | 公共导航栏                       |
| `common-web-view` | 对`webview`进行封装,方便后续使用 |

## 第三方组件库考察 未定

1. [iView alipay](https://ant-move.github.io/iview-alipay-docs/#/docs/guide/start) 使用 Antmove 小程序转换器基于 iview-weapp 转换得到。
2. [vant-weapp](https://vant-contrib.gitee.io/vant-weapp/#/home) 因为 vant-weapp 是微信小程序组件 如果需要用的话 需要做平台转换

## 相关资源

1. 真机预览需要扫码登录并选中关联应用，[请点击这里查看详情](https://docs.alipay.com/mini/ide/overview) 暂时我们还没有可以关联的应用
2. 如果您对框架还不太熟悉，[请参考帮助文档](https://help.aliyun.com/document_detail/67444.html)
3. 如果您要上传发布小程序， [这里有详细步骤](https://docs.alipay.com/mini/developer/getting-started)
4. 一些在 mPaaS 小程序文档中没有的详细介绍的功能，可以看[支付宝小程序相关文档](https://opendocs.alipay.com/mini/framework/subpackages)
5. Antmove 小程序转换器 可能对我们有帮助 [官方文档](https://ant-move.github.io/guide/)
6. [antd-mini](https://ant-design-mini.antgroup.com/guide/quick-start)
7. [关于`min.project.json`打包配置，mPaaS对应的应该是旧版](https://opendocs.alipay.com/mini/framework/project)

## 未完善问题总结

1. 分包问题，[请点击这里查看详情](https://opendocs.alipay.com/pre-open/00a9om#%E6%89%93%E5%8C%85%E5%8E%9F%E5%88%99) (mPaaS 应该是没有分包功能)
2. eslint 配置 (未完全完善)
3. services 封装 (未完全完善)
4. jsBridge 迁移 (暂无)
5. 与原生通信方法总结 (暂无)

### 分包配置（暂存）

```json
  "subPackages": [
    {
      "root": "pages/home",
      "pages": [
      ]
    },
    {
      "root": "pages/me",
      "pages": [
      ]
    }
  ],
  "preloadRule": {
    "pages/common/index/index": {
      "network": "all",
      "packages": [
        "pages/home"
      ]
    },
    "pages/common/demo/demo": {
      "network": "wifi",
      "packages": [
        "page/me"
      ]
    }
  },
```

## 小程序语法注意事项

1. 点击事件 onTap 传参示例

```xml
<view class="flex-item" onTap="toItemPage" data-id="{{item.id}}">
</view>
```

```js
methods: {
    toItemPage(e) {
      console.log({ e }, e.target.dataset.id);
      const { id } = e.target.dataset;
      this.props.onFunctionEvent(id);
    },
  },
```

2. 小程序 类似 emit 方法示例

```js
props: {
    onFunctionEvent: () => {},
  },
methods: {
    toItemPage(e) {
      console.log({ e }, e.target.dataset.id);
      const { id } = e.target.dataset;
      this.props.onFunctionEvent(id);
    },
},
```

## uniapp 或小程序原生开发 优劣分析

### 小程序优点

1. `小程序`原生开发，调试方便，`uniapp`打包之后形参等会转换为无规律的字母
2. `mPaaS小程序`和`支付宝小程序`虽然是相同的技术栈,但`mPaaS小程序`功能版本晚于`支付宝小程序`,会不会有一些坑存在
3. `uniapp`不好做代码质量监控 可能有一些兼容性问题,关于数据更新setData是否考虑了优化

### uniapp优点
1. `uniapp`有更多的组件库可以用,例如`uview`等
2. `uniapp`基于`vue`开发，可能大家用起来顺手很多
3. `uniapp`可打包为：微信小程序等其他小程序或 h5 页面,h5页面并不能直接发布到tar上
4. `uniapp`可以用 `#ifdef`控制测试、正式环境

#### 需要注意的问题
1. `uniapp`数据更新setData是否考虑了优化

## 培训会 问题总结

### 更新及配置问题 （已确认）

1. mPaaS 小程序每次更新之后在用户手机上的加载流程，需要考虑缓存问题吗，需要像支付宝/微信小程序那样调用方法提示用户更新吗
2. mPaaS 小程序有像支付宝小程序那种分包机制吗 如果没有 是如何保证小程序首页加载速度的
   引申问题 我们有必要将图片放在图片服务器中进行访问吗 包多大不会影响加载 3m
3. mPaaS 小程序发布配置 测试包管理 测试包只能手动传上去吗 还有扩展信息怎么填 能配置公共配置文件吗
4. 右上角胶囊去掉 可以去掉

### 一些开发具体问题 （未确认）

1. 页面栈有数量限制吗 是限制 10 个
2. include 不能引入页面
3. 页面按照组件的形式引入页面 被引入的页面是不走生命周期的 要做到业务完全隔离对吗 是不能传参的 对吗 如果一个页面要分成几部分来做 都要按照组件的情况写是吗
4. sjs 文件 只能用于过滤器的作用吗 还有什么实用性的用途吗
5. acss 有类似于 vue 中 scoped 功能吗 其中 styleIsolation 两个值 shared apply-shared

## 其他问题总结

1. 其中 styleIsolation 两个值 shared apply-shared 可以实现 scoped 功能 acss 有类似 deep 的功能吗
2. `antd-mini`组件库使用时 `solt`插槽报错 无法解决 但是关闭`es6转es5`后可用 之后再打开`es6转es5`功能后也可用 总结：应该只是编辑器的bug 建议大家遇到不生效的问题 多重启编辑器或等一会
3. `mini-project.json`中`compileOptions`是否可用
4. 关于`clientEnv`几种环境的解释
```
    /**
     * 当前客户端环境
     * @sdk2 2.7.24
     */
    clientEnv?: 'prod' | 'test' | 'stable' | 'pre' | 'unknown';
```
