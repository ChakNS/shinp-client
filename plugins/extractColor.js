const EXEGESIS_REG = /\\\\?n|\n|\\\\?r|\/\*[\s\S]+?\*\//g
const SPACE_REG = /\s+/g
const TRIM_REG = /(^|,)\s+|\s+($)/g //前空格，逗号后的空格; 后空格
const SUB_CSS_REG = /\s*>\s*/g // div > a 替换为 div>a
const DATA_URL_REG = /url\s*\([\\'"\s]*data:/ //url("data:image/svg+xml;base64,PHN2")
const QUOT_REG = /\\+(['"])/g
const LEFT_BRACKET = '{'
const RIGHT_BRACKET = '}'

const flatSelector = s => {
  s = s.replace(TRIM_REG, '$1').replace(SUB_CSS_REG, '>').replace(SPACE_REG, ' ')
  return s.includes(';') ? s.split(';')[1] : s
}

export default function extractColor(matchColorRegs) {
  const isExtract = code => matchColorRegs.some(reg => reg.test(code))

  const extractor = code => {
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

  const handler = code => {
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
      } else if (code[i] === RIGHT_BRACKET) {
        stack.pop()
        if (!stack.length) {
          content = contanter
          contanter = ''
          if (content) {
            const exist = result.find(item => item.selector === selector)
            if (exist) {
              if (exist.content !== exist.content) {
                exist.content += content
              }
            } else {
              result.push({ selector, content })
            }
          }
        } else {
          contanter += code[i]
        }
      } else {
        contanter += code[i]
      }
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
