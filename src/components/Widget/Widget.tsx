import { useState } from 'react';
import { IMessage } from '../fts/Fts';
import { ReactComponent as SendSvg } from '../svg/send.svg';
import { ReactComponent as Gear } from '../svg/gear.svg';
import Bubble from './Bubble';
import './widget.scss';
import WidgetConfig from './WidgetConfig';

interface IWidget {
    widgetTitle: string;
    widgetChannel: string;
    // origin language code
    languageCode: string;
    messageList: IMessage[];
    updateMessageList: (msg:IMessage) => void;
    removeContainer: (widgetTitle: string) => void;
    editContainer: (widgetTitle: string, languageCode: string, channel: string) => void;
}

export default function Widget(props: IWidget) {
  const [chatInputMsg, setChatInputMsg] = useState('');
  // State variable to enable or disable translation
  const [translateToggle, setTranslateToggle] = useState(false);

  const [displayConfig, toggleDisplayConfig] = useState(false);
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

  const closeWidget = () => {
    try {
        props.removeContainer(props.widgetTitle);
    } catch (e) {
        console.log(e);
    }
  }

  /**
   * Call back method that receives the language code and channel, then updates the value of the object in the widgets list
   * @param title 
   * @param languageCode 
   * @param channel 
   */
  const editContainer = (title: string, languageCode: string, channel: string ) => {
    try {
        props.editContainer(title ,languageCode, channel);
        toggleDisplayConfig(false);
    } catch (e) {
        console.log(e);
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
                <span className='gear-icon' onClick={() => toggleDisplayConfig(!displayConfig)}><Gear /></span>
                <span title={translateToggle ? 'Disable Translation' : 'Enable Translation'} className={!translateToggle ? 'toggle' : 'toggle-success'} onClick={() => setTranslateToggle(!translateToggle)}></span>
                <span title='Close' onClick={closeWidget} className='close-icon'>x</span> 
            </div>           
        </div>
        {displayConfig && <WidgetConfig 
            widgetChannel={props.widgetChannel}
            languageCode={props.languageCode}
            widgetTitle={props.widgetTitle}
            editContainer={editContainer}
        />}
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
                <button className='button-success'><SendSvg /></button>
            </form>
        </div>
    </div>
  )
}
