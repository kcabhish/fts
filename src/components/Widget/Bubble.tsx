import React, { useEffect, useState } from 'react';
import './bubble.scss';
import { IMessage } from '../fts/Fts';
import { translate } from '../../services/service';

interface IBubble {
  message: IMessage;
  messageType: string;
  languageCode: string;
  enableTranslate: boolean;
}

/**
 * Component to render the chat messages
 * @param props 
 * @returns 
 */
export default function Bubble(props: IBubble) {
  const { message, messageType, languageCode, enableTranslate } = props;
  const [bubbleMessage, setBubbleMessage] = useState('');

  useEffect(() => {
    if (!enableTranslate || languageCode === message.source.languageCode) {
      setBubbleMessage(message.text);
    } else {
      const translateMessage = async () => {
        const translatedMessage = await translate({
          text: message.text,
          sourceCode: message.source.languageCode,
          targetCode: languageCode
        });
        setTimeout(() => {
          setBubbleMessage(translatedMessage.translatedText);
        }, 1000);
      };
      translateMessage();
    }
  }, [message, messageType, languageCode, enableTranslate]);

  const author = messageType === 'inbound' ? <div className='author'>{message.source.widgetName}</div> : null;

  return (
    <div className={`bubble-container-${messageType}`}>
      <div className={`bubble-${messageType}`}>
        {author}
        {bubbleMessage || '...'}
      </div>
    </div>
  );
}
