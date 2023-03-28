import React from 'react'
import { lineAngle, radianToAngle } from '../../../geometry'
import { getActiveSpriteRect } from '../../../helper'
import {
  type ISprite,
  type IStageApis,
  type ISizeCoordinate,
  type ICoordinate
} from '../../../type'
import RotateIcon from './rotate-icon'

interface IProps {
  info: ISizeCoordinate
  angle?: number
  pressShift?: boolean
  stage: IStageApis
  activeSpriteList: ISprite[]
  mousePointInStage: (e: MouseEvent) => ICoordinate
  getInitAttrMapData: () => any
}

interface IState {
  rotating: boolean
  mousePos: ICoordinate
}

export class Rotate extends React.Component<IProps, IState> {
  initData: any = {}

  state: IState = {
    rotating: false,
    mousePos: { x: 0, y: 0 }
  }

  componentDidMount (): void {
    this.addEventListener('pointerup', this.rotate_mouseUp, false)
  }

  componentWillUnmount (): void {
    this.removeEventListener('pointermove', this.rotate_mouseMove, false)
    this.removeEventListener('pointerup', this.rotate_mouseUp, false)
  }

  addEventListener = (...args: any) => {
    document.addEventListener(...args)
  }

  removeEventListener = (...args: any) => {
    document.removeEventListener(...args)
  }

  rotate_mouseDown = () => {
    this.addEventListener('pointermove', this.rotate_mouseMove, false)
  }

  rotate_mouseUp = () => {
    const { rotate } = this.state
    if (rotate) {
      this.setState({ rotating: false })
    }
    this.removeEventListener('pointermove', this.rotate_mouseMove, false)
    this.removeEventListener('pointermove', this.rotate_mouseUp, false)
  }

  rotate_mouseMove = (e: any): void => {
    const {
      activeSpriteList,
      stage,
      mousePointInStage
    } = this.props
    const mousePos = mousePointInStage(e)
    const info = getActiveSpriteRect(activeSpriteList)
    const center = {
      x: info.x + info.width / 2,
      y: info.y + info.height / 2
    }
    let angle = lineAngle(center, mousePos)
    // 鼠标点和中心点组成角度的补偿处理
    angle += radianToAngle(Math.atan((info.height + 15) / info.width))
    angle += angle < 0 ? 360 : 0
    const adsordAngles = [0, 90, 180, 270, 360]
    // 角度吸附处理
    adsordAngles.forEach((degree: number) => {
      angle = Math.abs(angle - degree) < 1 ? degree : angle
    })
    angle = angle > 360 ? 360 : angle
    this.setState({
      mousePos,
      rotating: true
    })
    activeSpriteList.forEach((sprite: ISprite) => {
      const newAttrs = {
        ...sprite.attrs,
        angle
      }
      sprite.attrs = newAttrs
    })
    stage.apis.updateSpriteList(activeSpriteList)
  }

  render () {
    const { activeSpriteList, info } = this.props
    const activeSingle = activeSpriteList.length === 1
    return (
      <g>
        {activeSingle && (
          <RotateIcon
            x={info.x + info.width}
            y={info.y - 20}
            className="operate-point-rotate-icon"
            onMouseDown={this.rotate_mouseDown}
          />
        )}
      </g>
    )
  }
}
