
### Tips

### ToDo
- ListView的TableMenu实现级联
- 通过antd实现基础主题色的设置:全局样式
- table布局考虑计算准确性
- SimpleTable的插槽和菜单逻辑同步
- Import的complex属性适配，接收一个复杂对象实现，具体的名称和URL解析考虑单独参数或者额外包装
- 统一的布局切换逻辑实现方案
- - quick优化，参数优化配置细分

### Doing
- 简化SimpleTable，可自定义组件，通过此组件实现ListEdit

### `4.10.8`
- feat: MenuView和TableMenu适配MenuValue的事件修饰符。

### `4.10.6` `4.10.7`
- feat: 修正cascader级联选择器未适配filter的BUG。

### `4.10.4` `4.10.5`
- refactor: 迁移 `localIconProps` 类型定义至 `type.ts` 文件，解决循环依赖。
- refactor: 调整 `dataConfig` 的导入方式，由 `antdConfig.dataConfig` 改为直接导入，解决循环依赖。

### `4.10.3`
- feat: 重构 `QuickList` 的编辑逻辑，新增 `startEdit` 函数以提高灵活性和可扩展性。
- feat: 为 `QuickList` 的 `buildData` 方法调用增加 `originData` 参数，支持基于模板创建数据。

### `4.10.1` `4.10.2`
- feat: 搭建测试流程

### `4.9.5`
- feat: 输出AutoRender,ChoiceInfo,PaginationView,TableMenu模板组件

### `4.9.4`
- fix: 修正AutoText未正确接收attrs的BUG

### `4.9.1` `4.9.2` `4.9.3`
- feat: 修改模块加载逻辑为ES2020
- feat: antdConfig等配置项更改为reactive对象

### `4.8.17` - `4.8.20`
- feat: config=>antdConfig,style迁移到dataConfig中

### `4.8.15` `4.8.16`
- feat: SelectText适配$color模式，此模式下取config.style.color的颜色动态赋值

### `4.8.14`
- feat: 输出AutoSpin组件

### `4.8.12` `4.8.13`
- chore: 升级依赖，适配新版SelectEdit
- feat: QuickList的editThrottle=>editDebounce
- feat: EmptyPic=>EmptyImage
- feat: 添加ErrorImage
- feat: ImageViewer添加图片加载失败判断逻辑

### `4.8.11`
- chore: 适配DefaultSelectEdit的filter函数

### `4.8.8` `4.8.9` `4.8.10`
- feat!: 重大变化：优化样式自动构建整体逻辑，为全局统一样式实现基础
- feat: 添加SelectText组件，展示SelectValue

### `4.8.7`
- fix: 修正SimpleTable的行高与Antd的Table保持一致

### `4.8.6`
- chore: 基于AI优化代码

### `4.8.5`
- chore: 升级依赖
- feat: 删除QuickTrack

### `4.8.4`
- feat: 添加FlexBox组件，实现基础大屏布局

### `4.8.3`
- fix: 修正config.showValue未正确解析数组的BUG

### `4.8.1` `4.8.2`
- chore: 升级依赖
- chore: 优化Float相关功能
- chore: 稳定版

### `4.6.35` `4.6.36`
- chore: 升级依赖
- feat: 级联列表组件
- chore: QuickList优化render模块功能
- chore: 优化Float相关功能

### `4.6.33`
- chore: 升级依赖
- chore: SimpleTable无数据样式同步antd

### `4.6.31` `4.6.32`
- chore: 升级data依赖,同步ChoiceData改动
- feat: 适配SortData列表排序
- feat: TableView添加事件['choice', 'sort']

### `4.6.30`
- chore: 升级data依赖,适配CustomEdit的model配置项优化

### `4.6.29`
- chore: ImageViewer的class优化，样式优化

### `4.6.27` `4.6.28`
- chore: 升级依赖
- feat: ImportView的事件更改为change
- refactor: ImportView使用组合式API重构，修正数据变更未触发校验的BUG

### `4.6.26`
- fix: 修正AutoText在text变更后直接计算宽度的BUG
- feat: ModalView添加destroyOnClose配置项，默认为真，减少dom结构的同时保证默认情况下每次打开的加载存在，避免BUG

### `4.6.24` `4.6.25`
- fix: 修正TableMenu中间hidden后错误break的BUG
- chore: ListEdit仅作为数据结构存在，不统一处理

### `4.6.23`
- chore: 初步视频优化FormEdit/ListEdit数据格式

### `4.6.22`
- chore: 全局优化Promise返回逻辑

### `4.6.18` - `4.6.21`
- chore: 全局优化width赋值
- chore: 升级data依赖,适配ComplexData的常见方法去除$符

### `4.6.16` `4.6.17`
- chore: 优化iconDict构建逻辑
- chore: 优化按钮icon与文字的间隔

### `4.6.15`
- chore: 升级data依赖,适配DefaultSimpleEdit.disabled更改为InterfaceValue结构
- chore: 优化编辑的disabled传值逻辑
- fix: 修正PaginationView的sizeSelect展示错误的BUG

### `4.6.13`
- feat: 适配File的isUrl配置项

### `4.6.11` `4.6.12`
- chore: 升级data依赖,优化refreshData调用
- chore: 优化openEdit函数
- chore: 优化SingleImport.renderContent

