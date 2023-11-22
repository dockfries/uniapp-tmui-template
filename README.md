## 起步

> 请全局替换 pkg-placeholder 占位符以使用此模板。

项目缺少 uni 插件市场的 z-paging 组件, 首次启动项目请执行完下述代码后手动引入。

```sh
npm i # 不支持pnpm/yarn, 否则多平台兼容有问题
npx tmui rcli # 更新tmui，有可能卡死，看src/tmui出来就强制结束执行
npx @dcloudio/uvm alpha # 更新uniapp sdk, 会覆盖为低版本vite
npm install vite pinia@2.0.36 # 更新vite,再安装一遍指定版本的pinia
```

## 注意

- unocss 类名和 tmui 冲突，需要加上自定义前缀`_`
  - `class="_bg-white dark:_bg-#000"` dark 只可以写在 class 里
  - `bg="#fff"` Attributify 不需要加前缀, 不丢失插件提示
  - `bg-white` Valueless attributify 不需要加前缀, 丢失插件提示, 等同于\_bg-white
- 最简单的 modal 和 message 可以用 hooks，复杂的只能写组件。
