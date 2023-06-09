import React from 'react'
import './fts.scss';
import Widget from '../Widget/Widget';

export default function Fts() {
  return (
    <div className='fts-main-container vertical-container'>
        <div className='fts-header-container'>
            buttons and status goes here
        </div>
        <div className='fts-body-container'>
            this will render the spawned widgets. Should set the max threshod for the widget spawned.
            <Widget />
        </div>
    </div>
  )
}
