import React, { useEffect, useState } from 'react'
import './bubble.scss';
import { IMessage } from '../fts/Fts';
import { translate } from '../../services/service';

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
    if (targetLanguageCode === sourceLanguageCode) {
      setBubbleMessage(props.message.text);
    } else {
      // translate the language and then 
      const translateMessage = async () => {
        const msg =await translate({
          text: props.message.text,
          sourceCode: sourceLanguageCode,
          targetCode: targetLanguageCode
        });

        // mimicking response delay by 1 sec to test loading
        setTimeout(() => {
          setBubbleMessage(msg.translatedText);
        }, 1000);
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
