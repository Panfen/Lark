/**
 * 缩放功能
 * 展示修改尺寸的锚点
 */

import React from 'react'
import { getActiveSpriteRect } from '../../../helper'
import { type ISprite, type IStageApis, type ISizeCoordinate, type ICoordinate, type ISize } from '../../../type'
import { computeResizeRect, handlePositionResize } from './helper'
import operatePointData from './operate-point'

const getCursor = (angle: number) => {
  let a = angle
  if (a < 0) {
    a += 360
  }
  if (a >= 360) {
    a -= 360
  }
  if (a >= 338 || a < 23 || (a > 157 && a <= 202)) {
    return 'ew-resize'
  } else if ((a >= 23 && a < 68) || (a > 202 && a <= 247)) {
    return 'nwse-resize'
  } else if ((a >= 68 && a < 113) || (a > 247 && a <= 292)) {
    return 'ns-resize'
  } else {
    return 'nesw-resize'
  }
}

interface IProps {
  info: ISizeCoordinate
  angle?: number
  stage: IStageApis
  activeSpriteList: ISprite[]
  mousePointInStage: (e: MouseEvent) => ICoordinate
  getInitAttrMapData: () => any
}

interface IState {
  resizing: boolean
}

class Resize extends React.Component<IProps, IState> {
  resizePos: string = ''

  initData: any = {}

  state: IState = {
    resizing: false
  }

  componentDidMount (): void {
    this.addEventListener('pointerup', this.resize_mouseUp, false)
  }

  componentWillUnmount (): void {
    this.removeEventListener('pointermove', this.resize_mouseMove, false)
    this.removeEventListener('pointerup', this.resize_mouseUp, false)
  }

  addEventListener = (...args: any) => {
    document.addEventListener(...args)
  }

  removeEventListener = (...args: any) => {
    document.removeEventListener(...args)
  }

  resize_mouseDown = (e: any, pos: string) => {
    this.resizePos = pos
    this.initData = this.props.getInitAttrMapData()
    this.addEventListener('pointermove', this.resize_mouseMove, false)
    this.addEventListener('pointerup', this.resize_mouseUp, false)
  }

  resize_mouseUp = () => {
    const { resizing } = this.state
    if (resizing) {
      this.setState({ resizing: false })
    }
    this.removeEventListener('pointermove', this.resize_mouseMove, false)
    this.removeEventListener('pointerup', this.resize_mouseUp, false)
  }

  resize_mouseMove = (e: any) => {
    console.log('move')
    const { resizePos } = this
    const { activeSpriteList, stage } = this.props
    const { initSizeMap, initPosMap } = this.initData

    // 不支持同时编辑多个精灵的大小
    if (activeSpriteList.length === 1) {
      const sprite = activeSpriteList[0]
      const newAttrs = { ...sprite.attrs }
      const initSize = initSizeMap[sprite.id]
      const initPos = initPosMap[sprite.id]
      const result = this.getResizeChange(
        e,
        resizePos,
        initSize,
        initPos,
        newAttrs.angle
      )
      const { width, height, x, y } = result
      newAttrs.size = { width, height }
      newAttrs.coordinate = { x, y }
      stage.apis.updateSpriteAttrs(sprite, newAttrs)
      this.setState({ resizing: true })
    }
  }

  // 重新定位位置计算
  getResizeChange = (
    e: any,
    pos: string,
    initSize: ISize,
    initPos: ICoordinate,
    angle = 0
  ) => {
    const { initMousePos } = this.initData
    const { activeSpriteList } = this.props
    const mousePoint = this.props.mousePointInStage(e)
    let info = { width: 0, height: 0, x: 0, y: 0 }
    const params: any = {
      angle,
      pos,
      mousePoint,
      initPos,
      initSize,
      initMousePos,
      resizeLock: false,
      activeRect: getActiveSpriteRect(activeSpriteList),
      info
    }
    // 处理来自8个方向的变动
    info = handlePositionResize(params)
    computeResizeRect(pos, initSize, initPos, initMousePos, mousePoint, angle)
    return {
      width: Math.abs(initSize.width + info.width),
      height: Math.abs(initSize.height + info.height),
      x: initPos.x + info.x,
      y: initPos.y + info.y
    }
  }

  render () {
    const canResize = true
    const activeSingle = true
    const resizeLock = false
    const { info, angle } = this.props
    return (
      <g>
        {canResize && activeSingle && operatePointData.map((e: any, i: number) => {
          // 按住shift等比例缩放时，仅展示4个角的锚点
          if (resizeLock && !e.name.includes('-')) {
            return null
          }
          return (
            <rect
              key={i}
              x={info.x + (info.width / 100) * e.position.x - 4}
              y={info.y + (info.height / 100) * e.position.y - 4}
              width={8}
              height={8}
              fill="#fff"
              stroke="#999"
              strokeWidth="1"
              className={`operate-point-container operate-point-${e.name}`}
              style={{
                cursor: getCursor(angle + e.angle)
              }}
              onMouseDown={(event: any) => {
                this.resize_mouseDown(event, e.name)
              }}
            />
          )
        })}
      </g>
    )
  }
}

export default Resize
