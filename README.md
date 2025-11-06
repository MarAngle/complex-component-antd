# Complex Component Antd

一套基于 Ant Design Vue v4 封装的复杂组件库，旨在与 `complex-data` 深度集成，帮助您快速构建功能强大的数据驱动型用户界面。

## ✨ 功能特性

- **数据驱动**: 组件设计紧密围绕 `complex-data` 的数据结构，通过数据字典即可驱动大部分 UI 的生成。
- **功能丰富的表格**: 提供强大的 `TableView` 组件，内置分页、排序、行选择、操作菜单等常用功能。
- **灵活的表单**: 包含 `SearchArea`、`EditArea`、`InfoArea` 等组件，轻松应对搜索、编辑、详情展示等多种场景。
- **高级封装**: `quick` 系列组件（如 `QuickTable`, `QuickModal`）提供了更高层次的抽象，进一步简化开发流程，提升开发效率。
- **实用工具组件**: 包含 `ModalView`、`ImageViewer`、`SingleImport`、`MultipleImport` 等一系列开箱即用的通用组件。
- **高度可定制**: 提供丰富的属性和插槽，允许开发者对组件的外观和行为进行深度定制。

## 核心组件

- **`TableView`**: 核心表格组件，用于展示列表数据。支持复杂的列配置、排序、筛选、行选择和操作列。
- **`SearchArea`**: 搜索区域组件，用于构建数据筛选表单。
- **`EditArea` / `InfoArea`**: 编辑和详情展示组件，用于创建数据编辑表单和只读信息展示。
- **`ModalView`**: 模态框组件，封装了 Ant Design Vue 的 `Modal`，并集成了更便捷的菜单和布局管理。
- **`quick` 系列**: `QuickTable`, `QuickSearch`, `QuickModal` 等，这些组件将 `complex-data` 的数据管理能力与 UI 组件相结合，实现了更高程度的自动化。

## 📦 安装

```bash
npm install complex-component-antd
```

## 🚀 快速上手

以下是一个使用 `TableView` 的基本示例：

```vue
<template>
  <TableView :list-data="userList" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TableView } from 'complex-component-antd';
import { ComplexList } from 'complex-data';
import userDictionary from './dictionary/user'; // 假设这是您的用户数据字典

export default defineComponent({
  name: 'UserList',
  components: {
    TableView
  },
  setup() {
    // 使用 complex-data 创建一个列表数据实例
    const userList = new ComplexList(userDictionary);

    // 加载数据
    userList.loadData();

    return {
      userList
    };
  }
});
</script>
```

## 依赖

- `ant-design-vue`: ^4.2.6
- `complex-data`: 4.10.1 - 4.10.99
- `complex-component`: 4.10.1 - 4.10.99
