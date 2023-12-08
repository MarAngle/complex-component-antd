import { defineComponent, h, PropType } from "vue"
import { getType, setDataByDefault } from "complex-utils"
import { layout } from "complex-plugin"
import { ComplexList, PaginationData } from "complex-data"
import DefaultList from "complex-data/src/dictionary/DefaultList"
import ComplexDataConfig from "complex-data/config"
import { AutoIndex } from "complex-component"
import SimpleTableContent from "./components/SimpleTableContent.vue"
import Pagination from "./components/Pagination"
import AutoText from "./AutoText.vue"
import config from "../config"

export type autoType = {
  expandWidth?: number
  choiceWidth?: number
  index?: {
    prop: string
    pagination: boolean
  },
  pagination?: {
    auto?: boolean
    default: string
    front: string
    end: boolean
  }
}

export type renderDataType = { text: unknown, record: Record<PropertyKey, unknown>, index: number }

export default defineComponent({
  name: 'SimpleTable',
  props: {
    listData: {
      type: Object as PropType<ComplexList>,
      required: true
    },
    columnList: { // 定制列配置
      type: Object as PropType<DefaultList[]>,
      required: true
    },
    data: { // 单独指定列表数据，不从listData.$list中取值
      type: Array as PropType<Record<PropertyKey, unknown>[]>,
      required: false
    },
    paginationData: { // 单独制定分页器数据，不从listData中取值
      type: Object as PropType<PaginationData>,
      required: false,
      default: null
    },
    listType: {
      type: String,
      required: false,
      default: 'list'
    },
    auto: {
      type: Object as PropType<autoType>,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      layoutData: {
        lifeId: 0 as PropertyKey,
        count: 0
      }
    }
  },
  computed: {
    currentData () {
      if (this.data) {
        return this.data
      } else {
        return this.listData.$list
      }
    },
    currentIdList() {
      return this.currentData.map(item => {
        return item[this.listData.$getDictionaryProp('id')]
      })
    },
    currentAuto() {
      return setDataByDefault(this.auto, config.table.auto) as Required<autoType>
    },
    currentPaginationData() {
      if (this.paginationData) {
        return this.paginationData
      } else {
        return this.listData.$module.pagination
      }
    },
    currentColumnList() {
      return this.columnList
    }
  },
  mounted() {
    this.layoutData.lifeId = layout.$onLife('recount', {
      data: () => {
        this.layoutData.count++
      }
    }) as PropertyKey
  },
  beforeMount() {
    layout.$offLife('recount', this.layoutData.lifeId)
    this.layoutData.lifeId = 0
  },
  methods: {
    renderTable() {
      const table = h(SimpleTableContent, {
        columns: this.currentColumnList,
        data: this.currentData,
        type: this.listType,
        id: this.listData.$getDictionaryProp('id'),
        index: {
          prop: this.currentAuto.index.prop,
          pagination: this.currentPaginationData
        }
      })
      return table
    },
    renderFooter() {
      const render = h('div', { class: 'complex-simple-table-footer' }, {
        default: () => [this.renderFooterLeft(), this.renderFooterRight()]
      })
      return render
    },
    renderFooterLeft() {
      const render = h('div', { class: 'complex-simple-table-footer-left' }, {
        default: () => null
      })
      return render
    },
    renderFooterRight() {
      const render = h('div', { class: 'complex-simple-table-footer-right' }, {
        default: () => [this.renderPagination()]
      })
      return render
    },
    renderPagination() {
      if (this.currentPaginationData) {
        const data = h(Pagination, {
          pagination: this.currentPaginationData,
          style: {
            padding: '10px 0'
          },
          onCurrent: (current: number) => {
            if (this.currentAuto.pagination.auto) {
              this.listData.$reloadData({
                data: true,
                ing: true,
                sync: true,
                module: {
                  choice: {
                    from: 'pagination',
                    act: 'page'
                  }
                }
              })
            }
            this.$emit('pagination', 'current', current)
          },
          onSize: (size: number, current: number) => {
            if (this.currentAuto.pagination.auto) {
              this.listData.$reloadData({
                data: true,
                ing: true,
                sync: true,
                module: {
                  choice: {
                    from: 'pagination',
                    act: 'size'
                  }
                }
              })
            }
            this.$emit('pagination', 'size', size, current)
          }
        })
        return data
      } else {
        return null
      }
    }
  },
  /**
   * 主要模板
   * @param {*} h createElement
   * @returns {VNode}
   */
  render() {
    const render = h('div', { class: 'complex-simple-table' }, {
      default: () => [this.renderTable(), this.renderFooter()]
    })
    return render
  }
})