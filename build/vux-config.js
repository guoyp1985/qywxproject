'use strict'

const path = require('path')
const fs = require('fs')
const componentsPath = path.resolve(__dirname, '../src/page_list.json')

const argv = require('yargs').argv
argv.simulate = argv.simulate || false

module.exports = {
  options: {
    // vuxDev: !argv.simulate, // true
    vuxSetBabel: argv.simulate, // false
    vuxWriteFile: false,
    env: 'dev'
  },
  plugins: [
    'vux-ui', 'inline-manifest',
    {
      name: 'duplicate-style',
      envs: ['production']
    },
    {
      name: 'progress-bar',
      envs: ['development']
    },
    {
      name: 'js-parser',
      test: /main\.js/,
      fn: function (source) {
        this.addDependency(componentsPath)
        let list = fs.readFileSync(componentsPath, 'utf-8')
        list = JSON.parse(list)
        if (argv.demo) {
          list = list.filter(item => {
            return item.indexOf(argv.demo) > -1
          })
        }
        let str = []
        list.forEach(one => {
          let filename = one
          let path = `/${toDash(one)}`
          if (/#/.test(one)) {
            filename = one.split('#')[0]
            path = one.split('#')[1]
          }
          str.push(`{
  path: '${path}',
  name: 't${filename}',
  component: () => import('./pages/${filename}.vue').then(m => m.default)
}`)
        })

        // 404 page
//         str.push(`{
//   path: '*',
//   component: () => import('./demos/NotFoundComponent.vue').then(m => m.default)
// }`)

        str = `[${str.join(',\n')}]`
        source = source.replace('const routes = []', 'const routes = ' + str)
        return source
      }
    },
    {
      name: 'i18n',
      vuxStaticReplace: false,
      staticReplace: false,
      extractToFiles: 'src/locales/components.yml',
      localeList: ['en', 'zh-CN']
    },
    {
      name: 'less-theme',
      path: 'src/theme.less'
    }
  ]
}

function toDash(str) {
  return str.replace(/^([A-Z])/, function (m, w) {
    return w.toLowerCase();
  })// .replace('-', '')
}
