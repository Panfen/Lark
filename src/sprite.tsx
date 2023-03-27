// 精灵
import React from 'react'

export const Sprite = ({ x, y, children }) => {
  return (
  <g className="sprite-container" transform={`translate(${x}, ${y})`}>{children}</g>
  )
}
