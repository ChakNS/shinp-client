import extractColor from './extractColor'

// const INJECT_SCRIPT = `
//       window.onload = function () {
//         var link = document.createElement('link')
//         link.rel = 'stylesheet'
//         link.href = './output'
//         document.head.appendChild(link)
//       }
//     `
const isTargetFile = name => /\.css|scss|less|styl$/.test(name)
// const genInjectScript = output => INJECT_SCRIPT.replace('output', output)
const patchReg = s => new RegExp(s.replace(/\s/g, '').replace(/,/g, ',\\s*') + '([\\da-f]{2})?(\\b|\\)|,|\\s)', 'i')

// todo
// 参数校验
// 多文件输出 done!

/*
 * cache
 * emitFile
 * error
 */

/*
 * output
 * extract
 * transform
 */
export default options => {
  if (!Array.isArray(options)) {
    options = [options]
  }
  let isProd
  let cache = new Map()

  const transformCode = code => options.reduce((pre, curr) => curr.transform(pre), code)
  const extractRegs = extract => extract.map(patchReg)
  const outputFiles = options.map(item => ({
    ...item,
    extractRegs: extractRegs(item.extract),
    code: '',
  }))
  const extractCode = code => {
    outputFiles.forEach(file => {
      file.code += `${file.transform(extractColor(file.extractRegs)(code).join('\n'))}\n`
    })
  }
  return {
    name: 'myTest',
    configResolved(config) {
      isProd = config.command === 'build'
    },
    async transform(code, id) {
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
        // const injectFinalFiles = outputFiles.filter(item => item.injectTo === 'final')
        // const injectOtherFiles = outputFiles.filter(item => item.injectTo !== 'final')
        // const injectFinal = {
        //   tag: 'script',
        //   attrs: {
        //     type: 'text/javascript',
        //   },
        //   children: genInjectScript(item.output),
        //   injectTo: 'head',
        // }

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
