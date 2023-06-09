import React, { useEffect, useRef } from 'react'
import { GraphicEditorCore } from './graphic-editor'
import { type ISprite } from './type'
import LineSpriteMeta from './sprites/line'
import RectSpriteMeta from './sprites/rect'

const defaultSpriteList: ISprite[] = [
  {
    id: 'LineSpriteMeta1',
    type: 'LineSprite',
    props: {
      stroke: '#84db92',
      strokeWidth: 3,
      x1: 0,
      y1: 0,
      x2: 160,
      y2: 100
    },
    attrs: {
      coordinate: { x: 100, y: 240 },
      size: { width: 160, height: 100 },
      angle: 0
    }
  },
  {
    id: 'RectSpriteMeta1',
    type: 'RectSprite',
    props: {
      fill: '#fdc5bf'
    },
    attrs: {
      coordinate: { x: 100, y: 100 },
      size: { width: 160, height: 100 },
      angle: 0
    }
  }
]

export const App: React.FC = () => {
  const editorRef = useRef<GraphicEditorCore>()

  useEffect(() => {
    const api = editorRef.current
    api?.registerSprite(LineSpriteMeta)
    api?.registerSprite(RectSpriteMeta)
    api?.addSpriteToStage(defaultSpriteList)
  }, [])

  return (
    <GraphicEditorCore
      ref={editorRef as any}
      width={800}
      height={560}
    />
  )
}
