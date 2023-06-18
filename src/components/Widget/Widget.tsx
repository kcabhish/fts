import React, { useState, useRef, useEffect } from 'react';
import { IMessage } from '../fts/Fts';
import { ReactComponent as Gear } from '../svg/gear.svg';
import { ReactComponent as SendSvg } from '../svg/send.svg';
import Bubble from './Bubble';
import WidgetConfig from './WidgetConfig';
import './widget.scss';

interface IWidget {
  widgetTitle: string;
  widgetChannel: string;
  languageCode: string;
  messageList: IMessage[];
  updateMessageList: (msg: IMessage) => void;
  removeContainer: (widgetTitle: string) => void;
  editContainer: (widgetTitle: string, languageCode: string, channel: string) => void;
}

export default function Widget(props: IWidget) {
  const [chatInputMsg, setChatInputMsg] = useState('');
  const [translateToggle, setTranslateToggle] = useState(true);
  const [displayConfig, toggleDisplayConfig] = useState(false);
  const endOfMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [props.messageList]);

  const sendMsg = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = chatInputMsg.trim();
    if (message) {
      setChatInputMsg('');
      const newMsgObject: IMessage = {
        id: new Date().toISOString(),
        text: message,
        source: {
          widgetName: props.widgetTitle,
          channelName: props.widgetChannel,
          languageCode: props.languageCode
        }
      };
      props.updateMessageList(newMsgObject);
    }
  };

  const closeWidget = () => {
    try {
      props.removeContainer(props.widgetTitle);
    } catch (e) {
      console.log(e);
    }
  };

  const editContainer = (title: string, languageCode: string, channel: string) => {
    try {
      props.editContainer(title, languageCode, channel);
      toggleDisplayConfig(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      sendMsg(e);
    }
  };

  const scrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='widget-container'>
      <div className='widget-header'>
        <div className='widget-title'>
          <h3>{props.widgetTitle}</h3>
          <h5>
            {props.widgetChannel} - {props.languageCode}
          </h5>
        </div>
        <div className='widget-icons'>
          <span
            title='Click to open configuration menu'
            className='gear-icon'
            onClick={() => toggleDisplayConfig(!displayConfig)}
          >
            <Gear />
          </span>
          <span
            title={translateToggle ? 'Click to disable Translation' : 'Click to enable Translation'}
            className={translateToggle ? 'toggle-success' : 'toggle'}
            onClick={() => setTranslateToggle(!translateToggle)}
          />
          <span title='Close' onClick={closeWidget} className='close-icon'>
            x
          </span>
        </div>
      </div>
      {displayConfig && (
        <WidgetConfig
          widgetChannel={props.widgetChannel}
          languageCode={props.languageCode}
          widgetTitle={props.widgetTitle}
          editContainer={editContainer}
        />
      )}
      <div className='widget-body'>
        {props.messageList
          .filter((msgObj) => msgObj.source.channelName === props.widgetChannel)
          .map((msgObj) => {
            const msgType = msgObj.source.widgetName === props.widgetTitle ? 'outbound' : 'inbound';
            return (
              <Bubble
                enableTranslate={translateToggle}
                languageCode={props.languageCode}
                key={msgObj.id}
                message={msgObj}
                messageType={msgType}
              />
            );
          })}
        <div ref={endOfMessageRef} />
      </div>

      <div className='widget-footer'>
        <form name='send-msg-form' className='send-msg-form' onSubmit={sendMsg}>
          <textarea
            maxLength={50}
            name='chatMsg'
            value={chatInputMsg}
            onKeyDown={onKeyDown}
            onChange={(e) => setChatInputMsg(e.target.value)}
          />
          <button className='button-success'>
            <SendSvg />
          </button>
        </form>
      </div>
    </div>
  );
}
