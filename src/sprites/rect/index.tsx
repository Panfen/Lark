/**
 * 矩形精灵
 */

import React from 'react'
import { BaseSprite } from '../BaseSprite'
import type { ISpriteMeta, IDefaultGraphicProps } from '../../type'

type IProps = IDefaultGraphicProps

export const Rect = (props: IProps) => {
  return (
    <rect
      x="0"
      y="0"
      stroke="#999"
      strokeWidth="2"
      {...props}
    >
    </rect>
  )
}

const SpriteType = 'RectSprite'

export class RectSprite extends BaseSprite<IProps> {
  render () {
    const { sprite } = this.props
    const { props, attrs } = sprite
    const { width, height } = attrs.size
    return (
      <Rect
        {...props}
        x={0}
        y={0}
        width={width}
        height={height}
      />
    )
  }
}

export const RectSpriteMeta: ISpriteMeta<IProps> = {
  type: SpriteType,
  spriteComponent: RectSprite
}

export default RectSpriteMeta
