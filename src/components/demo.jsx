import React from 'react'

import { Sprite } from './sprite'
import { LineSprite } from './sprites/line'
import { RectSprite } from './sprites/rect'
import { Stage } from './stage'

export const StageDemo = ({ width, height }) => {
  return (
    <Stage width={width} height={height}>
      {/* 矩形精灵 */}
      <Sprite x={200} y={50}>
        <RectSprite width={400} height={240} />
      </Sprite>
      {/* 线段精灵 */}
      <Sprite x={100} y={350}>
        <LineSprite x1={0} y1={0} x2={300} y2={100} />
      </Sprite>
    </Stage>
  )
}
