import { App, reactive } from "vue"
import type { FormInstance } from 'ant-design-vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat"
import { date } from 'complex-plugin'
import type { PluginLayout } from 'complex-plugin'
import { Data, FormValue } from "complex-data"
import DefaultEdit from 'complex-data/src/dictionary/DefaultEdit'
import type { ruleOption } from 'complex-data/src/dictionary/DefaultEdit'
import SimpleDateEdit from "complex-data/src/dictionary/SimpleDateEdit"
import LayoutResizeObserver from "./LayoutResizeObserver"
import './src/style/index.css'
import antdConfig from "./antdConfig"

export type ComplexComponentAntdOptions = {
  reactive?: boolean
  style?: boolean
  pluginLayout?: PluginLayout
}

const defaultParseRule = function(ruleValue: ruleOption, form: Record<PropertyKey, any>) {
  const currentRuleValue = { ...ruleValue } as any
  if (currentRuleValue.validator) {
    currentRuleValue.validator = function(rule: any, value: any, callback: any) {
      const res = ruleValue.validator!(value, form, rule, callback)
      if (typeof res === 'boolean') {
        return res ? Promise.resolve() : Promise.reject()
      } else {
        return res
      }
    }
  }
  return currentRuleValue
}

const plugin = {
  install: function(_app: App, options: ComplexComponentAntdOptions = {}) {
    // dayjs扩展插件
    dayjs.extend(customParseFormat)

    if (options.reactive !== false) {
      Data.$format = function(data, formatConfig) {
        if (formatConfig && formatConfig.recommend) {
          return reactive(data) as Data
        } else {
          return data
        }
      }
    }
    if (options.style !== false) {
      antdConfig.initStyle()
    }
    if (options && options.pluginLayout) {
      antdConfig.pluginLayout = options.pluginLayout
      LayoutResizeObserver.init(options.pluginLayout)
    }
    FormValue.clearValidate = function(formValue, ...args: Parameters<FormInstance['clearValidate']>) {
      if (formValue.ref) {
        (formValue.ref as FormInstance).clearValidate(...args)
      }
    }
    FormValue.validate = function(formValue, ...args: Parameters<FormInstance['validate']>) {
      if (formValue.ref) {
        return (formValue.ref as FormInstance).validate(...args)
      } else {
        return Promise.reject({ status: 'fail', code: 'no ref' })
      }
    }

    DefaultEdit.$parseRule = defaultParseRule

    date.pushParse('dayjs', value => dayjs(value))
  
    SimpleDateEdit.$parseDate = function(dateValue) {
      if (typeof dateValue.value === 'string') {
        return date.getData('dayjs', dateValue.value)
      } else {
        return dateValue.value
      }
    }
  
    SimpleDateEdit.$compareDate = function(target, other) {
      return (other as Dayjs).valueOf() - (target as Dayjs).valueOf()
    }
  
    SimpleDateEdit.$parse = function(value, format) {
      return value != undefined ? dayjs(value, format) : value
    }
  
    SimpleDateEdit.$collect = function(value, format) {
      return value != undefined ? (value as Dayjs).format(format) : value
    }
  }
}

export default plugin
