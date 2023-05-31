## 起步

```sh
npm i # 不支持pnpm/yarn, 否则多平台兼容有问题
tmui rcli # 更新tmui
npx @dcloudio/uvm alpha # 更新uniapp sdk, 会覆盖为低版本vite
npm install vite@latest # 更新vite
rm -rf ./src/tmui/components/tm-keyborad # 作者错别字未来将移除
```

## 注意

- unocss 类名和 tmui 冲突，需要加上自定义前缀`_`
  - `class="_bg-white dark:_bg-#000"` dark 只可以写在 class 里
  - `bg="#fff"` Attributify 不需要加前缀, 不丢失插件提示
  - `bg-white` Valueless attributify 不需要加前缀, 丢失插件提示, 等同于\_bg-white
- 最简单的 modal 和 message 可以用 hooks，复杂的只能写组件。
