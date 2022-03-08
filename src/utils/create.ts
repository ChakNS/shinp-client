export type Mod = string

export function createBEM(name: string) {
  return (el?: Mod): Mod => {
    el = el ? `${name}__${el}` : name

    return `${el}`
  }
}

export type BEM = ReturnType<typeof createBEM>

export function createNamespace(name: string) {
  const prefixedName = `shinp-${name}`
  return [prefixedName, createBEM(prefixedName)] as const
}
