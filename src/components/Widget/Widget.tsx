import { useState } from 'react';
import { IMessage } from '../fts/Fts';
import { ReactComponent as SendSvg } from '../svg/send.svg';
import Bubble from './Bubble';
import './widget.scss';

interface IWidget {
    widgetTitle: string;
    widgetChannel: string;
    // origin language code
    languageCode: string;
    messageList: IMessage[];
    updateMessageList: (msg:IMessage) => void
}

export default function Widget(props: IWidget) {
  const [chatInputMsg, setChatInputMsg] = useState('');
  // State variable to enable or disable translation
  const [translateToggle, setTranslateToggle] = useState(false);
  /**
   * Grabs contents from the message after the message is sent
   * @param e 
   */
  const sendMsg = (e: any) => {
    e.preventDefault();
    const message = e.target.chatMsg.value
    if (message) {
        setChatInputMsg('');
        const newMsgObject = {
            id: new Date().toISOString(),
            text: message,
            source: {
                widgetName: props.widgetTitle,
                channelName: props.widgetChannel,
                languageCode: props.languageCode
            }
        }
        props.updateMessageList(newMsgObject);
    }
  }

  return (
    <div className='widget-container'>
        <div className='widget-header'>
            <div className='widget-title'>
                <h3>{props.widgetTitle}</h3>
                <h5>{props.widgetChannel} - {props.languageCode}</h5>
            </div>
            <div className='widget-icons'>
                <span title={translateToggle ? 'Disable Translation' : 'Enable Translation'} className={!translateToggle ? 'toggle' : 'toggle-success'} onClick={() => setTranslateToggle(!translateToggle)}></span>
                <span title='Close' className='close-icon'>x</span>   
            </div>           
        </div>
        <div className='widget-body'>
            {props.messageList.map(msgObj => {
                // short circuit if channel name does not match
                if (msgObj.source.channelName !== props.widgetChannel) return (<></>);
                let msgType = 'inbound';
                if (msgObj.source.widgetName === props.widgetTitle) {
                    msgType = 'outbound';
                }
                return <Bubble
                            enableTranslate={translateToggle}
                            languageCode={props.languageCode} 
                            key={msgObj.id}
                            message={msgObj}
                            messageType={msgType}></Bubble>
            })}
            
        </div>

        <div className='widget-footer'>
            <form name='send-msg-form' className='send-msg-form' onSubmit={sendMsg}>
                <textarea 
                    maxLength={50}
                    name='chatMsg'
                    value={chatInputMsg}
                    onChange={(e) => setChatInputMsg(e.target.value)}></textarea>
                <button><SendSvg /></button>
            </form>
        </div>
    </div>
  )
}
