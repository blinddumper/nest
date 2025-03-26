import postcss, { ProcessOptions, Root, Document } from 'postcss'
import { merge } from 'lodash'
import cssVariables from 'postcss-css-variables'
import { parse } from 'postcss-scss'
import * as fs from 'fs'

export type CSSVariable = `--${string}`
export type FilePath = string

export interface Options {
  removeRtl: boolean
  cssVariables: {
    include: FilePath[]
    exclude: CSSVariable[]
    type: 'normal' | 'replace'
  }
}

function removeRtl(rule: any, canRemove: boolean) {
  if (!canRemove) return

  let sourceFile = rule.source.input.file
  if (
    sourceFile &&
    sourceFile.indexOf('@nutui') === -1 &&
    sourceFile.indexOf('@dongdesign') === -1
  )
    return
  if (
    rule.selector.indexOf('nut-rtl') > -1 ||
    rule.selector.indexOf('[dir=rtl]') > -1
  )
    rule.remove()
}

async function replaceCssVariables(
  root,
  cssVariablesContent: string[],
  exclude: string[] = []
) {
  cssVariablesContent.push(root.toResult().css)
  let options: ProcessOptions<Document | Root> = {
    parser: parse,
    from: undefined,
  } as ProcessOptions<Root>
  let replacedCss = postcss([
    cssVariables({
      preserve: (declaration) => {
        if (exclude.includes(declaration.prop)) {
          return true
        }
        let cssvars = declaration.value.match(/var\((--nutui-[\w\d-]+)\)/)
        if (cssvars && exclude.includes(cssvars[1])) return true
        return false
      },
    }),
  ]).process(cssVariablesContent.join('\n'), options).css

  let replacedRoot = postcss.parse(replacedCss)
  root.raws = replacedRoot.raws
  root.nodes = replacedRoot.nodes
}

export function optimizeCss(opts: Options) {
  let defaultConfig = {
    removeRtl: false,
    cssVariables: {
      include: [],
      type: 'normal',
    },
  }
  let config = merge(defaultConfig, opts)
  let cssVariablesContent: string[] = []
  if (config.cssVariables.type !== 'normal') {
    config.cssVariables.include.forEach((p: string) => {
      let content = ''
      try {
        // 从绝对路径读取 CSS 变量的内容
        content = fs.readFileSync(p).toString()
      } catch (e) {
        content = ''
      }
      cssVariablesContent.push(content)
    })
  }

  return {
    postcssPlugin: 'postcss-optimize-css',
    OnceExit(root) {
      if (config.cssVariables.type === 'replace') {
        replaceCssVariables(
          root,
          cssVariablesContent,
          config.cssVariables.exclude
        )
      }
    },
    Rule(rule) {
      removeRtl(rule, opts.removeRtl)
    },
  }
}
