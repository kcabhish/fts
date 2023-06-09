import React from 'react'
import './widget.scss';

interface IWidget {
    widgetTitle: string;
}
export default function Widget(props: IWidget) {
  return (
    <div className='widget-container'>
        <div className='widget-header'>
            <h3>{props.widgetTitle}</h3>
        </div>
        <div className='widget-body'>Scrollable list of messages</div>
        <div className='widget-footer'>Footer</div>
    </div>
  )
}
