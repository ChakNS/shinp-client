const componentFiles = import.meta.globEager('./*.tsx')

const components = Object.keys(componentFiles).reduce((component: { [propName: string]: Function }, componentPath) => {
  const componentName = componentPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  if (componentName === 'index') {
    return component
  }

  const value = componentFiles[componentPath]
  component[componentName] = value.default
  return component
}, {})

export default components
