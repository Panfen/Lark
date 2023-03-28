import { type ISizeCoordinate, type ISprite } from './type'

/**
 * 计算选中所有精灵的矩形区域
 */
export const getActiveSpriteRect = (activeSpriteList: ISprite[]) => {
  const posMap = {
    minX: Infinity,
    minY: Infinity,
    maxX: 0,
    maxY: 0
  }

  activeSpriteList.forEach((sprite: ISprite) => {
    const { size, coordinate } = sprite.attrs
    const { width = 0, height = 0 } = size
    const { x = 0, y = 0 } = coordinate
    if (x < posMap.minX) {
      posMap.minX = x
    }
    if (y < posMap.minY) {
      posMap.minY = y
    }
    if (x + width > posMap.maxX) {
      posMap.maxX = x + width
    }
    if (y + height > posMap.maxY) {
      posMap.maxY = y + height
    }
  })
  return {
    width: posMap.maxX - posMap.minX,
    height: posMap.maxY - posMap.minY,
    x: posMap.minX,
    y: posMap.minY
  } as ISizeCoordinate
}

/**
 * 判断是否正在输入
 */
export const isInputting = () => {
  const ele = document.activeElement
  const inputTags = ['input', 'textarea']
  if (ele != null) {
    const contentEditable = ele.getAttribute('contenteditable') === 'true'
    const tagName = ele.tagName.toLocaleLowerCase() || ''
    if (inputTags.includes(tagName) || contentEditable) {
      return true
    }
  }
  return false
}

/**
 * 根据类名寻找父元素
 */
export function findParentByClass (dom: any, className: string): any {
  if (!dom || dom.tagName === 'BODY') {
    return null
  }
  if (dom.classList.contains(className)) {
    return dom
  }
  return findParentByClass(dom.parentNode, className)
}

/**
 * 搜搜精灵索引
 */
export const findSpriteInSpriteList = (spriteList: ISprite[], sprite: ISprite | string) => {
  for (let i = 0; i < spriteList.length; i += 1) {
    const targetSprite = spriteList[i]
    const ok = targetSprite.id === (typeof sprite === 'string' ? sprite : sprite.id)
    if (ok) {
      return {
        sprite: targetSprite,
        index: i
      }
    }
  }
  return {
    sprite: null,
    index: -1
  }
}
