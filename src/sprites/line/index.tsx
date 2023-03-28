/**
 * 线性精灵
 */

import React from 'react'
import type { ISpriteMeta, IDefaultGraphicProps } from '../../type'
import { BaseSprite } from '../BaseSprite'

interface ILine {
  x1: number
  y1: number
  x2: number
  y2: number
}

type IProps = ILine & IDefaultGraphicProps

// 精灵
export const Line = (props: IProps) => {
  return (
    <line
      x1={0}
      y1={0}
      x2={0}
      y2={0}
      stroke="#999"
      strokeWidth='2'
      {...props}
    />
  )
}

// 精灵的名字，全局唯一
const SpriteType = 'LineSprite'

// 精灵组件
export class LineSprite extends BaseSprite<IProps> {
  render () {
    const { sprite } = this.props
    const { props } = sprite
    return (
      <Line { ...props } />
    )
  }
}

// 描述精灵的原数据
export const LineSpriteMeta: ISpriteMeta<IProps> = {
  type: SpriteType,
  spriteComponent: LineSprite
}

export default LineSpriteMeta
