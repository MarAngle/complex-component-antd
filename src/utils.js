import _func from 'complex-func'
import moment from 'moment'

let utils = {
  countClass: function(...args) {
    return args.join('-')
  },
  addClass: function(option, className) {
    if (!option.class) {
      option.class = className
    } else {
      if (_func.getType(option.class) === 'array') {
        if (option.class.indexOf(className) == -1) {
          option.class.push(className)
        }
      } else {
        if (option.class !== className) {
          option.class = [option.class, className]
        }
      }
    }
  },
  /**
   * moment兼容
   * @param {object} data 属性对象
   * @param {string[]} propList 值列表
   * @param {string[]} formatList 格式化列表
   */
  formatMoment: function(data, propList, formatList, isArray) {
    for (let n = 0; n < propList.length; n++) {
      let prop = propList[n]
      if (data[prop]) {
        if (isArray) {
          if (!_func.isArray(data[prop])) {
            data[prop] = []
          }
          for (let i = 0; i < data[prop].length; i++) {
            data[prop][i] = this.formatMomentNext(data[prop][i], formatList[n])
          }
        } else {
          data[prop] = this.formatMomentNext(data[prop], formatList[n])
        }
      }
    }
  },
  formatMomentNext: function(value, format) {
    if (value) {
      if (moment.isMoment(value)) {
        return value
      } else {
        return moment(value, format)
      }
    } else {
      return value
    }
  },
  /**
   * typeItem宽度设置
   * @param {object} option 主要的option
   * @param {*} widthList 宽度数据列表
   */
  autoSetWidthOption(option, ...widthList) {
    for (let i = 0; i < widthList.length; i++) {
      const width = widthList[i]
      if (width) {
        if (!option.style) {
          option.style = {}
        }
        if (!option.style.width) {
          if (_func.getType(width) == 'number') {
            option.style.width = width + 'px'
          } else if (width) {
            option.style.width = width
          }
        }
        return true
      }
    }
  },
  parseScrollProp: function (option, prop) {
    if (option[prop] !== undefined) {
      let type = _func.getType(option[prop])
      if (type !== 'object') {
        if (type === 'boolean') {
          option[prop] = {
            type: 'fixed',
            data: option[prop]
          }
        } else if (type === 'number') {
          option[prop] = {
            type: 'number',
            data: option[prop]
          }
        } else if (type === 'string') {
          option[prop] = {
            type: option[prop]
          }
        }
      }
    }
  }
}

export default utils
