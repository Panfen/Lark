// 舞台
import React from 'react'

export const Stage = ({ width, height, children, ...rest }) => {
  return (
    <svg
      {...rest}
      className='stage-container'
      version='1.1'
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={{
        width,
        height,
        outline: '1px solid #ddd'
      }}
    >
      {children}
    </svg>
  )
}
