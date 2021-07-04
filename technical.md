# 币技术文档

## 运行

```bash
yarn & yarn dev
```

## 技术栈

- chrome extension api
- react/hooks
- react-router-dom
- typescript
- styled-components
- react-content-loader
- g2
- webpack

## 目录释义

| 文件夹                   |                                                                                                                                       功能 |
| :----------------------- | -----------------------------------------------------------------------------------------------------------------------------------------: |
| build                    |                                                                                                                           webpack 脚本配置 |
| --                       |                                                                                                                                         -- |
| public                   |                                                                                                                         模板文件和静态资源 |
| public/manifest.json     |                                                     插件的外壳配置文件[详情](https://developer.chrome.com/docs/extensions/mv2/getstarted/) |
| --                       |                                                                                                                                         -- |
| src/api                  |                                                                                           所有需要发起的网络请求，和部分对背景页的请求指令 |
| src/components           |                                                                                                                   所有页面的组件和公共组件 |
| --                       |                                                                                                                                         -- |
| src/contants             |                                                                                                                                   公用变量 |
| src/contants/api         |                                                                                                                         所有网络请求的地址 |
| src/contants/commands    |                                                                                                           所有插件 eventbus 数据交换的指令 |
| src/contants/local       |                                                                                                                        所有 storage 的键名 |
| src/contants/setting     |                                                                                                        popup 页面->设置页内组件的变量值 和 |
| src/contants/update      |                                                                                                                             插件内更新通知 |
| src/contants/ws          |                                                                                                                      使用的 websocket 接口 |
| --                       |                                                                                                                                         -- |
| src/context              |                                                                                                               popup 内使用的 react/context |
| src/hooks                |                                                                                                                             自定义的 hooks |
| src/interface            |                                                                                                                             公用的变量类型 |
| --                       |                                                                                                                                         -- |
| src/services             |                                                                                                                                 插件背景页 |
| src/services/badge       |                                         插件 badge 及通知功能[详情](https://developer.chrome.com/docs/extensions/reference/notifications/) |
| src/services/business    |                                                                                                                       popup 页面的所有业务 |
| src/services/storage     | 插件 storage 功能(主要做 Store 到 Storage 数据的同步)[详情](https://developer.chrome.com/docs/extensions/reference/storage/#property-sync) |
| src/services/store(弃用) |                                                                                           1.0.2 版本前在内存中存储数据(现全部使用 Storage) |
| --                       |                                                                                                                                         -- |
| src/styles               |                                                                                                                       色板、主题色、字体等 |
| src/utils                |                                                                                                                                 插件工具库 |
| src/views                |                                                                                                                                 popup 页面 |

## 数据流向

[chrome 插件开发基础教程，点此查看](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)

我在“币”插件里，把数据获取，数据存储全部放置在背景页中，有三点原因：

- 由于插件背景页的特有生命周期(随浏览器开启而开始，浏览器关闭再销毁)，适合做些持续获取数据的操作，比如：badge 显示、币种价格变动通知...
- 保持模块的单一性，popup 只做视图与交互，background 只做数据处理交换
-
