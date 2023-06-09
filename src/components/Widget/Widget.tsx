import React from 'react'
import './widget.scss';
export default function Widget() {
  return (
    <div className='widget-container'>
        <div className='widget-header'>Header component</div>
        <div className='widget-body'>Scrollable list of messages</div>
        <div className='widget-footer'>Footer</div>
    </div>
  )
}
