import extractColor from './extract'
import { HtmlTagDescriptor, ResolvedConfig } from 'vite'

interface propType {
  extract: string[]
  transform?: (code: string) => string
  output?: string
  injectTo?: string | HtmlTagDescriptor
}

type optionType = Array<propType> | propType

const isTargetFile = (name: string) => /\.css|scss|less|styl$/.test(name)
const patchReg = (s: string) =>
  new RegExp(s.replace(/\s/g, '').replace(/,/g, ',\\s*') + '([\\da-f]{2})?(\\b|\\)|,|\\s)', 'i')

export { propType, HtmlTagDescriptor }

export default (options: optionType) => {
  if (!Array.isArray(options)) {
    options = <Array<propType>>[options]
  }
  let isProd: boolean
  let cache = new Map()

  const transformCode = (code: string) => (options as Array<propType>).reduce((pre, curr) => curr.transform(pre), code)
  const extractRegs = (extract: string[]) => extract.map(patchReg)
  const outputFiles = options.map(item => ({
    ...item,
    extractRegs: extractRegs(item.extract),
    code: '',
  }))
  const extractCode = (code: string) => {
    outputFiles.forEach(file => {
      file.code += `${file.transform(extractColor(file.extractRegs)(code).join(''))}`
    })
  }
  return {
    name: 'vite:color',
    configResolved(config: ResolvedConfig) {
      isProd = config.command === 'build'
    },
    async transform(code: string, id: string) {
      // todo 外部css文件
      if (isTargetFile(id)) {
        if (cache.has(id)) {
          return { code: cache.get(id), map: null }
        }
        const sourceCode = transformCode(code)
        cache.set(id, sourceCode)
        if (isProd) extractCode(code)
        return { code: sourceCode, map: null }
      }
    },
    buildEnd() {
      outputFiles.forEach(item => {
        this.emitFile({
          type: 'asset',
          name: item.output,
          fileName: item.output,
          source: item.code,
        })
      })
      cache = null
    },
    transformIndexHtml() {
      if (isProd) {
        const injectTags = outputFiles.map(item => {
          if (typeof item.injectTo === 'object') return item.injectTo
          return {
            tag: 'link',
            attrs: {
              rel: 'stylesheet',
              href: `./${item.output}`,
            },
            injectTo: item.injectTo || 'head',
          }
        })

        return injectTags
      }
    },
  }
}
