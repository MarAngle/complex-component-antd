<style lang='less' scoped >
.complex-tree-select{
  padding: 10px 10px;
}
</style>
<template>
  <div class="complex-tree-select">
    <TreeSelectMenu
      v-for="(val, key) in data"
      :key="key"
      :data="val"
      :check="check"
      :select="select"
      :expand="expand"
      :option="option"
      :id="id"
      :name="name"
      :parentId="parentId"
      :children="children"
      :indent="indent"
      :indentUnit="indentUnit"
    ></TreeSelectMenu>
  </div>
</template>
<script>
import _func from 'complex-func'
import TreeSelectMenu from './TreeSelectMenu'
export default {
  name: 'TreeSelect',
  components: {
    TreeSelectMenu
  },
  computed: {
    option: function() {
      let data = {
        check: {
          show: false,
          multiple: true,
          child: true,
          parent: true
        },
        select: {
          show: true,
          multiple: false,
          child: false,
          parent: false
        },
        expand: {
          show: true,
          multiple: true,
          child: false,
          parent: false
        }
      }
      data.check = _func.mergeData(data.check, this.checkOption)
      data.select = _func.mergeData(data.select, this.selectOption)
      data.expand = _func.mergeData(data.expand, this.expandOption)
      return data
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    check: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    },
    select: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    },
    expand: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    },
    checkOption: {
      type: Object,
      required: false,
      default: undefined
    },
    selectOption: {
      type: Object,
      required: false,
      default: undefined
    },
    expandOption: {
      type: Object,
      required: false,
      default: undefined
    },
    id: {
      type: String,
      required: false,
      default: 'id'
    },
    name: {
      type: String,
      required: false,
      default: 'name'
    },
    parentId: {
      type: String,
      required: false,
      default: 'parentId'
    },
    children: {
      type: String,
      required: false,
      default: 'children'
    },
    indent: {
      type: Number,
      required: false,
      default: 10
    },
    indentUnit: {
      type: String,
      required: false,
      default: 'px'
    }
  }
}
</script>
