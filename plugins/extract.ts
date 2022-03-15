const EXEGESIS_REG = /\\\\?n|\n|\\\\?r|\/\*[\s\S]+?\*\//g
const SPACE_REG = /\s+/g
const TRIM_REG = /(^|,)\s+|\s+($)/g
const SUB_CSS_REG = /\s*>\s*/g
const DATA_URL_REG = /url\s*\([\\'"\s]*data:/
const QUOT_REG = /\\+(['"])/g
const LEFT_BRACKET = '{'
const RIGHT_BRACKET = '}'

const flatSelector = (s: string) => {
  s = s.replace(TRIM_REG, '$1').replace(SUB_CSS_REG, '>').replace(SPACE_REG, ' ')
  return s.includes(';') ? s.split(';')[1] : s
}

export default function extractColor(extractRegs: RegExp[]) {
  const isExtract = (code: string) => extractRegs.some(reg => reg.test(code))

  const extractor = (code: string) => {
    const rules = code.split(';')
    const result = []
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i]
      if (rule.match(DATA_URL_REG)) {
        rule += ';' + rules[i + 1]
        rule = rule.replace(QUOT_REG, '$1')
        i++
      }
      if (isExtract(rule)) {
        result.push(rule.replace(SPACE_REG, ' ').trim())
      }
    }
    return result
  }

  const handler = (code: string) => {
    code = code.replace(EXEGESIS_REG, '')
    const stack = []
    const len = code.length
    let contanter = ''
    let selector = ''
    let content = ''
    let i = 0
    const result = []

    while (i < len) {
      if (code[i] === LEFT_BRACKET) {
        if (!stack.length) {
          selector = contanter
          contanter = ''
        } else {
          contanter += code[i]
        }
        stack.push(LEFT_BRACKET)

        i++
        continue
      }

      if (code[i] === RIGHT_BRACKET) {
        stack.pop()
        if (stack.length) {
          contanter += code[i]
          i++
          continue
        }

        content = contanter
        contanter = ''

        if (!content) {
          i++
          continue
        }

        const exist = result.find(item => item.selector === selector)
        if (!exist) {
          result.push({ selector, content })
        } else if (exist.content !== content) {
          exist.content += content
        }

        i++
        continue
      }

      contanter += code[i]
      i++
    }

    return result.reduce((pre, curr) => {
      let rules = []
      if (curr.content.includes(LEFT_BRACKET)) {
        const keyframesMatched = handler(curr.content)
        if (keyframesMatched && keyframesMatched.length) {
          rules = [curr.content.replace(SPACE_REG, '')]
        }
      } else {
        rules = extractor(curr.content)
      }

      if (rules.length) {
        curr.selector = flatSelector(curr.selector)
        return pre.concat(`${curr.selector}{${rules.join(';')}}`)
      }

      return pre
    }, [])
  }

  return handler
}
