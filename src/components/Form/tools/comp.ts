import components from '../comps'
import { FormChild } from '../types'

const generateComp = (col: FormChild, values: { [propName: string]: unknown }) => components['formInput'](col, values)

export default generateComp