### `4.6.8` `4.6.9` `4.6.10`
- chore: 升级data依赖,同步icon变更
- feat: 文件上传组件通过图片查看器实现图片的特殊处理

### `4.6.7`
- chore: 升级data依赖,Edit适配DefaultMod的hidden/frozen属性
- chore: 开发环境添加observe检查

### `4.6.5` `4.6.6`
- chore: ImageViewer无图优化，添加localIcon

### `4.6.3` `4.6.4`
- fix: 修正widthCalculator

### `4.6.2`
- chore: 升级data依赖
- feat: tablePayload.payload.target => tablePayload.payload.column
- feat: 适配MenuValue.confirm/hidden
- feat: 适配TableMenu.disabled
- feat: 添加ImageViewer
- feat: 删除SimpleTableContent
- feat: 适配ListEdit:兼容问题暂不可用
- feat: 添加EditTable

### `4.6.1`
- chore: 升级data依赖
- chore: 升级plugin依赖

### `4.4.10` `4.4.11`
- chore: 升级data依赖
- chore: 升级plugin依赖
- feat: Edit/Info添加onInit函数，在加载后可对数据在特殊处理如排序等

### `4.4.5` - `4.4.9`
- chore: 升级data依赖
- chore: 升级plugin依赖

### `4.4.4`
- chore: 升级data插件
- feat: 添加基础的轨迹类

### `4.4.2` `4.4.3`
- feat: 适配SearchData的异步加载

### `4.4.1`
- feat: 适配生命周期优化

### `4.3.35`
- chore: 优化quick相关路径
- feat: 实现基础的Float布局
- fix: 修正AutoText在文本变化时未重新计算宽度的BUG
- feat: 添加LayoutResizeObserver类，基于PluginLayout初步兼容ResizeObserver

### `4.3.34`
- chore: 升级data插件适配triggerMethod的节流参数，QuickList的节流参数默认值添加

### `4.3.33`
- chore: 升级data插件适配可能存在的depth数据

### `4.3.32`
- feat: 适配Vue3的插件加载模式，优化可配置项，优化PluginLayout的引用逻辑

### `4.3.29` - `4.3.31`
- feat: 适配DictionaryData/DefaultMod的collapse折叠判断值
- chore: 优化PluginLayout的全局引用逻辑
- chore: layout升级

### `4.3.27` `4.2.28`
- feat: 适配SelectEdit的search配置项

### `4.3.26`
- feat: SearchArea/EditArea/EditView添加enter属性，检索默认为真，为真则监控子组件input的回车事件，触发后QuickList检索默认触发，简化操作

### `4.3.24` `4.3.25`
- chore: 规范命名，tsx文件由之前的ts后缀修正为tsx后缀
- chore: 优化未使用变量前缀

### `4.3.23`
- chore: 优化QuickList的页面结构，仅edit/info时不构建主div
- chore: 优化编辑回调，非标准编辑全部默认走$editChange函数，通过此函数分流

### `4.3.21` `4.3.22`
- feat: 适配优化rule校验

### `4.3.19` `4.3.20`
- chore: 优化icon

### `4.3.18`
- feat: 适配custom的双向绑定加载

### `4.3.17`
- chore: 优化TableView的autoText的attrs设置

### `4.3.16`
- fix: 修正ButtonView的upload传参错误的BUG

### `4.3.15`
- chore: 优化undefined校验

### `4.3.12` - `4.3.14`
- feat: 拆分上传组件
- chore: 优化上传组件类型
- feat: 适配上传组件的complex属性

### `4.3.11`
- feat: QuickList的事件由menu拆分成search/table
- chore: 升级依赖，适配时间范围限制

### `4.3.8` `4.3.9` `4.3.10`
- feat: 按钮适配防抖
- chore: Cascader名称统一
- fix: 修正ImportView的文件判断BUG

### `4.3.5` `4.3.6` `4.3.7`
- chore: 优化代码
- feat: ImportView的文件下载逻辑实现

### `4.3.1` - `4.3.4`
- feat: 适配4.3版本data
- feat: 删除无用输出

### `4.2.10` `4.2.11`
- feat: ListView => QuickList
- feat: 添加QuickPanel
- feat: 全局添加emits-持续优化中

### `4.2.9`
- fix: EditArea: data生成完成后再进行list赋值，避免list提前赋值导致的EditView提前加载导致的数据为空的加载

### `4.2.6` `4.2.7` `4.2.8`
- chore: 升级data依赖
- fix: 修正class生成

### `4.2.5`
- feat: ListView添加reset/destory

### `4.2.4`
- chore: 升级data依赖,适配select

### `4.2.3`
- chore: 升级依赖，修正错误引用

### `4.2.2`
- chore: 优化layout传值逻辑，更新插件

### `4.2.1`
- feat: 适配新版data
- feat: Table的滚动跟随列表而非检索和分页器
- feat: 实现InfoView的展示，接收观察函数
- feat: 实现InfoItem/EditItem两个组件，form中不交互的值通过InfoItem实现
- fix: InfoItem的lable样式还原
- chore: 简化Attrs调用

### `4.1.4`
- feat: Select的分页和插槽实现

### `4.1.3`
- chore: 升级data依赖,适配非编辑模块
- fix: 修正样式和类型

### `4.1.2`
- chore: 升级plugin依赖,适配新版layout
- chore: 优化ModalView的菜单属性

### `4.1.1`
- feat: 基于v4版本的ant-design和complex-component构建模板
