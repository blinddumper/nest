import babel from '@babel/core'
import { describe, expect, it } from 'vitest'
import { replaceIcons } from '../src/replace-icons'

let plugin = replaceIcons({
  sourceLibrary: ['@nutui/icons-react', '@nutui/icons-react-taro'],
  targetLibrary: '@test/aa',
  iconMappings: {
    Loading: 'Star',
  },
})

let babelOptions = {
  presets: ['@babel/preset-react'],
  plugins: [plugin],
}
let caseIns = `
import { Loading } from '@nutui/icons-react'
import { ArrowSize6 as Arrow } from '@nutui/icons-react'
let ReplaceOne = () => {
  return <><Loading /> <Arrow /></>
}
`
describe('', () => {
  it('replace Loading icons with Star', () => {
    let ast = babel.transformSync(caseIns, babelOptions)
    // @ts-ignore
    expect(ast.code).toMatchSnapshot()
  })
})
