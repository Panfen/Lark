// 精灵
import React from 'react'
import { type ICoordinate, type ISize, type ISprite } from './type'

export const Sprite = ({
  sprite,
  children
}: {
  sprite: ISprite
  children?: React.ReactNode
}) => {
  const { id, attrs } = sprite
  const { size = {}, coordinate = {}, angle = 0 } = attrs
  const { width = 0, height = 0 } = size as ISize
  const { x = 0, y = 0 } = coordinate as ICoordinate
  const rotateStr = `rotate(${angle}, ${x + width / 2} ${y + height / 2})`
  const translateStr = `translate(${x}, ${y})`
  const transform = `${angle === 0 ? '' : rotateStr} ${translateStr}`

  return (
    <g
      data-sprite-id={id}
      className="sprite-container"
      transform={transform}
    >
      {children}
    </g>
  )
}
