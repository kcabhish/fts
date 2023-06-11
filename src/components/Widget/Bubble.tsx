import React, { useEffect, useState } from 'react'
import './bubble.scss';
import { IMessage } from '../fts/Fts';

interface IBubble {
  message: IMessage;
  messageType: string;
}
/**
 * Component to render the chat messages
 * @param props 
 * @returns 
 */
export default function Bubble(props: IBubble) {
  return (
    <div className={`bubble-container-${props.messageType}`}>
        <div className={`bubble-${props.messageType}`}>
          {props.messageType === 'inbound' && <div className='author'>{props.message.source.widgetName}</div>}
          {props.message.text}
        </div>
    </div>
  )
}
