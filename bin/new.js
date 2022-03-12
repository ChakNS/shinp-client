/* eslint-disable @typescript-eslint/no-var-requires */
const uppercamelcase = require('uppercamelcase')
const path = require('path')
const { writeFile, readFile } = require('fs').promises
const componentsJsonFile = require('../src/components/component.json')
const { prompt: query } = require('enquirer')

console.log()
process.on('exit', () => console.log())

const main = async () => {
  const args = await argsQuery()
  const { componentEN, componentCN } = args

  if (!componentEN) {
    console.error('[组件名]必填 - Please enter component name')
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
  await writeFile(
    path.join(__dirname, '../src/components/component.json'),
    JSON.stringify(componentsJsonFile, null, '  ') + '\n'
  )

  const rootStylePath = path.resolve(__dirname, '../src/components/style.ts')
  const styleImportText = `${await readFile(rootStylePath)}import './${ComponentName}/style'`
  await writeFile(rootStylePath, styleImportText + '\n')

  for await (const file of Files) writeFile(path.join(componentPath, file.fileName), file.content + '\n')

  console.log('DONE!')
}

async function argsQuery() {
  const args = {}
  args.componentEN = (
    await query({
      type: 'input',
      name: 'componentname',
      message: 'Input component name',
    })
  ).componentname.trim()

  args.componentCN =
    (
      await query({
        type: 'input',
        name: 'componentname',
        message: 'Input component chinese name',
      })
    ).componentname.trim() || args.componentEN

  return args
}

main().catch(error => {
  console.log(error)
  process.exit(1)
})
