import { angleToRadian, distance, lineRadian, rotate } from '../../../geometry'
import { type ICoordinate, type ISize, type ISizeCoordinate } from '../../../type'

/**
 * 计算增加的宽高
 */
export const getIncreaseSize = (
  initMousePos: ICoordinate,
  mousePoint: ICoordinate,
  angle = 0
) => {
  const dis = distance(initMousePos, mousePoint)
  const radian = angleToRadian(angle)
  const includedRadian = lineRadian(initMousePos, mousePoint) - radian
  const addDis = dis * Math.cos(includedRadian)
  return {
    width: addDis,
    height: dis * Math.sin(includedRadian)
  }
}

/**
 * 计算新的中心点
 */
const getNewCeneterPoint = (
  initMousePos: ICoordinate,
  mousePoint: ICoordinate,
  angle = 0,
  initCoordinate: ICoordinate,
  initSize: ISize
) => {
  const { width: addWidth, height: addHeight } = getIncreaseSize(initMousePos, mousePoint, angle)
  return {
    x: initCoordinate.x + (initSize.width + addWidth) / 2,
    y: initCoordinate.y + (initSize.height + addHeight) / 2,
    addWidth,
    addHeight
  }
}

/**
 * 处理8个方向的size变动
 */
export const handlePositionResize = ({
  pos,
  angle,
  mousePoint,
  initPos,
  initSize,
  initMousePos,
  info,
  resizeLock
}): any => {
  let { width, height, x, y } = info
  let offsetPoint: ICoordinate = { x: 0, y: 0 }
  const initCenter = {
    x: initPos.x + initSize.width / 2,
    y: initPos.y + initSize.height / 2
  }

  // 宽高方向上各自是否发生了翻转，如右侧边的锚点是否拖拽到了矩形的左边
  // 把鼠标点转换到未旋转的坐标系下，方便判断是否翻转
  const originMousePoint = rotate(mousePoint, -angle, initCenter)
  // 计算偏移量
  const getOffsetPoint = (width = 0, height = 0, angle = 0) => {
    const newCenter = {
      x: initPos.x + (width + initSize.width) / 2,
      y: initPos.y + (height + initSize.height) / 2
    }
    const p1 = rotate(initPos, angle, initCenter)
    const p2 = rotate(initPos, angle, newCenter)
    const offsetPoint = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    }
    return offsetPoint
  }

  const hasLeft = pos.includes('left')
  const hasRight = pos.includes('right')
  const hasTop = pos.includes('top')
  const hasBottom = pos.includes('bottom')
  const reverseX = hasLeft
    ? originMousePoint.x > initPos.x + initSize.width
    : originMousePoint.x < initPos.x
  const reverseY = hasTop
    ? originMousePoint.y > initPos.y + initSize.height
    : originMousePoint.y < initPos.y

  // 按住shift等比缩放
  if (resizeLock) {
    // todo
  }
  const offsetAngle = angle * (hasLeft ? -1 : 1) * (hasTop ? -1 : 1)
  if (hasLeft || hasRight) {
    width = getIncreaseSize(
      initMousePos,
      mousePoint,
      angle + (hasLeft ? 180 : 0)
    ).width
  }
  if (hasTop || hasBottom) {
    height = getIncreaseSize(
      initMousePos,
      mousePoint,
      angle + (hasTop ? 180 : 0)
    ).height
  }
  // 在移动右下角锚点的情况下，只影响高宽，但是由于旋转中心变了，左上角也会偏移的，所以要计算这个偏移手动修正回来
  offsetPoint = getOffsetPoint(width, height, offsetAngle)
  x = -offsetPoint.x
  y = -offsetPoint.y
  if (hasRight) {
    x = -offsetPoint.x + (reverseX ? initSize.width + width : 0)
  }
  if (hasLeft) {
    x = offsetPoint.x + (reverseX ? initSize.width : -width)
  }
  if (hasBottom) {
    y = -offsetPoint.y + (reverseY ? initSize.height + height : 0)
  }
  if (hasTop) {
    y = offsetPoint.y + (reverseY ? initSize.height : -height)
  }
  return { width, height, x, y } as ISizeCoordinate
}

// 计算缩放后的大小和位置
export const computeResizeRect = (
  resizePos: string,
  initSize: ISize,
  initCoordinate: ICoordinate,
  initMousePos: ICoordinate,
  mousePos: ICoordinate,
  angle = 0
) => {
  const centerPoint = {
    x: initCoordinate.x + initSize.width / 2,
    y: initCoordinate.y + initSize.height / 2
  }
  const newCenterPoint = getNewCeneterPoint(
    initMousePos,
    mousePos,
    angle,
    initCoordinate,
    initSize
  )
  const getOffsetPoint = () => {
    const newCenter = {
      x: initCoordinate.x + (newCenterPoint.addWidth + initSize.width) / 2,
      y: initCoordinate.y + (newCenterPoint.addHeight + initSize.height) / 2 // 需要优化？
    }
    const p1 = rotate(initCoordinate, angle, centerPoint)
    const p2 = rotate(initCoordinate, angle, newCenter)
    const offsetPoint = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    }
    return offsetPoint
  }
  const offsetPoint = getOffsetPoint()
  return {
    x: -offsetPoint.x,
    y: -offsetPoint.y,
    width: newCenterPoint.addWidth,
    height: newCenterPoint.addHeight
  }
}
