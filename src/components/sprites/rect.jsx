/**
 * 矩形精灵
 */

import React from 'react'

export const RectSprite = ({ width, height }) => {
  return (
    <rect
      x="0"
      y="0"
      width={width}
      height={height}
      fill="#f2e7ff"
      stroke="#a245ff"
      strokeWidth="3"
    />
  )
}
