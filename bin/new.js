/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const uppercamelcase = require('uppercamelcase')
const path = require('path')
const fs = require('fs')
const fileSave = require('file-save')

const componentsJsonFile = require('../src/components/component.json')

const args = process.argv.slice(2)
const [componentEN, componentCN = componentEN] = args

if (!componentEN) {
  console.error('[组件名]必填 - Please enter new component name')
  process.exit(1)
}

const ComponentName = uppercamelcase(componentEN)
const componentPath = path.resolve(__dirname, '../src/components', ComponentName)

const Files = [
  {
    fileName: 'index.tsx',
    content: `// ${ComponentName} ${componentCN}
import { defineComponent } from 'vue'
import {} from './types'
import { createNamespace } from '@/utils'

const [name, bem] = createNamespace('${componentEN}')

export default defineComponent({
  name,
  setup() {
    return () => {
      return (
        <>
        
        </>
      )
    }
  }
})`,
  },
  {
    fileName: 'types.ts',
    content: `// 类型定义
export {}`,
  },
  {
    fileName: 'tools/index.ts',
    content: '// 工具函数',
  },
  {
    fileName: 'style/index.ts',
    content: `import './index.scss'`,
  },
  {
    fileName: 'style/index.scss',
    content: `$${componentEN}-prefix-cls: 'shinp-${componentEN}';

.#{$${componentEN}-prefix-cls} {

}`,
  },
]

if (componentsJsonFile[ComponentName]) {
  console.error(`组件${ComponentName}已存在`)
  process.exit(1)
}
componentsJsonFile[ComponentName] = `./${ComponentName}`
fileSave(path.join(__dirname, '../src/components/component.json'))
  .write(JSON.stringify(componentsJsonFile, null, '  '), 'utf8')
  .end('\n')

const rootStylePath = path.resolve(__dirname, '../src/components/style.ts')
const styleImportText = `${fs.readFileSync(rootStylePath)}import './${ComponentName}/style'`
fileSave(rootStylePath).write(styleImportText, 'utf8').end('\n')

Files.forEach(file => fileSave(path.join(componentPath, file.fileName)).write(file.content, 'utf8').end('\n'))

console.log('DONE!')
