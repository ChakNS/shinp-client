// \n和备注
const Reg_Lf_Rem = /\\\\?n|\n|\\\\?r|\/\*[\s\S]+?\*\//g
const SpaceReg = /\s+/g
const TrimReg = /(^|,)\s+|\s+($)/g //前空格，逗号后的空格; 后空格
const SubCssReg = /\s*>\s*/g // div > a 替换为 div>a
const DataUrlReg = /url\s*\([\\'"\s]*data:/ //url("data:image/svg+xml;base64,PHN2")
const QuotReg = /\\+(['"])/g

// 查找css尾部，兼容 @keyframes {10%{...}}
const findCssEnd = (code, start) => {
  let level = 1
  let cssEnd = start
  // eslint-disable-next-line no-constant-condition
  while (true) {
    cssEnd++
    let char = code[cssEnd]
    if (!char) {
      return -1
    } else if (char === '{') {
      level++
    } else if (char === '}') {
      level--
      if (level === 0) {
        break
      }
    }
  }
  return cssEnd
}

export default function extractColor(matchColorRegs) {
  function testCssCode(code) {
    for (const colorReg of matchColorRegs) {
      if (colorReg.test(code)) return true // && !ExclueCssReg.test(cssCode)
    }
    return false
  }

  function getRules(code) {
    const rules = code.split(';')
    const ret = []
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i]
      if (rule.match(DataUrlReg)) {
        rule += ';' + rules[i + 1]
        rule = rule.replace(QuotReg, '$1')
        i++
      }
      if (testCssCode(rule)) {
        ret.push(rule.replace(SpaceReg, ' '))
      }
    }
    return ret
  }

  return code => {
    code = code.replace(Reg_Lf_Rem, '')
    const ret = []
    let nameStart,
      rules,
      nameEnd,
      cssEnd = -1
    // eslint-disable-next-line no-constant-condition
    while (1) {
      nameStart = cssEnd + 1
      nameEnd = code.indexOf('{', nameStart)
      cssEnd = findCssEnd(code, nameEnd)
      if (cssEnd > -1 && cssEnd > nameEnd && nameEnd > nameStart) {
        const cssCode = code.slice(nameEnd + 1, cssEnd)
        if (cssCode.indexOf('{') > -1) {
          // @keyframes
          rules = extractColor(cssCode)
        } else {
          rules = getRules(cssCode)
        }
        if (rules.length) {
          let selector = code.slice(nameStart, nameEnd)
          selector = selector.replace(TrimReg, '$1')
          selector = selector.replace(SubCssReg, '>')
          selector = selector.replace(SpaceReg, ' ') // lines
          const p = selector.indexOf(';') //@charset utf-8;
          if (p > -1) {
            selector = selector.slice(p + 1)
          }
          Array.isArray(rules) && ret.push(selector + '{' + rules.join(';') + '}')
        }
      } else {
        break
      }
    }
    return ret
  }
}
