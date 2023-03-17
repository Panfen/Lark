/**
 * 线段
 */

import React from 'react'

export const LineSprite = ({ x1, y1, x2, y2 }) => {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffa245" strokeWidth="3" />
  )
}
