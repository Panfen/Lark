/**
 * 精灵基类，定义精灵的通用属性
 */

import React from 'react'
import type { ISprite } from '../type'

export interface IBaseSpriteProps<IProps> {
  sprite: ISprite<IProps>
  active?: boolean
  editing?: boolean
}

export class BaseSprite<IProps = any, ISprite = any> extends React.Component<IBaseSpriteProps<IProps>, ISprite> {

}
