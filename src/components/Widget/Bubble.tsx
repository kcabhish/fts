import React, { useEffect, useState } from 'react'
import './bubble.scss';
import { IMessage } from '../fts/Fts';
import { translate } from '../../utils/translate';

interface IBubble {
  message: IMessage;
  messageType: string;
  languageCode: string;
}
/**
 * Component to render the chat messages
 * @param props 
 * @returns 
 */
export default function Bubble(props: IBubble) {
  const [bubbleMessage, setBubbleMessage] = useState('');

  useEffect(() => {
    const targetLanguageCode = props.languageCode;
    const sourceLanguageCode = props.message.source.languageCode;
    console.log(targetLanguageCode);
    console.log(sourceLanguageCode);
    if (targetLanguageCode === sourceLanguageCode) {
      setBubbleMessage(props.message.text);
    } else {
      
      // translate the language and then 
      const translateMessage = async () => {
        const msg = await translate(props.message.text, sourceLanguageCode, targetLanguageCode);
        console.log('INSIDE TRANSLATE');
        console.log(msg);
        setBubbleMessage(msg);
        // mimicking response delay by 1 sec to test loading
        // setTimeout(() => {
        //   setBubbleMessage(props.message.text);
        // }, 1000);
        
      }
      translateMessage();
    }
  },[]);
  return (
    <div className={`bubble-container-${props.messageType}`}>
        <div className={`bubble-${props.messageType}`}>
          {props.messageType === 'inbound' && <div className='author'>{props.message.source.widgetName}</div>}
          {!!bubbleMessage ? bubbleMessage : '...'}
        </div>
    </div>
  )
}
