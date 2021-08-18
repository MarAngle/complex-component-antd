import Vue from 'vue'
import _func from 'complex-func'
import './src/style/index.css'

const contents = require.context('./src/data', false, /(\.vue)|(\.js)$/)
const modContents = require.context('./src/mod', false, /(\.vue)|(\.js)$/)

_func.loadContents(contents, function(item) {
  let data = item.default || item
  Vue.component(`Complex${data.name}`, data)
})
_func.loadContents(modContents, function(item) {
  let data = item.default || item
  Vue.component(`ComplexMod${data.name}`, data)
})
